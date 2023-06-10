import { Box } from '@mui/material';
import React from 'react';

const LandingPage = () => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>Swap</h1>
            </Box>
        </>
    );
};

export default LandingPage;
