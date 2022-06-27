import { Card, CardHeader } from "@mui/material";
import { FC, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";



export const InvestmentResult: FC = () => {
    const stocks = useAppSelector((state) => state.stocks)
    const stocksPrice = stocks.reduce((acc, stock) => stock.price * stock.amount + acc + stock.fee, 0)

    return <Card>
         <CardHeader title="Result" sx={{ p: 2 }} />
         <div>
            {stocksPrice} (200 / -2%)
         </div>
    </Card>
}