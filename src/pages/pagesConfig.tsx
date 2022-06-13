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
        name: "Investments",
        route: "/investments",
        component: <Investments />,
        icon: <AttachMoney />
    },
    {
        name: "Stocks",
        route: "/transactions",
        component: <TransactionsHistory />,
        icon: <AttachMoney />
    },
]

export const routes = pagesConfig