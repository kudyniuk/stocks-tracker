import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
// import { SeverityPill } from '../severity-pill';

const orders = [
    {
        ref: 'CDD1049',
        amount: 30,
        price: 100,
        currency: "USD",
        buyPrice: 90,
        profit: '12%',
        value: 1000
    },
];

export const StockList = () => (
    <Card>
        <CardHeader title="Stocks" sx={{ p: 2 }} />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Walor
                            </TableCell>
                            <TableCell>
                                Ilość
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                hover
                                key={order.ref}
                            >
                                <TableCell>
                                    {order.ref}
                                </TableCell>
                                <TableCell>
                                    {order.amount}
                                </TableCell>
                                <TableCell>
                                    {order.price} {order.currency}
                                </TableCell>
                                <TableCell>
                                    {order.buyPrice} {order.currency}
                                </TableCell>
                                <TableCell>
                                    {order.profit}
                                </TableCell>
                                <TableCell>
                                    {order.value} {order.currency}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
    </Card>
);
