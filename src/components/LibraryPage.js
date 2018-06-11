import React from 'react'

import { Route } from 'react-router-dom'

class LibraryPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Route exact path='/library/:libraryId' render={props => (
          <h2 {...props}>View library {props.match.params.libraryId}</h2>
        )} />
        <Route exact path='/library/:libraryId/edit' render={props => (
          <h2 {...props}>Edit library {props.match.params.libraryId}</h2>
        )} />
      </React.Fragment>

    )
  }
}

export default LibraryPage
