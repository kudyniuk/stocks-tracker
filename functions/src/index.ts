import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { intervalToDuration, addDays, format } from 'date-fns'
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

export const eod = functions.https.onRequest(async (req, res) => {
    const ticker  = (req.query.ticker as string)?.toUpperCase()
    const db = admin.firestore()

    if(!ticker) {
        res.statusCode = 404
        res.send("Ticker not set")
    }

    const today = new Date(Date.now())

    db.collection(`stocks_data/${ticker}/eod`).orderBy('date', "desc").limit(1).get().then(async snapshots => {

        if(snapshots.docs.length === 0) {
            console.log("Download full set of data!")
            

            const data = await fetch(BASE_URL + ticker + API_TOKEN).then((data) => data.json()) as Stock[]
            const mapData = data.map(el => ({...el, date: new Date(el.date).getTime()}))

            const batch = db.batch()

            mapData.forEach(el => {
                const ref = db.collection(`stocks_data/${ticker}/eod`).doc(el.date.toString())
                batch.set(ref, el)
            })            

            batch.commit()

            const [newest] = mapData.sort((el1, el2) => el1.date - el2.date)

            res.send(newest)
        }

        const [data] = snapshots.docs.map(doc => doc.data()) as Stock[]
        const { days = 0 } = intervalToDuration({start: new Date(data.date), end: today})

        console.log("Days:", days)

        if(days <= 1) {
            res.send(data)
        }

        const from = `&from=${format(addDays(parseInt(data.date), 1), "Y-MM-dd")}`

        const actualData = await fetch(BASE_URL + ticker + API_TOKEN + from).then((data) => data.json()) as Stock[] 
        const mapData = actualData.map(el => ({...el, date: new Date(el.date).getTime()}))

        const batch = db.batch()

        mapData.forEach(el => {
            const ref = db.collection(`stocks_data/${ticker}/eod`).doc(el.date.toString())
            batch.set(ref, el)
        })           

        batch.commit()

        const [newest] = mapData.sort((el1, el2) => el1.date - el2.date)

        res.send(newest)
    })

})