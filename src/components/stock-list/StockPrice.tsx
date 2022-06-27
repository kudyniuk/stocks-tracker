import { Typography } from "@mui/material"
import { FC } from "react"
import { Currency, useCurrencyPrice } from "../../hooks/useCurrencyPrice"
import { useGetStockPriceQuery } from "../../store/stockPriceApi/stockPriceApi"

type SingleStockPriceProps = {
    ticker: string
    currency: Currency
}

type FullStockPriceProps = {
    ticker: string
    amount: number
    baseValue: number
    currency: Currency
}

type Props = SingleStockPriceProps | FullStockPriceProps

const isFullPrice = (props: Props): props is FullStockPriceProps => {
    return props.hasOwnProperty("amount")
}

export const StockPrice: FC<SingleStockPriceProps | FullStockPriceProps> = (props) => {
    const { ticker } = props
    const { data, error, isLoading } = useGetStockPriceQuery(ticker)
    const currencyFetch = useCurrencyPrice(props.currency)


    if (isLoading || currencyFetch.isLoading) {
        return <>...</>
    }

    if (isFullPrice(props)) {
        const { amount, baseValue } = props
        const closePrice = data?.close || 0
        const actualValue = closePrice * amount * currencyFetch.value
        const buyValue = baseValue * amount
        const profitValue = actualValue - buyValue
        return <>
            {Number(actualValue).toFixed(2)} <span style={{ color: profitValue > 0 ? "green" : "red" }}>({Number(profitValue).toFixed(2)})</span> PLN
        </>
    }

    const closePrice = data?.close || 0

    return <>
        <div>
            {Number(closePrice * currencyFetch.value).toFixed(2)} PLN
        </div>
        {props.currency !== "PLN" && <Typography
            color="neutral.500"
            fontSize={12}
        >
            {Number(closePrice).toFixed(2)} {props.currency}
        </Typography>}
    </>
}