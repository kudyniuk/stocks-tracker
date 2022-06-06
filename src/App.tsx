import { ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Auth } from './pages/Auth'
import { routes } from './pages/pagesConfig'
import { DataLoader } from './store/DataLoader'
import { store } from './store/store'
import { theme } from './theme'

export const App: FC = () => {

  return <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Auth>
          <DataLoader>
          <Layout>
            <Routes>
              {routes.map(page => <Route key={page.name} path={page.route} element={page.component} />)}
            </Routes>
          </Layout>
          </DataLoader>
        </Auth>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
}

