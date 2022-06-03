import { FC, ReactNode } from "react";
import { Box, Button, ListItem } from '@mui/material';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type Props = {
    icon: ReactNode
    title: string
    href: string
}

export const NavItem: FC<Props> = ({ icon, title, href }) => {
    let resolved = useResolvedPath(href);
    let active = useMatch({ path: resolved.pathname, end: true });

    return <ListItem
            component={Link}
            to={href}
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2
            }}
        >
            <Button
                component="a"
                startIcon={icon}
                disableRipple
                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: active ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
            </Button>
        </ListItem>
}