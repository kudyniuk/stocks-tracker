
import { useAppSelector } from '../../store/hooks';
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
import { StockPrice } from '../stock-list/StockPrice';
import { StockProfit } from '../stock-list/StockProfit';
import { Delete, Edit } from '@mui/icons-material';
import { format } from 'date-fns'
import { useState } from 'react';

export const TransactionsList = () => {
    const [sortByDate, setSortByDate] = useState<"desc" | "asc">("desc")

    const stocks = useAppSelector(state => state.stocks)
    const sortedStocks = [...stocks].sort((el1, el2) => sortByDate === 'desc'
        ? el1.date - el2.date
        : el2.date - el1.date
    )
    const accounts = useAppSelector(state => state.accounts)

    return <Card>
        <CardHeader title="Transactions History" sx={{ p: 2 }} />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={sortByDate}>
                                <Tooltip
                                    enterDelay={300}
                                    title="Sort by date"
                                >
                                    <TableSortLabel
                                        active
                                        direction={sortByDate}
                                        onClick={() => setSortByDate(sortByDate === "desc" ? "asc" : "desc")}
                                    >
                                        Date
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>
                                Avg. buy price
                            </TableCell>
                            <TableCell>
                                Profit %
                            </TableCell>
                            <TableCell>
                                Total Price
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedStocks.map((stock) => (
                            <TableRow
                                hover
                                key={stock.id}
                            >
                                <TableCell>{format(new Date(stock.date), 'dd-MM-Y')}</TableCell>
                                <TableCell>
                                    {accounts.find(el => el.id === stock.account)?.name || "Unknown"}
                                </TableCell>
                                <TableCell>{stock.ticker}</TableCell>
                                <TableCell>{stock.amount}</TableCell>
                                <TableCell><StockPrice ticker={stock.ticker} currency={stock.currency} /></TableCell>
                                <TableCell>{Number(stock.price + stock.fee / stock.amount).toFixed(2)} PLN</TableCell>
                                <TableCell>
                                    <StockProfit ticker={stock.ticker} baseValue={stock.price} currency={stock.currency} />
                                </TableCell>
                                <TableCell>
                                    <StockPrice ticker={stock.ticker} amount={stock.amount} baseValue={stock.price + stock.fee / stock.amount} currency={stock.currency} />
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
    </Card>
}