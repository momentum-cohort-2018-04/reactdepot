import React from 'react'
import PropTypes from 'prop-types'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const CategoryList = (props) => {
  const categories = props.categories || []

  return (<div className='CategoryList'>
    <Item.Group>
      {categories.map(category => (
        <Item key={category.id} className='CategoryList__category'>
          <Item.Content>
            <Item.Header>
              <Link to={`/category/${category.id}`}>{category.title}</Link>
            </Item.Header>
            <Item.Description>
              {category.libraries.length > 0
                ? category.libraries.map(l => l.name).join(', ')
                : 'No libraries'
              }
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>

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
