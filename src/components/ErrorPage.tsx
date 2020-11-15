import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

interface ErrorPageProps {
  title: string
  description?: string
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    marginTop: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  description: {
    marginTop: 16,
  },
})

export function ErrorPage({ title, description }: ErrorPageProps) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography className={classes.description} color="textSecondary">
        {description}
      </Typography>
    </div>
  )
}
