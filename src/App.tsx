import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { GlobalCss } from './components/GlobalCss'
import { ShopSearch } from './components/ShopSearch'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './providers/AppThemeProvider'

function App() {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <CssBaseline />
        <GlobalCss />
        <ShopSearch />
      </AppThemeProvider>
    </BrowserRouter>
  )
}

export default App
