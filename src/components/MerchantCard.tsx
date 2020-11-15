import React, { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import dompurify from 'dompurify'
import { Merchant } from '../utils/searchData'
import { FacilityIcon } from './FacilityIcon'

interface MerchantCardProps {
  merchant: Merchant
  priceRange: number
}

const useStyles = makeStyles<Theme, MerchantCardProps>((theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  media: {
    minHeight: 224,
    [theme.breakpoints.up('lg')]: {
      width: 240,
    },
  },
  content: {
    flex: 1,
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  shopName: {
    fontWeight: 600,
  },
  chip: {
    marginLeft: theme.spacing(2),
    color: 'white',
    backgroundColor: (props) =>
      props.merchant.isOpen === 'Y' ? theme.palette.success.main : '#A0A0A0',
    borderRadius: 2,
  },
  merchantInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    color: theme.palette.text.secondary,
  },
  infoDivider: {
    padding: '0 6px',
  },
  divider: {
    width: '65%',
    marginTop: 18,
    marginBottom: 18,
  },
  highlightText: {
    marginBottom: 8,
  },
  recommendedLabel: {
    marginRight: 8,
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  facilitiesContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
}))

export function MerchantCard(props: MerchantCardProps) {
  const classes = useStyles(props)
  const { merchant, priceRange } = props
  const { highlightText } = merchant
  const sanitizedHighlightText = useMemo(
    () => dompurify.sanitize(highlightText),
    [highlightText]
  )

  const merchantTitle = (
    <Typography variant="h6" className={classes.shopName}>
      {merchant.shopNameTH}
      {merchant.isOpen !== 'N/A' && (
        <Chip
          className={classes.chip}
          size="small"
          label={merchant.isOpen === 'Y' ? 'เปิดอยู่' : 'ปิดแล้ว'}
        />
      )}
    </Typography>
  )

  const merchantInfo = (
    <div className={classes.merchantInfo}>
      <Typography variant="body2">{merchant.subcategoryName}</Typography>
      {typeof merchant.priceLevel === 'number' && (
        <>
          <span className={classes.infoDivider}>|</span>
          <Typography variant="body2" color="textPrimary">
            {'฿'.repeat(merchant.priceLevel)}
          </Typography>
          <Typography variant="body2">
            {'฿'.repeat(Math.max(0, priceRange - merchant.priceLevel))}
          </Typography>
        </>
      )}
      <span className={classes.infoDivider}>|</span>
      <Typography variant="body2">
        {merchant.addressDistrictName} {merchant.addressProvinceName}
      </Typography>
    </div>
  )

  const highlightTextNode = (
    <Typography
      className={classes.highlightText}
      variant="body2"
      color="textSecondary"
    >
      <span dangerouslySetInnerHTML={{ __html: sanitizedHighlightText }} />
    </Typography>
  )

  const recommended = merchant.recommendedItems && (
    <Typography
      className={classes.highlightText}
      variant="body2"
      color="textSecondary"
    >
      <label className={classes.recommendedLabel}>เมนูแนะนำ:</label>
      {merchant.recommendedItems.join(', ')}
    </Typography>
  )

  const facilities = merchant.facilities && (
    <div className={classes.facilitiesContainer}>
      {merchant.facilities.map((facility) => (
        <FacilityIcon key={facility} name={facility} />
      ))}
    </div>
  )

  return (
    <Card variant="outlined" className={classes.container}>
      <div className={classes.cardLayout}>
        <CardMedia className={classes.media} image={merchant.coverImageId} />
        <CardContent className={classes.content}>
          {merchantTitle}
          {merchantInfo}
          <Divider className={classes.divider} />
          {highlightTextNode}
          {recommended}
          {facilities}
        </CardContent>
      </div>
    </Card>
  )
}
