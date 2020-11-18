import { createMuiTheme, ThemeOptions } from '@material-ui/core'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    searchButtonBackground: string
  }
  interface ThemeOptions {
    searchButtonBackground: string
  }
}

declare module '@material-ui/core/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Palette {
    accent: Palette['primary']
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
  }
}

const baseTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1920,
    },
  },
  palette: {
    accent: {
      main: '#283A7C',
    },
  },
  searchButtonBackground: '#f8f8f8',
  typography: {
    fontFamily: [
      'IBM Plex Sans Thai',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}

export const lightThemeOptions: ThemeOptions = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    primary: {
      main: '#1890ff',
    },
    success: {
      main: '#1BC300',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      secondary: '#999999',
    },
  },
}

export const lightTheme = createMuiTheme(lightThemeOptions)

export const darkThemeOptions: ThemeOptions = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
  },
  searchButtonBackground: 'rgba(255, 255, 255, 0.08)',
}

export const darkTheme = createMuiTheme(darkThemeOptions)
