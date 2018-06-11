import React from 'react'
import ReactDOM from 'react-dom'
import CategoryPage from '../../components/CategoryPage'
import categories from '../fakes/categories.json'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CategoryPage category={categories[0]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
