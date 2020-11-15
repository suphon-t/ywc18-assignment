import { createMuiTheme } from '@material-ui/core'

declare module '@material-ui/core/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Palette {
    accent: Palette['primary']
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PaletteOptions {
    accent: PaletteOptions['primary']
  }
}

const baseTheme = {
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

export const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    primary: {
      main: '#283A7C',
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
})

export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
  },
})
