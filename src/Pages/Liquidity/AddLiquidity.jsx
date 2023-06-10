import { Loop, Token } from '@mui/icons-material';
import { Box, Button, IconButton, InputBase, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react';

import { DataContext } from '../../utils/Context';
import { toast } from 'react-toastify';

const AddLiquidity = () => {
    const {
        toggleList,
        setCurrentTokenSelection,
        switchTokens,
        selectedToken,
        address,
        onConnectButtonClick,
        dexRootContract,
    } = useContext(DataContext);
    const theme = useTheme();

    const getAccount = async () => {
        try {
            const output = await dexRootContract.methods
                .getExpectedAccountAddress({
                    answerId: 0,
                    account_owner: address,
                })
                .call();
            console.log(output.value0._address);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const createAccount = async () => {
        try {
            const output = await dexRootContract.methods
                .deployAccount({
                    account_owner: address,
                    send_gas_to: address,
                })
                .send({
                    from: address,
                    amount: '2000000000',
                    bounce: true,
                });
            console.log(output);
            toast.success('Creating Account');
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (address) getAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return (
        <>
            <Stack direction="column" alignItems="center" justifyContent="center" my={5}>
                <Box
                    sx={{
                        background: `linear-gradient(to right, ${theme.palette.background.color1}, ${theme.palette.background.color2})`,
                        padding: '3px',
                        borderRadius: '15px',
                        boxShadow: `0px 0px 8px 0px ${theme.palette.background.shadow}`,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '550px',
                            p: 5,
                            borderRadius: '15px',
                            bgcolor: 'background.medium',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '48px',
                                fontFamily: 'Squada One',
                            }}
                        >
                            Add Liquidity
                        </Typography>
                        <Stack
                            direction="row"
                            sx={{
                                direction: 'row',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                                bgcolor: 'background.medium',
                                borderRadius: '15px',
                                border: `1px solid ${theme.palette.background.borderLight}`,
                                p: 2,
                            }}
                        >
                            <InputBase
                                sx={{ width: '100%', fontSize: '18px' }}
                                placeholder="Enter Amount"
                            />
                            <Button
                                onClick={() => {
                                    setCurrentTokenSelection('token1');
                                    toggleList();
                                }}
                                sx={{
                                    gap: 1,
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1,
                                    color: 'text.primary',
                                    borderRadius: '15px',
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    '&:hover': {
                                        bgcolor: 'background.hard',
                                    },
                                }}
                            >
                                {selectedToken.token1.image ? (
                                    <img
                                        src={selectedToken.token1.image}
                                        alt="coin"
                                        width="30px"
                                        height="30px"
                                    />
                                ) : (
                                    <Token />
                                )}
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: '500',
                                    }}
                                >
                                    {selectedToken.token1.symbol}
                                </Typography>
                            </Button>
                        </Stack>
                        <IconButton
                            onClick={() => switchTokens()}
                            sx={{
                                color: 'text.primary',
                                background: `${theme.palette.background.color1}`,
                                p: 1,
                            }}
                        >
                            <Loop fontSize="35px" />
                        </IconButton>
                        <Stack
                            direction="row"
                            sx={{
                                direction: 'row',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                                bgcolor: 'background.medium',
                                borderRadius: '15px',
                                border: `1px solid ${theme.palette.background.borderLight}`,
                                p: 2,
                            }}
                        >
                            <InputBase
                                sx={{ width: '100%', fontSize: '18px' }}
                                placeholder="Enter Amount"
                            />
                            <Button
                                onClick={() => {
                                    setCurrentTokenSelection('token2');
                                    toggleList();
                                }}
                                sx={{
                                    gap: 1,
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1,
                                    color: 'text.primary',
                                    borderRadius: '15px',
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    '&:hover': {
                                        bgcolor: 'background.hard',
                                    },
                                }}
                            >
                                {selectedToken.token2.image ? (
                                    <img
                                        src={selectedToken.token2.image}
                                        alt="coin"
                                        width="30px"
                                        height="30px"
                                    />
                                ) : (
                                    <Token />
                                )}
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: '500',
                                    }}
                                >
                                    {selectedToken.token2.symbol}
                                </Typography>
                            </Button>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Locked Until</Typography>
                            <InputBase
                                sx={{
                                    width: '100%',
                                    maxWidth: '100px',
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    borderRadius: '8px',
                                    px: 1,
                                    py: 0.5,
                                }}
                                type="number"
                                inputProps={{
                                    min: '0',
                                    max: '365',
                                }}
                                placeholder="Days"
                            />
                        </Stack>
                        {!address ? (
                            <Button
                                variant="gradient"
                                sx={{
                                    width: '100%',
                                    py: 2,
                                }}
                                onClick={() => onConnectButtonClick()}
                            >
                                Connect Wallet
                            </Button>
                        ) : (
                            <Button
                                variant="gradient"
                                sx={{
                                    width: '100%',
                                    py: 2,
                                }}
                                onClick={() => createAccount()}
                            >
                                Create Account
                            </Button>
                        )}
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default AddLiquidity;
