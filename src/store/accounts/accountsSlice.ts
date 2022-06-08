import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Account = {
    id: string
    name: string
    description?: string
    icon: string
    checked?: boolean
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: [] as Account[],
    reducers: {
        setAccounts: (state, action: PayloadAction<Account[]>) => {
            return action.payload.map((account) => (
                {
                    ...account,
                    checked: state.find((stateAccount) => stateAccount.id === account.id)?.checked || false
                }))
        },
        toggleAccountSelect: (state, action: PayloadAction<string>) => {
            return state.map((el) => el.id === action.payload ? { ...el, checked: !el.checked } : el)
        },
        toogleAllAccountSelect: (state, action: PayloadAction<boolean>) => {
            return state.map(el => ({ ...el, checked: action.payload }))
        }
    },
});

export const { setAccounts, toggleAccountSelect, toogleAllAccountSelect } = accountSlice.actions;
