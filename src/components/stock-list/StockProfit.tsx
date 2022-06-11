import { Box } from "@mui/material"
import { FC } from "react"
import { useGetStockPriceQuery } from "../../store/stockPriceApi/stockPriceApi"

type Props = {
    ticker: string
    baseValue: number
}

export const StockProfit: FC<Props> = ({ticker, baseValue}) => {
    const {data, error, isLoading} = useGetStockPriceQuery(ticker)

    return isLoading ? <>
        ...
    </> : <Box sx={{color: "green", fontWeight: 'bold'}}>
        {Number((data?.close || 0) / baseValue * 100 - 100).toFixed(2)} %
    </Box>
}