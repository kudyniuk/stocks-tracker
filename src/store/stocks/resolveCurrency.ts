import { Currency } from "./stock-types"

export const resolveCurrency = (currency: Currency) => {
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
