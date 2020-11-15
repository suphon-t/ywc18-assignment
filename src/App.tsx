import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { GlobalCss } from './components/GlobalCss'
import { ShopSearch } from './components/ShopSearch'
import { lightTheme } from './utils/theme'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalCss />
      <ShopSearch />
    </ThemeProvider>
  )
}

export default App
