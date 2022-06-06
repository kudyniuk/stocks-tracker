import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/init";
import { getUUID } from "./user/user";
import { Account, setAccounts } from "./accounts/accountsSlice";

type Props = {
    children: ReactNode
}

export const DataLoader: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch()
    const uuid = getUUID()

    useEffect(() =>
        onSnapshot(collection(db, "user_data", uuid, "accounts"), (snapshot) => {
            const accounts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as unknown as Account[]
            console.log("Accounts loaded", accounts)
            dispatch(setAccounts(accounts))
        }), []
    )

    return <>{children}</>
}

