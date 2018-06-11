import React from 'react'

import 'semantic-ui-css/semantic.min.css'

import { storiesOf, addDecorator } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'
import { Button, Container } from 'semantic-ui-react'

import PageHeader from '../components/PageHeader'
import CategoryList from '../components/CategoryList'
import categories from './fakes/categories.json'

addDecorator(story => (
  <Container>
    {story()}
  </Container>
))

storiesOf('CategoryList', module)
  .add('with no data', () => <CategoryList />)
  .add('with fake data', () => <CategoryList categories={categories} />)

storiesOf('PageHeader', module)
  .add('default', () => <PageHeader />)
