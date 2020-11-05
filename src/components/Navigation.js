import React from 'react'

import {
  makeStyles,
  Typography,
  Toolbar,
  AppBar,
  Button,
} from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { API_URL } from '../services/api'

const useStyles = makeStyles({
  navigationLabel: {
    flexGrow: 1,
  },
  fileInput: {
    display: 'none',
  },
})

const Navigation = () => {
  const [isUploading, setIsUploading] = React.useState(false)
  const upload = (event) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('bytestream', event.target.files[0])
    const request = { method: 'POST', body: formData }
    fetch(API_URL, request)
      .catch((err) => {
        console.log('Error Uploading file')
      })
      .finally(() => setIsUploading(false))
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={useStyles().navigationLabel} variant="h6">
          SimpleObjectStore
        </Typography>
        <Button
          disabled={isUploading}
          component="label"
          variant="contained"
          color="default"
          endIcon={<CloudUpload />}
        >
          Upload
          <input
            type="file"
            className={useStyles().fileInput}
            onChange={upload}
          />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
