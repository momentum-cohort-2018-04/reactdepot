import React from 'react'
import { Box, Subtitle, Icon, Columns, Column } from 'bloomer'

class Library extends React.Component {
  render () {
    const { library } = this.props
    return (<div className='Library'>
      <Box>
        <Subtitle>{library.name}</Subtitle>
        {library.description && <p>{library.description}</p>}
        <Columns>
          {library.github && (
            <Column>
              <Icon isSize='small' className='fab fa-github' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://github.com/${library.github}`}>GitHub</a>
              </span>
            </Column>
          )}
          {library.npm && (
            <Column>
              <Icon isSize='small' className='fab fa-npm' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://www.npmjs.com/package/${library.npm}`}>npm</a>
              </span>
            </Column>
          )}
        </Columns>
      </Box>
    </div>)
  }
}

export default Library
