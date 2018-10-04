import React from 'react'
import Database from '../Database'
import { Box, Control, Label, Select, Field, Button } from 'bloomer'
import { navigate } from '@reach/router'

// TODO break this into container and presentational components

class LibraryEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      libraryId: props.libraryId,
      categorySelect: [],
      categoryId: ''
    }
    this.db = new Database()
    this.changeHandler = this.changeHandler.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
  }

  componentDidMount () {
    this.db.getLibrary(this.state.libraryId)
      .then((response) => {
        this.setState({
          categoryId: response.categoryId
        })
      })
    this.db.getCategories()
      .then((response) => {
        this.setState({
          categorySelect: response.map(entry => ({value: entry.id, title: entry.name}))
        })
      })
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitEdit () {
    const updatedLib = {
      categoryId: this.state.categoryId,
      libraryId: this.state.libraryId
    }
    this.db.editLibrary(updatedLib)
      .then((response) => {
        navigate(`/category/${this.state.categoryId}`)
      })
  }

  render () {
    const library = this.state
    return (
      <div className='Library'>
        <Box>
          <Field>
            <Label>Category:</Label>
            <Control>
              <Select name='categoryId' onChange={(event) => this.changeHandler(event)} value={library.categoryId}>
                <option value={null}>None</option>
                {this.state.categorySelect.map(category => <option value={category.value}>{category.value}</option>)}
              </Select>
            </Control>
          </Field>
          <Field isGrouped>
            <Control>
              <Button onClick={() => this.submitEdit()} type='button'>Submit</Button>
            </Control>
            <Control>
              <Button onClick={() => navigate(`/category/${library.categoryId}`)}>Cancel</Button>
            </Control>
          </Field>
        </Box>
      </div>)
  }
}

export default LibraryEdit
