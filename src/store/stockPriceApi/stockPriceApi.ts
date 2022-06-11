import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Stock = {
    date: string
    open: number
    high: number
    low: number
    close: number
    adjusted_close: number
    volume: number
}

export const stockPriceApi = createApi({
    reducerPath: "stockPriceApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api/stocks-tracker-dev/us-central1/", prepareHeaders: (headers) => {
        headers.set("Accept", 'application/json')
        return headers
    }}),
    endpoints: builder => ({
        getStockPrice: builder.query<Stock, string>({
            query: (name) => `eod?ticker=${name}`
        })
    })
})

export const {useGetStockPriceQuery} = stockPriceApi