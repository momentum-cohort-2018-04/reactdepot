import React from 'react'
import categories from '../test/fakes/categories.json'
import CategoryList from './CategoryList'
import Loader from 'react-loader'

class CategoryListContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      categories: []
    }
  }
  render () {
    return <Loader loaded={this.state.loaded} top='150px' parentClassName='react-loader'>
      <CategoryList categories={categories} {...this.props} />
    </Loader>
  }
}

export default CategoryListContainer
