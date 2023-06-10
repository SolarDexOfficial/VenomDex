const {expect} = require('chai');
const logger = require('mocha-logger');
const {Migration, afterRun, Constants} = require(process.cwd() + '/scripts/utils')

const migration = new Migration();

let DexRoot;
let DexVault;
let DexPlatform;
let TokenFactory;
let DexVaultLpTokenPending;
let NewDexVault;

let account;
let dexRoot;
let dexVault;
let tokenFactory;

let oldVaultData = {};
let newVaultData = {};

const loadVaultData = async (vault) => {
  const data = {};
  data.platform_code = await vault.call({method: 'platform_code', params: {}});
  data.lp_token_pending_code = await vault.call({method: 'getLpTokenPendingCode', params: {}});
  data.root = await vault.call({method: 'getRoot', params: {}});
  data.owner = await vault.call({method: 'getOwner', params: {}});
  data.pending_owner = await vault.call({method: 'getPendingOwner', params: {}});
  data.token_factory = await vault.call({method: 'getTokenFactory', params: {}});
  data.lpVaultWallets = await vault.call({method: '_lpVaultWallets'});
  const referralProgramParams = await vault.call({method: 'getReferralProgramParams', params: {}});
  data.projectId = referralProgramParams.value0.toString();
  data.projectAddress = referralProgramParams.value1;
  return data;
}

describe('Test Dex Vault contract upgrade', async function () {
  this.timeout(Constants.TESTS_TIMEOUT);
  before('Load contracts', async function () {
    account = migration.load(await locklift.factory.getAccount('Wallet'), 'Account1');
    account.afterRun = afterRun;
    DexRoot = await locklift.factory.getContract('DexRoot');
    DexVault = await locklift.factory.getContract('DexVault');
    DexPlatform = await locklift.factory.getContract('DexPlatform', 'precompiled');
    TokenFactory = await locklift.factory.getContract('TokenFactory');

    DexVaultLpTokenPending = await locklift.factory.getContract('DexVaultLpTokenPending');
    NewDexVault = await locklift.factory.getContract('TestNewDexVault');
    dexRoot = migration.load(DexRoot, 'DexRoot');
    dexVault = migration.load(DexVault, 'DexVault');
    tokenFactory = migration.load(TokenFactory, 'TokenFactory');

    const [keyPair] = await locklift.keys.getKeyPairs();
    oldVaultData = await loadVaultData(dexVault);
    logger.log(`Upgrading DexVault contract: ${dexVault.address}`);
    await account.runTarget({
      contract: dexVault,
      method: 'upgrade',
      params: {
        code: NewDexVault.code
      },
      value: locklift.utils.convertCrystal(6, 'nano'),
      keyPair
    });
    NewDexVault.setAddress(dexVault.address);
    newVaultData = await loadVaultData(NewDexVault);
  })
  describe('Check DexVault after upgrade', async function () {
    it('Check New Function', async function () {
      expect((await NewDexVault.call({method: 'newFunc', params: {}})).toString())
        .to
        .equal("New Vault", 'DexVault new function incorrect');
    });
    it('Check All data correct installed in new contract', async function () {
      expect(newVaultData.platform_code)
        .to
        .equal(oldVaultData.platform_code, 'New platform_code value incorrect');
      expect(newVaultData.lp_token_pending_code)
        .to
        .equal(oldVaultData.lp_token_pending_code, 'New lp_token_pending_code value incorrect');
      expect(newVaultData.root)
        .to
        .equal(oldVaultData.root, 'New root value incorrect');
      expect(newVaultData.owner)
        .to
        .equal(oldVaultData.owner, 'New owner value incorrect');
      expect(newVaultData.pending_owner)
        .to
        .equal(oldVaultData.pending_owner, 'New pending_owner value incorrect');
      expect(newVaultData.token_factory)
        .to
        .equal(oldVaultData.token_factory, 'New token_factory value incorrect');

      expect(JSON.stringify(newVaultData.lpVaultWallets))
          .to
          .equal(JSON.stringify(oldVaultData.lpVaultWallets), 'New lpVaultWallets value incorrect');

      expect(newVaultData.projectId)
          .to
          .equal(oldVaultData.projectId, 'New projectId value incorrect');

      expect(newVaultData.projectAddress)
          .to
          .equal(oldVaultData.projectAddress, 'New projectAddress value incorrect');
    });
  });
});
