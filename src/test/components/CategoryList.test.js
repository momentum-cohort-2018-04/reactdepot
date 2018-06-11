import React from 'react'
import ReactDOM from 'react-dom'
import CategoryList from '../../components/CategoryList'
import categories from '../fakes/categories.json'
import { withRouter } from '../testHelpers'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(withRouter(<CategoryList categories={categories} />), div)
  ReactDOM.unmountComponentAtNode(div)
})
