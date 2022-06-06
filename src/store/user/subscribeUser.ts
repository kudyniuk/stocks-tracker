import { Store } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setUser } from "./user";

export const subscribeUser = (store: Store) => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        const userJSON = user?.toJSON() as User || null
        store.dispatch(setUser(userJSON))
    })
}