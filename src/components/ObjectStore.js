import React from 'react'
import {List, ListItem, Paper, makeStyles, Typography} from "@material-ui/core"

const styles = {
    layout: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    objectLayout: {
        margin: "2px",
        padding: "4px",
    },
    panel: {
    }
}
const headers = {"Content-Type": "application/json"}
const API_URL = process.env.SOS_API_URL || "http://localhost:8000/"
const useStyles = makeStyles(styles)
const apiObjectsIndexUrl = `${API_URL}`

const ObjectListItem = ({objectId}) => {
    const [objectState, setObjectState] = React.useState({
        nodes: [],
        tickets: [],
        size: 0,
        ticketCount: 0,
    })

    React.useState(() => {
        fetch(`${apiObjectsIndexUrl}${objectId}`, {headers})
        .then(r => r.json())
        .then(setObjectState)
    }, [])

    const {size, ticketCount, tickets, nodes} = objectState
    return <Paper variant="outlined" square={true} className={useStyles().objectLayout}>
        <Typography variant="h6">
            {objectId}
        </Typography>
        <Typography variant="subtitle1">
            {size || 0} bytes
        </Typography>
        <Typography variant="subtitle1">
            {ticketCount} tickets
        </Typography>
        <Typography variant="subtitle1">
            {nodes.length} nodes
        </Typography>
    </Paper>
}
const ObjectList = ({objects}) => {
    if (objects.length === 0) {
        return <Typography variant="overline">No Objects</Typography>
    }

    return <List>
        {objects.map((objectId, i) => <ObjectListItem key={i} objectId={objectId} />)}
    </List>
}

const ObjectStore = () => {
    const [objects, setObjects] = React.useState([])

    React.useState(() => {
        fetch(apiObjectsIndexUrl, {headers})
        .then(r => r.json())
        .then(data => setObjects(data.objects))
    }, [])

    return <div className={useStyles().layout}>
        <div className={useStyles().panel}>
            <Typography variant="h5">Objects</Typography>
            <ObjectList objects={objects} />
        </div>
    </div>
}

export default ObjectStore