import React from 'react'
import Database from '../Database'
import { Box, Icon, Columns, Column, Control, Input, Label, Select, Field, TextArea, Button } from 'bloomer'
// import { bindActionCreators } from 'redux'
// import { target } from 'glamor'

class LibraryEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      libraryName: this.props.match.params.libraryName,
      libraryEntry: {},
      categorySelect: [],
      categoryId: '',
      // id: '',
      name: '',
      description: '',
      github: '',
      needsUpdate: false,
      npm: ''
    }
    this.db = new Database()
    console.log(this.props)
    this.changeHandler = this.changeHandler.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
  }

  componentDidMount () {
    this.db.getLibrary(this.state.libraryName)
      .then((response) => {
        console.log('tst', response)
        console.log(typeof (response))
        this.setState({
          libraryEntry: response,
          name: response.name,
          description: response.description,
          github: response.github,
          needsUpdate: true,
          npm: response.npm,
          categoryId: response.categoryId
        })
      })
    this.db.getCategories()
      .then((response) => {
        console.log(response)
        console.log(this.state.categoryId)
        const justCat = response.map((entry, id) => (
          <option value={entry.id} key={id}>{entry.id}</option>
        ))
        this.setState({
          categorySelect: justCat
        })
      })
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitEdit () {
    const updatedLib = {
      categoryId: this.state.categoryId,
      description: this.state.description,
      github: this.state.github,
      name: this.state.name,
      npm: this.state.npm,
      needsUpdate: true
    }
    this.db.editLibrary(updatedLib)
      .then((response) => {
        // console.log('submitedit response', response)
        this.props.history.push(`/category/${this.state.categoryId}`)
      })
  }

  render () {
    const library = this.state
    return (
      <div className='Library'>
        <Box>
          {/* <Form> */}
          <Field>
            <Label>Library Name:</Label>
            <Control>
              <Input type='text' value={library.name} name='name' onChange={(event) => this.changeHandler(event)} />
            </Control>
          </Field>
          <Field>
            <Label>Category:</Label>
            <Control>
              <Select name='categoryId' onChange={(event) => this.changeHandler(event)} value={library.categoryId}> {library.categorySelect} </Select>
            </Control>
          </Field>
          {library.description &&
          <Field>
            <Label>Library Description:</Label>
            <Control>
              <TextArea type='text' value={library.description} name='description' onChange={(event) => this.changeHandler(event)} />
            </Control>
          </Field>}
          <Columns>
            {library.github && (
              <Column>
                <Icon isSize='small' className='fab fa-github' />
                <span style={{marginLeft: '0.5rem'}}>
                  <Label>GitHub</Label>
                  <Control>
                    <Input type='text' value={library.github} name='github' onChange={(event) => this.changeHandler(event)} />
                  </Control>
                </span>
              </Column>)}
            {library.npm && (
              <Column>
                <Icon isSize='small' className='fab fa-npm' />
                <span style={{marginLeft: '0.5rem'}}>
                  <Label>npm</Label>
                  <Control>
                    <Input type='text' value={library.npm} name='npm' onChange={(event) => this.changeHandler(event)} />
                  </Control>
                </span>
              </Column>)}
          </Columns>
          <Field isGrouped>
            <Control>
              <Button onClick={() => this.submitEdit()} type='button'>Submit</Button>
            </Control>
            <Control>
              <Button onClick={() => this.props.history.push(`/category/${library.categoryId}`)}>Cancel</Button>
            </Control>
          </Field>
          {/* </Form> */}
        </Box>
      </div>)
  }
}

export default LibraryEdit
