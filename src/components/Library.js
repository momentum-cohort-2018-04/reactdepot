import React from 'react'
import { Box, Subtitle, Icon, Columns, Column, Button } from 'bloomer'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'

class Library extends React.Component {
  render () {
    const { library } = this.props

    let npmInfo = library.npms && library.npms.npm
    let ghInfo = library.npms && library.npms.github
    let score = library.npms && library.npms.score

    return (<div className='Library'>
      <Box>
        <Columns>
          <Column isSize='3/4'>
            <Subtitle>{library.name}</Subtitle>
          </Column>

          <Column isSize='1/4'>
            <Subtitle className='score'>{score && Math.round(score.final * 100)}</Subtitle>
          </Column>
        </Columns>
        {library.description && <p>{library.description}</p>}
        <Columns>
          {library.github && (
            <Column>
              <Icon isSize='small' className='fab fa-github' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://github.com/${library.github}`}>GitHub</a>
                {ghInfo && <React.Fragment>
                  <div>stars {ghInfo.starsCount}</div>
                  <div>open issues {ghInfo.issues.openCount}</div>
                </React.Fragment>}
              </span>
            </Column>
          )}
          {library.npm && (
            <Column>
              <Icon isSize='small' className='fab fa-npm' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://www.npmjs.com/package/${library.npm}`}>npm</a>
                {npmInfo && <React.Fragment>
                  <div>version {npmInfo.currentVersion}</div>
                  <div>monthly downloads {npmInfo.downloads.oneMonth.count}</div>
                  <div>dependent libraries {npmInfo.dependentsCount}</div>
                </React.Fragment>}
              </span>
            </Column>
          )}
        </Columns>
        <UserContext.Consumer>
          {user => user && <Link to={`/library/${library.name}/edit`}><Button>Edit</Button></Link>}
        </UserContext.Consumer>
      </Box>
    </div>)
  }
}

export default Library
