import React from 'react'

import { makeStyles, Typography, Toolbar, AppBar } from '@material-ui/core'
import FileUpload from './FileUpload'

const useStyles = makeStyles({
  navigationLabel: {
    flexGrow: 1,
  },
})

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={useStyles().navigationLabel} variant="h6">
          SimpleObjectStore
        </Typography>
        <FileUpload />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
