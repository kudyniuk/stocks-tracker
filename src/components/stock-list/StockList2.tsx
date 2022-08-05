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
import { StockPrice } from './StockPrice';
import { StockProfit } from './StockProfit';
import { StockTotalPrice } from './StockTotalPrice';
import { Stock } from '../../store';
import { useNavigate } from 'react-router-dom';

type Props = {
    title: string
    stocks?: Stock[]
}

export const StockList2: React.FC<Props> = ({title, stocks = []}) => {
    const navigate = useNavigate()
    
    return <Card>
        <CardHeader title={title} sx={{ p: 2 }} />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock) => (
                            <TableRow
                                hover
                                key={stock.id}
                                onClick={() => navigate(`/stocks/${stock.ticker}`)}
                            >
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
    </Card >
}