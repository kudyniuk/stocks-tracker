import { AttachMoney, AccountBalanceWallet, TrendingUp } from "@mui/icons-material"
import { DashboardIcon } from "../components/icons/dashboard"
import { TransactionsHistory } from "./TransactionsHistory"
import { Dashboard } from "./Dashboard"
import { Investments } from "./Investments"
import { Accounts } from "./Accounts"

const pagesConfig = [
    {
        name: "Dashboard",
        route: "/",
        component: <Dashboard />,
        icon: <DashboardIcon />
    },
    {
        name: "Stocks",
        route: "/stocks",
        component: <Investments />,
        icon: <TrendingUp />
    },
    {
        name: "Transactions",
        route: "/transactions",
        component: <TransactionsHistory />,
        icon: <AttachMoney />
    },
    {
        name: "Accounts",
        route: "/accounts",
        component: <Accounts/>,
        icon: <AccountBalanceWallet />
    }
]

export const routes = pagesConfig