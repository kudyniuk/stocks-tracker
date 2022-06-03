import { AttachMoney, Search } from "@mui/icons-material"
import { DashboardIcon } from "../components/icons/dashboard"
import { AddNewStock } from "./AddNewStock"
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
        name: "Add new Stock",
        route: "/stocks",
        component: <AddNewStock />,
        icon: <AttachMoney />
    },
]

export const routes = pagesConfig