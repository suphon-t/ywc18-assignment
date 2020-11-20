import React, { PropsWithChildren } from 'react'
import { useMediaQuery, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { darkThemeOptions, lightThemeOptions } from '../utils/theme'

export function AppThemeProvider({ children }: PropsWithChildren<{}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions),
    [prefersDarkMode]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
