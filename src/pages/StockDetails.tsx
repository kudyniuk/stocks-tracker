import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { useAppSelector } from "../store/hooks";

export const StockDetails = () => {
    const { ticker } = useParams();
    const stocks = useAppSelector(state => state.stocks.filter((stock) => stock.ticker === ticker))

    return <Box sx={{ m: 2 }}>
        <Typography>{ticker}</Typography>
        <TransactionsList ticker={ticker} />
    </Box>
}