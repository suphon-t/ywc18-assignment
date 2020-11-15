import React, { useMemo } from 'react'
import {
  Breadcrumbs,
  Card,
  CardContent,
  Hidden,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { TopBar } from './TopBar'
import { darkTheme } from '../utils/theme'
import { SearchResults } from './SearchResults'
import { Fallback } from './Fallback'
import { FilterPanel } from './FilterPanel'
import { QueryOptions, useSearchData } from '../utils/searchData'

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    backgroundColor: theme.palette.accent.main,
  },
  breadcrumbs: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '12px 16px',
    [theme.breakpoints.up('md')]: {
      padding: '12px 32px',
    },
  },
  header: {
    padding: 24,
    paddingLeft: 16,
    fontWeight: 600,
  },
  contentContainer: {
    marginTop: 8,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  filterContainer: {
    width: 350,
    marginRight: 32,
  },
}))

export function ShopSearch() {
  const classes = useStyles()
  const { search } = useLocation()
  const { data: searchData } = useSearchData(false)
  const priceRange = searchData?.priceRange

  const options: QueryOptions = useMemo(() => queryString.parse(search), [
    search,
  ])

  const price =
    priceRange &&
    options.price &&
    ', ราคา ' + priceRange[parseInt(options.price) - 1]

  return (
    <div>
      <TopBar />
      <ThemeProvider theme={darkTheme}>
        <div className={classes.breadcrumbsContainer}>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Typography color="inherit">หน้าแรก</Typography>
            <Typography color="textPrimary">ค้นหา</Typography>
          </Breadcrumbs>
        </div>
      </ThemeProvider>
      <Typography variant="h6" className={classes.header}>
        ผลการค้นหา{options.category && ' ' + options.category}
        {price} ทั้งหมด
      </Typography>
      <div className={classes.contentContainer}>
        <Fallback>
          <Hidden smDown>
            <div>
              <Card variant="outlined" className={classes.filterContainer}>
                <CardContent>
                  <FilterPanel />
                </CardContent>
              </Card>
            </div>
          </Hidden>
          <SearchResults options={options} />
        </Fallback>
      </div>
    </div>
  )
}
