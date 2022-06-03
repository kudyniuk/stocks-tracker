import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        name: "MBank Makler",
        description: "Best makler ever",
        icon: "MBank",
        checked: false
    },
    {
        id: 2,
        name: "ING",
        description: "Bank Slunski",
        icon: "ING",
        checked: false
    },
    {
        id: 3,
        name: "XTB",
        description: "Cheak and nice",
        icon: "XTB",
        checked: false
    },
]


export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        toggleAccountSelect: (state, action: PayloadAction<number>) => {
            return state.map((el) => el.id === action.payload ? {...el, checked: !el.checked} : el)
        },
        toogleAllAccountSelect: (state, action: PayloadAction<boolean>) => {
            return state.map(el => ({...el, checked: action.payload}))
        }
    },
});

export const { toggleAccountSelect, toogleAllAccountSelect } = accountSlice.actions;
