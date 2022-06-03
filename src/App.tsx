import { ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/Layout'
import { routes } from './pages/pagesConfig'
import { theme } from './theme'

export const App: FC = () => {

  return <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          {routes.map(page => <Route key={page.name} path={page.route} element={page.component} />)}
        </Routes>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
}

