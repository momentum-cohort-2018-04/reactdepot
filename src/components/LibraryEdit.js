import React from 'react'
import Database from '../Database'
import Library from './Library'
import { Box, Icon, Columns, Column, Control, Input, Label, Select, Field, TextArea, Button } from 'bloomer'
// import { bindActionCreators } from 'redux'
// import { target } from 'glamor'

import { Route } from 'react-router-dom'

class LibraryPage extends React.Component {
  render () {
    console.log('lib page props', this.props)
    return (
      <React.Fragment>
        <Route exact path='/library/:libraryName' render={props => (
          <ViewLibrary {...props} />
        )} />
        <Route exact path='/library/:libraryName/edit' render={props => (
          <EditLibrary {...props} />
        )} />
      </React.Fragment>

    )
  }
}
export default LibraryPage

class ViewLibrary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      libraryName: this.props.match.params.libraryName,
      libraryEntry: ''
    }
    this.db = new Database()
    console.log('view lib props', props)
  }

  componentDidMount () {
    console.log('HELLO>?')
    this.db.getLibrary(this.state.libraryName)
      .then((response) => {
        console.log('library edit test', response)
        this.setState({
          libraryEntry: response
        })
      })
  }

  render () {
    return <Library library={this.state.libraryEntry} />
  }
}

class EditLibrary extends React.Component {
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
    this.changeHandler = this.changeHandler.bind(this)
    console.log('EDIT lib props', props)
  }

  componentDidMount () {
    this.db.getLibrary(this.state.libraryName)
      .then((response) => {
        console.log('tst', response)
        console.log(typeof (response))
        // const data = response
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
        const justCat = response.map((entry, id) => {
          if (this.state.categoryId === entry.id) {
            return <option value={entry.id} key={id} >{entry.id} </option>
          } else {
            return <option value={entry.id} key={id}>{entry.id}</option>
          }
          /// index.js:2178 Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>
        })
        this.setState({
          categorySelect: justCat
        })
      })
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    // if (this.state.libraryEntry !== {}) {
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
              <Button >Submit</Button>
            </Control>
            <Control>
              <Button onClick={() => this.props.history.push(`/category/${library.categoryId}`)}>Cancel</Button>
            </Control>
          </Field>
          {/* </Form> */}
        </Box>
      </div>)
    // } else return null
  }
}
