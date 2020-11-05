import React from 'react'
import ReactDOM from 'react-dom'
import ObjectStore from './components/ObjectStore'
import Navigation from './components/Navigation'

class SimpleObjectStore extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <ObjectStore />
      </div>
    )
  }
}

ReactDOM.render(<SimpleObjectStore />, document.getElementById('app'))
