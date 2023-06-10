import React from 'react';

import { styled } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        backgroundColor: '#27262C',
        color: '#fff',

        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: '#27262C',
            },
        },
    },
}));

const Dropdown = ({ title, array }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                disableRipple
                sx={{
                    color: '#fff',
                    borderRadius: '10px',
                    transition: '1s',
                    fontFamily: 'Poppins',
                    fontSize: { xs: '16px', sm: '16px' },
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textTransform: 'none',
                }}
            >
                {title}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {array.map(({ name, link }, i) => {
                    return (
                        <Link to={link} style={{ textDecoration: 'none', color: '#fff' }} key={i}>
                            <MenuItem onClick={handleClose} disableRipple>
                                {name}
                            </MenuItem>
                        </Link>
                    );
                })}
            </StyledMenu>
        </>
    );
};

export default Dropdown;
