import PropTypes from 'prop-types'
import React from 'react'
import Library from './Library'
import AddLibrary from './AddLibrary'

import { Title, Subtitle, Button, Level, LevelLeft, LevelItem } from 'bloomer'

class CategoryPage extends React.Component {
  constructor () {
    super()
    this.state = {adding: false}
  }

  openAdd = () => {
    this.setState({
      adding: true
    })
  }

  closeAdd = () => {
    this.setState({
      adding: false
    })
  }

  render () {
    const { category, libraries, loggedIn } = this.props
    return (<div className='CategoryPage'>
      <Level>
        <LevelLeft>
          <LevelItem>
            <Title>{category.title}</Title>
          </LevelItem>
          {loggedIn &&
          <LevelItem>
            <Button onClick={this.openAdd}>+ Add library</Button>
          </LevelItem>
          }
        </LevelLeft>
      </Level>

      {libraries.length === 0
        ? <Subtitle>No libraries yet</Subtitle>
        : libraries.map(library => (
          <Library key={library.id} library={library} libraryId={library.id} />
        ))}

      <AddLibrary visible={this.state.adding} handleClose={this.closeAdd}
        categoryId={category.id}
        addLibrary={this.props.addLibrary} />
    </div>
    )
  }
}

CategoryPage.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  libraries: PropTypes.array,
  loggedIn: PropTypes.bool
}

export default CategoryPage
