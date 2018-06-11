import React from 'react'
import { MemoryRouter } from 'react-router-dom'

export function withRouter (component) {
  return <MemoryRouter>{component}</MemoryRouter>
}
