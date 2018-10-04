import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Title, Section, Columns, Column } from 'bloomer'

import AddCategory from './AddCategory'

class CategoryList extends React.Component {
  constructor () {
    super()
    this.state = {adding: false}
  }

  openAdd = () => {
    this.setState({
      adding: true
    })
  }

  closeAdd = () => {
    this.setState({
      adding: false
    })
  }

  render () {
    const categories = this.props.categories || []
    const { showUncategorized, loggedIn } = this.props

    return (<Section className='CategoryList'>
      <Columns isMultiline>
        {categories.map(category => (
          <Column isSize={6} key={category.id} className='CategoryList__category'>
            <Title className='CategoryList__title'>
              <Link to={`/category/${category.id}`}>{category.title}</Link>
            </Title>
          </Column>
        ))}
        {showUncategorized &&
        <Column isSize={6} className='CategoryList__category'>
          <Title className='CategoryList__title'>
            <Link to={`/category/null`}>Uncategorized</Link>
          </Title>
        </Column>}
        {loggedIn &&
        <Column isSize={6} className='CategoryList__category'>
          <Title className='CategoryList__title'>
            <a onClick={this.openAdd}>+ Add Category</a>
          </Title>
        </Column>}
      </Columns>
      <AddCategory visible={this.state.adding} handleClose={this.closeAdd} addCategory={this.props.addCategory} />
    </Section>)
  }
}

CategoryList.propTypes = {
  showUncategorized: PropTypes.bool,
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
  ),
  loggedIn: PropTypes.bool,
  addCategory: PropTypes.func
}

export default CategoryList
