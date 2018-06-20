import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Input,
  Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardFooter, ModalCardBody, ModalCardTitle,
  Delete, Button } from 'bloomer'

class AddLibrary extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      slug: ''
    }
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSave = (event) => {
    event.preventDefault()
    this.props.addLibrary(this.state.name, this.props.categoryId)
      .then(() => this.props.handleClose())
  }

  render () {
    return (
      <Modal isActive={this.props.visible}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Add Category</ModalCardTitle>
            <Delete onClick={this.props.handleClose} />
          </ModalCardHeader>
          <ModalCardBody>
            <Field>
              <Label>Library name</Label>
              <Control>
                <Input type='text' onChange={this.handleChangeName} value={this.state.name} />
              </Control>
            </Field>
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor='success' onClick={this.handleSave}>Save</Button>
            <Button isColor='warning' onClick={this.props.handleClose}>Cancel</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>)
  }
}

AddLibrary.propTypes = {
  visible: PropTypes.bool,
  addLibrary: PropTypes.func,
  handleClose: PropTypes.func,
  categoryId: PropTypes.string
}

export default AddLibrary
