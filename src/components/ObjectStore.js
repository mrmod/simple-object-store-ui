import React from 'react'
import {
  List,
  Paper,
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core'
import { GetApp } from '@material-ui/icons'
import { API_URL } from '../services/api'

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  objectLayout: {
    margin: '2px',
    padding: '4px',
  },
  downloadLink: {
    float: 'right',
  },
}
const headers = { 'Content-Type': 'application/json' }
const useStyles = makeStyles(styles)
const apiObjectsIndexUrl = `${API_URL}`

const DownloadLink = ({ objectId }) => (
  <a className={useStyles().downloadLink} href={`${API_URL}${objectId}/stream`}>
    <IconButton>
      <GetApp />
    </IconButton>
  </a>
)

const ObjectListItem = ({ objectId }) => {
  const [objectState, setObjectState] = React.useState({
    nodes: [],
    tickets: [],
    size: 0,
    ticketCount: 0,
  })

  React.useState(() => {
    fetch(`${apiObjectsIndexUrl}${objectId}`, { headers })
      .then((r) => r.json())
      .then(setObjectState)
  }, [])

  const { size, ticketCount, contentType, nodes } = objectState
  return (
    <Paper
      variant="outlined"
      square={true}
      className={useStyles().objectLayout}
    >
      <DownloadLink objectId={objectId} />
      <Typography variant="h6">{objectId}</Typography>
      <Typography variant="subtitle1">{contentType}</Typography>
      <Typography variant="subtitle1">{size || 0} bytes</Typography>
      <Typography variant="subtitle1">{ticketCount} tickets</Typography>
      <Typography variant="subtitle1">{nodes.length} nodes</Typography>
    </Paper>
  )
}
const ObjectList = ({ objects }) => {
  if (objects.length === 0) {
    return <Typography variant="overline">No Objects</Typography>
  }

  return (
    <List>
      {objects.sort().map((objectId, i) => (
        <ObjectListItem key={i} objectId={objectId} />
      ))}
    </List>
  )
}

const ObjectStore = () => {
  const [objects, setObjects] = React.useState([])

  React.useState(() => {
    fetch(apiObjectsIndexUrl, { headers })
      .then((r) => r.json())
      .then((data) => setObjects(data.objects))
  }, [])

  return (
    <div className={useStyles().layout}>
      <div className={useStyles().panel}>
        <Typography variant="h5">Objects</Typography>
        <ObjectList objects={objects} />
      </div>
    </div>
  )
}

export default ObjectStore
