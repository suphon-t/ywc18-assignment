import React from 'react'
import {
  Breadcrumbs,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { TopBar } from './TopBar'
import { darkTheme } from '../utils/theme'
import { SearchResults } from './SearchResults'
import { Fallback } from './Fallback'

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
  },
}))

export function ShopSearch() {
  const classes = useStyles()

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
        ผลการค้นหา
      </Typography>
      <div className={classes.contentContainer}>
        <Fallback>
          <SearchResults />
        </Fallback>
      </div>
    </div>
  )
}
