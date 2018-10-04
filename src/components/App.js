import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Container } from 'bloomer'
import './App.css'
import HomePage from './HomePage'
import CategoryPageContainer from './CategoryPageContainer'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import LibraryEdit from './LibraryEdit'
import firebase from '../firebase'
import UserContext from '../UserContext'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: firebase.auth().currentUser
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.user}>
        <div className='App'>
          <Container>
            <PageHeader />
            <Router>
              <HomePage path='/' />
              <CategoryPageContainer path='/category/:categoryId' />
              <LibraryEdit path='/library/:libraryId/edit' />
            </Router>
            <PageFooter />
          </Container>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App
