export const DexRootABI = {
    'ABI version': 2,
    data: [
        {
            key: 1,
            name: '_nonce',
            type: 'uint32',
        },
    ],
    events: [
        {
            inputs: [
                {
                    name: 'version',
                    type: 'uint32',
                },
            ],
            name: 'AccountCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'version',
                    type: 'uint32',
                },
                {
                    name: 'poolType',
                    type: 'uint8',
                },
            ],
            name: 'PairCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'version',
                    type: 'uint32',
                },
                {
                    name: 'poolType',
                    type: 'uint8',
                },
            ],
            name: 'PoolCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'version',
                    type: 'uint32',
                },
                {
                    name: 'codeHash',
                    type: 'uint256',
                },
            ],
            name: 'TokenVaultCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'version',
                    type: 'uint32',
                },
                {
                    name: 'codeHash',
                    type: 'uint256',
                },
            ],
            name: 'LpTokenPendingCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'current',
                    type: 'address',
                },
                {
                    name: 'previous',
                    type: 'address',
                },
            ],
            name: 'TokenFactoryUpdated',
            outputs: [],
        },
        {
            inputs: [],
            name: 'RootCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'newActive',
                    type: 'bool',
                },
            ],
            name: 'ActiveUpdated',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'roots',
                    type: 'address[]',
                },
            ],
            name: 'RequestedPoolUpgrade',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'accountOwner',
                    type: 'address',
                },
            ],
            name: 'RequestedForceAccountUpgrade',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'oldOwner',
                    type: 'address',
                },
                {
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'RequestedOwnerTransfer',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'oldOwner',
                    type: 'address',
                },
                {
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnerTransferAccepted',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'roots',
                    type: 'address[]',
                },
                {
                    name: 'poolType',
                    type: 'uint8',
                },
            ],
            name: 'NewPoolCreated',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'vault',
                    type: 'address',
                },
                {
                    name: 'tokenRoot',
                    type: 'address',
                },
                {
                    name: 'tokenWallet',
                    type: 'address',
                },
                {
                    name: 'version',
                    type: 'uint32',
                },
            ],
            name: 'NewTokenVaultCreated',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'pool',
                    type: 'address',
                },
                {
                    name: 'poolTokenRoots',
                    type: 'address[]',
                },
                {
                    name: 'lpTokenRoot',
                    type: 'address',
                },
                {
                    name: 'lpPendingNonce',
                    type: 'uint32',
                },
            ],
            name: 'NewLpTokenRootCreated',
            outputs: [],
        },
    ],
    fields: [
        {
            name: '_pubkey',
            type: 'uint256',
        },
        {
            name: '_timestamp',
            type: 'uint64',
        },
        {
            name: '_constructorFlag',
            type: 'bool',
        },
        {
            name: 'platform_code',
            type: 'cell',
        },
        {
            name: '_nonce',
            type: 'uint32',
        },
        {
            name: '_accountCode',
            type: 'cell',
        },
        {
            name: '_accountVersion',
            type: 'uint32',
        },
        {
            name: '_pairCodes',
            type: 'map(uint8,cell)',
        },
        {
            name: '_pairVersions',
            type: 'map(uint8,uint32)',
        },
        {
            name: '_poolCodes',
            type: 'map(uint8,cell)',
        },
        {
            name: '_poolVersions',
            type: 'map(uint8,uint32)',
        },
        {
            name: '_vaultCode',
            type: 'cell',
        },
        {
            name: '_vaultVersion',
            type: 'uint32',
        },
        {
            name: '_lpTokenPendingCode',
            type: 'cell',
        },
        {
            name: '_lpTokenPendingVersion',
            type: 'uint32',
        },
        {
            name: '_tokenFactory',
            type: 'address',
        },
        {
            name: '_active',
            type: 'bool',
        },
        {
            name: '_owner',
            type: 'address',
        },
        {
            name: '_vault',
            type: 'address',
        },
        {
            name: '_pendingOwner',
            type: 'address',
        },
        {
            name: '_manager',
            type: 'address',
        },
    ],
    functions: [
        {
            inputs: [
                {
                    name: 'initial_owner',
                    type: 'address',
                },
                {
                    name: 'initial_vault',
                    type: 'address',
                },
            ],
            name: 'constructor',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getAccountVersion',
            outputs: [
                {
                    name: 'value0',
                    type: 'uint32',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getAccountCode',
            outputs: [
                {
                    name: 'value0',
                    type: 'cell',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'getPairVersion',
            outputs: [
                {
                    name: 'value0',
                    type: 'uint32',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'getPoolVersion',
            outputs: [
                {
                    name: 'value0',
                    type: 'uint32',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'getPairCode',
            outputs: [
                {
                    name: 'value0',
                    type: 'cell',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'getPoolCode',
            outputs: [
                {
                    name: 'value0',
                    type: 'cell',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getVault',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getTokenVaultCode',
            outputs: [
                {
                    name: 'value0',
                    type: 'cell',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getTokenVaultVersion',
            outputs: [
                {
                    name: 'value0',
                    type: 'uint32',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getLpTokenPendingCode',
            outputs: [
                {
                    name: 'value0',
                    type: 'cell',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getLpTokenPendingVersion',
            outputs: [
                {
                    name: 'value0',
                    type: 'uint32',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getTokenFactory',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'isActive',
            outputs: [
                {
                    name: 'value0',
                    type: 'bool',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getOwner',
            outputs: [
                {
                    name: 'dex_owner',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getPendingOwner',
            outputs: [
                {
                    name: 'dex_pending_owner',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'account_owner',
                    type: 'address',
                },
            ],
            name: 'getExpectedAccountAddress',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'left_root',
                    type: 'address',
                },
                {
                    name: 'right_root',
                    type: 'address',
                },
            ],
            name: 'getExpectedPairAddress',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: '_roots',
                    type: 'address[]',
                },
            ],
            name: 'getExpectedPoolAddress',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: '_tokenRoot',
                    type: 'address',
                },
            ],
            name: 'getExpectedTokenVaultAddress',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getManager',
            outputs: [
                {
                    name: 'value0',
                    type: 'address',
                },
            ],
        },
        {
            inputs: [
                {
                    name: 'new_vault',
                    type: 'address',
                },
            ],
            name: 'setVaultOnce',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'new_active',
                    type: 'bool',
                },
            ],
            name: 'setActive',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_newManager',
                    type: 'address',
                },
            ],
            name: 'setManager',
            outputs: [],
        },
        {
            inputs: [],
            name: 'revokeManager',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'new_owner',
                    type: 'address',
                },
            ],
            name: 'transferOwner',
            outputs: [],
        },
        {
            inputs: [],
            name: 'acceptOwner',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_newTokenFactory',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setTokenFactory',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'code',
                    type: 'cell',
                },
            ],
            name: 'installPlatformOnce',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'code',
                    type: 'cell',
                },
            ],
            name: 'installOrUpdateAccountCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'code',
                    type: 'cell',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'installOrUpdatePairCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'code',
                    type: 'cell',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
            ],
            name: 'installOrUpdatePoolCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_newCode',
                    type: 'cell',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'installOrUpdateTokenVaultCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_newCode',
                    type: 'cell',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'installOrUpdateLpTokenPendingCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'code',
                    type: 'cell',
                },
            ],
            name: 'upgrade',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'resetGas',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_tokenRoot',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'deployTokenVault',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_version',
                    type: 'uint32',
                },
                {
                    name: '_tokenRoot',
                    type: 'address',
                },
                {
                    name: '_tokenWallet',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'onTokenVaultDeployed',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_tokenRoots',
                    type: 'address[]',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'deployLpToken',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_lpPendingNonce',
                    type: 'uint32',
                },
                {
                    name: '_pool',
                    type: 'address',
                },
                {
                    name: '_roots',
                    type: 'address[]',
                },
                {
                    name: '_lpRoot',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'onLiquidityTokenDeployed',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_lpPendingNonce',
                    type: 'uint32',
                },
                {
                    name: '_pool',
                    type: 'address',
                },
                {
                    name: '_roots',
                    type: 'address[]',
                },
                {
                    name: '_lpRoot',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'onLiquidityTokenNotDeployed',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_tokenRoot',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'upgradeTokenVault',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_tokenRoots',
                    type: 'address[]',
                },
                {
                    name: '_offset',
                    type: 'uint32',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'upgradeTokenVaults',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'account_owner',
                    type: 'address',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'deployAccount',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'current_version',
                    type: 'uint32',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
                {
                    name: 'account_owner',
                    type: 'address',
                },
            ],
            name: 'requestUpgradeAccount',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'account_owner',
                    type: 'address',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'forceUpgradeAccount',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_accountsOwners',
                    type: 'address[]',
                },
                {
                    name: '_offset',
                    type: 'uint32',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'upgradeAccounts',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'left_root',
                    type: 'address',
                },
                {
                    name: 'right_root',
                    type: 'address',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'upgradePair',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'roots',
                    type: 'address[]',
                },
                {
                    name: 'pool_type',
                    type: 'uint8',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'upgradePool',
            outputs: [],
        },
        {
            inputs: [
                {
                    components: [
                        {
                            name: 'tokenRoots',
                            type: 'address[]',
                        },
                        {
                            name: 'poolType',
                            type: 'uint8',
                        },
                    ],
                    name: '_params',
                    type: 'tuple[]',
                },
                {
                    name: '_offset',
                    type: 'uint32',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'upgradePairs',
            outputs: [],
        },
        {
            inputs: [
                {
                    components: [
                        {
                            name: 'tokenRoots',
                            type: 'address[]',
                        },
                        {
                            name: 'newActive',
                            type: 'bool',
                        },
                    ],
                    name: '_param',
                    type: 'tuple',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setPoolActive',
            outputs: [],
        },
        {
            inputs: [
                {
                    components: [
                        {
                            name: 'tokenRoots',
                            type: 'address[]',
                        },
                        {
                            name: 'newActive',
                            type: 'bool',
                        },
                    ],
                    name: '_params',
                    type: 'tuple[]',
                },
                {
                    name: '_offset',
                    type: 'uint32',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setPoolsActive',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'left_root',
                    type: 'address',
                },
                {
                    name: 'right_root',
                    type: 'address',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'deployPair',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'roots',
                    type: 'address[]',
                },
                {
                    name: 'send_gas_to',
                    type: 'address',
                },
            ],
            name: 'deployStablePool',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_roots',
                    type: 'address[]',
                },
                {
                    components: [
                        {
                            name: 'denominator',
                            type: 'uint128',
                        },
                        {
                            name: 'pool_numerator',
                            type: 'uint128',
                        },
                        {
                            name: 'beneficiary_numerator',
                            type: 'uint128',
                        },
                        {
                            name: 'referrer_numerator',
                            type: 'uint128',
                        },
                        {
                            name: 'beneficiary',
                            type: 'address',
                        },
                        {
                            name: 'threshold',
                            type: 'map(address,uint128)',
                        },
                        {
                            name: 'referrer_threshold',
                            type: 'map(address,uint128)',
                        },
                    ],
                    name: '_params',
                    type: 'tuple',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setPairFeeParams',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_roots',
                    type: 'address[]',
                },
                {
                    components: [
                        {
                            name: 'value',
                            type: 'uint128',
                        },
                        {
                            name: 'precision',
                            type: 'uint128',
                        },
                    ],
                    name: '_A',
                    type: 'tuple',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setPairAmplificationCoefficient',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'target',
                    type: 'address',
                },
                {
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'resetTargetGas',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_roots',
                    type: 'address[]',
                },
                {
                    name: '_poolType',
                    type: 'uint8',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'onPoolCreated',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_leftRoot',
                    type: 'address',
                },
                {
                    name: '_rightRoot',
                    type: 'address',
                },
                {
                    components: [
                        {
                            name: 'minInterval',
                            type: 'uint8',
                        },
                        {
                            name: 'minRateDeltaNumerator',
                            type: 'uint128',
                        },
                        {
                            name: 'minRateDeltaDenominator',
                            type: 'uint128',
                        },
                        {
                            name: 'cardinality',
                            type: 'uint16',
                        },
                    ],
                    name: '_options',
                    type: 'tuple',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'setOracleOptions',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_leftRoot',
                    type: 'address',
                },
                {
                    name: '_rightRoot',
                    type: 'address',
                },
                {
                    name: '_count',
                    type: 'uint16',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'removeLastNPoints',
            outputs: [],
        },
        {
            inputs: [],
            name: 'platform_code',
            outputs: [
                {
                    name: 'platform_code',
                    type: 'cell',
                },
            ],
        },
    ],
    header: ['pubkey', 'time', 'expire'],
    version: '2.2',
};
