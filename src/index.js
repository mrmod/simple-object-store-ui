import React from 'react'
import ReactDOM from 'react-dom'
import ObjectStore from './components/ObjectStore'
import {withStyles, Typography, Toolbar, AppBar} from "@material-ui/core"
const styles = {
    navigationLabel: {
        flexGrow: 1,
    }
}

class Root extends React.Component {
  render() {
    return <div>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    className={this.props.classes.navigationLabel}
                    variant="h6">
                        SimpleObjectStore
                </Typography>
            </Toolbar>
        </AppBar>
        <ObjectStore />
    </div>
  }
}

const SimpleObjectStore = withStyles(styles)(Root)
ReactDOM.render(<SimpleObjectStore />, document.getElementById('app'))