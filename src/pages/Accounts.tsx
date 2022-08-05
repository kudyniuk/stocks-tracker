import { Box, Stack, Typography } from "@mui/material";
import { AccountCard } from "../components/accounts/accountCard";
import { useAppSelector } from "../store/hooks";

export const Accounts = () => {
    const accounts = useAppSelector(state => state.accounts)

    return <Box sx={{ m: 2 }}>
        <Typography variant="h5" sx={{marginY: 2}}>Accounts</Typography>
        <Stack spacing={2}>
        {accounts.map(({id}) => <AccountCard id={id} key={id}/>)}
        </Stack>
    </Box>
}