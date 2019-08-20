import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Theme } from '../../atoms/Button'
import TextField from '../../molecules/TextField'
import DropdownTextField from '../../molecules/DropdownTextField'
import LabeledCheckBox from '../../molecules/LabeledCheckBox'
import OptionGroupDialog from '../modal/OptionGroupDialog'


import './style.css'

class SignInForm extends Component {

  constructor() {
      super();
      this.state = {
        isIdTypeOptionsHidden: true
      };
  }

  setIdTypeOptionsHidden(isHidden) {
    this.setState({
      isIdTypeOptionsHidden: isHidden
    });
  }

  render() {
    const { className } = this.props
    const classProps = classnames(
      "organism-sign-in-form",
      className
    )
    return <div className={classProps}>
      <OptionGroupDialog
      className="organism-sign-in-form-id-types-options-dialog"
      hideSubtitle={true}
      title="Choose other identification type"
      isHidden={this.state.isIdTypeOptionsHidden}
      options={['MyKad Number','NRIC Number','Passport Number']}
      onCloseButtonClick={() => {this.setIdTypeOptionsHidden(true)}}
      onOptionSelected={(selectedValue)=>{console.log(selectedValue)}}/>
      <DropdownTextField
      className="organism-sign-in-form-dropdown-text-field"
      textFieldLabelText="ID Number"
      textFieldHintText="Why Need This?"
      textFieldName="ID_NUMBER"
      textFieldValue="MyKad Number"
      onHintClicked={() => {
        console.log("hint clicked")
      }}
      onDropdownTextFieldClicked={() => {
        this.setIdTypeOptionsHidden(false)
      }} />
      <TextField
      className="organism-sign-in-form-text-field-id-number"
      textFieldPlaceHolder="E.g 570303135700"
      />
      <TextField
      className="organism-sign-in-form-text-field-account-number"
      textFieldLabelText="Account / Smartcard Number"
      textFieldHintText="Sample"
      textFieldPlaceHolder="E.g 0931613456"
      />
    <LabeledCheckBox className="organism-sign-in-form-check-box" title="Remember Account Number"/>
      <div className="organism-sign-in-form-button-container">
        <Button className="organism-sign-in-form-button-cancel" theme={Theme.BORDER}>
          <Label level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}>CANCEL</Label>
        </Button>
        <Button className="organism-sign-in-form-button-submit" theme={Theme.FILL} >
          <Label level={LabelLevel.BODY_BOLD} color={LabelColor.WHITE}>SUBMIT</Label>
        </Button>
      </div>
    </div>
  }
}

SignInForm.propTypes = {
  className: PropTypes.string
}

SignInForm.defaultProps = {
  className: ''
}

export default SignInForm
