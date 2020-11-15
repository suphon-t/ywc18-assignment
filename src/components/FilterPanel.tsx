import React, { useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { useQueryState } from '../utils'
import { useSearchData } from '../utils/searchData'
import { CustomSelect } from './CustomSelect'
import { CustomRadio } from './CustomRadio'
import { AllPlacesIcon } from './AllPlacesIcon'

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  header2: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginTop: 32,
  },
  radioGroup: {
    marginTop: 16,
  },
  textField: {
    marginTop: 8,
  },
}))

export function FilterPanel() {
  const classes = useStyles()
  const { data } = useSearchData()
  const { categories, categoryMap, provinces, priceRange } = data!
  const priceRangeValues = useMemo(() => priceRange.map((_, i) => `${i + 1}`), [
    priceRange,
  ])

  const [categoryName, setCategory] = useQueryState('category', '')
  const [province, setProvince] = useQueryState('province', 'ทั้งหมด')
  const [price, setPrice] = useQueryState('price', 'ทั้งหมด')
  const [subcategory, setSubcategory] = useQueryState('subcategory', '')

  const category = categoryMap[categoryName]
  useEffect(() => {
    if (category && !category.subcategorySet.has(subcategory)) {
      setSubcategory('')
    }
  }, [category, subcategory, setSubcategory])

  return (
    <div>
      <CustomRadio
        label="ประเภทร้านค้า"
        value={categoryName}
        setValue={setCategory}
        items={categories.map((category) => category.name)}
      />
      <CustomSelect
        label="จังหวัด"
        value={province}
        setValue={setProvince}
        items={provinces}
        allLabel={
          <>
            <AllPlacesIcon />
            สถานที่ทั้งหมด
          </>
        }
      />
      <CustomSelect
        label="ราคา"
        value={price}
        setValue={setPrice}
        items={priceRange}
        values={priceRangeValues}
      />
      {category && (
        <CustomRadio
          label={`ประเภท${category.name}`}
          labelClassName={classes.header2}
          value={subcategory}
          setValue={setSubcategory}
          keys={category.subcategories.map(
            (_, idx) => `${category.name}-${idx}`
          )}
          items={category.subcategories}
        />
      )}
    </div>
  )
}
