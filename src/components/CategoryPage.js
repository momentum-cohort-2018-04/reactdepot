import React from 'react'
import { Link } from 'react-router-dom'

class CategoryPage extends React.Component {
  render () {
    const { category } = this.props
    return (<div class='CategoryPage'>
      <h2>{category.title}</h2>
      <ul>
        {category.libraries.map(library => (
          <li><Link to={`/library/${library.id}`}>{library.name}</Link></li>
        ))}
      </ul>
    </div>
    )
  }
}

export default CategoryPage
