import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import { selectStocksByAccount } from "../../store/selectors/stockSelectors"
import { getStocksTotal } from "../../utils/getStocksTotal"
import { AccountAvatar } from "./accountAvatar"

type Props = {
    id: string
}

export const AccountCard: React.FC<Props> = ({ id }) => {
    const account = useAppSelector(state => state.accounts.find(acc => acc.id === id))
    const stocks = useAppSelector(selectStocksByAccount(id))
    const { closePrice, price } = getStocksTotal(stocks)
    const priceDiff = closePrice - price

    const navigate = useNavigate()
    if (!account) {
        return <div>AccountCard not found {id}</div>
    }

    return <Card onClick={() => navigate(`/accounts/${id}`)}>
        <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                    <AccountAvatar name={account.icon} alt="XTB Avatar" />
                    <Box sx={{ marginLeft: 2 }}>
                        <Typography variant="h5">{account.name}</Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="IKZE" color="primary" size="small" variant="outlined" />
                            <Chip label="Stocks" color="secondary" size="small" variant="outlined" />
                            <Chip label="Nieruchomosci" color="error" size="small" variant="outlined" />
                        </Stack>
                    </Box>
                </Stack>
                <Stack justifyContent={"flex-end"} alignItems="flex-end">
                    <Typography>Wycena walorów</Typography>
                    <Typography variant="h6">
                        {Number(closePrice).toFixed(2)} PLN
                    </Typography>
                    <Typography>Wynik na portfelu:
                        <Typography component='span' fontWeight="bold" color={priceDiff > 0 ? "green" : "error"}>     {Number(priceDiff).toFixed(2)} PLN
                        </Typography>
                        </Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card>
}