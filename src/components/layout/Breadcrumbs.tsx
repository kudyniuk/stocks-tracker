import { Link, Typography, Breadcrumbs as MaterialBreadcrumbs } from "@mui/material"

export const Breadcrubs = () => {
    return <MaterialBreadcrumbs aria-label="breadcrumb" sx={{m: 2}}>
        <Link underline="hover" color="inherit" href="/">
            MUI
        </Link>
        <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
        >
            Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
    </MaterialBreadcrumbs>
}