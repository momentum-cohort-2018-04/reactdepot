import React from 'react'
import CategoryList from './CategoryList'
import Loader from './Loader'
import Database from '../Database'

class CategoryListContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      showUncategorized: false,
      categories: []
    }

    this.db = new Database()
  }

  componentDidMount () {
    this.db.getCategories()
      .then(categories => {
        this.setState({
          loaded: true,
          categories: categories
        })
      })

    this.db.getLibraries(null)
      .then(libraries => {
        if (libraries.length > 0) {
          this.setState({
            showUncategorized: true
          })
        }
      })
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryList categories={this.state.categories} {...this.props} />
    </Loader>
  }
}

export default CategoryListContainer
