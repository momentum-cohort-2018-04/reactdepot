import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import { Level, LevelLeft, LevelRight, LevelItem, Title, Button } from 'bloomer'
import firebase from '../firebase'
import UserContext from '../UserContext'
const provider = new firebase.auth.GithubAuthProvider()

class PageHeader extends React.Component {
  handleLogin = (event) => {
    event.preventDefault()
    firebase.auth().signInWithRedirect(provider)
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
            {user
              ? <span>Hello, {user.displayName}</span>
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
