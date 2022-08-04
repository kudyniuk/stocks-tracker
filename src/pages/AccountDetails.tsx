import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export const AccountDetails = () => {
    const { accountId } = useParams();
    const account = useAppSelector(state => state.accounts.find(({ id }) => id === accountId))

    return account
        ? <Box sx={{ m: 2 }}>
            <Typography>{account.name}</Typography>
        </Box>
        : <div>Account not found</div>
}