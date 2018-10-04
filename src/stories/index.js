import React from 'react'

import '../bulma-custom.css'
import '../index.css'

import { storiesOf, addDecorator } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

// import { Welcome } from '@storybook/react/demo'
import { Container } from 'bloomer'
import { Router } from '@reach/router'

import PageHeader from '../components/PageHeader'
import CategoryList from '../components/CategoryList'
import CategoryPage from '../components/CategoryPage'
import categories from '../test/fakes/categories.json'

addDecorator(story => (
  <Router>
    <Container>
      {story()}
    </Container>
  </Router>
))

storiesOf('PageHeader', module)
  .add('default', () => <PageHeader />)

storiesOf('CategoryList', module)
  .add('with no data', () => <CategoryList />)
  .add('with fake data', () => <CategoryList categories={categories} />)

storiesOf('CategoryPage', module)
  .add('with fake category', () => <CategoryPage category={categories[1]} />)
