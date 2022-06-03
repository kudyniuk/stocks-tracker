import { FC } from "react";
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Search } from '@mui/icons-material';
import { BellIcon } from "../icons/bell";
import { UserCircle } from "../icons/user";

type Props = {
    onSidebarOpen: () => void
}

const NavbarRoot = styled(AppBar)(({ theme }: any /* TODO: Fix any */) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

export const Navbar: FC<Props> = ({ onSidebarOpen }) => {
    return <NavbarRoot sx={{
        left: {
            lg: 280
        },
        width: {
            lg: 'calc(100% - 280px)'
        }
    }}>
        <Toolbar
            disableGutters
            sx={{
                minHeight: 64,
                left: 0,
                px: 2
            }}
        >
            <IconButton
                href=""
                onClick={onSidebarOpen}
                sx={{
                    display: {
                        xs: 'inline-flex',
                        lg: 'none'
                    }
                }}
            >
                <MenuIcon fontSize="small" />
            </IconButton>
            {/* <Tooltip title="Search">
                <IconButton sx={{ ml: 1 }}>
                    <Search fontSize="small" />
                </IconButton>
            </Tooltip> */}
            <Box sx={{ flexGrow: 1 }} />
            {/* <Tooltip title="Contacts">
                <IconButton sx={{ ml: 1 }}>
                    <Search fontSize="small" />
                </IconButton>
            </Tooltip> */}
            <Tooltip title="Notifications">
                <IconButton sx={{ ml: 1 }}>
                    <Badge
                        badgeContent={4}
                        color="primary"
                        variant="dot"
                    >
                        <BellIcon fontSize="small" />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Avatar
                sx={{
                    height: 40,
                    width: 40,
                    ml: 1
                }}
                src="/static/images/avatars/avatar_1.png"
            >
                <UserCircle fontSize="small" />
            </Avatar>
        </Toolbar>
    </NavbarRoot>
}