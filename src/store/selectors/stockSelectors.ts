import { RootState } from "../store";


export const selectStockById =
    (stockId: string) =>
        (state: RootState) =>
            state.stocks.find(stock => stock.id === stockId)

export const selectStocksByAccount =
    (accountId: string) =>
        (state: RootState) =>
            state.stocks.filter(stock => stock.account === accountId)

