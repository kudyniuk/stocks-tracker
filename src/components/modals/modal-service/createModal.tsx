import { capitalize } from "@mui/material"
import { PayloadActionCreator } from "@reduxjs/toolkit"
import { ModalOptions as Options, openModal } from "../../../store/modal/modalSlice"
import { registerModal } from "./registerModal"

type ModalOptions<Id, Props> = {
    id: Id
    component: React.FC<Props>
    options?: Options
}

type ModalActions = {
    close: () => void
}

export const createModal = <Id extends string, Params>({ id, component, options }: ModalOptions<Id, Params & ModalActions>) => {
    registerModal(id, component)
    return {
        ["open" + capitalize(id) + "Modal"]: (props: any) => openModal({modalId: id, props, options})
    } as unknown as Record<`open${Capitalize<Id>}Modal`, PayloadActionCreator<Params>>
}

