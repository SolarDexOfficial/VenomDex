import React, { useContext } from 'react';
import { ThemeProvider, Backdrop, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner';
import { Navigate, Route, Routes } from 'react-router';

import { DataContext } from './utils/Context';
import Header from './Components/Header';
import Footer from './Components/Footer';
import TokenList from './Components/Modals/TokenList';
import Liquidity from './Pages/Liquidity/Home';
import SubHeader from './Components/SubHeader';
import Swap from './Pages/Swap/Home';
import AddLiquidity from './Pages/Liquidity/AddLiquidity';

const App = () => {
    const { mode, loader, themeClient } = useContext(DataContext);
    const theme = useTheme();

    return (
        <>
            <ThemeProvider theme={themeClient}>
                <CssBaseline enableColorScheme />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={mode}
                />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loader}
                >
                    <InfinitySpin width="200" color={`${theme.palette.text.primary}`} />
                </Backdrop>
                <TokenList />
                <Header />
                <SubHeader />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/swap" />} />
                    <Route path="/swap" element={<Swap />} />
                    <Route path="/liquidity" element={<Liquidity />} />
                    <Route path="/addLiquidity" element={<AddLiquidity />} />
                </Routes>
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default App;
