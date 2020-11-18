import React, { ChangeEventHandler, useCallback } from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  Divider,
  makeStyles,
} from '@material-ui/core'
import { useQueryState } from '../utils'
import { AllPlacesIcon } from './AllPlacesIcon'
import { useSearchData } from '../utils/searchData'

const useStyles = makeStyles({
  textField: {
    '@global': {
      '> div > fieldset': {
        border: 'none',
        borderRadius: 0,
      },
      '> div > div:focus': {
        backgroundColor: 'transparent',
      },
    },
    width: 192,
  },
})

export function ProvinceSelect() {
  const classes = useStyles()
  const { data } = useSearchData()
  const { provinces } = data!
  const [province, setProvince] = useQueryState('province', 'ทั้งหมด')

  const handleChange: ChangeEventHandler<{ value: unknown }> = useCallback(
    (e) => {
      setProvince(e.target.value as string)
    },
    [setProvince]
  )

  return (
    <>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.textField}
      >
        <Select value={province} onChange={handleChange}>
          <MenuItem value="ทั้งหมด">
            <AllPlacesIcon /> สถานที่ทั้งหมด
          </MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider orientation="vertical" />
    </>
  )
}
