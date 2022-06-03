import { ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { routes } from './pages/pagesConfig'
import { store } from './store/store'
import { theme } from './theme'

export const App: FC = () => {

  return <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            {routes.map(page => <Route key={page.name} path={page.route} element={page.component} />)}
          </Routes>
        </Layout>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
}

