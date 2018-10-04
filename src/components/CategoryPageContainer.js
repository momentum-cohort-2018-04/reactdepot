import React from 'react'
import CategoryPage from './CategoryPage'
import Loader from './Loader'
import Database from '../Database'
import UserContext from '../UserContext'

class CategoryPageContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      loaded: false,
      category: null,
      libraries: []
    }

    this.db = new Database()
  }

  componentDidMount () {
    let { categoryId } = this.props
    if (categoryId === 'null') {
      categoryId = null
    }

    this.db.getCategory(categoryId).then(category => {
      this.setState({
        loaded: true,
        category: category
      })
    })

    this.stopWatchLibraries = this.db.watchLibraries(categoryId, libraries => {
      this.setState({libraries: libraries})
    })
  }

  componentWillUnmount () {
    this.stopWatchLibraries()
  }

  addLibrary = (libraryId) => {
    const catId = this.state.category ? this.state.category.id : null
    return this.db.addLibrary(libraryId, catId)
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryPage category={this.state.category}
        libraries={this.state.libraries}
        addLibrary={this.addLibrary}
        loggedIn={this.props.loggedIn} />
    </Loader>
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <CategoryPageContainer {...props} loggedIn={Boolean(user)} />}
  </UserContext.Consumer>
)
