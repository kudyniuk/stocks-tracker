import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../store/hooks";

export const InvestmentResult: FC = () => {
    const stocks = useAppSelector((state) => state.stocks)
    const stocksPrice = stocks.reduce((acc, stock) => acc + stock.price * stock.amount + stock.fee, 0)
    const actualStockPrice = stocks.reduce((acc, stock) => acc + stock.close * stock.amount * stock.currencyPrice, 0)
    const profitValue = actualStockPrice - stocksPrice
    const profitPerent = - (stocksPrice - actualStockPrice) / stocksPrice * 100

    return <Card>
        <CardHeader title="Result" sx={{ p: 2 }} />
        <CardContent sx={{p: 2}}>
            <Typography variant="h6">
                {Number(actualStockPrice).toFixed(2)} PLN
            </Typography>
            <Box sx={{ color: profitValue >= 0 ? "green" : "red", fontWeight: 'bold' }}>
                {Number(profitValue).toFixed(2)} PLN {Number(profitPerent).toFixed(2)}%
            </Box>
        </CardContent>
    </Card>
}