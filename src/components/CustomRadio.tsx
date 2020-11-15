import React, { ChangeEventHandler, useCallback } from 'react'
import {
  FormControlLabel,
  Typography,
  Radio,
  makeStyles,
  RadioGroup,
} from '@material-ui/core'

interface CustomRadioProps {
  labelClassName?: string
  label: string
  value: string
  setValue: (newValue: string) => void
  items: string[]
  keys?: string[]
  values?: string[]
}

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  radioGroup: {
    marginTop: 16,
  },
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
}))

export function CustomRadio({
  labelClassName,
  label,
  value,
  setValue,
  items,
  keys,
  values,
}: CustomRadioProps) {
  const classes = useStyles()

  const handleChange: ChangeEventHandler<{ value: unknown }> = useCallback(
    (e) => {
      setValue(e.target.value as string)
    },
    [setValue]
  )

  return (
    <>
      <Typography className={labelClassName || classes.header}>
        {label}
      </Typography>
      <RadioGroup
        className={classes.radioGroup}
        aria-label={label}
        value={value}
        onChange={handleChange}
      >
        <RadioItem className={classes.radio} label="ทั้งหมด" value="" />
        {items.map((item, idx) => (
          <RadioItem
            className={classes.radio}
            key={keys ? keys[idx] : item}
            label={item}
            value={values ? values[idx] : item}
          />
        ))}
      </RadioGroup>
    </>
  )
}

interface RadioItemProps {
  className: string
  label: string
  value: string
}

function RadioItem({ className, label, value }: RadioItemProps) {
  return (
    <FormControlLabel
      label={
        <Typography variant="body2" style={{ width: 276 }}>
          {label}
        </Typography>
      }
      value={value}
      control={<Radio className={className} color="primary" />}
    />
  )
}
