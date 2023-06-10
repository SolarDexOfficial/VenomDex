const {afterRun, displayTx} = require(process.cwd() + '/scripts/utils')
const fs = require('fs');

let dexAccounts;
let dexOwner;


const DEX_ROOT_ADDRESS = '0:943bad2e74894aa28ae8ddbe673be09a0f3818fd170d12b4ea8ef1ea8051e940';
const DEX_OWNER_ADDRESS = '';
const DEX_OWNER_WALLET_TYPE = 'SafeMultisigWallet';
/*{
    public: '',
    secret: ''
};*/

const NewCodeContract = 'DexAccountV2';

const data = fs.readFileSync('./dex_accounts.json', 'utf8');
if (data) dexAccounts = JSON.parse(data);

async function main() {
  const keyPairs = await locklift.keys.getKeyPairs();
  const DEX_OWNER_KEYS = keyPairs[0];

  const dexRoot = await locklift.factory.getContract('DexRoot');
  dexRoot.setAddress(DEX_ROOT_ADDRESS);


  let dexOwner;
  if (DEX_OWNER_WALLET_TYPE === 'SafeMultisigWallet'){
      dexOwner = await locklift.factory.getAccount('SafeMultisigWallet', 'safemultisig');
  } else {
      dexOwner = await locklift.factory.getAccount(DEX_OWNER_WALLET_TYPE);
  }
  dexOwner.setAddress(DEX_OWNER_ADDRESS);
  dexOwner.afterRun = afterRun;

  if (NewCodeContract) {
      const NextVersionContract = await locklift.factory.getContract(NewCodeContract);
      console.log(`Installing new DexAccount contract in DexRoot: ${dexRoot.address}`);
      const startVersion = await dexRoot.call({method: 'getAccountVersion', params: {}});
      console.log(`Start version = ${startVersion}`);

      await dexOwner.runTarget({
          contract: dexRoot,
          method: 'installOrUpdateAccountCode',
          params: {code: NextVersionContract.code},
          value: locklift.utils.convertCrystal(5, 'nano'),
          keyPair: DEX_OWNER_KEYS
      });

      await new Promise(resolve => setTimeout(resolve, 120000));

      const endVersion = await dexRoot.call({method: 'getAccountVersion', params: {}});
      console.log(`End version = ${endVersion}`);
  }

  console.log(`Start force upgrade DexAccounts. Count = ${dexAccounts.length}`);

  for(let indx in dexAccounts) {
      const accountData = dexAccounts[indx];
      console.log(`${1 + (+indx)}/${dexAccounts.length}: Upgrading DexAccount(${accountData.dexAccount}). owner = ${accountData.owner}`);
      const tx = await dexOwner.runTarget({
          contract: dexRoot,
          method: 'forceUpgradeAccount',
          params: {
              account_owner: accountData.owner,
              send_gas_to: dexOwner.address
          },
          value: locklift.utils.convertCrystal(6, 'nano'),
          keyPair: DEX_OWNER_KEYS
      });
      displayTx(tx);
      console.log(``);
  }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

