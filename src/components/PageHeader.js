import React from 'react'
import { Grid, Header, Divider, Image } from 'semantic-ui-react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'

class PageHeader extends React.Component {
  render () {
    return (<div className='PageHeader'>
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column>
            <Link to='/'>
              <Header as='h1'>
                <Image src={logo} size='small' verticalAlign='middle' />
                <span>React Depot</span>
              </Header>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            have a nice day
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </div>)
  }
}

export default PageHeader
