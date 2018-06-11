import React from 'react'
import categories from '../test/fakes/categories.json'
import CategoryList from './CategoryList'

class CategoryListContainer extends React.Component {
  render () {
    return <CategoryList categories={categories} {...this.props} />
  }
}

export default CategoryListContainer
