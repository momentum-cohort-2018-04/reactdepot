import React from 'react'
import CategoryPage from './CategoryPage'
import categories from '../stories/fakes/categories.json'

class CategoryPageContainer extends React.Component {
  render () {
    const { match } = this.props
    const category = categories.find(category => match.params.categoryId === category.id)
    return <CategoryPage category={category} />
  }
}

export default CategoryPageContainer
