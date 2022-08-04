import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export const Accounts = () => {
    const accounts = useAppSelector(state => state.accounts)

    return <Box sx={{ m: 2 }}>
        <Typography>Accounts</Typography>
        {accounts.map(({id, name}) => <div>
            <Link to={`/accounts/${id}`}>{name}</Link>
        </div>)}
    </Box>
}