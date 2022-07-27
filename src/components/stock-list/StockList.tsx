import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { FC } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { StockPrice } from './StockPrice';
import { StockProfit } from './StockProfit';
import { Stock } from '../../store/stocks/stock-types';
import { StockTotalPrice } from './StockTotalPrice';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
    advanced?: boolean
    filterByAccounts?: boolean
}

export const StockList: FC<Props> = ({ advanced, filterByAccounts }) => {
    const rawStocks = useAppSelector(state => state.stocks)
    const selectedAccountsId = useAppSelector(state => state.accounts.filter(el => el.checked).map(el => el.id))
    const accounts = useAppSelector(state => state.accounts)
    const navigate = useNavigate();

    const stocksGrouped = Object.entries(rawStocks.filter(el => !filterByAccounts || selectedAccountsId.includes(el.account)).reduce((acc, el) => {
        const values = acc[el.ticker] || []
        acc[el.ticker] = [...values, el]
        return acc
    }, {} as { [key: string]: Stock[] })).map(([ticker, group]) => {
        return group.reduce((acc, el) => ({
            ...acc,
            amount: acc.amount + el.amount,
            fee: acc.fee + el.fee,
            price: (acc.price * acc.amount + el.price * el.amount) / (acc.amount + el.amount)
        }))
    })

    const stocks = advanced ? rawStocks : stocksGrouped

    return <Card>
        <CardHeader title="Stocks" sx={{ p: 2 }} />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {advanced &&
                                <TableCell>Account</TableCell>
                            }
                            <TableCell>Ticker</TableCell>
                            <TableCell>
                                Amount
                            </TableCell>
                            <TableCell sortDirection="desc">
                                <Tooltip
                                    enterDelay={300}
                                    title="Sort"
                                >
                                    <TableSortLabel
                                        active
                                        direction="desc"
                                    >
                                        Kurs
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                Średni koszt nabycia
                            </TableCell>
                            <TableCell>
                                Zysk/Strata
                            </TableCell>
                            <TableCell>
                                Wartość
                            </TableCell>
                            {advanced &&
                                <TableCell>
                                    Actions
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.filter(el => !filterByAccounts || selectedAccountsId.includes(el.account)).map((stock) => (
                            <TableRow
                                hover
                                key={stock.id}
                                onClick={() => navigate(`/stocks/${stock.ticker}`)}
                            >
                                {advanced && <TableCell>
                                    {accounts.find(el => el.id === stock.account)?.name || "Unknown"}
                                </TableCell>}
                                <TableCell>{stock.ticker}</TableCell>
                                <TableCell>{stock.amount}</TableCell>
                                <TableCell><StockPrice stock={stock} /></TableCell>
                                <TableCell>{Number(stock.price + stock.fee / stock.amount).toFixed(2)} PLN</TableCell>
                                <TableCell>
                                    <StockProfit stock={stock} />
                                </TableCell>
                                <TableCell>
                                    <StockTotalPrice stock={stock} />
                                </TableCell>
                                {advanced && <TableCell>
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
    </Card >
}

