import { Typography } from "@mui/material"
import { FC } from "react"
import { Stock } from "../../store"

type Props = {
    stock: Stock
}

export const StockTotalPrice: FC<Props> = (props) => {
    const { currency, close, currencyPrice, amount, price, fee} = props.stock

    const actualValue = close * amount * currencyPrice
    const buyValue = price * amount
    const profitValue = actualValue - buyValue

    return <>
        {Number(actualValue).toFixed(2)} <span style={{ color: profitValue > 0 ? "green" : "red" }}>({Number(profitValue).toFixed(2)})</span> PLN
    </>
}