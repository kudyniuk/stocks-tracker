import { Stock } from "../store"

export const groupStocks = (stocks: Stock[]) => {
    return Object.entries(stocks.reduce((acc, el) => {
        const values = acc[el.ticker] || []
        acc[el.ticker] = [...values, el]
        return acc
    }, {} as { [key: string]: Stock[] })).map(([ticker, group]) => {
        return group.reduce((acc, el) => ({
            ...acc,
            amount: acc.amount + el.amount,
            fee: acc.fee + el.fee,
            price: (acc.price * acc.amount + el.price * el.amount) / (acc.amount + el.amount)
        }))
    })
}

