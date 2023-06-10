export const DexVaultABI = {
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
            inputs: [],
            name: 'VaultCodeUpgraded',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'old_owner',
                    type: 'address',
                },
                {
                    name: 'new_owner',
                    type: 'address',
                },
            ],
            name: 'RequestedOwnerTransfer',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'old_owner',
                    type: 'address',
                },
                {
                    name: 'new_owner',
                    type: 'address',
                },
            ],
            name: 'OwnerTransferAccepted',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'tokenRoot',
                    type: 'address',
                },
                {
                    name: 'vaultWallet',
                    type: 'address',
                },
                {
                    name: 'amount',
                    type: 'uint128',
                },
                {
                    name: 'roots',
                    type: 'address[]',
                },
                {
                    name: 'referrer',
                    type: 'address',
                },
                {
                    name: 'referral',
                    type: 'address',
                },
            ],
            name: 'ReferralFeeTransfer',
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
            name: '_root',
            type: 'address',
        },
        {
            name: '_owner',
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
        {
            name: '_vaultWallets',
            type: 'map(address,address)',
        },
        {
            name: '_vaultWalletsToRoots',
            type: 'map(address,address)',
        },
        {
            components: [
                {
                    name: 'projectId',
                    type: 'uint256',
                },
                {
                    name: 'projectAddress',
                    type: 'address',
                },
                {
                    name: 'systemAddress',
                    type: 'address',
                },
            ],
            name: '_refProgramParams',
            type: 'tuple',
        },
    ],
    functions: [
        {
            inputs: [
                {
                    name: 'owner_',
                    type: 'address',
                },
                {
                    name: 'root_',
                    type: 'address',
                },
            ],
            name: 'constructor',
            outputs: [],
        },
        {
            inputs: [],
            name: 'migrateLiquidity',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_fromTokenRoot',
                    type: 'address',
                },
            ],
            name: 'continueMigrateLiquidity',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_tokenRoot',
                    type: 'address',
                },
            ],
            name: 'migrateToken',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_startTokenRoot',
                    type: 'address',
                },
            ],
            name: '_migrateNext',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_amount',
                    type: 'uint128',
                },
            ],
            name: 'onTokenBalance',
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
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getOwner',
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
            name: 'getPendingOwner',
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
                    name: 'answerId',
                    type: 'uint32',
                },
            ],
            name: 'getRoot',
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
            name: 'getReferralProgramParams',
            outputs: [
                {
                    components: [
                        {
                            name: 'projectId',
                            type: 'uint256',
                        },
                        {
                            name: 'projectAddress',
                            type: 'address',
                        },
                        {
                            name: 'systemAddress',
                            type: 'address',
                        },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            inputs: [
                {
                    components: [
                        {
                            name: 'projectId',
                            type: 'uint256',
                        },
                        {
                            name: 'projectAddress',
                            type: 'address',
                        },
                        {
                            name: 'systemAddress',
                            type: 'address',
                        },
                    ],
                    name: 'params',
                    type: 'tuple',
                },
            ],
            name: 'setReferralProgramParams',
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
                    name: '_tokenRoot',
                    type: 'address',
                },
                {
                    name: '_amount',
                    type: 'uint128',
                },
                {
                    name: '_sender',
                    type: 'address',
                },
                {
                    name: 'value3',
                    type: 'address',
                },
                {
                    name: '_remainingGasTo',
                    type: 'address',
                },
                {
                    name: '_payload',
                    type: 'cell',
                },
            ],
            name: 'onAcceptTokensTransfer',
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
        {
            inputs: [],
            name: '_vaultWallets',
            outputs: [
                {
                    name: '_vaultWallets',
                    type: 'map(address,address)',
                },
            ],
        },
        {
            inputs: [],
            name: '_vaultWalletsToRoots',
            outputs: [
                {
                    name: '_vaultWalletsToRoots',
                    type: 'map(address,address)',
                },
            ],
        },
    ],
    header: ['pubkey', 'time', 'expire'],
    version: '2.2',
};
