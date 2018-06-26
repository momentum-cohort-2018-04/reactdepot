import React from 'react'
import { Box, Subtitle, Icon, Columns, Column, Button, Control, Field,
  Level, LevelLeft, LevelRight, LevelItem } from 'bloomer'
import { Link } from 'react-router-dom'
import moment from 'moment'
import UserContext from '../UserContext'
import Database from '../Database'

class Library extends React.Component {
  componentDidMount () {
    const now = new Date()
    const loaded = new Date(this.props.library.npmsLoadedAt || 0)
    const interval = now - loaded
    const oneDay = 24 * 60 * 60 * 1000
    if (interval > oneDay) {
      const db = new Database()
      db.updateLibrary(this.props.library.libraryId)
    }
  }

  handleUpdate = () => {
    const db = new Database()
    db.updateLibrary(this.props.library.libraryId)
  }

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
        {links &&
        <Columns>
          {links.repository &&
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
          </Column>}
          {links.npm &&
          <Column>
            <Icon isSize='small' className='fab fa-npm' />
            <span style={{marginLeft: '0.5rem'}}>
              <a href={links.npm}>npm</a>
              <div>version {library.version}</div>
              {npm && <React.Fragment>
                <div>monthly downloads {npm.downloads.oneMonth.count}</div>
                <div>dependent libraries {npm.dependentsCount}</div>
              </React.Fragment>}
            </span>
          </Column>}
          {links.homepage && (
            <Column>
              <Icon isSize='small' className='fas fa-home' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={links.homepage}>homepage</a>
              </span>
            </Column>
          )}
        </Columns>}

        <Level>
          <LevelLeft>
            <LevelItem>
              <UserContext.Consumer>
                {user => user && <Field isGrouped>
                  <Control><Button onClick={this.handleUpdate}>Update</Button></Control>
                  <Control><Link to={`/library/${library.libraryId}/edit`}><Button>Edit</Button></Link></Control>
                </Field>}
              </UserContext.Consumer>
            </LevelItem>
          </LevelLeft>
          <LevelRight>
            <div className='has-text-grey-light'>Last updated at {moment(library.npmsLoadedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
          </LevelRight>
        </Level>
      </Box>
    </div>)
  }
}

export default Library
