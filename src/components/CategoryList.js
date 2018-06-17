import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Title, Section, Columns, Column } from 'bloomer'

const CategoryList = (props) => {
  const categories = props.categories || []

  return (<Section className='CategoryList'>
    <Columns isMultiline>
      {categories.map(category => (
        <Column isSize={6} key={category.id} isChild className='CategoryList__category'>
          <Title className='CategoryList__title'>
            <Link to={`/category/${category.id}`}>{category.title}</Link>
          </Title>
        </Column>
      ))}
    </Columns>
  </Section>)
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
