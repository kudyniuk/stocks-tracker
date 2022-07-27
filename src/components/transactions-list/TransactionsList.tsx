
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
import { FC, useState } from 'react';
import { StockTotalPrice } from '../stock-list/StockTotalPrice';
import { openEditStockModal } from '../modals/edit-stock/edit-stock-modal';
import { openDeleteStockModal } from '../modals/delete-stock/delete-stock-modal';

type Props = {
    ticker?: string
}

export const TransactionsList: FC<Props> = ({ ticker = "" }) => {
    const [sortByDate, setSortByDate] = useState<"desc" | "asc">("desc")
    const dispatch = useAppDispatch()
    
    const stocks = useAppSelector(state => state.stocks.filter(stock => stock.ticker.includes(ticker)))
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
                                <TableCell><StockPrice stock={stock} /></TableCell>
                                <TableCell>{Number(stock.price + stock.fee / stock.amount).toFixed(2)} PLN</TableCell>
                                <TableCell>
                                    <StockProfit stock={stock} />
                                </TableCell>
                                <TableCell>
                                    <StockTotalPrice stock={stock} />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => dispatch(openEditStockModal({ticker: stock.ticker}))}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => dispatch(openDeleteStockModal({stockId: stock.id}))}>
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