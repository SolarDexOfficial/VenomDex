import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SubHeader = () => {
    return (
        <Box
            display="flex"
            justifyContent={{ md: 'center', xs: 'center' }}
            alignItems="center"
            backgroundColor="background.light"
            style={{
                zIndex: '100',
            }}
            height="50px"
            width="100%"
        >
            <Box display="flex" justifyContent="cneter" alignItems="center">
                <Box mx={{ md: 4, xs: 2 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            sx={{
                                '&:hover': {
                                    color: '#14A481',
                                    borderBottom: '4px solid #14A481',
                                },
                                fontWeight: 700,
                                color: '#552FDA',
                                transition: 'all 0.2s ease-out',
                                cursor: 'pointer',
                                fontSize: { md: '16px', xs: '12px' },
                            }}
                        >
                            Swap
                        </Typography>
                    </Link>
                </Box>
                <Box mr={{ md: 4, xs: 2 }}>
                    <Link to="/liquidity" style={{ textDecoration: 'none' }}>
                        <Typography
                            sx={{
                                '&:hover': {
                                    color: '#14A481',
                                    borderBottom: '4px solid #14A481',
                                },
                                fontWeight: 700,
                                color: '#552FDA',
                                transition: 'all 0.2s ease-out',
                                cursor: 'pointer',
                                fontSize: { md: '16px', xs: '12px' },
                            }}
                        >
                            Liquidity
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SubHeader;
