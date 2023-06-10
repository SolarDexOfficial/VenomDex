import React, { useContext, useState } from 'react';
import {
    Container,
    Button,
    Box,
    IconButton,
    MenuItem,
    Typography,
    Link as MuiLink,
    Select,
    Drawer,
    useTheme,
    Hidden,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { DataContext } from '../utils/Context';

import logo from './images/logo.png';
import venom from './images/favicon.png';
import quai from './images/quai.png';
import doge from './images/doge.png';
import sol from './images/sol.png';
import solar from './images/solar.png';

const subMenus = [
    {
        name: 'Solana',
        to: 'https://swap.solardex.finance',
        logo: sol,
    },
    {
        name: 'Quai',
        to: 'https://solardex-quai.netlify.app/',
        logo: quai,
    },
    {
        name: 'DogeChain',
        to: 'https://solarshepardswap.solardex.finance/',
        logo: doge,
    },
    {
        name: 'Solarswap',
        to: 'https://solardexcrosschain.finance/',
        logo: solar,
    },
    {
        name: 'Venom',
        to: 'https://venom-dex.netlify.app/',
        logo: venom,
    },
];

const Header = () => {
    const { toggleMode, mode, onDisconnectButtonClick, onConnectButtonClick, address } =
        useContext(DataContext);

    const [network, setNetwork] = useState('Venom');
    const [state, setState] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        setState((prev) => (prev === true ? false : true));
    };

    const handleChange = (event) => {
        setNetwork(event.target.value);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="#1E212A"
                sx={{
                    zIndex: 100,
                }}
                height="60px"
                width="100%"
            >
                <Container>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <img
                            src={logo}
                            style={{
                                display: 'flex',
                                width: '150px',
                            }}
                            alt=""
                        />

                        <Hidden mdDown>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <IconButton onClick={() => toggleMode()}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>
                                <Select
                                    value={network}
                                    defaultValue={'Quai'}
                                    onChange={handleChange}
                                    sx={{
                                        '&.MuiOutlinedInput-root': {
                                            backgroundColor: '#353547',
                                            height: '35px',
                                        },
                                    }}
                                >
                                    {subMenus.map(({ name, to, logo }) => {
                                        return (
                                            <MenuItem key={to + name} value={name}>
                                                <MuiLink
                                                    href={to}
                                                    color="#fff"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        gap: 1,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        width="20px"
                                                        height="20px"
                                                    />
                                                    <Typography> {name}</Typography>
                                                </MuiLink>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {address ? (
                                    <Button variant="gradient" onClick={onDisconnectButtonClick}>
                                        {address.slice(0, 6) + '...' + address.slice(-4)}
                                    </Button>
                                ) : (
                                    <Button variant="gradient" onClick={onConnectButtonClick}>
                                        Connect
                                    </Button>
                                )}
                            </Box>
                        </Hidden>
                        <Hidden mdUp>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <IconButton onClick={() => toggleMode()}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>
                                <IconButton onClick={() => toggleDrawer()}>
                                    <MenuIcon
                                        style={{
                                            fontSize: '28px',
                                        }}
                                    />
                                </IconButton>
                            </Box>
                            <Drawer anchor="right" open={state} onClose={() => toggleDrawer()}>
                                <Box
                                    sx={{
                                        background: `${theme.palette.background.medium}`,
                                        width: 300,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 5,
                                        pt: 8,
                                        px: 2,
                                    }}
                                    role="presentation"
                                >
                                    <img
                                        src={logo}
                                        style={{
                                            display: 'flex',
                                            width: '150px',
                                        }}
                                        alt=""
                                    />
                                    <Select
                                        value={network}
                                        defaultValue={'Quai'}
                                        onChange={handleChange}
                                        sx={{
                                            '&.MuiOutlinedInput-root': {
                                                backgroundColor: '#353547',
                                                height: '35px',
                                            },
                                        }}
                                    >
                                        {subMenus.map(({ name, to, logo }) => {
                                            return (
                                                <MenuItem key={to + name} value={name}>
                                                    <MuiLink
                                                        href={to}
                                                        color="#fff"
                                                        sx={{
                                                            textDecoration: 'none',
                                                            display: 'flex',
                                                            gap: 1,
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <img
                                                            src={logo}
                                                            alt=""
                                                            width="20px"
                                                            height="20px"
                                                        />
                                                        <Typography> {name}</Typography>
                                                    </MuiLink>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    {address ? (
                                        <Button
                                            variant="gradient"
                                            fullWidth
                                            sx={{
                                                fontSize: '12px',
                                            }}
                                            onClick={onDisconnectButtonClick}
                                        >
                                            {address.slice(0, 6) + '...' + address.slice(-4)}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="gradient"
                                            fullWidth
                                            sx={{
                                                fontSize: '12px',
                                            }}
                                            onClick={onConnectButtonClick}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </Box>
                            </Drawer>
                        </Hidden>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Header;
