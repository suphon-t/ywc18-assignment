import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import React, { ChangeEventHandler, useCallback } from 'react'

interface CustomSelectProps {
  label: string
  value: string
  setValue: (newValue: string) => void
  items: string[]
  values?: string[]
}

const useStyles = makeStyles((theme) => ({
  header2: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginTop: 32,
  },
  textField: {
    marginTop: 8,
  },
}))

export function CustomSelect({
  label,
  value,
  setValue,
  items,
  values,
}: CustomSelectProps) {
  const classes = useStyles()

  const handleChange: ChangeEventHandler<{ value: unknown }> = useCallback(
    (e) => {
      setValue(e.target.value as string)
    },
    [setValue]
  )

  return (
    <>
      <Typography className={classes.header2}>{label}</Typography>
      <FormControl
        className={classes.textField}
        size="small"
        variant="outlined"
        fullWidth
      >
        <Select value={value} onChange={handleChange}>
          <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
          {items.map((item, idx) => {
            const value = values ? values[idx] : item
            return (
              <MenuItem key={value} value={value}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}
