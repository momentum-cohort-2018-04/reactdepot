import React from 'react'
import { Footer, Container, Content } from 'bloomer'
import logo from '../img/momentum.png'

class PageFooter extends React.Component {
  render () {
    return <Footer>
      <Container>
        <Content>
          <p>
            Made by Cohort 1 at
            <a href='https://www.momentumlearn.com'>
              <img src={logo} alt='Momentum Learning' style={{
                height: '30px',
                display: 'inline-block',
                verticalAlign: 'baseline',
                marginBottom: '-8px',
                marginLeft: '0.5rem'
              }} />
            </a>.
          </p>
        </Content>
        <Content isSize='small'>
          <a href='https://github.com/momentum-cohort-2018-04/reactdepot/'>
              Get the source at GitHub.
          </a>
        </Content>
      </Container>
    </Footer>
  }
}

export default PageFooter
