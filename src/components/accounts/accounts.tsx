import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    List,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FC, useCallback } from 'react';
import MBank from '../../assets/logos/mbank.webp'
import XTB from '../../assets/logos/xtb.webp'
import ING from '../../assets/logos/ing.png'
import { Account } from './account';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleAccountSelect, toogleAllAccountSelect } from '../../store/accounts/accountsSlice';

const resolveImage = (name: string): string => {
    switch (name) {
        case "XTB":
            return XTB
        case "MBank":
            return MBank
        case "ING":
            return ING
        default:
            return ING

    }
}


export const Accounts: FC = () => {
    const accounts = useAppSelector(state => state.accounts)
    const dispatch = useAppDispatch()
    const selectedAll = useAppSelector(state => state.accounts.map(el => el.checked).reduce((acc, curr) => acc && curr, true))

    const handleToggleAll = useCallback(() => {
        dispatch(toogleAllAccountSelect(!selectedAll))
    }, [selectedAll])

    return <Card>
        <CardHeader
            title="Accounts"
            sx={{p: 2}}
        />
        <Divider />
        <List sx={{ paddingY: 0 }}>
            {accounts.map((account, i) => (
                <Account
                    key={account.name}
                    name={account.name}
                    description={account.description}
                    imageUrl={resolveImage(account.icon)}
                    checked={account.checked || false}
                    onClick={() => dispatch(toggleAccountSelect(account.id))}
                    divider={i < accounts.length - 1} />
            ))}
        </List>
        <Divider />
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1.25,
                px: 2
            }}
        >
            <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"
                onClick={handleToggleAll}
            >
                {selectedAll ? "View none" : "View all"} 
            </Button>
        </Box>
    </Card>
};
