import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form"
import { useAppSelector } from "../../../store/hooks"
import { Currency, StockTransaction } from "../../../store/stocks/stock-types"
import { useUUID } from "../../../store/user/user"
import { createModal } from "../modal-service"
import { db } from "../../../firebase/init"
import { selectStockById } from "../../../store/selectors/stockSelectors";
import { format } from "date-fns";

type FormData = {
    ticker: string
    amount: string
    price: string
    currency: Currency
    account: string
    date: string
    fee: string
}


// TODO: Clean the types 
type AddProps = {type: "ADD", defaultAccount?: string}
type EditProps = {type: "EDIT", id: string}
type OptionalProps = Partial<Omit<AddProps, 'type'> & Omit<EditProps, 'type'>> & {type: "ADD" | "EDIT"}

type Props = AddProps | EditProps

export const { openEditStockModal } = createModal<'editStock', Props>({
    id: 'editStock',
    options: {
        notCloseOnClickOutside: true
    },
    component: ({close, ...props}) => {
        const { id = '', defaultAccount } = props as OptionalProps

        const stock = useAppSelector(selectStockById(id))
        const accounts = useAppSelector(state => state.accounts)

        const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
            defaultValues: {
                amount: stock?.amount.toString(),
                price: stock?.price.toString(),
                fee: stock?.fee.toString(),
                currency: stock?.currency
            }
        });

        const uuid = useUUID()
        const isAdd = !stock
        const date = format(stock?.date ? new Date(stock?.date) : new Date(), 'Y-MM-dd')

        const onSubmit = (data: FormData) => {
            const stockData: Omit<StockTransaction, 'id'> = {
                ...data,
                fee: parseFloat(data.fee),
                price: parseFloat(data.price),
                amount: parseInt(data.amount),
                date: new Date(data.date).getTime()
            }

            addDoc(collection(db, 'user_data', uuid, 'stocks'), stockData)
                .then(() => reset({ ticker: "", price: "", amount: "", fee: "" } as any))
                .catch(e => alert(e)) //TODO: Fix
        }

        return <Stack spacing={1}>
            <Typography variant="h6" component="h2">
                {isAdd ? "Add Stock" : "Edit Stock"}
            </Typography>
            <Stack component="form" direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
                <TextField select label="Account" variant="standard" defaultValue={defaultAccount || stock?.account} {...register('account')} sx={{ minWidth: '200px' }} >
                    {accounts.map((account, i) => <MenuItem key={account.name} value={account.id}>{account.name}</MenuItem>)}
                </TextField>

                <Stack direction='row' spacing={2} alignItems='stretch' justifyContent="stretch">
                    <TextField sx={{ width: "100%" }} id="outlined-basic-1" label="Ticker" variant="standard" defaultValue={stock?.ticker} {...register("ticker")} />
                    <TextField sx={{ width: "100%" }} id="outlined-basic-2" label="Amount" variant="standard" type="number" defaultValue={stock?.amount}  {...register("amount")} />
                </Stack>

                <Stack direction='row' spacing={2}>
                    <TextField sx={{ width: "100%" }} id="outlined-basic-3" label="Price" variant="standard" type="number" inputProps={{ step: "0.001" }} defaultValue={stock?.price}  {...register("price")} />
                    <TextField sx={{ width: "100%" }} id="outlined-basic-4" label="Fee" variant="standard" type="number" inputProps={{ step: "0.01" }} defaultValue={stock?.fee} {...register("fee")} />
                </Stack>

                <Stack direction='row' spacing={2}>
                    <TextField sx={{ width: "100%" }} select label="Currency" variant="standard" defaultValue={stock?.currency} {...register('currency')} >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="PLN">PLN</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                    </TextField>
                    <TextField sx={{ width: "100%" }} id="outlined-basic-4" label="Date" variant="standard" type="date" defaultValue={date} {...register("date")} />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button type="submit" color="success" variant="contained" size="small" sx={{ marginTop: 'auto' }}>
                        Add
                    </Button>
                    <Button onClick={close} color="error" variant="contained" size="small" sx={{ marginTop: 'auto' }}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    }
})