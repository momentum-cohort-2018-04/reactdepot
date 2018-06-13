import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Title } from 'bloomer'

const CategoryList = (props) => {
  const categories = props.categories || []

  return (<div className='CategoryList'>
    {categories.map(category => (
      <div key={category.id} className='CategoryList__category'>
        <Title className='CategoryList__title'>
          <Link to={`/category/${category.id}`}>{category.title}</Link>
        </Title>
        <div>
          {category.libraryText}
        </div>
      </div>
    ))}
  </div>)
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      libraries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string
        })
      )
    })
  )
}

export default CategoryList
