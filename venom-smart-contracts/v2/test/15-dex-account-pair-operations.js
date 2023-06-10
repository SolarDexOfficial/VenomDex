const {expect} = require('chai');
const {
    Migration,
    afterRun,
    Constants,
    getRandomNonce,
    TOKEN_CONTRACTS_PATH,
    displayTx,
    expectedDepositLiquidity,
    logExpectedDeposit
} = require(process.cwd() + '/scripts/utils');
const BigNumber = require('bignumber.js');
BigNumber.config({EXPONENTIAL_AT: 257});
const logger = require('mocha-logger');
const { Command } = require('commander');
const program = new Command();

let tx;

const migration = new Migration();

program
    .allowUnknownOption()
    .option('-pcn, --pair_contract_name <pair_contract_name>', 'DexPair contract name')
    .option('-acn, --account_contract_name <account_contract_name>', 'DexAccount contract name');

program.parse(process.argv);

const options = program.opts();

options.pair_contract_name = options.pair_contract_name || 'DexPair';
options.account_contract_name = options.account_contract_name || 'DexAccount';

let DexRoot;
let DexPairFooBar;
let FooRoot;
let BarRoot;
let FooBarLpRoot;
let Account2;
let DexAccount2;
let FooBarLpWallet2;
let BarWallet2;
let FooWallet2;

let IS_FOO_LEFT;

let keyPairs;

async function dexAccountBalances(account) {
    const foo = new BigNumber((await account.call({
        method: 'getWalletData', params: {
            token_root: FooRoot.address
        }
    })).balance).shiftedBy(-Constants.tokens.foo.decimals).toString();
    const bar = new BigNumber((await account.call({
        method: 'getWalletData', params: {
            token_root: BarRoot.address
        }
    })).balance).shiftedBy(-Constants.tokens.bar.decimals).toString();
    const lp = new BigNumber((await account.call({
        method: 'getWalletData', params: {
            token_root: FooBarLpRoot.address
        }
    })).balance).shiftedBy(-Constants.LP_DECIMALS).toString();

    let walletFoo = '0';
    await FooWallet2.call({method: 'balance', params: {}}).then(n => {
        walletFoo = new BigNumber(n).shiftedBy(-Constants.tokens.foo.decimals).toString();
    }).catch(e => {/*ignored*/});
    let walletBar = '0';
    await BarWallet2.call({method: 'balance', params: {}}).then(n => {
        walletBar = new BigNumber(n).shiftedBy(-Constants.tokens.bar.decimals).toString();
    }).catch(e => {/*ignored*/});
    let walletLp = '0';
    await FooBarLpWallet2.call({method: 'balance', params: {}}).then(n => {
        walletLp = new BigNumber(n).shiftedBy(-Constants.LP_DECIMALS).toString();
    }).catch(e => {/*ignored*/});

    return {foo, bar, lp, walletFoo, walletBar, walletLp};
}

async function dexPairInfo() {
    const balances = await DexPairFooBar.call({method: 'getBalances', params: {}});
    const total_supply = await FooBarLpRoot.call({method: 'totalSupply', params: {}});
    let foo, bar;
    if (IS_FOO_LEFT) {
        foo = new BigNumber(balances.left_balance).shiftedBy(-Constants.tokens.foo.decimals).toString();
        bar = new BigNumber(balances.right_balance).shiftedBy(-Constants.tokens.bar.decimals).toString();
    } else {
        foo = new BigNumber(balances.right_balance).shiftedBy(-Constants.tokens.foo.decimals).toString();
        bar = new BigNumber(balances.left_balance).shiftedBy(-Constants.tokens.bar.decimals).toString();
    }

    return {
        foo: foo,
        bar: bar,
        lp_supply: new BigNumber(balances.lp_supply).shiftedBy(-Constants.LP_DECIMALS).toString(),
        lp_supply_actual: new BigNumber(total_supply).shiftedBy(-Constants.LP_DECIMALS).toString()
    };
}

describe(`DexAccount interact with ${options.pair_contract_name}`, async function () {
    this.timeout(Constants.TESTS_TIMEOUT);
    before('Load contracts', async function () {
        keyPairs = await locklift.keys.getKeyPairs();

        DexRoot = await locklift.factory.getContract('DexRoot');
        DexPairFooBar = await locklift.factory.getContract(options.pair_contract_name);
        FooRoot = await locklift.factory.getContract('TokenRootUpgradeable', TOKEN_CONTRACTS_PATH);
        BarRoot = await locklift.factory.getContract('TokenRootUpgradeable', TOKEN_CONTRACTS_PATH);
        FooBarLpRoot = await locklift.factory.getContract('TokenRootUpgradeable', TOKEN_CONTRACTS_PATH);
        Account2 = await locklift.factory.getAccount('Wallet');
        DexAccount2 = await locklift.factory.getContract(options.account_contract_name);
        FooBarLpWallet2 = await locklift.factory.getContract('TokenWalletUpgradeable', TOKEN_CONTRACTS_PATH);
        FooWallet2 = await locklift.factory.getContract('TokenWalletUpgradeable', TOKEN_CONTRACTS_PATH);
        BarWallet2 = await locklift.factory.getContract('TokenWalletUpgradeable', TOKEN_CONTRACTS_PATH);

        migration.load(DexRoot, 'DexRoot');
        migration.load(DexPairFooBar, 'DexPoolFooBar');
        migration.load(FooRoot, 'FooRoot');
        migration.load(BarRoot, 'BarRoot');
        migration.load(FooBarLpRoot, 'FooBarLpRoot');
        migration.load(Account2, 'Account2');
        migration.load(DexAccount2, 'DexAccount2');

        Account2.afterRun = afterRun;

        const pairRoots = await DexPairFooBar.call({method: 'getTokenRoots', params: {}});
        IS_FOO_LEFT = pairRoots.left === FooRoot.address;

        if (migration.exists('FooBarLpWallet2')) {
            migration.load(FooBarLpWallet2, 'FooBarLpWallet2');
            logger.log(`FooBarLpWallet#2: ${FooBarLpWallet2.address}`);
        } else {
            const expected = await FooBarLpRoot.call({
                method: 'walletOf',
                params: {
                    walletOwner: Account2.address
                }
            });
            FooBarLpWallet2.setAddress(expected);
            migration.store(FooBarLpWallet2, 'FooBarLpWallet2');
            logger.log(`FooBarLpWallet#2: ${expected} (not deployed)`);
        }

        if (migration.exists('BarWallet2')) {
            migration.load(BarWallet2, 'BarWallet2');
            logger.log(`BarWallet#2: ${BarWallet2.address}`);
        } else {
            const expected = await BarRoot.call({
                method: 'walletOf',
                params: {
                   walletOwner: Account2.address
                }
            });
            BarWallet2.setAddress(expected);
            migration.store(BarWallet2, 'BarWallet2');
            logger.log(`BarWallet#2: ${expected} (not deployed)`);
        }

        if (migration.exists('FooWallet2')) {
            migration.load(FooWallet2, 'FooWallet2');
            logger.log(`BarWallet#2: ${FooWallet2.address}`);
        } else {
            const expected = await FooRoot.call({
                method: 'walletOf', params: {
                    walletOwner: Account2.address
                }
            });
            FooWallet2.setAddress(expected);
            migration.store(FooWallet2, 'FooWallet2');
            logger.log(`FooWallet#2: ${expected} (not deployed)`);
        }

        logger.log('DexRoot: ' + DexRoot.address);
        logger.log('DexPairFooBar: ' + DexPairFooBar.address);
        logger.log('FooRoot: ' + FooRoot.address);
        logger.log('BarRoot: ' + BarRoot.address);
        logger.log('FooBarLpRoot: ' + FooBarLpRoot.address);
        logger.log('Account#2: ' + Account2.address);
        logger.log('DexAccount#2: ' + DexAccount2.address);

        await migration.balancesCheckpoint();
    });

    describe('Deposits', async function () {

        it('0001 # Add initial liquidity to Foo/Bar', async function () {
            logger.log('#################################################');
            logger.log('# Add initial liquidity to Foo/Bar');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ` +
                `${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR, ${dexAccount2Start.lp} LP`);
            logger.log(`DexPair start: ` +
                `${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoStart.lp_supply || "0"} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoStart.lp_supply_actual|| "0"} LP`);

            if (dexPairInfoStart.lp_supply === '0') {
                const FOO_DEPOSIT = 5000;
                const BAR_DEPOSIT = 6000;

                const LEFT_AMOUNT = IS_FOO_LEFT ?
                    new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString() :
                    new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString();

                const RIGHT_AMOUNT = IS_FOO_LEFT ?
                    new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString() :
                    new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString();

                let LP_REWARD = await expectedDepositLiquidity(
                    DexPairFooBar.address,
                    options.pair_contract_name,
                    IS_FOO_LEFT ? [Constants.tokens.foo, Constants.tokens.bar] : [Constants.tokens.bar, Constants.tokens.foo],
                    [LEFT_AMOUNT, RIGHT_AMOUNT],
                    false
                );

                tx = await Account2.runTarget({
                    contract: DexAccount2,
                    method: 'depositLiquidity',
                    params: {
                        call_id: getRandomNonce(),
                        left_root: IS_FOO_LEFT ? FooRoot.address : BarRoot.address,
                        left_amount: LEFT_AMOUNT,
                        right_root: IS_FOO_LEFT ? BarRoot.address : FooRoot.address,
                        right_amount: RIGHT_AMOUNT,
                        expected_lp_root: FooBarLpRoot.address,
                        auto_change: false,
                        send_gas_to: Account2.address
                    },
                    value: locklift.utils.convertCrystal('1.1', 'nano'),
                    keyPair: keyPairs[1]
                });

                displayTx(tx);

                const dexAccount2End = await dexAccountBalances(DexAccount2);
                const dexPairInfoEnd = await dexPairInfo();

                logger.log(`DexAccount#2 balance end: ` +
                    `${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR, ${dexAccount2End.lp} LP, ${dexAccount2End.walletLp} LP (wallet)`);
                logger.log(`DexPair end: ` +
                    `${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR, ` +
                    `LP SUPPLY (PLAN): ${dexPairInfoEnd.lp_supply || "0"} LP, ` +
                    `LP SUPPLY (ACTUAL): ${dexPairInfoEnd.lp_supply_actual || "0"} LP`);

                await migration.logGas();

                let expectedAccount2Foo = new BigNumber(dexAccount2Start.foo).minus(FOO_DEPOSIT).toString();
                let expectedAccount2Bar = new BigNumber(dexAccount2Start.bar).minus(BAR_DEPOSIT).toString();

                let expectedDexAccount2Lp = new BigNumber(dexAccount2Start.lp).toString();
                let expectedAccount2Lp = new BigNumber(dexAccount2Start.walletLp).plus(LP_REWARD).toString();

                const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(FOO_DEPOSIT).toString();
                const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(BAR_DEPOSIT).toString();
                const expectedPairLp = new BigNumber(dexPairInfoStart.lp_supply).plus(LP_REWARD).toString();

                expect(dexPairInfoEnd.lp_supply_actual).to.equal(dexPairInfoEnd.lp_supply, 'Wrong LP supply');
                expect(expectedAccount2Foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO');
                expect(expectedAccount2Bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR');
                expect(expectedDexAccount2Lp).to.equal(dexAccount2End.lp, 'Wrong DexAccount#2 LP');
                expect(expectedAccount2Lp).to.equal(dexAccount2End.walletLp, 'Wrong Account#2 LP');
                expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo, 'Wrong DexPair FOO');
                expect(expectedPairBar).to.equal(dexPairInfoEnd.bar, 'Wrong DexPair BAR');
                expect(expectedPairLp).to.equal(dexPairInfoEnd.lp_supply, 'Wrong DexPair LP supply');

            } else {
                logger.log(`TEST SKIPPED`);
            }
        });

        it('0002 # Add FOO liquidity (auto_change=true)', async function () {
            logger.log('#################################################');
            logger.log('# Add FOO liquidity (auto_change=true)');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ` +
                `${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR, ${dexAccount2Start.lp} LP, ${dexAccount2Start.walletLp} LP (wallet)`);
            logger.log(`DexPair start: ` +
                `${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoStart.lp_supply} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoStart.lp_supply_actual} LP`);

            const FOO_DEPOSIT = 1000;
            const BAR_DEPOSIT = 0;

            const LEFT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString() :
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString();

            const RIGHT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString() :
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString();

            let LP_REWARD = await expectedDepositLiquidity(
                DexPairFooBar.address,
                options.pair_contract_name,
                IS_FOO_LEFT ? [Constants.tokens.foo, Constants.tokens.bar] : [Constants.tokens.bar, Constants.tokens.foo],
                [LEFT_AMOUNT, RIGHT_AMOUNT],
                true
            );

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'depositLiquidity',
                params: {
                    call_id: getRandomNonce(),
                    left_root: IS_FOO_LEFT ? FooRoot.address : BarRoot.address,
                    left_amount: LEFT_AMOUNT,
                    right_root: IS_FOO_LEFT ? BarRoot.address : FooRoot.address,
                    right_amount: RIGHT_AMOUNT,
                    expected_lp_root: FooBarLpRoot.address,
                    auto_change: true,
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ` +
                `${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR, ${dexAccount2End.lp} LP, ${dexAccount2End.walletLp} LP (wallet)`);
            logger.log(`DexPair end: ` +
                `${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoEnd.lp_supply || "0"} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoEnd.lp_supply_actual || "0"} LP`);

            await migration.logGas();

            const expectedAccount2Foo = new BigNumber(dexAccount2Start.foo).minus(FOO_DEPOSIT).toString();
            const expectedAccount2Bar = new BigNumber(dexAccount2Start.bar).minus(BAR_DEPOSIT).toString();

            let expectedDexAccount2Lp = new BigNumber(dexAccount2Start.lp).toString();
            let expectedAccount2Lp = new BigNumber(dexAccount2Start.walletLp).plus(LP_REWARD).toString();

            const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(FOO_DEPOSIT).toString();
            const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(BAR_DEPOSIT).toString();
            const expectedPairLp = new BigNumber(dexPairInfoStart.lp_supply).plus(LP_REWARD).toString();

            expect(dexPairInfoEnd.lp_supply_actual).to.equal(dexPairInfoEnd.lp_supply, 'Wrong LP supply');
            expect(expectedAccount2Foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO');
            expect(expectedAccount2Bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR');
            expect(expectedDexAccount2Lp).to.equal(dexAccount2End.lp, 'Wrong DexAccount#2 LP');
            expect(expectedAccount2Lp).to.equal(dexAccount2End.walletLp, 'Wrong Account#2 LP');
            expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo, 'Wrong DexPair FOO');
            expect(expectedPairBar).to.equal(dexPairInfoEnd.bar, 'Wrong DexPair BAR');
            expect(expectedPairLp).to.equal(dexPairInfoEnd.lp_supply, 'Wrong DexPair LP supply');
        });

        it('0003 # Add BAR liquidity (auto_change=true)', async function () {
            logger.log('#################################################');
            logger.log('# Add BAR liquidity (auto_change=true)');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ` +
                `${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR, ${dexAccount2Start.lp} LP`);
            logger.log(`DexPair start: ` +
                `${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoStart.lp_supply} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoStart.lp_supply_actual} LP`);

            const FOO_DEPOSIT = 0;
            const BAR_DEPOSIT = 1000;

            const LEFT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString() :
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString();

            const RIGHT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString() :
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString();

            let LP_REWARD = await expectedDepositLiquidity(
                DexPairFooBar.address,
                options.pair_contract_name,
                IS_FOO_LEFT ? [Constants.tokens.foo, Constants.tokens.bar] : [Constants.tokens.bar, Constants.tokens.foo],
                [LEFT_AMOUNT, RIGHT_AMOUNT],
                true
            );

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'depositLiquidity',
                params: {
                    call_id: getRandomNonce(),
                    left_root: IS_FOO_LEFT ? FooRoot.address : BarRoot.address,
                    left_amount: LEFT_AMOUNT,
                    right_root: IS_FOO_LEFT ? BarRoot.address : FooRoot.address,
                    right_amount: RIGHT_AMOUNT,
                    expected_lp_root: FooBarLpRoot.address,
                    auto_change: true,
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ` +
                `${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR, ${dexAccount2End.lp} LP, ${dexAccount2End.walletLp} LP (wallet)`);
            logger.log(`DexPair end: ` +
                `${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoEnd.lp_supply || "0"} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoEnd.lp_supply_actual || "0"} LP`);

            await migration.logGas();

            const expectedAccount2Foo = new BigNumber(dexAccount2Start.foo).minus(FOO_DEPOSIT).toString();
            const expectedAccount2Bar = new BigNumber(dexAccount2Start.bar).minus(BAR_DEPOSIT).toString();

            let expectedDexAccount2Lp = new BigNumber(dexAccount2Start.lp).toString();
            let expectedAccount2Lp = new BigNumber(dexAccount2Start.walletLp).plus(LP_REWARD).toString();

            const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(FOO_DEPOSIT).toString();
            const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(BAR_DEPOSIT).toString();
            const expectedPairLp = new BigNumber(dexPairInfoStart.lp_supply).plus(LP_REWARD).toString();

            expect(dexPairInfoEnd.lp_supply_actual).to.equal(dexPairInfoEnd.lp_supply, 'Wrong LP supply');
            expect(expectedAccount2Foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO');
            expect(expectedAccount2Bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR');
            expect(expectedDexAccount2Lp).to.equal(dexAccount2End.lp, 'Wrong DexAccount#2 LP');
            expect(expectedAccount2Lp).to.equal(dexAccount2End.walletLp, 'Wrong Account#2 LP');
            expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo, 'Wrong DexPair FOO');
            expect(expectedPairBar).to.equal(dexPairInfoEnd.bar, 'Wrong DexPair BAR');
            expect(expectedPairLp).to.equal(dexPairInfoEnd.lp_supply, 'Wrong DexPair LP supply');
        });

        it('0004 # Add FOO+BAR liquidity (auto_change=true)', async function () {
            logger.log('#################################################');
            logger.log('# Add FOO+BAR liquidity (auto_change=true)');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ` +
                `${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR, ${dexAccount2Start.lp} LP`);
            logger.log(`DexPair start: ` +
                `${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoStart.lp_supply} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoStart.lp_supply_actual} LP`);

            const FOO_DEPOSIT = 500;
            const BAR_DEPOSIT = 200;

            const LEFT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString() :
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString();

            const RIGHT_AMOUNT = IS_FOO_LEFT ?
                new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString() :
                new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString();

            let LP_REWARD = await expectedDepositLiquidity(
                DexPairFooBar.address,
                options.pair_contract_name,
                IS_FOO_LEFT ? [Constants.tokens.foo, Constants.tokens.bar] : [Constants.tokens.bar, Constants.tokens.foo],
                [LEFT_AMOUNT, RIGHT_AMOUNT],
                true
            );

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'depositLiquidity',
                params: {
                    call_id: getRandomNonce(),
                    left_root: IS_FOO_LEFT ? FooRoot.address : BarRoot.address,
                    left_amount: LEFT_AMOUNT,
                    right_root: IS_FOO_LEFT ? BarRoot.address : FooRoot.address,
                    right_amount: RIGHT_AMOUNT,
                    expected_lp_root: FooBarLpRoot.address,
                    auto_change: true,
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ` +
                `${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR, ${dexAccount2End.lp} LP, ${dexAccount2End.walletLp} LP (wallet)`);
            logger.log(`DexPair end: ` +
                `${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR, ` +
                `LP SUPPLY (PLAN): ${dexPairInfoEnd.lp_supply || "0"} LP, ` +
                `LP SUPPLY (ACTUAL): ${dexPairInfoEnd.lp_supply_actual || "0"} LP`);

            await migration.logGas();

            const expectedAccount2Foo = new BigNumber(dexAccount2Start.foo).minus(FOO_DEPOSIT).toString();
            const expectedAccount2Bar = new BigNumber(dexAccount2Start.bar).minus(BAR_DEPOSIT).toString();

            let expectedDexAccount2Lp = new BigNumber(dexAccount2Start.lp).toString();
            let expectedAccount2Lp = new BigNumber(dexAccount2Start.walletLp).plus(LP_REWARD).toString();

            const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(FOO_DEPOSIT).toString();
            const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(BAR_DEPOSIT).toString();
            const expectedPairLp = new BigNumber(dexPairInfoStart.lp_supply).plus(LP_REWARD).toString();

            expect(dexPairInfoEnd.lp_supply_actual).to.equal(dexPairInfoEnd.lp_supply, 'Wrong LP supply');
            expect(expectedAccount2Foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO');
            expect(expectedAccount2Bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR');
            expect(expectedDexAccount2Lp).to.equal(dexAccount2End.lp, 'Wrong DexAccount#2 LP');
            expect(expectedAccount2Lp).to.equal(dexAccount2End.walletLp, 'Wrong Account#2 LP');
            expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo, 'Wrong DexPair FOO');
            expect(expectedPairBar).to.equal(dexPairInfoEnd.bar, 'Wrong DexPair BAR');
            expect(expectedPairLp).to.equal(dexPairInfoEnd.lp_supply, 'Wrong DexPair LP supply');
        });

        if (options.pair_contract_name !== 'DexStablePair') {
            it('0005 # Add FOO+BAR liquidity (auto_change=false), surplus BAR must returns', async function () {
                logger.log('#################################################');
                logger.log('# Add FOO+BAR liquidity (auto_change=false), surplus BAR must returns');
                const dexAccount2Start = await dexAccountBalances(DexAccount2);
                const dexPairInfoStart = await dexPairInfo();

                logger.log(`DexAccount#2 balance start: ` +
                    `${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR, ${dexAccount2Start.lp} LP`);
                logger.log(`DexPair start: ` +
                    `${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR, ` +
                    `LP SUPPLY (PLAN): ${dexPairInfoStart.lp_supply} LP, ` +
                    `LP SUPPLY (ACTUAL): ${dexPairInfoStart.lp_supply_actual} LP`);

                const FOO_DEPOSIT = 100;
                const BAR_DEPOSIT = 1000;

                const LEFT_AMOUNT = IS_FOO_LEFT ?
                    new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString() :
                    new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString();

                const RIGHT_AMOUNT = IS_FOO_LEFT ?
                    new BigNumber(BAR_DEPOSIT).shiftedBy(Constants.tokens.bar.decimals).toString() :
                    new BigNumber(FOO_DEPOSIT).shiftedBy(Constants.tokens.foo.decimals).toString();

                const expected = await DexPairFooBar.call({
                    method: 'expectedDepositLiquidity',
                    params: {
                        left_amount: LEFT_AMOUNT,
                        right_amount: RIGHT_AMOUNT,
                        auto_change: false
                    }
                });

                const LP_REWARD = new BigNumber(expected.step_1_lp_reward)
                    .plus(expected.step_3_lp_reward).shiftedBy(-9).toString();
                const BAR_BACK_AMOUNT = new BigNumber(BAR_DEPOSIT)
                    .minus(new BigNumber(IS_FOO_LEFT ? expected.step_1_right_deposit : expected.step_1_left_deposit)
                        .shiftedBy(-Constants.tokens.bar.decimals));

                logExpectedDeposit(
                    expected,
                    IS_FOO_LEFT ? [Constants.tokens.foo, Constants.tokens.bar] : [Constants.tokens.bar, Constants.tokens.foo]
                );

                tx = await Account2.runTarget({
                    contract: DexAccount2,
                    method: 'depositLiquidity',
                    params: {
                        call_id: getRandomNonce(),
                        left_root: IS_FOO_LEFT ? FooRoot.address : BarRoot.address,
                        left_amount: LEFT_AMOUNT,
                        right_root: IS_FOO_LEFT ? BarRoot.address : FooRoot.address,
                        right_amount: RIGHT_AMOUNT,
                        expected_lp_root: FooBarLpRoot.address,
                        auto_change: false,
                        send_gas_to: Account2.address
                    },
                    value: locklift.utils.convertCrystal('1.1', 'nano'),
                    keyPair: keyPairs[1]
                });

                displayTx(tx);

                const dexAccount2End = await dexAccountBalances(DexAccount2);
                const dexPairInfoEnd = await dexPairInfo();

                logger.log(`DexAccount#2 balance end: ` +
                    `${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR, ${dexAccount2End.lp} LP, ${dexAccount2End.walletLp} LP (wallet)`);
                logger.log(`DexPair end: ` +
                    `${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR, ` +
                    `LP SUPPLY (PLAN): ${dexPairInfoEnd.lp_supply || "0"} LP, ` +
                    `LP SUPPLY (ACTUAL): ${dexPairInfoEnd.lp_supply_actual || "0"} LP`);

                await migration.logGas();

                const expectedAccount2Foo = new BigNumber(dexAccount2Start.foo).minus(FOO_DEPOSIT).toString();
                const expectedAccount2Bar = new BigNumber(dexAccount2Start.bar).minus(BAR_DEPOSIT).plus(BAR_BACK_AMOUNT).toString();

                let expectedDexAccount2Lp = new BigNumber(dexAccount2Start.lp).toString();
                let expectedAccount2Lp = new BigNumber(dexAccount2Start.walletLp).plus(LP_REWARD).toString();

                const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(FOO_DEPOSIT).toString();
                const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(BAR_DEPOSIT).minus(BAR_BACK_AMOUNT).toString();
                const expectedPairLp = new BigNumber(dexPairInfoStart.lp_supply).plus(LP_REWARD).toString();

                expect(dexPairInfoEnd.lp_supply_actual).to.equal(dexPairInfoEnd.lp_supply, 'Wrong LP supply');
                expect(expectedAccount2Foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO');
                expect(expectedAccount2Bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR');
                expect(expectedDexAccount2Lp).to.equal(dexAccount2End.lp, 'Wrong DexAccount#2 LP');
                expect(expectedAccount2Lp).to.equal(dexAccount2End.walletLp, 'Wrong Account#2 LP');
                expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo, 'Wrong DexPair FOO');
                expect(expectedPairBar).to.equal(dexPairInfoEnd.bar, 'Wrong DexPair BAR');
                expect(expectedPairLp).to.equal(dexPairInfoEnd.lp_supply, 'Wrong DexPair LP supply');
            });
        }
    });

    describe('Exchanges', async function () {

        it('0006 # DexAccount#2 exchange FOO to BAR', async function () {
            logger.log('#################################################');
            logger.log('# DexAccount#2 exchange FOO to BAR');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR`);
            logger.log(`DexPair start: ${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR`);

            const TOKENS_TO_EXCHANGE = 100;

            const expected = await DexPairFooBar.call({
                method: 'expectedExchange', params: {
                    amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.foo.decimals).toString(),
                    spent_token_root: FooRoot.address
                }
            });

            logger.log(`Spent amount: ${TOKENS_TO_EXCHANGE} FOO`);
            logger.log(`Expected fee: ${new BigNumber(expected.expected_fee).shiftedBy(-Constants.tokens.foo.decimals).toString()} FOO`);
            logger.log(`Expected receive amount: ${new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.bar.decimals).toString()} BAR`);

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'exchange',
                params: {
                    call_id: getRandomNonce(),
                    spent_amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.foo.decimals).toString(),
                    spent_token_root: FooRoot.address,
                    receive_token_root: BarRoot.address,
                    expected_amount: expected.expected_amount,
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR`);
            logger.log(`DexPair end: ${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR`);

            await migration.logGas();

            const expectedPairFoo = new BigNumber(dexPairInfoStart.foo).plus(TOKENS_TO_EXCHANGE).toString();
            const expectedPairBar = new BigNumber(dexPairInfoStart.bar)
                .minus(new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.bar.decimals)).toString();
            const expectedDexAccountFoo = new BigNumber(dexAccount2Start.foo).minus(TOKENS_TO_EXCHANGE).toString();
            const expectedDexAccountBar = new BigNumber(dexAccount2Start.bar)
                .plus(new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.bar.decimals)).toString();

            expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo.toString(), 'Wrong DEX FOO balance');
            expect(expectedPairBar).to.equal(dexPairInfoEnd.bar.toString(), 'Wrong DEX BAR balance');
            expect(expectedDexAccountFoo).to.equal(dexAccount2End.foo.toString(), 'Wrong DexAccount#2 FOO balance');
            expect(expectedDexAccountBar).to.equal(dexAccount2End.bar.toString(), 'Wrong DexAccount#2 BAR balance');
        });

        it('0007 # DexAccount#2 exchange BAR to FOO', async function () {
            logger.log('#################################################');
            logger.log('# DexAccount#2 exchange BAR to FOO');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR`);
            logger.log(`DexPair start: ${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR`);

            const TOKENS_TO_EXCHANGE = 100;

            const expected = await DexPairFooBar.call({
                method: 'expectedExchange', params: {
                    amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.bar.decimals).toString(),
                    spent_token_root: BarRoot.address
                }
            });

            logger.log(`Spent amount: ${TOKENS_TO_EXCHANGE} BAR`);
            logger.log(`Expected fee: ${new BigNumber(expected.expected_fee).shiftedBy(-Constants.tokens.bar.decimals).toString()} BAR`);
            logger.log(`Expected receive amount: ${new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.foo.decimals).toString()} FOO`);

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'exchange',
                params: {
                    call_id: getRandomNonce(),
                    spent_amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.bar.decimals).toString(),
                    spent_token_root: BarRoot.address,
                    receive_token_root: FooRoot.address,
                    expected_amount: 0,
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR`);
            logger.log(`DexPair end: ${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR`);

            await migration.logGas();

            const expectedPairFoo = new BigNumber(dexPairInfoStart.foo)
                .minus(new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.foo.decimals)).toString();
            const expectedPairBar = new BigNumber(dexPairInfoStart.bar).plus(TOKENS_TO_EXCHANGE).toString();
            const expectedDexAccountFoo = new BigNumber(dexAccount2Start.foo)
                .plus(new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.foo.decimals)).toString();
            const expectedDexAccountBar = new BigNumber(dexAccount2Start.bar).minus(TOKENS_TO_EXCHANGE).toString();

            expect(expectedPairFoo).to.equal(dexPairInfoEnd.foo.toString(), 'Wrong DEX FOO balance');
            expect(expectedPairBar).to.equal(dexPairInfoEnd.bar.toString(), 'Wrong DEX BAR balance');
            expect(expectedDexAccountFoo).to.equal(dexAccount2End.foo.toString(), 'Wrong DexAccount#2 FOO balance');
            expect(expectedDexAccountBar).to.equal(dexAccount2End.bar.toString(), 'Wrong DexAccount#2 BAR balance');
        });

        it('0008 # DexAccount#2 exchange FOO to BAR (wrong rate)', async function () {
            logger.log('#################################################');
            logger.log('# DexAccount#2 exchange FOO to BAR (wrong rate)');
            const dexAccount2Start = await dexAccountBalances(DexAccount2);
            const dexPairInfoStart = await dexPairInfo();

            logger.log(`DexAccount#2 balance start: ${dexAccount2Start.foo} FOO, ${dexAccount2Start.bar} BAR`);
            logger.log(`DexPair start: ${dexPairInfoStart.foo} FOO, ${dexPairInfoStart.bar} BAR`);

            const TOKENS_TO_EXCHANGE = 100;

            const expected = await DexPairFooBar.call({
                method: 'expectedExchange', params: {
                    amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.foo.decimals).toString(),
                    spent_token_root: FooRoot.address
                }
            });

            logger.log(`Spent amount: ${TOKENS_TO_EXCHANGE} FOO`);
            logger.log(`Expected fee: ${new BigNumber(expected.expected_fee).shiftedBy(-Constants.tokens.foo.decimals).toString()} FOO`);
            logger.log(`Expected receive amount: ${new BigNumber(expected.expected_amount).shiftedBy(-Constants.tokens.bar.decimals).toString()} BAR`);

            tx = await Account2.runTarget({
                contract: DexAccount2,
                method: 'exchange',
                params: {
                    call_id: getRandomNonce(),
                    spent_amount: new BigNumber(TOKENS_TO_EXCHANGE).shiftedBy(Constants.tokens.foo.decimals).toString(),
                    spent_token_root: FooRoot.address,
                    receive_token_root: BarRoot.address,
                    expected_amount: new BigNumber(expected.expected_amount).plus(1).toString(),
                    send_gas_to: Account2.address
                },
                value: locklift.utils.convertCrystal('1.1', 'nano'),
                keyPair: keyPairs[1]
            });

            displayTx(tx);

            const dexAccount2End = await dexAccountBalances(DexAccount2);
            const dexPairInfoEnd = await dexPairInfo();

            logger.log(`DexAccount#2 balance end: ${dexAccount2End.foo} FOO, ${dexAccount2End.bar} BAR`);
            logger.log(`DexPair end: ${dexPairInfoEnd.foo} FOO, ${dexPairInfoEnd.bar} BAR`);

            await migration.logGas();

            expect(dexPairInfoStart.foo).to.equal(dexPairInfoEnd.foo, 'Wrong DEX FOO balance');
            expect(dexPairInfoStart.bar).to.equal(dexPairInfoEnd.bar, 'Wrong DEX BAR balance');
            expect(dexAccount2Start.foo).to.equal(dexAccount2End.foo, 'Wrong DexAccount#2 FOO balance');
            expect(dexAccount2Start.bar).to.equal(dexAccount2End.bar, 'Wrong DexAccount#2 BAR balance');
        });

    });
});
