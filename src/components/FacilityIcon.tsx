import { makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { CgNotes } from 'react-icons/cg'
import { FaCarSide } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'

interface FacilityIconProps {
  name: string
}

const iconMap: Record<string, ReactNode> = {
  ที่จอดรถ: <FaCarSide />,
  รับจองล่วงหน้า: <CgNotes />,
  สามารถนำสัตว์เลี้ยงเข้าได้: <MdPets />,
}

const useStyles = makeStyles((theme) => ({
  icon: {
    display: 'flex',
    width: 30,
    height: 30,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: '100%',
  },
}))

export function FacilityIcon({ name }: FacilityIconProps) {
  const classes = useStyles()
  return <div className={classes.icon}>{iconMap[name] || null}</div>
}
