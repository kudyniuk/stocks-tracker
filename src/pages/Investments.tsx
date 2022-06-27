import { Box, Container, Grid } from '@mui/material';
import { FC, useReducer } from 'react';
import { Accounts } from '../components/accounts/accounts';
import { InvestmentResult } from '../components/result/InvestmentResult';
import { StockList } from '../components/stock-list/StockList';

export const Investments: FC = () => (
    <>
        <title>
            Dashboard | Material Kit
        </title>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 2
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <Accounts />
                        <Box sx={{py: 3}}>
                            <InvestmentResult/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <StockList filterByAccounts/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);