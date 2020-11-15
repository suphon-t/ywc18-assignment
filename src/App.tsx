import React from 'react'
import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core'
import { GlobalCss } from './components/GlobalCss'
import { ShopSearch } from './components/ShopSearch'
import { BrowserRouter } from 'react-router-dom'
import { darkThemeOptions, lightThemeOptions } from './utils/theme'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCss />
      <BrowserRouter>
        <ShopSearch />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
