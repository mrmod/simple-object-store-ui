import React from 'react'
import { API_URL } from '../services/api'

import { Button, makeStyles } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'

const useStyles = makeStyles({
  fileInput: {
    display: 'none',
  },
})

const FileUpload = () => {
  const [isUploading, setIsUploading] = React.useState(false)

  const upload = (event) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('bytestream', event.target.files[0])
    const request = {
        method: 'POST',
        body: formData,
        headers: {
            "x-sos-content-type": event.target.files[0].type,
        }
    }
    fetch(API_URL, request)
      .catch((err) => {
        console.log('Error Uploading file')
      })
      .finally(() => setIsUploading(false))
  }

  return (
    <Button
      disabled={isUploading}
      component="label"
      variant="contained"
      color="default"
      endIcon={<CloudUpload />}
    >
      Upload
      <input type="file" className={useStyles().fileInput} onChange={upload} />
    </Button>
  )
}

export default FileUpload
