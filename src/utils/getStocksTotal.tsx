import { Stock } from "../store";

export const getStocksTotal = (stocks: Stock[]) => {
    return stocks.reduce((acc, el) => {
        console.log(el)
        return {
            closePrice: acc.closePrice + el.close * el.amount * el.currencyPrice,
            price: acc.price + el.price * el.amount + el.fee
        }
    }, {closePrice: 0, price: 0})
}   