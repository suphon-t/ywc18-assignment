import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  '@global': {
    'body, html': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))

export function GlobalCss() {
  useStyles()
  return null
}
