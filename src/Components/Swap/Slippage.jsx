import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import {
    Dialog,
    DialogContent,
    Box,
    InputBase,
    IconButton,
    Button,
    useTheme,
    Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//temp states
let error = false;
const predefinedValues = [
    { label: '0.1%', value: 0.1 },
    { label: '0.5%', value: 0.5 },
    { label: '1%', value: 1 },
];

function SlippingTolrance({ openSlippage, setopenSlippage }) {
    const theme = useTheme();
    const handleClose = () => {
        setopenSlippage(false);
    };

    return (
        <>
            <Dialog keepMounted open={openSlippage} onClose={handleClose}>
                <DialogContent
                    sx={{
                        bgcolor: 'background.medium',
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            paddingBottom: '30px',
                            width: { sm: '295px', xs: '295px', md: '500px' },
                        }}
                    >
                        <Box
                            display="flex"
                            bgcolor={theme.palette.background.light}
                            borderRadius="20px"
                            justifyContent="space-between"
                            alignItems={'center'}
                            p="20px"
                        >
                            <Box fontSize="20px" fontWeight="500">
                                Settings
                            </Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box
                            fontSize="17px"
                            textAlign="left"
                            fontWeight="400"
                            paddingLeft="20px"
                            mt={3}
                        >
                            Slippage Tolerance
                            <Tooltip
                                title={
                                    'Your transaction will revert if the price changes unfavorably by more than this percentage.'
                                }
                                sx={{
                                    backgroundColor: theme.palette.common.tooltip,
                                    color: '#ffffff',
                                    boxShadow: theme.shadows[1],
                                    fontSize: 14,
                                    fontWeight: 400,
                                }}
                            >
                                <IconButton aria-label="delete">
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box
                            paddingLeft="20px"
                            paddingRight="20px"
                            mt={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-evenly"
                            flexWrap="wrap"
                        >
                            {predefinedValues.map(({ label, value: predefinedValue }) => {
                                return (
                                    <Button key={predefinedValue} variant="gradient">
                                        {label}
                                    </Button>
                                );
                            })}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                            }}
                            paddingLeft="20px"
                            paddingRight="20px"
                            mt={3}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    maxWidth: '300px',
                                }}
                                borderRadius="10px"
                                border={`1px solid ${theme.palette.background.borderLight}`}
                                bgcolor={theme.palette.background.light}
                            >
                                <InputBase
                                    sx={{
                                        width: '100%',
                                        fontSize: '18px',
                                        px: 2,
                                        py: 1,
                                    }}
                                    type="number"
                                    placeholder="5%"
                                />
                            </Box>
                            <Box fontSize="20px">%</Box>
                        </Box>
                        {error && <Box mt="8px">Error</Box>}
                        <Box
                            fontSize="17px"
                            textAlign="left"
                            fontWeight="400"
                            paddingLeft="20px"
                            mt={3}
                        >
                            Transaction deadline
                            <Tooltip
                                title={
                                    'Your transaction will revert if it is pending for more than this long.'
                                }
                                sx={{
                                    backgroundColor: theme.palette.common.tooltip,
                                    color: '#ffffff',
                                    boxShadow: theme.shadows[1],
                                    fontSize: 14,
                                    fontWeight: 400,
                                }}
                            >
                                <IconButton aria-label="delete">
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box
                            width="100%"
                            display="flex"
                            paddingLeft="20px"
                            paddingRight="20px"
                            alignItems={'center'}
                            justifyContent="space-between"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    bgcolor: theme.palette.background.light,
                                    width: '100%',
                                    maxWidth: '300px',
                                    borderRadius: '10px',
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                }}
                            >
                                <InputBase
                                    sx={{
                                        width: '100%',
                                        fontSize: '18px',
                                        px: 2,
                                        py: 1,
                                    }}
                                    type="number"
                                    placeholder="20"
                                    step="1"
                                    min="1"
                                />
                            </Box>
                            <Box fontSize="18px">Minutes</Box>
                        </Box>
                        {error && <Box mt="8px">Error</Box>}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default SlippingTolrance;
