import { FC, ReactNode, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { ModalController } from "../modals/modal-service";

type Props = {
    children: ReactNode
}

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const Layout: FC<Props> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setSidebarOpen(false)
    }, [location])

    return <>
        <LayoutRoot>
            <Box
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                {children}
            </Box>
        </LayoutRoot >
        <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
        <Sidebar onClose={() => setSidebarOpen(false)}
            open={isSidebarOpen} />
        <ModalController/>
    </>
}