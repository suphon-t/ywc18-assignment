import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AppBar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core'

import logo from '../assets/halfhalf-logo.png'
import logoMini from '../assets/halfhalf-logo-mini.png'
import Search from '@material-ui/icons/Search'
import { useQueryState } from '../utils'
import { FilterPanel } from './FilterPanel'
import { MdArrowBack, MdCardTravel } from 'react-icons/md'
import { GiMeal } from 'react-icons/gi'
import { BsFunnel } from 'react-icons/bs'
import { lightTheme } from '../utils/theme'
import { Fallback } from './Fallback'
import { ProvinceSelect } from './ProvinceSelect'
import { Autocomplete } from '@material-ui/lab'
import { useSearchData } from '../utils/searchData'

const useStyles = makeStyles((theme) => ({
  topBarBg: {
    backgroundColor: theme.palette.background.default,
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
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
    paddingRight: 4,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    [theme.breakpoints.up('md')]: {
      marginRight: 32,
    },
  },
  input: {
    marginLeft: 10,
    flex: 1,
    '@global': {
      'input:placeholder-shown': {
        textOverflow: 'ellipsis',
      },
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchIcon: {
    color: theme.palette.text.primary,
    fontSize: 18,
  },
  searchButton: {
    height: '100%',
    backgroundColor: theme.searchButtonBackground,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: -4,
    borderRadius: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
    marginRight: 6,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  filterIcon: {
    fontSize: 20,
  },
  appBar: {
    position: 'relative',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a4365',
    boxShadow: 'none',
  },
  filterTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    fontWeight: 500,
    textAlign: 'center',
    pointerEvents: 'none',
  },
  backButton: {
    margin: 12,
  },
  filterContainer: {
    width: '100vw',
    padding: 40,
    overflowX: 'hidden',
  },
  categoryIcon: {
    marginRight: 8,
    transform: 'translateY(4px)',
  },
}))

export function TopBar() {
  const classes = useStyles()

  const [searchQuery, setSearchQuery] = useQueryState('searchQuery', '')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      setSearchQuery(query)
    },
    [setSearchQuery, query]
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setQuery(e.target.value)
    },
    []
  )

  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = useCallback(() => setDrawerOpen(true), [])
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), [])

  const { data } = useSearchData(false)
  const categories = data?.categories

  const [category, setCategory] = useQueryState('category', '')
  const handleCategoryChange = useCallback(
    (_, value) => {
      setCategory(value)
    },
    [setCategory]
  )

  const options = useMemo(
    () => [
      '',
      ...(categories?.map((category) => category.name) ||
        (category ? [category] : [])),
    ],
    [categories, category]
  )

  const filterOptions = useCallback(
    (options: string[]) => options.filter((option) => option !== ''),
    []
  )

  const renderOption = useCallback(
    (option: string) =>
      option === '' ? null : (
        <span style={{ width: '100%' }}>
          {option === 'ร้านธงฟ้า' ? (
            <MdCardTravel className={classes.categoryIcon} />
          ) : (
            <GiMeal className={classes.categoryIcon} />
          )}{' '}
          {option}
        </span>
      ),
    [classes.categoryIcon]
  )

  return (
    <div className={classes.topBarBg}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="คนละครึ่ง" />
          <img className={classes.logoMini} src={logoMini} alt="คนละครึ่ง" />
        </div>
        <form className={classes.searchBar} onSubmit={handleSubmit}>
          <Hidden smDown>
            <Fallback silent>
              <ProvinceSelect />
            </Fallback>
          </Hidden>
          <Autocomplete
            className={classes.input}
            options={options}
            value={category}
            onChange={handleCategoryChange}
            filterOptions={filterOptions}
            renderOption={renderOption}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <InputBase
                  {...params.inputProps}
                  fullWidth
                  value={query}
                  onChange={handleChange}
                  placeholder={
                    'ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป'
                  }
                />
              </div>
            )}
          />
          <Button type="submit" className={classes.searchButton}>
            <Search className={classes.searchIcon} />
          </Button>
        </form>
        <div className={classes.filterButton}>
          <IconButton
            color="secondary"
            className={classes.iconButton}
            aria-label="กรอกผล"
            onClick={handleDrawerOpen}
          >
            <BsFunnel className={classes.filterIcon} />
          </IconButton>
        </div>
        <Hidden mdUp>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <ThemeProvider theme={lightTheme}>
              <AppBar position="static" className={classes.appBar}>
                <IconButton
                  color="inherit"
                  className={classes.backButton}
                  onClick={handleDrawerClose}
                >
                  <MdArrowBack />
                </IconButton>
                <Typography variant="h5" className={classes.filterTitle}>
                  กรอกผล
                </Typography>
              </AppBar>
            </ThemeProvider>
            <div className={classes.filterContainer}>
              <Fallback>
                <FilterPanel />
              </Fallback>
            </div>
          </Drawer>
        </Hidden>
      </div>
    </div>
  )
}
