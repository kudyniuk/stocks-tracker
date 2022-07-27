import { Button, Stack, Typography } from "@mui/material"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../firebase/init"
import { useAppSelector } from "../../../store/hooks"
import { useUUID } from "../../../store/user/user"
import { createModal } from "../modal-service"

export const { openDeleteStockModal } = createModal<'deleteStock', { stockId: string }>({
    id: 'deleteStock',
    component: ({ stockId, close }) => {
        const userUUID = useUUID()

        const handleDelete = async () => {
            await deleteDoc(doc(db, 'user_data', userUUID, 'stocks', stockId))
            close()
        }

        return <Stack spacing={1}>
            <Typography variant="h6" component="h2">
                Delete stock
            </Typography>
            <Typography >
                Are you sure you want to delete stock transaction?
            </Typography>
            <Stack alignItems="center" justifyContent="center" direction="row" spacing={2} sx={{ pt: 1, margin: 'auto' }}>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Confirm
                </Button>
                <Button variant="outlined" color="success" onClick={close}>
                    Cancel
                </Button>
            </Stack>
        </Stack>
    }
})