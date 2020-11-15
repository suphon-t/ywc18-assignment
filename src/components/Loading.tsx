import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
    animation: '$fadeIn .6s ease',
  },
})

export function Loading() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  )
}
