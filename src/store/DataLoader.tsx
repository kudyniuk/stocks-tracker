import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/init";
import { useUUID } from "./user/user";
import { Account, setAccounts } from "./accounts/accountsSlice";
import { setStocks, Stock } from "./stocks/stocksSlice";

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
        const stocks = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as unknown as Stock[]
        console.log("Stocks loaded", stocks)
        dispatch(setStocks(stocks))
    }), [uuid])


    return <>{children}</>
}

