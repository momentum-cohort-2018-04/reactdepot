import React from 'react'
import CategoryListContainer from './CategoryListContainer'
import { Content } from 'bloomer'

const HomePage = (props) => {
  return (<div className='HomePage'>
    <Content>
      <p>
        React Depot is a curated directory of JavaScript libraries made to work with React.
        If you wish to add a new category or a new library, log in via GitHub.
      </p>

      <p>All data is provided by <a href='https://npms.io/'>npms.io</a>.</p>
    </Content>
    <CategoryListContainer {...props} />
  </div>)
}

export default HomePage
