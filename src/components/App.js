import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'bloomer'
import './App.css'
import CategoryListContainer from './CategoryListContainer'
import CategoryPageContainer from './CategoryPageContainer'
import PageHeader from './PageHeader'
import LibraryEdit from './LibraryEdit'
// import LibraryAdd from './LibraryAdd'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Container>
          <PageHeader />
          <Route exact path='/' component={CategoryListContainer} />
          <Route path='/category/:categoryId' component={CategoryPageContainer} />
          <Route path='/library/:libraryName/edit' component={LibraryEdit} />
          {/* <Route path='/library/add' component={LibraryAdd} /> */}
        </Container>
      </div>
    )
  }
}

export default App
