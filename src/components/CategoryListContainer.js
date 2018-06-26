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
    this.stopWatchCategories = this.db.watchCategories(categories => {
      this.setState({
        loaded: true,
        categories: categories
      })
    })

    this.stopWatchLibraries = this.db.watchLibraries(null, libraries => {
      this.setState({
        showUncategorized: libraries.length > 0
      })
    })
  }

  componentWillUnmount () {
    this.stopWatchCategories()
    this.stopWatchLibraries()
  }

  addCategory = (title, slug) => {
    return this.db.addCategory(title, slug)
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryList showUncategorized={this.state.showUncategorized}
        categories={this.state.categories}
        addCategory={this.addCategory} {...this.props} />
    </Loader>
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <CategoryListContainer {...props} loggedIn={Boolean(user)} />}
  </UserContext.Consumer>
)
