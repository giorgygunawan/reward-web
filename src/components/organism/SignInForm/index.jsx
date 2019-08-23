import React, { Component } from 'react'
import { Auth } from "aws-amplify"
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Type, Theme } from '../../atoms/Button'
import TextField from '../../molecules/TextField'
import DropdownTextField from '../../molecules/DropdownTextField'
import LabeledCheckBox from '../../molecules/LabeledCheckBox'
import OptionGroupDialog from '../modal/OptionGroupDialog'


import './style.css'

class SignInForm extends Component {

  constructor() {
      super();
      this.state = {
        isIdTypeOptionsHidden: true,
        idNumberType: 'myKad Number',
        idNumber: '',
        accountNumber: '',
        isFormError: false,
        isLoading: false
      };
  }

  setIdTypeOptionsHidden(isHidden) {
    this.setState({
      isIdTypeOptionsHidden: isHidden
    });
  }

  setIdNumberType(value) {
    this.setState({
      idNumberType: value
    })
  }

  setIdNumber(value) {
    this.setState({
      idNumber: value,
      isFormError: false
    })
  }

  setAccountNumber(value) {
    this.setState({
      accountNumber: value,
      isFormError: false
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    try {
      await Auth.signIn(this.state.idNumber, this.state.accountNumber);
      this.setState({
        isFormError: false,
        isLoading: false
      });
      this.props.userSignedIn();
    } catch (e) {
      this.setState({
        isFormError: true,
        isLoading: false
      });
    }
  }

  validateForm() {
    return this.state.idNumber.length > 0 && this.state.accountNumber.length > 0;
  }


  render() {
    const { className } = this.props
    const classProps = classnames(
      "organism-sign-in-form",
      className
    )
    return <form id='sign-in-form' className={classProps} onSubmit={this.handleSubmit}>
        <OptionGroupDialog
        className="organism-sign-in-form-id-types-options-dialog"
        defaultSelectedIndex={0}
        hideSubtitle={true}
        title="Choose other identification type"
        isHidden={this.state.isIdTypeOptionsHidden}
        options={['MyKad Number','NRIC Number','Passport Number']}
        onCloseButtonClick={() => {this.setIdTypeOptionsHidden(true)}}
        onOptionSelected={ (selectedValue) => { this.setIdNumberType(selectedValue) }}/>
        { this.state.isFormError && <Label className="organism-sign-in-form-error-label" level={LabelLevel.BODY} color={LabelColor.RED}>The Identification Number and/or the Account Number you entered is invalid. Please try again.</Label>}
        <DropdownTextField
        className="organism-sign-in-form-dropdown-text-field"
        textFieldLabelText="ID Number"
        textFieldHintText="Why Need This?"
        textFieldName="ID_NUMBER"
        textFieldValue="MyKad Number"
        onHintClicked={() => {

        }}
        onDropdownTextFieldClicked={() => {
          this.setIdTypeOptionsHidden(false)
        }} />
        <TextField
        className="organism-sign-in-form-text-field-id-number"
        textFieldPlaceHolder="E.g 570303135700"
        errorText="ID Number May Be Wrong"
        isValid={!this.state.isFormError}
        onChangeHandler={(value) => {this.setIdNumber(value.target.value)}}
        />
        <TextField
        className="organism-sign-in-form-text-field-account-number"
        textFieldLabelText="Account / Smartcard Number"
        textFieldHintText="Sample"
        textFieldPlaceHolder="E.g 0931613456"
        errorText="Account Number May Be Wrong"
        isValid={!this.state.isFormError}
        onChangeHandler={(value) => {this.setAccountNumber(value.target.value)}}
        />
        <LabeledCheckBox className="organism-sign-in-form-check-box" title="Remember Account Number"/>
        <div className="organism-sign-in-form-button-container">
          <Button className="organism-sign-in-form-button-cancel" theme={Theme.BORDER}>
            <Label level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}>CANCEL</Label>
          </Button>
          <Button className="organism-sign-in-form-button-submit" type={Type.SUBMIT} theme={Theme.FILL} disabled={!this.validateForm() || this.state.isLoading}>
            <Label level={LabelLevel.BODY_BOLD} color={LabelColor.WHITE}>{ this.state.isLoading ? 'LOADING...' : 'SUBMIT' }</Label>
          </Button>
        </div>
      </form>
  }
}

SignInForm.propTypes = {
  className: PropTypes.string,
  userSignedIn: Function
}

SignInForm.defaultProps = {
  className: ''
}

export default SignInForm
