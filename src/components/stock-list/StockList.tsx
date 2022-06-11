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


type Props = {
    advanced?: boolean
    filterByAccounts?: boolean
}

export const StockList: FC<Props> = ({ advanced, filterByAccounts }) => {
    const stocks = useAppSelector(state => state.stocks)
    const selectedAccountsId = useAppSelector(state => state.accounts.filter(el => el.checked).map(el => el.id))
    const accounts = useAppSelector(state => state.accounts)


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
                            >
                                {advanced && <TableCell>
                                    {accounts.find(el => el.id === stock.account)?.name || "Unknown"}
                                </TableCell>}
                                <TableCell>{stock.ticker}</TableCell>
                                <TableCell>{stock.amount}</TableCell>
                                <TableCell><StockPrice ticker={stock.ticker}/> {stock.currency}</TableCell>
                                <TableCell>{Number(stock.price + stock.fee / stock.amount).toFixed(2)} {stock.currency}</TableCell>
                                <TableCell>
                                    <StockProfit ticker={stock.ticker} baseValue={stock.price}/>
                                </TableCell>
                                <TableCell>
                                    <StockPrice ticker={stock.ticker} amount={stock.amount} baseValue={stock.price + stock.fee / stock.amount} /> {stock.currency}
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

