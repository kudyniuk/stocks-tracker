import { FC } from "react"
import { useGetStockPriceQuery } from "../../store/stockPriceApi/stockPriceApi"

type SingleStockPriceProps = {
    ticker: string
}

type FullStockPriceProps = {
    ticker: string
    amount: number
    baseValue: number
}

type Props = SingleStockPriceProps | FullStockPriceProps

const isFullPrice = (props: Props): props is FullStockPriceProps => {
    return props.hasOwnProperty("amount")
}

export const StockPrice: FC<SingleStockPriceProps | FullStockPriceProps> = (props) => {
    const { ticker } = props
    const {data, error, isLoading} = useGetStockPriceQuery(ticker)


    if(isLoading) {
        return <>...</>
    }

    if(isFullPrice(props)) {
        const {amount, baseValue} = props
        const closePrice = data?.close || 0
        const actualValue = closePrice * amount
        const buyValue = baseValue * amount
        const profitValue = actualValue - buyValue
        return <>
            {Number(actualValue).toFixed(2)} <span style={{color: profitValue > 0 ? "green" : "red"}}>({Number(profitValue).toFixed(2)})</span>
        </>
    }


    return <>
        {data?.close}
    </>
}