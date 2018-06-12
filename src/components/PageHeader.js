import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import { Level, LevelLeft, LevelRight, LevelItem, Title } from 'bloomer'

class PageHeader extends React.Component {
  render () {
    return (<div className='PageHeader'>
      <Level>
        <LevelLeft>
          <LevelItem>
            <img className='PageHeader__logo' src={logo} alt='React logo' />
          </LevelItem>
          <LevelItem>
            <Link to='/'>
              <Title isSize={1}>
                React Depot
              </Title>
            </Link>
          </LevelItem>
        </LevelLeft>
        <LevelRight>
          <LevelItem>have a nice day</LevelItem>
        </LevelRight>
      </Level>
    </div>)
  }
}

export default PageHeader
