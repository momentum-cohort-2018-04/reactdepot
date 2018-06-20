import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Input,
  Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardFooter, ModalCardBody, ModalCardTitle,
  Delete, Button } from 'bloomer'
import { slugify } from 'mout/string'

class AddCategory extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      slug: ''
    }
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
      slug: slugify(event.target.value)
    })
  }

  handleSave = (event) => {
    event.preventDefault()
    this.props.addCategory(this.state.name, this.state.slug)
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
              <Label>Category Name</Label>
              <Control>
                <Input type='text' onChange={this.handleChangeName} value={this.state.name} />
              </Control>
            </Field>
            <Field>
              <Label>Category URL Slug</Label>
              <Control>
                <Input type='text' onChange={this.handleChangeSlug} readOnly value={this.state.slug} />
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

AddCategory.propTypes = {
  visible: PropTypes.bool,
  addCategory: PropTypes.func,
  handleClose: PropTypes.func
}

export default AddCategory
