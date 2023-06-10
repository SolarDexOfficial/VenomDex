import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const SwapDetails = () => {
    const theme = useTheme();
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
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Minimum Received</Typography>
                            <Typography>BNB</Typography>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Price Impact</Typography>
                            <Typography>1.20%</Typography>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Liquidity Provider Fee</Typography>
                            <Typography>0.0001 BNB</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default SwapDetails;
