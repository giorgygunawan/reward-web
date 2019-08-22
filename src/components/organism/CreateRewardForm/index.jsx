import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { API } from "aws-amplify";
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Type, Theme } from '../../atoms/Button'
import TextField from '../../molecules/TextField'
import DropdownTextField from '../../molecules/DropdownTextField'
import OptionGroupDialog from '../modal/OptionGroupDialog'
import { REDEMPTION_TYPE } from '../../../general/Enums'
import './style.css'

class CreateRewardForm extends Component {

  constructor() {
      super();
      this.state = {
        numberOfFaqs: 1,
        faqs: {},
        isRedemptionTypeDialogHidden: true,
        redemption_type: REDEMPTION_TYPE.REDEEM_ONLINE,
        isLoading: false,
        isFormError: false
      };
  }

  renderFaqTextField() {
    let textFields = []
    for(let i = 0; i<this.state.numberOfFaqs; i++) {
      const hintText = (i === 0 && "ADD MORE") || (i > 0 && i === this.state.numberOfFaqs - 1 && "REMOVE")
      textFields.push(
        <TextField
        className="organism-create-reward-form-text-field organism-create-reward-form-text-field-faqs"
        textFieldPlaceHolder={"E.g Don't throw the voucher away"}
        textFieldLabelText={"Reward Faq No. "+ (i+1)}
        textFieldHintText={hintText}
        onHintClicked={() => {this.onFaqHintClicked(hintText)}}
        errorText="Must Be Filled"
        onChangeHandler={(value) => {this.appendFaqs(i, value.target.value)}}
        isValid={!this.isFormError}
        />
      )
    }
    return textFields
  }

  appendFaqs(i, value) {
    const currentFaqs = {...this.state.faqs}
    currentFaqs[i] = value
    this.setState({
      faqs: currentFaqs
    })
  }

  onFaqHintClicked(hintText) {
    if(hintText === "ADD MORE") {
      this.addMoreFaqTextField();
    } else {
      this.reduceFaqTextField();
    }
  }

  addMoreFaqTextField() {
    this.setState((prevState, props) => ({
      numberOfFaqs: prevState.numberOfFaqs + 1
    }))
  }

  reduceFaqTextField() {
    this.setState((prevState, props) => {
      const modifiedFaqs = {...prevState.faqs}
      delete modifiedFaqs[prevState.numberOfFaqs - 1]
      return {
        numberOfFaqs: prevState.numberOfFaqs - 1,
        faqs: modifiedFaqs
      }
    })
  }

  setCurrentState(key, value) {
    this.setState({
      [key]: value,
      isFormError: false
    })
  }

  validateForm() {
    return this.state[this.RewardKey.image]
     && this.state[this.RewardKey.title]
     && this.state[this.RewardKey.subtitle]
     && this.state[this.RewardKey.rewardCode]
     && this.state[this.RewardKey.rewardQr]
     && this.state[this.RewardKey.redemptionType]
     && this.state[this.RewardKey.redemptionPeriod]
     && this.state[this.RewardKey.vendorName]
     && this.state[this.RewardKey.vendorWebsite]
     && this.state[this.RewardKey.vendorLocation]
     && this.state[this.RewardKey.expiryDate]
     && this.state[this.RewardKey.faqs]
  }

  getRewardRequestBody() {
    const currentFaqs = this.state[this.RewardKey.faqs]
    let faqsArray = Object.values(currentFaqs)
    const reward = {
      [this.RewardKey.image] : this.state[this.RewardKey.image],
      [this.RewardKey.title] : this.state[this.RewardKey.title],
      [this.RewardKey.subtitle] : this.state[this.RewardKey.subtitle],
      [this.RewardKey.rewardCode] : this.state[this.RewardKey.rewardCode],
      [this.RewardKey.rewardQr] : this.state[this.RewardKey.rewardQr],
      [this.RewardKey.redemptionType] : this.state[this.RewardKey.redemptionType],
      [this.RewardKey.vendorName] : this.state[this.RewardKey.vendorName],
      [this.RewardKey.vendorWebsite] : this.state[this.RewardKey.vendorWebsite],
      [this.RewardKey.vendorLocation] : this.state[this.RewardKey.vendorLocation],
      [this.RewardKey.expiryDate] : this.state[this.RewardKey.expiryDate],
      [this.RewardKey.faqs] : faqsArray
    }
    if(this.state[this.RewardKey.flashSaleDate] && this.state[this.RewardKey.flashSaleDate].length > 0) {
      reward[this.RewardKey.flashSaleDate] = this.state[this.RewardKey.flashSaleDate]
    }
    return reward
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      isFormError: false
    });
    const url = "/rewards"
    try {
      let requestContext = {
          body: this.getRewardRequestBody()
      };
      console.log(requestContext.body);
      await API.post("rewards", url, requestContext);
      alert('reward created');
      this.setState({
        isLoading: false,
        isFormError: false
      });
    } catch (e) {
      alert(e);
      this.setState({
        isLoading: false,
        isFormError: true
      });
    }
  }

  RewardKey = {
    image: 'image',
    title: 'title',
    subtitle: 'subtitle',
    rewardCode: 'reward_code',
    rewardQr: 'reward_qr',
    redemptionType: 'redemption_type',
    redemptionPeriod: 'redemption_period',
    vendorName: 'vendor_name',
    vendorImage: 'vendor_image',
    vendorWebsite: 'vendor_website',
    vendorLocation: 'vendor_location',
    expiryDate: 'expiry_date',
    flashSaleDate: 'flash_sale_date',
    faqs: 'faqs'
  }

  render() {
    console.log(this.state)
    const { className } = this.props
    const classProps = classnames(
      "organism-create-reward-form",
      className
    )
    return (
    <form id='create-reward-form' className={classProps} onSubmit={this.handleSubmit}>
      <OptionGroupDialog
      className="organism-create-reward-form-redemption-type-options-dialog"
      defaultSelectedIndex={0}
      hideSubtitle={true}
      title="Choose reward redemption type"
      isHidden={this.state.isRedemptionTypeDialogHidden}
      options={[REDEMPTION_TYPE.REDEEM_ONLINE,REDEMPTION_TYPE.REDEEM_AT_PARTICIPATING_STORE]}
      onCloseButtonClick={() => {this.setCurrentState("isRedemptionTypeDialogHidden",true)}}
      isValid={this.state[this.RewardKey.redemptionType]}
      onOptionSelected={ (selectedValue) => { this.setCurrentState(this.RewardKey.redemptionType, selectedValue) }}/>
      <Label className='organism-create-reward-form-label' level={LabelLevel.H2} color={LabelColor.PRIMARY}>
        Reward Properties
      </Label>
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-title"
      textFieldPlaceHolder="Fill with promotion title E.g Buy 1 Get 1 Free for second item"
      textFieldLabelText="Reward Title"
      errorText="Reward title can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.title, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-subtitle"
      textFieldPlaceHolder="Fill with promotion description E.g Only with OCBC Credit Card"
      textFieldLabelText="Reward Subtitle"
      errorText="Reward subtitle can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.subtitle, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-image"
      textFieldPlaceHolder="Fill with image url E.g https://picsum.photos/500/300"
      textFieldLabelText="Reward Image"
      errorText="Reward image can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.image, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-expiry-date"
      textFieldPlaceHolder="Fill with epoch date E.g 1566405890000"
      textFieldLabelText="Reward Expiry Date"
      errorText="Reward Expiry Date can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.expiryDate, value.target.value)}}
      isValid={!this.isFormError}
      />
      <DropdownTextField
        className="organism-create-reward-form-dropdown-text-field organism-create-reward-form-dropdown-text-field-redemption-type"
        textFieldLabelText="Redemption Type"
        textFieldValue={this.state.redemption_type}
        onDropdownTextFieldClicked={() => {
          this.setCurrentState("isRedemptionTypeDialogHidden", false)
        }}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-code"
      textFieldPlaceHolder="Fill with reward code E.g REWARD1300XL"
      textFieldLabelText="Reward Code"
      errorText="Reward code can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.rewardCode, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-reward-qr"
      textFieldPlaceHolder="Fill with QR image url E.g https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example"
      textFieldLabelText="Reward QR Code"
      errorText="Reward QR Code can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.rewardQr, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-redemption-period"
      textFieldPlaceHolder="Fill with Date Text range E.g 12 - 15 October 2019"
      textFieldLabelText="Reward Redemption Period"
      errorText="Reward Redemption Period can't be empty"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.redemptionPeriod, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-flash-sale-date"
      textFieldPlaceHolder="Fill to enable flash sale with epoch time E.g 1566405890000"
      textFieldLabelText="Reward Flash Sale Date"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.flashSaleDate, value.target.value)}}
      isValid={!this.isFormError}
      />
      <div className="organism-create-reward-form-faq-text-field-container">
        { this.renderFaqTextField() }
      </div>
      <Label className='organism-create-reward-form-label' level={LabelLevel.H2} color={LabelColor.PRIMARY}>
        Vendor Properties
      </Label>
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-vendor-name"
      textFieldPlaceHolder="Fill with vendor name E.g Coca Cola"
      textFieldLabelText="Vendor Name"
      errorText="Vendor Name Must Be Filled"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.vendorName, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-vendor-image"
      textFieldPlaceHolder="Fill with image url E.g https://picsum.photos/500/300"
      textFieldLabelText="Vendor Image"
      errorText="Vendor Image Must Be Filled"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.vendorImage, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-vendor-website"
      textFieldPlaceHolder="Fill with website link E.g www.example.com"
      textFieldLabelText="Vendor Website"
      errorText="Vendor Website Must Be Filled"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.vendorWebsite, value.target.value)}}
      isValid={!this.isFormError}
      />
      <TextField
      className="organism-create-reward-form-text-field organism-create-reward-form-text-field-vendor-location"
      textFieldPlaceHolder="Fill with address E.g Smith st. No. 8, Jakarta"
      textFieldLabelText="Vendor Location"
      errorText="Vendor Location Must Be Filled"
      onChangeHandler={(value) => {this.setCurrentState(this.RewardKey.vendorLocation, value.target.value)}}
      isValid={!this.isFormError}
      />
      <Button className="organism-create-reward-form-button-submit" type={Type.SUBMIT} theme={Theme.FILL} disabled={!this.validateForm() || this.state.isLoading}>
        <Label level={LabelLevel.BODY_BOLD} color={LabelColor.WHITE}>{ this.state.isLoading ? 'LOADING...' : 'SUBMIT' }</Label>
      </Button>
    </form>)
  }
}

CreateRewardForm.propTypes = {
  className: PropTypes.string,
}

CreateRewardForm.defaultProps = {
  className: ''
}

export default CreateRewardForm
