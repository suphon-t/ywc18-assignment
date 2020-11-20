import React, { PropsWithChildren } from 'react'
import { useMediaQuery, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { darkThemeOptions, lightThemeOptions } from '../utils/theme'
import { useQueryState } from '../utils'

export function AppThemeProvider({ children }: PropsWithChildren<{}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [forcedColorMode] = useQueryState('forcedColorMode', 'auto')

  const useDarkMode =
    forcedColorMode === 'dark' ||
    (prefersDarkMode && forcedColorMode !== 'light')

  const theme = React.useMemo(
    () => createMuiTheme(useDarkMode ? darkThemeOptions : lightThemeOptions),
    [useDarkMode]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
