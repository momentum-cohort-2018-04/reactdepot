import PropTypes from 'prop-types'
import React from 'react'
import Library from './Library'
import { Title } from 'bloomer'

class CategoryPage extends React.Component {
  render () {
    const { category, libraries } = this.props
    return (<div className='CategoryPage'>
      <Title>{category.title}</Title>
      {libraries.map(library => (
        <Library key={library.id} library={library} libraryName={library.id} />
      ))}
    </div>
    )
  }
}

CategoryPage.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  libraries: PropTypes.array
}

export default CategoryPage
