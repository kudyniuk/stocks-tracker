import { useGetStockPriceQuery } from "../store/stockPriceApi/stockPriceApi"

export type Currency = "USD" | "GBP" | "EUR" | "GBX" | "PLN"


const resolveCurrency = (currency: Currency) => {
    switch (currency) {
        case "USD":
            return {
                symbol: "USDPLN.FOREX",
            }
        case "GBP":
            return {
                symbol: "GBPPLN.FOREX",
            }
        case "EUR":
            return {
                symbol: "EURPLN.FOREX",
            }
        case "PLN":
            return {
                multiplier: 1
            }
        case "GBX":
            return {
                symbol: "GBPPLN.FOREX",
                multiplier: 0.01
            }
    }
}

export const useCurrencyPrice = ( currency: Currency) => {
    const { symbol, multiplier = 1 } = resolveCurrency(currency)

    if (!symbol) {
        return {
            value: multiplier,
            isLoading: false,
            error: null
        }
    }

    const { data, isLoading, error } = useGetStockPriceQuery(symbol)

    const closePrice = data?.close || 0

    return {
        value: closePrice * multiplier,
        isLoading,
        error,
    }
}