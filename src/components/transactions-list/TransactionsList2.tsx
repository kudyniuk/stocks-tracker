
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
import { Stock } from '../../store';
import { Add } from '@mui/icons-material';

type Props = {
    stocks: Stock[]
    disableAccountsColumn?: boolean
}

export const TransactionsList2: FC<Props> = ({ stocks, disableAccountsColumn }) => {
    const [sortByDate, setSortByDate] = useState<"desc" | "asc">("desc")
    const dispatch = useAppDispatch()
    
    const sortedStocks = [...stocks].sort((el1, el2) => sortByDate === 'desc'
        ? el1.date - el2.date
        : el2.date - el1.date
    )
    const accounts = useAppSelector(state => state.accounts)
    const defaultAccount = stocks[0]?.account

    return <Card>
        <CardHeader title="Transactions History" action={
          <IconButton aria-label="add" onClick={() => dispatch(openEditStockModal({type: "ADD", defaultAccount}))}>
            <Add />
          </IconButton>
        } sx={{ p: 2 }} />
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
                            {!disableAccountsColumn && <TableCell>Account</TableCell>}
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
                                {!disableAccountsColumn && <TableCell>
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
                                <TableCell>
                                    <IconButton onClick={() => dispatch(openEditStockModal({type: "EDIT", id: stock.id}))}>
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