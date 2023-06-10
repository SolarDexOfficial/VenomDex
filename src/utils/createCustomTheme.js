import { createTheme } from '@mui/material/styles';

const themeObj = {
    light: {
        text: {
            primary: '#000',
        },
        background: {
            hard: '#fff',
            glass: 'rgba(189, 189, 189,0.20)',
            medium: '#fdfdfd',
            light: '#efefef',
            borderLight: 'rgb(189, 189, 189)',
            shadow: '#000',
            color1: '#6C7DEB',
            color2: '#14A481',
            greenColor: 'rgba(27,200,112,1)',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
        },
    },

    dark: {
        text: {
            primary: '#fff',
        },
        background: {
            hard: '#000',
            glass: 'rgba(0, 0, 0,0.20)',
            medium: '#151515',
            light: '#212121',
            borderLight: '#424242',
            shadow: '#000',
            color1: '#6C7DEB',
            color2: '#14A481',
            greenColor: 'rgba(27,200,112,1)',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
        },
    },
};

export const createCustomTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...themeObj[mode],
        },
        typography: {
            fontFamily: ['"Poppins"', '"Squada One"', 'sans-serif'].join(','),
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => `
		    body {
		      background-color: ${theme.palette.mode === 'dark' ? '#131213' : '#fdfdfd'}
		    }
		  `,
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'gradient' },
                        style: {
                            background: 'linear-gradient(97.01deg, #14A481 8.16%, #552FDA 103.71%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: '"Poppins", sans-serif',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(97.01deg, #552FDA 8.16%, #14A481 103.71%)',
                            },
                        },
                    },
                ],
            },
        },
    });
