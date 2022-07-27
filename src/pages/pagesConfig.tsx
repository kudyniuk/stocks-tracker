import { AttachMoney, Search } from "@mui/icons-material"
import { DashboardIcon } from "../components/icons/dashboard"
import { TransactionsHistory } from "./TransactionsHistory"
import { Dashboard } from "./Dashboard"
import { Investments } from "./Investments"

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
        icon: <AttachMoney />
    },
    {
        name: "Transactions",
        route: "/transactions",
        component: <TransactionsHistory />,
        icon: <AttachMoney />
    }
]

export const routes = pagesConfig