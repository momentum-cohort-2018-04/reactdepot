import React from 'react'
import { Box, Subtitle, Icon, Columns, Column } from 'bloomer'
import request from 'superagent'

class Library extends React.Component {

  constructor () {
    super()
    this.state = {
      version: '',
      downloads: '',
      stars: '',
      issues: '',
      libraries: '',
      score: ''
    }
  }

  componentDidMount () {
    // console.log(this.props.libraryName)
    request
      .get(`https://api.npms.io/v2/package/${this.props.libraryName}`)
      .then(res => {
        console.log(res)
        this.setState({
          version: res.body.collected.metadata.version,
          downloads: res.body.collected.npm.downloads[2].count,
          stars: res.body.collected.github.starsCount,
          issues: res.body.collected.github.issues.openCount,
          libraries: res.body.collected.npm.dependentsCount,
          score: Math.round(res.body.score.final * 100)
        })
      })
  }

  render () {
    const { library } = this.props
    return (<div className='Library'>
      <Box>
        <Columns>
          <Column isSize='3/4'>
            <Subtitle>{library.name}</Subtitle>
          </Column>

          <Column isSize='1/4'>
            <Subtitle className='score'>{this.state.score}</Subtitle>
          </Column>
        </Columns>
        {library.description && <p>{library.description}</p>}
        <Columns>
          {library.github && (
            <Column>
              <Icon isSize='small' className='fab fa-github' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://github.com/${library.github}`}>GitHub</a>
                <div>stars {this.state.stars}</div>
                <div>open issues {this.state.issues}</div>
              </span>
            </Column>
          )}
          {library.npm && (
            <Column>
              <Icon isSize='small' className='fab fa-npm' />
              <span style={{marginLeft: '0.5rem'}}>
                <a href={`https://www.npmjs.com/package/${library.npm}`}>npm</a>
                <div>version {this.state.version}</div>
                <div>monthly downloads {this.state.downloads}</div>
                <div>dependent libraries {this.state.libraries}</div>
              </span>
            </Column>
          )}
        </Columns>
      </Box>
    </div>)
  }
}

export default Library
