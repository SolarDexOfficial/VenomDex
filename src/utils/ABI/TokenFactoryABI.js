export const TokenFactoryABI = {
    'ABI version': 2,
    data: [
        {
            key: 1,
            name: 'randomNonce_',
            type: 'uint32',
        },
    ],
    events: [
        {
            inputs: [
                {
                    name: 'tokenRoot',
                    type: 'address',
                },
            ],
            name: 'TokenCreated',
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
            name: 'randomNonce_',
            type: 'uint32',
        },
        {
            name: 'owner_',
            type: 'address',
        },
        {
            name: 'pendingOwner_',
            type: 'address',
        },
        {
            name: 'rootCode_',
            type: 'cell',
        },
        {
            name: 'walletCode_',
            type: 'cell',
        },
        {
            name: 'walletPlatformCode_',
            type: 'cell',
        },
    ],
    functions: [
        {
            inputs: [
                {
                    name: '_owner',
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
            name: 'owner',
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
            name: 'pendingOwner',
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
            name: 'rootCode',
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
            name: 'walletCode',
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
            name: 'walletPlatformCode',
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
                    name: 'callId',
                    type: 'uint32',
                },
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'symbol',
                    type: 'string',
                },
                {
                    name: 'decimals',
                    type: 'uint8',
                },
                {
                    name: 'initialSupplyTo',
                    type: 'address',
                },
                {
                    name: 'initialSupply',
                    type: 'uint128',
                },
                {
                    name: 'deployWalletValue',
                    type: 'uint128',
                },
                {
                    name: 'mintDisabled',
                    type: 'bool',
                },
                {
                    name: 'burnByRootDisabled',
                    type: 'bool',
                },
                {
                    name: 'burnPaused',
                    type: 'bool',
                },
                {
                    name: 'remainingGasTo',
                    type: 'address',
                },
            ],
            name: 'createToken',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: 'answerId',
                    type: 'uint32',
                },
                {
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'transferOwner',
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
            name: 'acceptOwner',
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
                    name: '_rootCode',
                    type: 'cell',
                },
            ],
            name: 'setRootCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_walletCode',
                    type: 'cell',
                },
            ],
            name: 'setWalletCode',
            outputs: [],
        },
        {
            inputs: [
                {
                    name: '_walletPlatformCode',
                    type: 'cell',
                },
            ],
            name: 'setWalletPlatformCode',
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
    ],
    header: ['time'],
    version: '2.2',
};
