import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Twitter, Telegram } from '@mui/icons-material';

import logo from './images/solar.png';
import Discord from './images/Discord.svg';
import Medium from './images/Medium.svg';

const Footer = () => {
    return (
        <Box bgcolor="#1E212A" py={10}>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={2}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <img src={logo} alt="" width="65px" />
                            <Typography
                                sx={{
                                    fontFamily: 'Squada One',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '32px',
                                    lineHeight: '34px',
                                    color: '#fff',
                                }}
                            >
                                Solar
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', sm: 'center', md: 'start' },
                                textAlign: { xs: 'center', sm: 'center', md: 'left' },
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#fff',
                                    textDecoration: 'underline',
                                    letterSpacing: '0.12em',
                                }}
                            >
                                About
                            </Typography>
                            <Typography
                                variant="body1"
                                textAlign={{ md: 'justify', sm: 'center', xs: 'center' }}
                                width={{ md: '100%', sm: '80%', xs: '100%' }}
                                color="#777575"
                                pt={1}
                            >
                                Solar was established in December 2021 with the intent of providing
                                unique and simplistic Defi products to investors. The underlying
                                value of Solar Labs consist of the Solar Token, and the Solar Sentry
                                NFT Collection
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', sm: 'center', md: 'end' },
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{ color: '#fff', letterSpacing: '0.12em' }}
                                >
                                    Follow us
                                </Typography>
                                <Stack
                                    direction="row"
                                    gap="20px"
                                    py={2}
                                    justifyContent={{ xs: 'center', sm: 'center', md: 'start' }}
                                >
                                    <Discord />
                                    <Medium />
                                    <Twitter sx={{ color: '#14A481' }} />
                                    <Telegram sx={{ color: '#14A481' }} />
                                </Stack>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#fff', letterSpacing: '0.27em' }}
                                >
                                    All rights reserved @solardex 2021
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
