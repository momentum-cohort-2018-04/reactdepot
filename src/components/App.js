import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'bloomer'
import './App.css'
import CategoryListContainer from './CategoryListContainer'
import CategoryPageContainer from './CategoryPageContainer'
import LibraryPage from './LibraryPage'
import PageHeader from './PageHeader'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Container>
          <PageHeader />
          <Route exact path='/' component={CategoryListContainer} />
          <Route path='/category/:categoryId' component={CategoryPageContainer} />
          <Route path='/library/:libraryId' component={LibraryPage} />
        </Container>
      </div>
    )
  }
}

export default App
