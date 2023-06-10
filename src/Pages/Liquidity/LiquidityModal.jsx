import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const LiquidityModal = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    return (
        <>
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
                        <Box width="100%" display="flex" flexDirection="column">
                            <Typography
                                sx={{
                                    fontSize: '48px',
                                    fontFamily: 'Squada One',
                                }}
                            >
                                Your Liquidity
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '14px' } }}>
                                Add liquidity to receive LP token
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                py: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box textAlign="center">No liquidity found.</Box>
                            <Button
                                variant="gradient"
                                sx={{ width: '300px' }}
                                onClick={() => history.push('/findpools')}
                            >
                                Find Other LP Tokens
                            </Button>
                        </Box>
                        <Button
                            variant="gradient"
                            sx={{
                                width: '100%',
                                py: 2,
                                borderRadius: '25px',
                            }}
                            onClick={() => navigate('/addliquidity')}
                        >
                            Add Liquidity
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default LiquidityModal;
