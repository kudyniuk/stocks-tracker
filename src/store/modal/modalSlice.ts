import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Modal = {
    open: boolean
    modalId?: string
    props?: object
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {open: false} as Modal,
    reducers: {
        openModal: (state, action: PayloadAction<{modalId: string, props?: object}>) => {
            state.modalId = action.payload.modalId
            state.props = action.payload.props
            state.open = true
        },
        closeModal: (state) => {
            state.open = false
        }
    },
});

export const { openModal, closeModal } = modalSlice.actions;
