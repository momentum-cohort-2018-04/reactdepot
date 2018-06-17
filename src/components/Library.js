import React from 'react'
import { Box, Subtitle, Icon, Columns, Column, Button } from 'bloomer'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'

class Library extends React.Component {
  render () {
    const { library } = this.props
    const { npm, github, score, links } = library

    return (<div className='Library'>
      <Box>
        <Columns>
          <Column isSize='3/4'>
            <Subtitle>{library.name || library.libraryId}</Subtitle>
          </Column>

          <Column isSize='1/4'>
            <Subtitle className='score'>{score && Math.round(score.final * 100)}</Subtitle>
          </Column>
        </Columns>
        <Subtitle isSize={6}>
          {library.description && <p>{library.description}</p>}
        </Subtitle>
        <Columns>
          {library.github && (
            <Column>
              <Icon isSize='small' className='fab fa-github' />
              <span style={{marginLeft: '0.5rem'}}>
                {/* TODO - check that repo exists and is GH repo */}
                <a href={links.repository}>GitHub</a>
                {github && <React.Fragment>
                  <div>stars {github.starsCount}</div>
                  <div>open issues {github.issues.openCount}</div>
                </React.Fragment>}
              </span>
            </Column>
          )}
          {library.npm && (
            <Column>
              <Icon isSize='small' className='fab fa-npm' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={links.npm}>npm</a>
                {npm && <React.Fragment>
                  <div>version {library.version}</div>
                  <div>monthly downloads {npm.downloads.oneMonth.count}</div>
                  <div>dependent libraries {npm.dependentsCount}</div>
                </React.Fragment>}
              </span>
            </Column>
          )}
          {links.homepage && (
            <Column>
              <Icon isSize='small' className='fas fa-home' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={links.homepage}>homepage</a>
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
