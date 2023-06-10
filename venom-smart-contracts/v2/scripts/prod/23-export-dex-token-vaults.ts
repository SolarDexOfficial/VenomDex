import { writeFileSync } from 'fs';
import { Address } from 'locklift';
import { yellowBright } from 'chalk';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Migration } = require(process.cwd() + '/scripts/utils');

const OLD_DEX_TOKEN_VAULTS_CODE_HASH =
  '59eed82c0d87ced3d7f27c2430b0b6e9e5384462680be7814f9a836c9f4d48e5';

type TokenVaultEntity = {
  tokenVault: Address;
  tokenRoot: Address;
};

async function exportDexTokenVault() {
  const migration = new Migration();

  const dexRoot = await locklift.factory.getDeployedContract(
    'DexRoot',
    migration.getAddress('DexRoot'),
  );

  console.log('DexRoot: ' + dexRoot.address);

  let continuation = undefined;
  let hasResults = true;
  const accounts: Address[] = [];

  const start = Date.now();

  while (hasResults) {
    const result: { accounts: Address[]; continuation: string } =
      await locklift.provider.getAccountsByCodeHash({
        codeHash: OLD_DEX_TOKEN_VAULTS_CODE_HASH,
        continuation,
        limit: 50,
      });

    continuation = result.continuation;
    hasResults = result.accounts.length === 50;

    accounts.push(...result.accounts);
  }

  const promises: Promise<TokenVaultEntity | null>[] = [];

  for (const addr of accounts) {
    promises.push(
      new Promise(async (resolve) => {
        const DexTokenVault = await locklift.factory.getDeployedContract(
          'DexTokenVault',
          addr,
        );

        const root = await DexTokenVault.methods
          .getDexRoot({ answerId: 0 })
          .call({})
          .then((r) => r.value0.toString())
          .catch((e) => {
            console.error(e);
            return '';
          });

        if (root === dexRoot.address.toString()) {
          const tokenRoot = (
            await DexTokenVault.methods.getTokenRoot({ answerId: 0 }).call()
          ).value0;

          console.log(`DexTokenVault ${addr}, tokenRoot = ${tokenRoot}`);

          resolve({
            tokenVault: addr,
            tokenRoot: tokenRoot,
          });
        } else {
          console.log(
            yellowBright(`DexTokenVault ${addr} has another root: ${root}`),
          );
          resolve(null);
        }
      }),
    );
  }

  const pairs = await Promise.all(promises);

  console.log(`Export took ${(Date.now() - start) / 1000} seconds`);

  writeFileSync(
    './dex_token_vaults.json',
    JSON.stringify(
      pairs.filter((v) => !!v),
      null,
      2,
    ),
  );
}

exportDexTokenVault()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
