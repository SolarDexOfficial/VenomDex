import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    LinearProgress,
    Stack,
    Typography,
    linearProgressClasses,
    styled,
    useTheme,
} from '@mui/material';
import React from 'react';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 4,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#F45B5B',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#B0DC73',
    },
}));

const PairInfo = () => {
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
                        <Typography
                            sx={{
                                fontSize: '48px',
                                fontFamily: 'Squada One',
                            }}
                        >
                            Pair Info
                        </Typography>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    maxWidth: '200px',
                                }}
                            >
                                <Typography fontSize="14px">Price USD</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    $0.000689
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '200px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">Price</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    0.00689 Venom
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    maxWidth: '140px',
                                }}
                            >
                                <Typography fontSize="14px">Liquidity</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    $175K
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '140px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">FDV</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    $35M
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '140px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">MKT CAP</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    $35M
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    maxWidth: '100px',
                                }}
                            >
                                <Typography fontSize="14px">5M</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    -0.26%
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '100px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">1H</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    -10.3%
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '100px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">6H</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    -12%
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: '100px',
                                    width: '100%',
                                }}
                            >
                                <Typography fontSize="14px">24H</Typography>
                                <Typography fontSize="16px" fontWeight="600">
                                    -12%
                                </Typography>
                            </Box>
                        </Stack>
                        <ButtonGroup variant="outlined" size="large">
                            <Button>5M</Button>
                            <Button>1H</Button>
                            <Button>6H</Button>
                            <Button>24H</Button>
                        </ButtonGroup>
                        <Stack
                            direction="row"
                            width="100%"
                            alignItems="center"
                            justifyContent="space-evenly"
                            divider={<Divider orientation="vertical" flexItem />}
                            gap={4}
                        >
                            <Stack direction="column" gap={2.5}>
                                <Box>
                                    <Typography fontSize="12px">TXNS</Typography>
                                    <Typography fontSize="14px" fontWeight="500">
                                        32,365
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize="12px">VOLUME</Typography>
                                    <Typography fontSize="14px" fontWeight="500">
                                        $2.5M
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize="12px">MAKERS</Typography>
                                    <Typography fontSize="14px" fontWeight="500">
                                        1560
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction="column" gap={2} width="100%">
                                <Box>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Typography fontSize="12px">Buys</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                17000
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography fontSize="12px">Sells</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                16000
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Box>
                                <Box>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Typography fontSize="12px">Buys</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                17000
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography fontSize="12px">Sells</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                16000
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Box>
                                <Box>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Typography fontSize="12px">Buys</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                17000
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography fontSize="12px">Sells</Typography>
                                            <Typography fontSize="14px" fontWeight="500">
                                                16000
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default PairInfo;
