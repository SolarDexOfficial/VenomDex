import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab, TableContainer, Table, useTheme } from '@mui/material';
import { createClient } from 'urql';
import { SwapHoriz, Height } from '@mui/icons-material';
import { AreaChart, Area, Tooltip } from 'recharts';

import img1 from '../../Components/images/footLogo.png';
import img2 from '../../Components/images/solar.png';

const chartData = [
    {
        uv: 4000,
        // pv: 2400,
        // amt: 2400
    },
    {
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        uv: 2090,
        pv: 40,
        amt: 100,
    },
    {
        uv: 2790,
        pv: 4300,
        amt: 2100,
    },
];

const tabsStyles = {
    '& .Mui-selected': {
        color: '#fff !important',
        background: '#14A481',
        borderRadius: '21px',
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    backgroundColor: '#1E212A',
    minHeight: '20px',
    borderRadius: '21.1433px',
    padding: 0,
    margin: 0,
};

const tabStyles = {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    borderRadius: '21px',
    minHeight: '20px',
    maxWidth: '20px',
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SwapGraph = ({ chartOutput, chartInput }) => {
    const [value, setValue] = React.useState(0);
    // eslint-disable-next-line
    const [data, setData] = useState([]);
    const APIURL = 'https://api.thegraph.com/subgraphs/name/sehrishramzan/subgraph-polygon';

    const query = `
	query ($symbol1: String, $symbol2: String) {
		pairs(where: {token0_: {symbol: $symbol1}, token1_: {symbol: $symbol2}}) {
		  id
		  token0 {
			symbol
		  }
		  token1 {
			symbol
		  }
		  reserve0
		  reserve1
		  createdAtTimestamp
		}
	  }
`;

    const client = createClient({
        url: APIURL,
    });

    async function fetchData() {
        const {
            data: { pairs: data },
        } = await client
            .query(query, {
                symbol1: chartInput,
                symbol2: chartOutput,
            })
            .toPromise();
        const arr = data?.map((pair) => {
            let data = {
                name: pair.createdAtTimestamp,
                uv: pair.reserve0 / pair.reserve1,
            };
            return data;
        });
        setData(arr);
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();
    return (
        <Box
            sx={{
                background: `linear-gradient(to right, ${theme.palette.background.color1}, ${theme.palette.background.color2})`,
                padding: '3px',
                borderRadius: '15px',
                boxShadow: `0px 0px 8px 0px ${theme.palette.background.shadow}`,
                mt: 5,
            }}
        >
            <Box
                sx={{
                    background: `${theme.palette.background.medium}`,
                    borderRadius: '15px',
                    py: 5.7,
                    px: 3,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <img
                            src={img2}
                            style={{ width: '30px', height: '30px', aspectRatio: '1/1' }}
                        />
                        <img
                            src={img1}
                            style={{ width: '30px', height: '30px', aspectRatio: '1/1' }}
                        />
                        <Typography variant="h6" fontSize="bolder">
                            {chartInput}/{chartOutput}
                        </Typography>
                        <SwapHoriz
                            sx={{ marginLeft: '1rem', color: '#1FC7D4', fontSize: '2rem' }}
                        />
                    </Box>
                    <Height />
                </Box>
                <Box py={2}>
                    <Grid container>
                        <Grid item md={6} xs={11}>
                            <Typography
                                variant="h5"
                                sx={{ fontSize: { xs: '12px', sm: '16px' } }}
                                component="span"
                            >
                                80.51{' '}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '12px', sm: '16px' } }}
                                component="span"
                            >
                                Solar/Venom
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                                component="span"
                                color="#ED4B9E"
                            >
                                -0.015 (-0.02%)
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                                color="#653AAF"
                            >
                                Jan 10, 2023, 01:01 PM
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { md: 'flex-end', xs: 'center' },
                                    mt: { xs: '20px', md: '0px' },
                                }}
                            >
                                <Tabs
                                    variant="scrollable"
                                    value={value}
                                    sx={tabsStyles}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab
                                        style={{ color: 'white' }}
                                        sx={tabStyles}
                                        label="24H"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        style={{ color: 'white' }}
                                        sx={tabStyles}
                                        label="1W"
                                        {...a11yProps(1)}
                                    />
                                    <Tab
                                        style={{ color: 'white' }}
                                        sx={tabStyles}
                                        label="1M"
                                        {...a11yProps(2)}
                                    />
                                    <Tab
                                        style={{ color: 'white' }}
                                        sx={tabStyles}
                                        label="1Y"
                                        {...a11yProps(3)}
                                    />
                                </Tabs>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: { xs: '20px', md: '0px' } }}>
                        <TableContainer
                            sx={{
                                overflowX: 'scroll',
                                '::-webkit-scrollbar': {
                                    width: '0px',
                                    height: '0px',
                                },
                            }}
                        >
                            <Table
                                sx={{
                                    width: '100%',
                                }}
                                aria-label="simple table"
                            >
                                <AreaChart
                                    width={820}
                                    height={400}
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs></defs>

                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#14A481"
                                        fill="#14a48035"
                                    />
                                </AreaChart>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SwapGraph;
