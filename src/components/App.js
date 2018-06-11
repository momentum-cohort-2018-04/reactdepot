import React, { Component } from 'react'
import logo from '../logo.svg'
import './App.css'
import PageHeader from './PageHeader'
import CategoryList from './CategoryList'
import categories from '../stories/fakes/categories.json'
import { Container } from 'semantic-ui-react'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Container textAlign='left'>
          <PageHeader />
          <CategoryList categories={categories} />
        </Container>
      </div>
    )
  }
}

export default App
