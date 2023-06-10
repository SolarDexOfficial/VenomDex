import React, { useContext, useEffect, useState } from 'react';
import { Box, Dialog, Stack, useMediaQuery, InputBase, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search, Token } from '@mui/icons-material';

import { DataContext } from '../../utils/Context';
import { tokenList } from '../../utils/tokenList';

export default function TokenList() {
    const {
        currentTokenSelection,
        setSelectedToken,
        selectedToken,
        toggleList,
        openList,
        tokenContract,
    } = useContext(DataContext);
    const [search, setSearch] = useState('');
    const [addToken, setAddToken] = useState(false);
    const [completeList, setCompleteList] = useState([]);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const tokenChange = (list) => {
        setSelectedToken((prev) => {
            return {
                ...prev,
                [currentTokenSelection]: {
                    name: list.name,
                    symbol: list.symbol,
                    image: list.image,
                    decimals: list.decimals,
                    convertId: list.convertId,
                },
            };
        });
        toggleList();
    };

    const searchFn = (e) => {
        let obj = tokenList.find((o) => o.address === e.target.value);
        setSearch(e.target.value);
        if (!e.target.value) {
            setAddToken(false);
        } else if (!obj) {
            setAddToken(true);
        } else {
            setAddToken(false);
        }
    };

    useEffect(() => {
        let list = localStorage.getItem('tokens');
        console.log(list);
        if (list) {
            list = JSON.parse(list);
            list = [...list, ...tokenList];
            setCompleteList(list);
        } else {
            setCompleteList(tokenList);
        }
    }, []);

    const added = async () => {
        const name = await tokenContract.methods
            .name({
                answerId: 0,
            })
            .call();
        const decimals = await tokenContract.methods
            .decimals({
                answerId: 0,
            })
            .call();
        const symbol = await tokenContract.methods
            .symbol({
                answerId: 0,
            })
            .call();
        if (decimals) {
            let prev = localStorage.getItem('tokens');
            if (prev) {
                prev = JSON.parse(prev);
                prev.push({
                    name: name.value0,
                    symbol: symbol.value0,
                    image: null,
                    decimals: decimals.value0,
                    address: search,
                });
                prev = JSON.stringify(prev);
                localStorage.setItem(prev, 'tokens');
            } else {
                let data = [
                    {
                        name: name.value0,
                        symbol: symbol.value0,
                        image: null,
                        decimals: decimals.value0,
                        address: search,
                    },
                ];
                data = JSON.stringify(data);
                localStorage.setItem(data, 'tokens');
            }
        }
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={openList}
                onClose={() => toggleList()}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: `${theme.palette.background.light}`,
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Stack direction="column" gap={2}>
                        <Box fontSize="20px" fontWeight={500}>
                            Select a Currency
                        </Box>
                        <Box
                            sx={{
                                background: `${theme.palette.background.hard}`,
                                border: `2px solid ${theme.palette.background.borderLight}`,
                                borderRadius: '5px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                px: 2,
                                py: 0.7,
                            }}
                        >
                            <Search />
                            <InputBase
                                sx={{ width: '100%' }}
                                onChange={(e) => searchFn(e)}
                                value={search}
                                placeholder="Type a Currency"
                            />
                        </Box>
                        {addToken ? (
                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{
                                    cursor: 'pointer',
                                    gap: 2,
                                    py: 1.5,
                                    pl: 3,
                                    pr: 3,
                                    border: `1px solid ${theme.palette.background.borderLight}`,
                                    borderRadius: '10px',
                                    boxShadow: `0px 3px 9px ${theme.palette.background.shadow}`,
                                    transition: 'all 0.2s ease-in',
                                    background: `${theme.palette.background.medium}`,
                                    '&:hover': {
                                        pl: 4,
                                        gap: 2.5,
                                        background: `${theme.palette.background.light}`,
                                    },
                                }}
                            >
                                <Token />

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <Typography fontSize="14px" fontWeight="600">
                                        {search}
                                    </Typography>
                                    <Button onClick={() => added()}>Add</Button>
                                </Stack>
                            </Stack>
                        ) : (
                            completeList
                                .filter((list) => {
                                    let re = new RegExp(search, 'gi');
                                    return list.name.match(re);
                                })
                                .filter((list) => {
                                    return list.name !== selectedToken[currentTokenSelection].name;
                                })
                                .map((list, index) => (
                                    <Stack
                                        onClick={() => tokenChange(list)}
                                        key={index}
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            cursor: 'pointer',
                                            gap: 2,
                                            py: 1.5,
                                            pl: 3,
                                            pr: 3,
                                            border: `1px solid ${theme.palette.background.borderLight}`,
                                            borderRadius: '10px',
                                            boxShadow: `0px 3px 9px ${theme.palette.background.shadow}`,
                                            transition: 'all 0.2s ease-in',
                                            background: `${theme.palette.background.medium}`,
                                            '&:hover': {
                                                pl: 4,
                                                gap: 2.5,
                                                background: `${theme.palette.background.light}`,
                                            },
                                        }}
                                    >
                                        {list.image ? (
                                            <img
                                                src={list?.image}
                                                alt="coin"
                                                width="30px"
                                                height="30px"
                                            />
                                        ) : (
                                            <Token />
                                        )}
                                        <Stack direction="column">
                                            <Typography fontSize="14px" fontWeight="600">
                                                {list?.name}
                                            </Typography>
                                            <Typography
                                                fontSize="11px"
                                                fontWeight="400"
                                                color="#C3C1C1"
                                            >
                                                {list?.symbol}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                ))
                        )}
                    </Stack>
                </Box>
            </Dialog>
        </>
    );
}
