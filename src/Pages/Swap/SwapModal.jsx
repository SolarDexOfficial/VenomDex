import { Addchart, BarChart, Loop, Settings, Token, Info, QuestionMark } from '@mui/icons-material';
import { Box, Button, IconButton, InputBase, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../utils/Context';
import SlippingTolrance from '../../Components/Swap/Slippage';

const SwapModal = ({ showChart, toggleChart, showInfo, toggleInfo }) => {
    const { toggleList, setCurrentTokenSelection, switchTokens, selectedToken } =
        useContext(DataContext);
    const [openSlippage, setopenSlippage] = useState(false);
    const theme = useTheme();
    return (
        <>
            <SlippingTolrance openSlippage={openSlippage} setopenSlippage={setopenSlippage} />
            <Stack direction="column" alignItems="center" justifyContent="center" my={5}>
                <Box
                    sx={{
                        background: `linear-gradient(to right, ${theme.palette.background.color1}, ${theme.palette.background.color2})`,
                        padding: '3px',
                        borderRadius: '15px',
                        boxShadow: `0px 0px 8px 0px ${theme.palette.background.shadow}`,
                        width: '100%',
                        maxWidth: '550px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
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
                        <Box
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="column" alignItems="start">
                                <Typography
                                    sx={{
                                        fontSize: '48px',
                                        fontFamily: 'Squada One',
                                    }}
                                >
                                    Swap
                                </Typography>
                                <Typography sx={{ fontSize: { xs: '10px', sm: '14px' } }}>
                                    Trade tokens in an instant
                                </Typography>
                            </Stack>
                            <Stack direction="row" gap={1}>
                                <IconButton onClick={() => toggleInfo()}>
                                    {showInfo ? <Info /> : <QuestionMark />}
                                </IconButton>
                                <IconButton onClick={() => toggleChart()}>
                                    {showChart ? <BarChart /> : <Addchart />}
                                </IconButton>
                                <IconButton onClick={() => setopenSlippage(true)}>
                                    <Settings />
                                </IconButton>
                            </Stack>
                        </Box>
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
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Price</Typography>
                            <Typography>Token Per Venom</Typography>
                        </Stack>
                        <Button
                            variant="gradient"
                            sx={{
                                width: '100%',
                                py: 2,
                            }}
                        >
                            Swap
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default SwapModal;
