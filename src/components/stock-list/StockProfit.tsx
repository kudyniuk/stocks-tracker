import { Box } from "@mui/material"
import { FC } from "react"
import { Stock } from "../../store"

type Props = {
    stock: Stock
}

export const StockProfit: FC<Props> = (props) => {
    const {close, currencyPrice, price} = props.stock

    const profit = Number((close * currencyPrice) / price * 100 - 100)

    return <Box sx={{color: profit >= 0 ? "green" : "red", fontWeight: 'bold'}}>
        {profit.toFixed(2)} %
    </Box>
}