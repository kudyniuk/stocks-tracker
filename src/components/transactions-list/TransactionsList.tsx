
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

export const TransactionsList = () => {
    const stocks = useAppSelector(state => state.stocks)
    const accounts = useAppSelector(state => state.accounts)

    return <Card>
        <CardHeader title="Transactions History" sx={{ p: 2 }} />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell sortDirection="desc">
                                <Tooltip
                                    enterDelay={300}
                                    title="Sort"
                                >
                                    <TableSortLabel
                                        active
                                        direction="desc"
                                    >
                                        Price
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
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
                        {stocks.map((stock) => (
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
                                <TableCell><StockPrice ticker={stock.ticker} /> {stock.currency}</TableCell>
                                <TableCell>{Number(stock.price + stock.fee / stock.amount).toFixed(2)} {stock.currency}</TableCell>
                                <TableCell>
                                    <StockProfit ticker={stock.ticker} baseValue={stock.price} />
                                </TableCell>
                                <TableCell>
                                    <StockPrice ticker={stock.ticker} amount={stock.amount} baseValue={stock.price + stock.fee / stock.amount} /> {stock.currency}
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