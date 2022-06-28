import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/init";
import { useUUID } from "./user/user";
import { Account, setAccounts } from "./accounts/accountsSlice";
import { loadStocks } from "./stocks/stocksSlice";
import { StockTransaction } from "./stocks/stock-types";

type Props = {
    children: ReactNode
}

export const DataLoader: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch()
    const uuid = useUUID()

    useEffect(() =>
        onSnapshot(collection(db, "user_data", uuid, "accounts"), (snapshot) => {
            const accounts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as unknown as Account[]
            console.log("Accounts loaded", accounts)
            dispatch(setAccounts(accounts))
        }), [uuid]
    )

    useEffect(() => onSnapshot(collection(db, "user_data", uuid, "stocks"), (snapshot) => {
        const stocks = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as unknown as StockTransaction[]
        console.log("Stocks loaded", stocks)
        dispatch(loadStocks(stocks))
    }), [uuid])

    return <>{children}</>
}

