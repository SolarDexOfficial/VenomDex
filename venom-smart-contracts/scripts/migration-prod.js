const {Migration, TOKEN_CONTRACTS_PATH, afterRun, getRandomNonce, displayTx} = require(process.cwd() + '/scripts/utils')

const migration = new Migration();
const newOwner = '0:0000000000000000000000000000000000000000000000000000000000000000'

async function main() {
  migration.reset();
  console.log(`Network: ${JSON.stringify(locklift.networkConfig.ton_client.network.server_address)}`)

  const [keyPair] = await locklift.keys.getKeyPairs();
  console.log(`Deployer public key: ${keyPair.public}`)

  // ============ DEPLOYER ACCOUNT ============
  const Account = await locklift.factory.getAccount('Wallet');
  let account = await locklift.giver.deployContract({
    contract: Account,
    constructorParams: {},
    initParams: {
      _randomNonce: Math.random() * 6400 | 0,
    },
    keyPair: keyPair,
  }, locklift.utils.convertCrystal(10, 'nano'));
  console.log(`Deployer Account: ${account.address}`);
  migration.store(account, 'Account1');

  // ============ TOKEN FACTORY ============
  const TokenFactory = await locklift.factory.getContract('TokenFactory');

  const TokenRoot = await locklift.factory.getContract('TokenRootUpgradeable', TOKEN_CONTRACTS_PATH);
  const TokenWallet = await locklift.factory.getContract('TokenWalletUpgradeable', TOKEN_CONTRACTS_PATH);
  const TokenWalletPlatform = await locklift.factory.getContract('TokenWalletPlatform', TOKEN_CONTRACTS_PATH);

  const tokenFactory = await locklift.giver.deployContract({
    contract: TokenFactory,
    constructorParams: {
      _owner: account.address
    },
    initParams: {
      randomNonce_: getRandomNonce(),
    },
    keyPair,
  }, locklift.utils.convertCrystal(2, 'nano'));
  migration.store(tokenFactory, 'TokenFactory');
  console.log(`TokenFactory: ${tokenFactory.address}`);

  console.log('Installing token root code...');
  let tx = await account.runTarget({
    contract: tokenFactory,
    method: 'setRootCode',
    params: {_rootCode: TokenRoot.code},
    keyPair
  })
  displayTx(tx);

  console.log('Installing token wallet code...');
  tx = await account.runTarget({
    contract: tokenFactory,
    method: 'setWalletCode',
    params: {_walletCode: TokenWallet.code},
    keyPair
  })
  displayTx(tx);

  tx = await account.runTarget({
    contract: tokenFactory,
    method: 'setWalletPlatformCode',
    params: {_walletPlatformCode: TokenWalletPlatform.code},
    keyPair
  })
  displayTx(tx);

  // ============ ROOT AND VAULT ============
  account.afterRun = afterRun;
  const DexPlatform = await locklift.factory.getContract('DexPlatform', 'precompiled');
  const DexAccount = await locklift.factory.getContract('DexAccount');
  const DexPair = await locklift.factory.getContract('DexPair');
  const DexStablePair = await locklift.factory.getContract('DexStablePair');
  const DexVaultLpTokenPending = await locklift.factory.getContract('DexVaultLpTokenPending');
  const DexRoot = await locklift.factory.getContract('DexRoot');
  const DexVault = await locklift.factory.getContract('DexVault');

  console.log(`Deploying DexRoot...`);
  const dexRoot = await locklift.giver.deployContract({
    contract: DexRoot,
    constructorParams: {
      initial_owner: account.address,
      initial_vault: locklift.ton.zero_address
    },
    initParams: {
      _nonce: getRandomNonce(),
    },
    keyPair,
  }, locklift.utils.convertCrystal(2, 'nano'));
  console.log(`DexRoot address: ${dexRoot.address}`);

  console.log(`Deploying DexVault...`);
  const dexVault = await locklift.giver.deployContract({
    contract: DexVault,
    constructorParams: {
      owner_: account.address,
      token_factory_: migration.load(await locklift.factory.getAccount('Wallet'), 'TokenFactory').address,
      root_: dexRoot.address
    },
    initParams: {
      _nonce: getRandomNonce(),
    },
    keyPair,
  }, locklift.utils.convertCrystal(2, 'nano'));
  console.log(`DexVault address: ${dexVault.address}`);

  console.log(`DexVault: installing Platform code...`);
  tx = await account.runTarget({
    contract: dexVault,
    method: 'installPlatformOnce',
    params: {code: DexPlatform.code},
    keyPair
  });
  displayTx(tx);

  console.log(`DexVault: installing VaultLpTokenPending code...`);
  tx = await account.runTarget({
    contract: dexVault,
    method: 'installOrUpdateLpTokenPendingCode',
    params: {code: DexVaultLpTokenPending.code},
    keyPair
  });
  displayTx(tx);

  console.log(`DexRoot: installing vault address...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'setVaultOnce',
    params: {new_vault: dexVault.address},
    keyPair
  });
  displayTx(tx);

  console.log(`DexRoot: installing Platform code...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'installPlatformOnce',
    params: {code: DexPlatform.code},
    keyPair
  });
  displayTx(tx);

  console.log(`DexRoot: installing DexAccount code...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'installOrUpdateAccountCode',
    params: {code: DexAccount.code},
    keyPair
  });
  displayTx(tx);

  console.log(`DexRoot: installing DexPair CONSTANT_PRODUCT code...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'installOrUpdatePairCode',
    params: {code: DexPair.code, pool_type: 1},
    keyPair
  });
  displayTx(tx);
  console.log(`DexRoot: installing DexPair STABLESWAP code...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'installOrUpdatePairCode',
    params: {code: DexPair.code, pool_type: 2},
    keyPair
  });
  displayTx(tx);

  console.log(`DexRoot: set Dex is active...`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'setActive',
    params: {new_active: true},
    keyPair
  });
  displayTx(tx);

  migration.store(dexRoot, 'DexRoot');
  migration.store(dexVault, 'DexVault');


  console.log(`Transferring DEX ownership from ${account.address} to ${newOwner}`);
  console.log(`Transfer for DexRoot: ${dexRoot.address}`);
  tx = await account.runTarget({
    contract: dexRoot,
    method: 'transferOwner',
    params: {new_owner: newOwner},
    value: locklift.utils.convertCrystal(1, 'nano'),
    keyPair: keyPair
  });
  displayTx(tx);
  console.log(`Transfer for DexVault: ${dexVault.address}`);
  tx = await account.runTarget({
    contract: dexVault,
    method: 'transferOwner',
    params: {new_owner: newOwner},
    value: locklift.utils.convertCrystal(1, 'nano'),
    keyPair: keyPair
  });
  displayTx(tx);

  console.log(`Transfer for TokenFactory: ${tokenFactory.address}`);
  await account.runTarget({
    contract: tokenFactory,
    method: 'transferOwner',
    params: {newOwner: newOwner, answerId: '0'},
    value: locklift.utils.convertCrystal(1, 'nano'),
    keyPair: keyPair
  });
  displayTx(tx);

  console.log('='.repeat(64));
  for (const alias in migration.migration_log) {
    console.log(`${alias}: ${migration.migration_log[alias].address}`);
  }
  console.log('='.repeat(64));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
