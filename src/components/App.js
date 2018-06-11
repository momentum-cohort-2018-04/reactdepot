import React, { Component } from 'react'
import './App.css'
import PageHeader from './PageHeader'
import CategoryList from './CategoryList'
import CategoryPageContainer from './CategoryPageContainer'
import LibraryPage from './LibraryPage'
import categories from '../stories/fakes/categories.json'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Container textAlign='left'>
          <PageHeader />
          <Router>
            <React.Fragment>
              <Route exact path='/' render={props =>
                <CategoryList categories={categories} {...props} />
              } />
              <Route path='/category/:categoryId' component={CategoryPageContainer} />
              <Route path='/library/:libraryId' render={props =>
                <LibraryPage {...props} />
              } />
            </React.Fragment>
          </Router>
        </Container>
      </div>
    )
  }
}

export default App
