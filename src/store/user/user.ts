import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as AuthUser } from "firebase/auth";
import { useAppSelector } from "../hooks";

type User = AuthUser

export const userSlice = createSlice({
    name: 'user',
    initialState: null as any as User,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return action.payload
        },
    },
});

export const getUUID = () => useAppSelector(state => state.user.uid)

export const { setUser } = userSlice.actions;
