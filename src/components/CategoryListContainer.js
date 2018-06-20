import React from 'react'
import CategoryList from './CategoryList'
import Loader from './Loader'
import Database from '../Database'
import UserContext from '../UserContext'

class CategoryListContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      showUncategorized: false,
      categories: []
    }

    this.db = new Database()
    this.categoriesRef = null
  }

  componentDidMount () {
    this.categoriesRef = this.db.watchCategories(categories => {
      this.setState({
        loaded: true,
        categories: categories
      })
    })

    // TODO make this live update
    this.db.getLibraries(null)
      .then(libraries => {
        if (libraries.length > 0) {
          this.setState({
            showUncategorized: true
          })
        }
      })
  }

  componentWillUnmount () {
    this.categoriesRef.off('value')
  }

  addCategory = (title, slug) => {
    return this.db.addCategory(title, slug)
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryList categories={this.state.categories} addCategory={this.addCategory} {...this.props} />
    </Loader>
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <CategoryListContainer {...props} loggedIn={Boolean(user)} />}
  </UserContext.Consumer>
)
