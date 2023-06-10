import React from 'react';

import App from './App';
import ContextAPI from './utils/Context';
import { BrowserRouter } from 'react-router-dom';

// Pass client to React Context Provider
function WagmiUtils() {
    return (
        <BrowserRouter>
            <ContextAPI>
                <App />
            </ContextAPI>
        </BrowserRouter>
    );
}

export default WagmiUtils;
