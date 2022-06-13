import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { format } from 'date-fns'
import fetch from 'node-fetch'

admin.initializeApp()

type Stock = {
    date: string
    open: number
    high: number
    low: number
    close: number
    adjusted_close: number
    volume: number
}

type TickerData = {
    lastDataRef: string
    updateDate: number
} | undefined

const BASE_URL = "https://eodhistoricaldata.com/api/eod/"
const API_TOKEN = "?fmt=json&api_token=62a05c606d9d42.95369419"
const DATE_FORMAT = "Y-MM-dd"

export const eod = functions.https.onRequest(async (req, res) => {
    const ticker = (req.query.ticker as string)?.toUpperCase()

    console.log("Request received: ", ticker)

    const db = admin.firestore()

    if (!ticker) {
        res.statusCode = 400
        res.send("Please provide correct ticker")
    }


    const tickerDataRef = db.doc(`stocks_data/${ticker}`)
    const tickerData = (await tickerDataRef.get()).data() as TickerData

    const shouldUpdateData = !isToday(tickerData?.updateDate)

    if (shouldUpdateData || !tickerData?.lastDataRef) {
        const from = tickerData?.updateDate ? `&from=${format(new Date(tickerData.updateDate), "Y-MM-dd")}` : ""

        try {
            const actualData = await fetch(BASE_URL + ticker + API_TOKEN + from).then((data) => data.json()) as Stock[]
            const mapData = actualData.map(normalizeData)

            const batch = db.batch()

            mapData.forEach(el => {
                const ref = db.collection(`stocks_data/${ticker}/eod`).doc(el.date.toString())
                batch.set(ref, el)
            })

            batch.commit()

            const [newest] = mapData.sort((el1, el2) => el2.date - el1.date)

            const lastDataRef = db.doc(`stock_data/${ticker}/eod/${newest.date}`)
            await db.doc(`stocks_data/${ticker}`).set({
                lastDataRef,
                updateDate: getToday()
            })

            res.send(newest)
        } catch (err) {
            await db.doc(`stocks_data/${ticker}`).set({
                updateDate: getToday()
            }, { merge: true })

            if(tickerData?.lastDataRef) {
                const data = (await db.doc(tickerData?.lastDataRef).get()).data()
                res.send(data)
            } else {
                res.statusCode = 404
                res.send()
            }
        }
    } else {
        const data = (await db.doc(tickerData?.lastDataRef).get()).data()
        res.send(data)
    }
})

const isToday = (timestamp?: number): boolean => {
    return getToday() === timestamp
}

const getToday = (): number => {
    return new Date(format(Date.now(), DATE_FORMAT)).getTime()
}

const normalizeData = (el: Stock) => ({ ...el, date: new Date(el.date).getTime() })