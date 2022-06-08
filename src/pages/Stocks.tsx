import { Box, Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { addDoc, collection } from "firebase/firestore";
import { FC } from "react"
import { Controller, useForm } from "react-hook-form";
import { StockList } from "../components/stock-list/StockList";
import { db } from "../firebase/init";
import { useAppSelector } from "../store/hooks";
import { Stock } from "../store/stocks/stocksSlice";
import { useUUID } from "../store/user/user";

export const Stocks: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Stock>();
    const accounts = useAppSelector(state => state.accounts)
    const uuid = useUUID()

    const onSubmit = (data: Stock) => {
        addDoc(collection(db, 'user_data', uuid, 'stocks'), data)
            .then(() => reset({ ticker: "", price: "", amount: "" } as any))
            .catch(e => alert(e)) //TODO: Fix
    }

    if (accounts.length < 1) {
        return null
    }

    return <Box sx={{ m: 2}}>
        <StockList advanced />

        <Card sx={{mt: 2, px: 2.5, py: 2 }}>
            <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit(onSubmit)}>
                <TextField select label="Account" variant="standard" defaultValue={accounts[0]?.id} {...register('account')} sx={{ minWidth: '200px' }}>
                    {accounts.map((account, i) => <MenuItem key={account.name} value={account.id}>{account.name}</MenuItem>)}
                </TextField>
                <TextField id="outlined-basic-1" label="Ticker" variant="standard" {...register("ticker")} />
                <TextField id="outlined-basic-2" label="Amount" variant="standard" type="number" {...register("amount")} />
                <TextField id="outlined-basic-3" label="Price" variant="standard" type="number" {...register("price")} />
                <TextField select label="Currency" variant="standard" defaultValue={"USD"} {...register('currency')} >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="PLN">PLN</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </TextField>
                <TextField id="outlined-basic-4" label="Date" variant="standard" type="date" value={"2022-06-17"} {...register("date")} />

                <Box display="flex" flexDirection="column">
                    <Button type="submit" color="success" variant="contained" size="small" sx={{ marginTop: 'auto' }}>
                        Add
                    </Button>
                </Box>
            </Stack>
        </Card>
    </Box>
}


