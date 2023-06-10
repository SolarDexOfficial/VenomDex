import { LockliftConfig } from 'locklift';
import { GiverWallet, SimpleGiver, TestnetGiver } from './giverSettings';
import { FactorySource } from './build/factorySource';

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const locklift: import('locklift').Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = 'http://localhost:80/graphql';

const DEV_NET_NETWORK_ENDPOINT =
  process.env.DEV_NET_NETWORK_ENDPOINT ||
  'https://devnet-sandbox.evercloud.dev/graphql';

const VENOM_TESTNET_ENDPOINT =
  process.env.VENOM_TESTNET_ENDPOINT ||
  'https://jrpc-testnet.venom.foundation/rpc';
const VENOM_TESTNET_TRACE_ENDPOINT =
  process.env.VENOM_TESTNET_TRACE_ENDPOINT ||
  'https://gql-testnet.venom.network/graphql';

// Create your own link on https://dashboard.evercloud.dev/
const MAIN_NET_NETWORK_ENDPOINT =
  process.env.MAIN_NET_NETWORK_ENDPOINT ||
  'https://mainnet.evercloud.dev/XXX/graphql';

// const LOCAL_NETWORK_ENDPOINT =
//   'https://evernode-no-limits.fairyfromalfeya.com/graphql';

const config: LockliftConfig = {
  compiler: {
    version: '0.62.0',
    externalContracts: {
      precompiled: ['DexPlatform'],
      'node_modules/tip3/build': [
        'TokenRootUpgradeable',
        'TokenWalletUpgradeable',
        'TokenWalletPlatform',
      ],
      'node_modules/ton-wton/everscale/build': [],
    },
  },
  linker: { version: '0.15.48' },
  networks: {
    // local: {
    //   connection: {
    //     id: 1337,
    //     group: 'localnet',
    //     type: 'graphql',
    //     data: {
    //       endpoints: [LOCAL_NETWORK_ENDPOINT],
    //       latencyDetectionInterval: 1000,
    //       local: true,
    //     },
    //   },
    //   giver: {
    //     giverFactory: (ever, keyPair, address) =>
    //       new SimpleGiver(ever, keyPair, address),
    //     address:
    //       '0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415',
    //     key: '172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3',
    //   },
    //   tracing: { endpoint: LOCAL_NETWORK_ENDPOINT },
    //   keys: {
    //     phrase:
    //       'action inject penalty envelope rabbit element slim tornado dinner pizza off blood',
    //     amount: 20,
    //   },
    // },
    test: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1000,
        type: 'jrpc',
        group: 'dev',
        data: {
          // @ts-ignore
          endpoint: VENOM_TESTNET_ENDPOINT,
          // latencyDetectionInterval: 1000,
          // local: false,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        // Check if you need provide custom giver
        giverFactory: (ever, keyPair, address) =>
          new TestnetGiver(ever, keyPair, address),
        address: `0:800467c9fcd58bdccdaa773770e29485cab41326a68db0ba6348e0c6d8425c6a`,
        phrase:
          'snow popular area live game potato very shed program eight paper fee',
        // key:
        //   '6495798c4f8e78b9f2f46a80409f3e4a00f3288c5197b7c4fe7d507a42d48077' ??
        //   '',
        accountId: 0,
      },
      tracing: {
        endpoint: VENOM_TESTNET_TRACE_ENDPOINT ?? '',
      },

      keys: {
        phrase:
          'snow popular area live game potato very shed program eight paper fee',
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: 'jrpc',
        group: 'dev',
        data: {
          endpoint: VENOM_TESTNET_ENDPOINT,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        address:
          '0:800467c9fcd58bdccdaa773770e29485cab41326a68db0ba6348e0c6d8425c6a',
        phrase:
          'snow popular area live game potato very shed program eight paper fee',
        accountId: 0,
      },
      tracing: {
        endpoint: VENOM_TESTNET_TRACE_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        phrase:
          'snow popular area live game potato very shed program eight paper fee',
        amount: 20,
      },
    },
    // main: {
    //   connection: 'mainnetJrpc',
    //   giver: {
    //     // Mainnet giver has the same abi as testnet one
    //     giverFactory:
    //       process.env.MAIN_GIVER_TYPE == 'Wallet'
    //         ? (ever, keyPair, address) =>
    //             new GiverWallet(ever, keyPair, address)
    //         : (ever, keyPair, address) =>
    //             new TestnetGiver(ever, keyPair, address),
    //     address: process.env.MAIN_GIVER_ADDRESS ?? '',
    //     phrase: process.env.MAIN_GIVER_SEED ?? '',
    //     accountId: 0,
    //   },
    //   tracing: {
    //     endpoint: process.env.MAIN_GQL_ENDPOINT ?? '',
    //   },
    //   keys: {
    //     phrase: process.env.MAIN_SEED_PHRASE ?? '',
    //     amount: 20,
    //   },
    // },
    // prod: {
    //   connection: 'mainnetJrpc',
    //   giver: {
    //     // Mainnet giver has the same abi as testnet one
    //     giverFactory: (ever, keyPair, address) =>
    //       new TestnetGiver(ever, keyPair, address),
    //     address:
    //       '0:3bcef54ea5fe3e68ac31b17799cdea8b7cffd4da75b0b1a70b93a18b5c87f723',
    //     key: process.env.MAIN_GIVER_KEY ?? '',
    //   },
    //   tracing: {
    //     endpoint: process.env.MAIN_GQL_ENDPOINT ?? '',
    //   },
    //   keys: {
    //     phrase: process.env.MAIN_SEED_PHRASE ?? '',
    //     amount: 500,
    //   },
    // },
  },
  mocha: { timeout: 2000000 },
};

export default config;
