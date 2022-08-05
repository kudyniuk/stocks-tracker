import { Box, Typography, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { AccountCard } from "../components/accounts/accountCard";
import { StockList2 } from "../components/stock-list/StockList2";
import { TransactionsList2 } from "../components/transactions-list/TransactionsList2";
import { useAppSelector } from "../store/hooks";
import { selectAccountById } from "../store/selectors";
import { selectStocksByAccount } from "../store/selectors/stockSelectors";
import { groupStocks } from "../utils/groupStocks";

export const AccountDetails = () => {
    const { accountId } = useParams();
    const account = useAppSelector(selectAccountById(accountId!))
    const stocks = useAppSelector(selectStocksByAccount(accountId!))
    const stocksGrouped = groupStocks(stocks)

    return account
        ? <Stack spacing={2} sx={{m: 2}}>
            <AccountCard id={account.id}/>
            <StockList2 stocks={stocksGrouped} title="Stocks"/>
            <TransactionsList2 stocks={stocks} disableAccountsColumn/>
        </Stack>
        : <div>Account not found</div>
}