export type StockPrice = {
    date: string
    open: number
    high: number
    low: number
    close: number
    adjusted_close: number
    volume: number
}

export type StockTransaction = {
    id: string
    ticker: string
    amount: number
    price: number
    currency: Currency
    account: string
    date: number
    fee: number
}

export type Currency = "USD" | "GBP" | "EUR" | "GBX" | "PLN"

export type Stock = StockTransaction & Pick<StockPrice, "close"> & {
    currencyPrice: number
}