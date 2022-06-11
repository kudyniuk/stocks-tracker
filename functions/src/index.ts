import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { intervalToDuration, addDays, format, subDays } from 'date-fns'
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

const BASE_URL = "https://eodhistoricaldata.com/api/eod/"
const API_TOKEN = "?fmt=json&api_token=62a05c606d9d42.95369419"
const DATE_FORMAT = "Y-MM-dd"
export const eod = functions.https.onRequest(async (req, res) => {
    const ticker = (req.query.ticker as string)?.toUpperCase()

    console.log("Request received: ", ticker)
    const db = admin.firestore()

    if (!ticker) {
        res.statusCode = 40
        res.send("Please provide ticker param")
    }

    const today = new Date(format(Date.now(), DATE_FORMAT))
    const yesterday = subDays(today, 1).getTime().toString()


    const document = await db.collection(`stocks_data/${ticker}/eod`).doc(yesterday).get()
    const yesterdayData = document.data()

    if (yesterdayData) {
        console.log("Response yesterday data")
        res.send(yesterdayData)
        return
    }

    db.collection(`stocks_data/${ticker}/eod`).orderBy('date', "desc").limit(1).get().then(async snapshots => {

        if (snapshots.docs.length === 0) {
            console.log("Download full set of data!")

            const data = await fetch(BASE_URL + ticker + API_TOKEN).then((data) => data.json()) as Stock[]
            const mapData = data.map(el => ({ ...el, date: new Date(el.date).getTime() }))

            console.log("data", JSON.stringify(mapData))

            const batch = db.batch()

            mapData.forEach(el => {
                const ref = db.collection(`stocks_data/${ticker}/eod`).doc(el.date.toString())
                batch.set(ref, el)
            })

            batch.commit()

            const [newest] = mapData.sort((el1, el2) => el2.date - el1.date)

            res.send(newest)
            return
        }

        const [data] = snapshots.docs.map(doc => doc.data()) as Stock[]
        const { days = 0 } = intervalToDuration({ start: new Date(data.date), end: today })

        console.log("Days:", days)

        if (days <= 1) {
            res.send(data)
            return
        }

        const from = `&from=${format(addDays(parseInt(data.date), 1), "Y-MM-dd")}`

        const actualData = await fetch(BASE_URL + ticker + API_TOKEN + from).then((data) => data.json()) as Stock[]
        const mapData = actualData.map(el => ({ ...el, date: new Date(el.date).getTime() }))

        const batch = db.batch()

        mapData.forEach(el => {
            const ref = db.collection(`stocks_data/${ticker}/eod`).doc(el.date.toString())
            batch.set(ref, el)
        })

        batch.commit()

        const [newest] = mapData.sort((el1, el2) => el1.date - el2.date)

        res.send(newest)
        return
    })

})