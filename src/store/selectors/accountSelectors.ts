import { RootState } from "../store";

export const selectAccountById =
    (id: string) =>
        (state: RootState) =>
            state.accounts.find(acc => acc.id === id)

