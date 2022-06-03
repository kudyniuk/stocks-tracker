import { AttachMoney, Search } from "@mui/icons-material"
import { DashboardIcon } from "../components/icons/dashboard"

const pagesConfig = {
    Dashboard: {
        route: "/",
        component: <div>Dashboard</div>,
        icon: <DashboardIcon />
    },
    Investments: {
        route: "/investments",
        component: <div>Investments</div>,
        icon: <AttachMoney />
    }
}

export const routes = Object.entries(pagesConfig).map(([name, props]) => ({ name, ...props }))