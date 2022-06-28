import { Stock, StockPrice, StockTransaction } from "./stock-types";

export const createStock = (
    stockTransaction: StockTransaction,
    stockPriceData: StockPrice,
    currencyPrice: number): Stock => {

    return {
        ...stockTransaction,
        close: stockPriceData.close,
        currencyPrice,
    }
}