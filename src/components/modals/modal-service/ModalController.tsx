import { Box, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/modal/modalSlice";
import { getModal } from "./registerModal";

export const ModalController: FC = () => {
    const { open, modalId, props, options } = useAppSelector(state => state.modal)
    const { notCloseOnClickOutside } = options
    const dispatch = useAppDispatch()

    const handleClose = () => {
        !notCloseOnClickOutside && dispatch(closeModal())
    }

    const ModalBody = getModal(modalId!)

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <ModalBody {...props} close={handleClose} />
        </Box>
    </Modal>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};