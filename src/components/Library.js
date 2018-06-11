import React from 'react'
import { Link } from 'react-router-dom'

class Library extends React.Component {
  render () {
    const { library } = this.props
    return (<div className='Library'>
      <Link to={`/library/${library.id}`}>{library.name}</Link>
    </div>)
  }
}

export default Library
