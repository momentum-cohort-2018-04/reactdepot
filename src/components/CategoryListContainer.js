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

  addCategory = (title, slug) => {
    return this.db.addCategory(title, slug)
      .then(() => this.db.getCategories())
      .then(categories => {
        this.setState({
          loaded: true,
          categories: categories
        })
      })
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
