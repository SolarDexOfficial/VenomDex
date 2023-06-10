import React, { useState } from 'react';
import SwapModal from './SwapModal';
// import SwapDetails from './SwapDetails';
import { Container, Grid } from '@mui/material';
import SwapGraph from './SwapGraph';
import PairInfo from './PairInfo';

const Swap = () => {
    const [showChart, setShowChart] = useState(true);
    const [showInfo, setShowInfo] = useState(true);
    // eslint-disable-next-line
    const [chartInput, setChartInput] = useState('Solar');
    // eslint-disable-next-line
    const [chartOutput, setChartOutput] = useState('Venom');

    const toggleChart = () => {
        setShowChart((prev) => (prev ? false : true));
    };
    const toggleInfo = () => {
        setShowInfo((prev) => (prev ? false : true));
    };
    return (
        <Container>
            <Grid
                container
                spacing={2}
                sx={{
                    transition: 'all 0.3s',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={showChart || showInfo ? 6 : 12}
                    sx={{
                        transition: 'all 0.3s',
                    }}
                >
                    <SwapModal
                        showChart={showChart}
                        showInfo={showInfo}
                        toggleChart={toggleChart}
                        toggleInfo={toggleInfo}
                    />
                    {/* <SwapDetails /> */}
                </Grid>
                {showChart && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            transition: 'all 0.3s',
                        }}
                    >
                        <SwapGraph chartInput={chartInput} chartOutput={chartOutput} />
                    </Grid>
                )}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        transition: 'all 0.3s',
                    }}
                ></Grid>
                {showInfo && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            transition: 'all 0.3s',
                        }}
                    >
                        <PairInfo />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Swap;
