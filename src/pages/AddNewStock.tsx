import { Box, Button, Card, IconButton, Stack, TextField } from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form";


type FormData = {
    id: string
    amount: number
    price: number
    date: string
}

export const AddNewStock: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (date: FormData) => console.log(date)

    return <Card sx={{ m: 2, px: 2.5, py: 2 }}>
        <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <TextField id="outlined-basic-1" label="Walor" variant="standard" {...register("id")} />
            <TextField id="outlined-basic-2" label="Ilość" variant="standard" type="number" {...register("amount")} />
            <TextField id="outlined-basic-3" label="Koszt Nabycia" variant="standard" type="number" {...register("price")}/>
            <TextField id="outlined-basic-4" label="Data" variant="standard" type="date" value={"2022-06-17"} {...register("date")}/>


            <Box display="flex" flexDirection="column">
                <Button type="submit" color="success" variant="contained" size="small" sx={{marginTop: 'auto'}}>
                    Add
                </Button>
            </Box>
        </Stack>
    </Card>
}


