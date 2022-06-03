import { FC } from "react";
import { Box, Button, Divider, Drawer, ModalProps, Typography, useMediaQuery } from '@mui/material';
import { AttachMoney, Search } from "@mui/icons-material"
import { NavItem } from "./NavItem";
import { Logo } from "./Logo";
import { DashboardIcon } from "../icons/dashboard";
import { useMemo } from "react";
import { routes } from "../../pages/pagesConfig";

type Props = {
    open: boolean
    onClose: ModalProps['onClose']
}

const Content = () => (
    <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <div>
                <Box sx={{ p: 3 }}>
                    <Logo
                        sx={{
                            height: 42,
                            width: 42
                        }}
                    />
                </Box>
                <Box sx={{ p: 3 }}>
                </Box>
                <Box sx={{ px: 2 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: 3,
                            py: '11px',
                            borderRadius: 1
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle1"
                            >
                                Acme Inc
                            </Typography>
                            <Typography
                                color="neutral.400"
                                variant="body2"
                            >
                                Your tier
                                {' '}
                                : Premium
                            </Typography>
                        </div>
                        <Search
                            sx={{
                                color: 'neutral.500',
                                width: 14,
                                height: 14
                            }}
                        />
                    </Box>
                </Box>
            </div>
            <Divider
                sx={{
                    borderColor: '#2D3748',
                    my: 3
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                {routes.map((page) => (
                    <NavItem
                        key={page.name}
                        icon={page.icon}
                        href={page.route}
                        title={page.name}
                    />
                ))}
            </Box>
        </Box>
    </>
);

export const Sidebar: FC<Props> = ({ open, onClose }) => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    const props = useMemo(() => {
        return lgUp ?
            {
                open: true,
                variant: "permanent" as const
            }
            : {
                open,
                onClose,
                variant: "temporary" as const
            }


    }, [lgUp, open])

    return <Drawer
        anchor="left"
        PaperProps={{
            sx: {
                backgroundColor: 'neutral.900',
                color: '#FFFFFF',
                width: 280
            }
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        {...props}
    >
        <Content />
    </Drawer>
}