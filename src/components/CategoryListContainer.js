import React from 'react'
import CategoryList from './CategoryList'
import Loader from './Loader'
import Database from '../Database'

class CategoryListContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      categories: []
    }

    this.db = new Database()
  }

  componentDidMount () {
    this.db.getCategoriesAndLibraries()
      .then(categories => {
        this.setState({
          loaded: true,
          categories: categories
        })
      })
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryList categories={this.state.categories} {...this.props} />
    </Loader>
  }
}

export default CategoryListContainer
