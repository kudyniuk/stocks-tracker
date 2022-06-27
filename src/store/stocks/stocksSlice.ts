import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../../hooks/useCurrencyPrice';


export type Stock = {
    id: string
    ticker: string
    amount: number
    price: number
    currency: Currency
    account: string
    date: number
    fee: number
}

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState: [] as Stock[],
    reducers: {
        setStocks: (state, action: PayloadAction<Stock[]>) => {
            return action.payload
        }
    },
});

export const { setStocks } = stocksSlice.actions;
