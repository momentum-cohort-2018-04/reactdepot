import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'bloomer'
import './App.css'
import CategoryListContainer from './CategoryListContainer'
import CategoryPageContainer from './CategoryPageContainer'
import PageHeader from './PageHeader'
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
            <Route exact path='/' component={CategoryListContainer} />
            <Route path='/category/:categoryId' component={CategoryPageContainer} />
          </Container>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App
