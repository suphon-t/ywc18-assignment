import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { GlobalCss } from './components/GlobalCss'
import { ShopSearch } from './components/ShopSearch'
import { lightTheme } from './utils/theme'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalCss />
      <BrowserRouter>
        <ShopSearch />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
