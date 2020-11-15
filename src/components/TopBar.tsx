import React from 'react'
import {
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  useMediaQuery,
} from '@material-ui/core'

import logo from '../assets/halfhalf-logo.png'
import logoMini from '../assets/halfhalf-logo-mini.png'
import Search from '@material-ui/icons/Search'
import FilterList from '@material-ui/icons/FilterList'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    height: 60,
    padding: '10px 16px',
    [theme.breakpoints.up('md')]: {
      padding: '10px 32px',
    },
  },
  logo: {
    width: 151,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoMini: {
    width: 58,
    height: 40,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchBar: {
    height: 40,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
    [theme.breakpoints.up('md')]: {
      marginRight: 32,
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export function TopBar() {
  const classes = useStyles()
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={logo} alt="คนละครึ่ง" />
        <img className={classes.logoMini} src={logoMini} alt="คนละครึ่ง" />
      </div>
      <Paper component="form" className={classes.searchBar}>
        <InputBase
          className={classes.input}
          placeholder={
            matches
              ? 'ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป'
              : 'ค้นหา ชื่อ ร้านอาหาร...'
          }
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="ค้นหา"
        >
          <Search />
        </IconButton>
        <div className={classes.filterButton}>
          <Divider orientation="vertical" className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="กรอกผล"
          >
            <FilterList />
          </IconButton>
        </div>
      </Paper>
    </div>
  )
}
