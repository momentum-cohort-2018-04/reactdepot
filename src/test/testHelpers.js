import React from 'react'
import { Router } from '@reach/router'

export function withRouter (component) {
  return <Router>{component}</Router>
}
