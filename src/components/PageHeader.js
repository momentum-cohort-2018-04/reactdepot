import React from 'react'
import logo from '../logo.svg'
import { Link } from '@reach/router'
import { Level, LevelLeft, LevelRight, LevelItem, Title, Button } from 'bloomer'
import firebase from '../firebase'
import UserContext from '../UserContext'

class PageHeader extends React.Component {
  handleLogin = (event) => {
    event.preventDefault()
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  handleLogout = (event) => {
    event.preventDefault()
    firebase.auth().signOut()
  }

  render () {
    const { user } = this.props

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
          <LevelItem>
            {user && <span>Hello, {user.displayName}</span>}
          </LevelItem>
          <LevelItem>
            {user
              ? <Button isColor='warning' onClick={this.handleLogout}>Logout</Button>
              : <Button isColor='primary' onClick={this.handleLogin}>Login with GitHub</Button>}
          </LevelItem>
        </LevelRight>
      </Level>
    </div>)
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <PageHeader {...props} user={user} />}
  </UserContext.Consumer>
)
