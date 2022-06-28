import { Typography } from "@mui/material"
import { FC } from "react"
import { Stock } from "../../store"

type Props = {
    stock: Stock
}

export const StockPrice: FC<Props> = (props) => {
    const { currency, close, currencyPrice } = props.stock

    // if (isFullPrice(props)) {
    //     const { amount, baseValue } = props
    //     const closePrice = data?.close || 0
    //     const actualValue = closePrice * amount * currencyFetch.value
    //     const buyValue = baseValue * amount
    //     const profitValue = actualValue - buyValue
    //     return <>
    //         {Number(actualValue).toFixed(2)} <span style={{ color: profitValue > 0 ? "green" : "red" }}>({Number(profitValue).toFixed(2)})</span> PLN
    //     </>
    // }

    // const closePrice = data?.close || 0

    return <>
        <div>
            {Number(close * currencyPrice).toFixed(2)} PLN
        </div>
        {currency !== "PLN" && <Typography
            color="neutral.500"
            fontSize={12}
        >
            {Number(close).toFixed(2)} {currency}
        </Typography>}
    </>
}