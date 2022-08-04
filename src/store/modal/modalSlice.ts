import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalOptions = {
    notCloseOnClickOutside?: boolean
}

export type Modal = {
    open: boolean
    modalId?: string
    options: ModalOptions
    props?: object
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {open: false, options: {}} as Modal,
    reducers: {
        openModal: (state, action: PayloadAction<{modalId: string, props?: object, options?: ModalOptions}>) => {
            state.modalId = action.payload.modalId
            state.props = action.payload.props
            state.options = action.payload.options || {}
            state.open = true
        },
        closeModal: (state) => {
            state.open = false
        }
    },
});

export const { openModal, closeModal } = modalSlice.actions;
