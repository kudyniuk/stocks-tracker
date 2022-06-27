import { Box } from "@mui/material"
import { FC } from "react"
import { Currency, useCurrencyPrice } from "../../hooks/useCurrencyPrice"
import { useGetStockPriceQuery } from "../../store/stockPriceApi/stockPriceApi"

type Props = {
    ticker: string
    baseValue: number
    currency: Currency
}

export const StockProfit: FC<Props> = ({ticker, baseValue, currency}) => {
    const {data, error, isLoading} = useGetStockPriceQuery(ticker)
    const currencyFetch = useCurrencyPrice(currency)

    if(isLoading || currencyFetch.isLoading) {
        return <>...</>
    }

    const profit = Number(((data?.close || 0) * currencyFetch.value) / baseValue * 100 - 100)

    return <Box sx={{color: profit >= 0 ? "green" : "red", fontWeight: 'bold'}}>
        {profit.toFixed(2)} %
    </Box>
}