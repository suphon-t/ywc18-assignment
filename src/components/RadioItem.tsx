import React from 'react'
import {
  FormControlLabel,
  Typography,
  Radio,
  makeStyles,
} from '@material-ui/core'

interface RadioItemProps {
  label: string
  value: string
}

const useStyles = makeStyles({
  radio: {
    marginLeft: 4,
    marginRight: 1,
    padding: 5,
    '@global': {
      svg: {
        width: 20,
        height: 20,
      },
    },
  },
})

export function RadioItem({ label, value }: RadioItemProps) {
  const classes = useStyles()
  return (
    <FormControlLabel
      label={
        <Typography variant="body2" style={{ width: 276 }}>
          {label}
        </Typography>
      }
      value={value}
      control={<Radio className={classes.radio} color="primary" />}
    />
  )
}
