import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StockPrice } from './stock-types'

export const stockPriceApi = createApi({
    reducerPath: "stockPriceApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api/", prepareHeaders: (headers) => {
        headers.set("Accept", 'application/json')
        return headers
    }}),
    endpoints: builder => ({
        getStockPrice: builder.query<StockPrice, string>({
            query: (name) => `eod?ticker=${name}`
        })
    })
})

export const {useGetStockPriceQuery} = stockPriceApi