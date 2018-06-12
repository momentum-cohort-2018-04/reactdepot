import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../components/App'
import { withRouter } from '../testHelpers'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(withRouter(<App />), div)
  ReactDOM.unmountComponentAtNode(div)
})
