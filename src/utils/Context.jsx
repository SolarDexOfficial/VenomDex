import { createContext, useEffect, useMemo, useState } from 'react';
import { responsiveFontSizes } from '@mui/material';
import { VenomConnect } from 'venom-connect';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

import { createCustomTheme } from './createCustomTheme';
import { DexRootABI } from './ABI/DexRootABI';
import { DexVaultABI } from './ABI/DexVaultABI';
import { TokenFactoryABI } from './ABI/TokenFactoryABI';
import { TokenABI } from './ABI/TokenABI';

export const DataContext = createContext();

const ContextAPI = (props) => {
    // loader
    const [loader, setLoader] = useState(false);
    // ================

    // theme
    const [mode, setMode] = useState('dark');

    const toggleMode = () => {
        setMode((val) => (val === 'light' ? 'dark' : 'light'));
    };

    const themeClient = useMemo(() => {
        let theme = createCustomTheme(mode);
        theme = responsiveFontSizes(theme);
        return theme;
    }, [mode]);
    // ================

    // token list
    const [openList, setOpenList] = useState(false);
    const [currentTokenSelection, setCurrentTokenSelection] = useState('token1');
    const [selectedToken, setSelectedToken] = useState({
        token1: {
            name: 'WVENOM',
            symbol: 'TWV',
            image: null,
            decimals: 9,
            address: '0:2c3a2ff6443af741ce653ae4ef2c85c2d52a9df84944bbe14d702c3131da3f14',
        },
        token2: {
            name: 'SVT',
            symbol: 'SVT',
            image: null,
            decimals: 18,
            address: '0:95b5219eb8b77d046a350d9d3fc32ebf7b5f2a919c3fcfa7bd0c1e75696f38b5',
        },
    });

    const switchTokens = () => {
        setSelectedToken((prev) => {
            return {
                token1: {
                    ...prev.token2,
                },
                token2: {
                    ...prev.token1,
                },
            };
        });
    };

    const toggleList = () => setOpenList(!openList);

    // ================

    // venom connectivity

    const standaloneFallback = () =>
        EverscaleStandaloneClient.create({
            connection: {
                id: 1000,
                group: 'venom_testnet',
                type: 'jrpc',
                data: {
                    endpoint: 'https://jrpc.venom.foundation/rpc',
                },
            },
        });

    const initVenomConnect = async () => {
        return new VenomConnect({
            theme: 'venom',
            checkNetworkId: 1000,
            providersOptions: {
                venomwallet: {
                    links: {},
                    walletWaysToConnect: [
                        {
                            package: ProviderRpcClient,
                            packageOptions: {
                                fallback:
                                    VenomConnect.getPromise('venomwallet', 'extension') ||
                                    (() => Promise.reject()),
                                forceUseFallback: true,
                            },
                            packageOptionsStandalone: {
                                fallback: standaloneFallback,
                                forceUseFallback: true,
                            },

                            id: 'extension',
                            type: 'extension',
                        },
                    ],
                    defaultWalletWaysToConnect: ['mobile', 'ios', 'android'],
                },
            },
        });
    };

    const [venomConnect, setVenomConnect] = useState();
    const [venomProvider, setVenomProvider] = useState();
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState();

    const getAddress = async (provider) => {
        const providerState = await provider?.getProviderState?.();

        const address = providerState?.permissions.accountInteraction?.address.toString();

        return address;
    };

    const getBalance = async (provider, _address) => {
        try {
            const providerBalance = await provider?.getBalance?.(_address);
            return providerBalance;
        } catch (error) {
            return undefined;
        }
    };

    const checkAuth = async (_venomConnect) => {
        const auth = await _venomConnect?.checkAuth();
        if (auth) await getAddress(_venomConnect);
    };

    const onInitButtonClick = async () => {
        const initedVenomConnect = await initVenomConnect();
        setVenomConnect(initedVenomConnect);

        await checkAuth(initedVenomConnect);
    };

    const onConnectButtonClick = async () => {
        venomConnect?.connect();
    };

    const onDisconnectButtonClick = async () => {
        venomProvider?.disconnect();
    };

    const check = async (_provider) => {
        const _address = _provider ? await getAddress(_provider) : undefined;
        const _balance = _provider && _address ? await getBalance(_provider, _address) : undefined;

        setAddress(_address);
        setBalance(_balance);

        if (_provider && _address)
            setTimeout(() => {
                check(_provider);
            }, 100);
    };

    const onConnect = async (provider) => {
        setVenomProvider(provider);
        check(provider);
    };

    useEffect(() => {
        const off = venomConnect?.on('connect', onConnect);
        return () => {
            off?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venomConnect]);

    useEffect(() => {
        if (!venomConnect) onInitButtonClick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ================

    // addresses & contracts

    const [dexRootContract, setDexRootContract] = useState();
    const [tokenContract, setTokenContract] = useState();
    const [dexVaultContract, setDexVaultContract] = useState();
    const [tokenFactoryContract, setTokenFactoryContract] = useState();

    const TokenAddress = new Address(
        '0:95b5219eb8b77d046a350d9d3fc32ebf7b5f2a919c3fcfa7bd0c1e75696f38b5',
    );
    const DexRootAddress = new Address(
        '0:25c5d942209f49ea31ea0f1baede19922f913fb05808f2d7d5924e4896ee18c1',
    );
    const DexVaultAddress = new Address(
        '0:9ca3347a0729e922b8564dd598c4229f45717c787ebc60d42ef91987873a4cf0',
    );
    const TokenFactoryAddress = new Address(
        '0:9578de3748586a5f55d0be873705bc94e4934e3d5ae3249d9d01ae6ddea18afb',
    );

    useEffect(() => {
        if (venomProvider) {
            const tokContract = new venomProvider.Contract(TokenABI, TokenAddress);
            setTokenContract(tokContract);
            const rootContract = new venomProvider.Contract(DexRootABI, DexRootAddress);
            setDexRootContract(rootContract);
            const vaultContract = new venomProvider.Contract(DexVaultABI, DexVaultAddress);
            setDexVaultContract(vaultContract);
            const factoryContract = new venomProvider.Contract(
                TokenFactoryABI,
                TokenFactoryAddress,
            );
            setTokenFactoryContract(factoryContract);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venomProvider]);

    // ================

    return (
        <DataContext.Provider
            value={{
                // theme
                mode,
                themeClient,
                toggleMode,
                // ========
                // loader
                loader,
                setLoader,
                // ========
                //token list
                currentTokenSelection,
                setSelectedToken,
                selectedToken,
                toggleList,
                openList,
                switchTokens,
                setCurrentTokenSelection,
                // ========
                // venom connectivity
                onDisconnectButtonClick,
                onConnectButtonClick,
                address,
                balance,
                // ========
                //addresses and contracts
                DexRootAddress,
                DexVaultAddress,
                TokenFactoryAddress,
                dexRootContract,
                dexVaultContract,
                tokenFactoryContract,
                tokenContract,
                // ========
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default ContextAPI;
