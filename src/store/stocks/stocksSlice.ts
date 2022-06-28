import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockTransaction } from './stock-types';
import { resolveCurrency } from './resolveCurrency';
import { stockPriceApi } from './stockPriceApi';
import { Stock } from './stock-types';
import { createStock } from './createStock';

export const loadStocks = createAsyncThunk<Stock[], StockTransaction[], {rejectValue: string}>(
    'stocks/setStocks',
    async (stockTransactions, thunkApi) => {
        try {
            const promises = stockTransactions.map(async (stock) => {
                const stockPricePromise = thunkApi.dispatch(stockPriceApi.endpoints.getStockPrice.initiate(stock.ticker))
                const {symbol, multiplier = 1} = resolveCurrency(stock.currency)

                if(symbol) {
                    const currencyPromise = thunkApi.dispatch(stockPriceApi.endpoints.getStockPrice.initiate(symbol))

                    const [stockResult, currencyResult] = await Promise.all([stockPricePromise, currencyPromise])
                    const stockData = stockResult.data
                    const closePrice = currencyResult.data?.close || 0 
                    const currencyPrice = closePrice * multiplier

                    if(!stockData) {
                        throw new Error()
                    }

                    return createStock(stock, stockData, currencyPrice)
                }

                const stockResult = await stockPricePromise
                const stockData = stockResult.data

                if(!stockData) {
                    throw new Error()
                }

                return createStock(stock, stockData, 1)
            })

            return await Promise.all(promises)
        } catch(error) {
            return thunkApi.rejectWithValue('Cannot load stocks')
        }
    }
)

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState: [] as Stock[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadStocks.fulfilled, (state, {payload}) => {
            return payload
        }),
        builder.addCase(loadStocks.rejected, () => {
            return
        })
    }
});
