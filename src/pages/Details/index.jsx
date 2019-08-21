import React, { Component } from 'react'
import { API } from "aws-amplify";
import Countdown from 'react-countdown-now'
import './style.css'
import RewardDetails from '../../components/organism/RewardDetails'
import StickyButton from '../../components/organism/StickyButton'
import LoadingDialog from '../../components/organism/modal/LoadingDialog'
import RedeemDialog from '../../components/organism/modal/Dialog'
import { REDEMPTION_TYPE } from '../../general/Enums'
import { CloseButtonType } from '../../components/organism/modal/Container'

export default class Details extends Component {
  constructor() {
      super();
      this.state = {
        isLoading: true,
        hideRedeemDialog: true,
        reward: null,
        isStickyButtonDisabled: false
      };
  }

  async componentDidMount() {
    try {
      const reward = await this.getRewardDetail();
      this.setState({ reward });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  async getRewardDetail() {
    const rewardId = this.props.match.params.reward_id;
    const createdAt = this.props.match.params.created_at;
    const url = "/rewards/" + rewardId + "/" + createdAt
    return API.get("rewards", url);
  }

  renderRewardDetail() {
    const reward = this.state.reward
    return <RewardDetails
    bannerImageSource = {reward.image}
    bannerImageAlt = {reward.title}
    bannerLabelTitle = {reward.flash_sale_date !== '-1' && reward.flash_sale_date ? 'flash sale' : null}
    avatarImageSource = {reward.vendor_image}
    avatarImageAlt = {reward.vendor_name}
    avatarTitle = {reward.vendor_name}
    avatarSubtitle = {reward.redemption_type}
    title = {reward.title}
    subtitle = {reward.subtitle}
    redemptionPeriod = {reward.redemption_period}
    website = {reward.vendor_website}
    location = {reward.vendor_location}
    faqs = {reward.faqs}/>
  }

  onStickyButtonClicked() {
    if (this.props.isAuthenticated) {
      this.showRedeemDialog()
    } else {
      this.props.history.push('/verify');
    }
  }

  async redeemReward() {
    this.setState({
      isLoading: true
    });
    const rewardId = this.state.reward.reward_id;
    const createdAt = this.state.reward.created_at;
    const url = "/rewards/" + rewardId + "/" + createdAt
    try {
      await API.put("rewards", url);
      const reward = await this.getRewardDetail();
      this.setState({
        isLoading: false,
        reward: reward
      });
    } catch (e) {
      alert(e);
      this.setState({
        isLoading: false
      });
    }
  }

  getRedeemedReward(reward) {
    const newState = {...reward}
    newState.is_redeemed = true
    return newState
  }

  getButtonTitle() {
    if (this.state.reward != null) {
      return this.state.reward.is_redeemed ? "SHOW" : "REDEEM"
    } else {
      return "REDEEM"
    }
  }

  getLabelTitle() {
    if (this.state.reward != null) {
      if (this.state.reward.is_redeemed) {
        if (Date.now() > this.state.reward.redemption_expired_time || this.state.isStickyButtonDisabled) {
          return "Reward is fully redeemed"
        } else {
          return "Time left to redeem "
        }
      } else {
        return "This offer is valid for 60 minutes upon redemption"
      }
    } else {
      return "This offer is valid for 60 minutes upon redemption"
    }
  }

  hideRedeemDialog() {
    this.setState({
      hideRedeemDialog: true
    })
  }

  showRedeemDialog() {
    this.setState({
      hideRedeemDialog: false
    })
  }

  disableStickyButton() {
    this.setState({
      isStickyButtonDisabled: true
    })
  }

  render() {
    console.log(this.state.reward);
    return (
      <div className="pages-details-container">
        <LoadingDialog isHidden={!this.state.isLoading}/>
        <RedeemDialog className="pages-details-redeem-dialog"
          isHidden={this.state.hideRedeemDialog}
          closeButtonType={CloseButtonType.CROSS} title="Redeem this offer now?"
          subtitle={"Do note that you only have 60 minutes to use the offer once you proceed"}
          negativeTitle={"CANCEL"}
          affirmativeTitle={"PROCEED"}
          onNegativeButtonClick={() => {this.hideRedeemDialog()}}
          onAffirmativeButtonClick={() => {
            this.hideRedeemDialog();
            this.redeemReward();
          }}
          onCloseButtonClick={() => {this.hideRedeemDialog()}}/>
        {this.state.reward !== null && this.renderRewardDetail()}
        <div className="pages-details-empty-space"></div>
        {this.state.reward !== null && <StickyButton
          className="pages-details-sticky-button"
          isButtonDisabled={Date.now() > this.state.reward.redemption_expired_time || this.state.isStickyButtonDisabled}
          countDownDate={this.state.reward.redemption_expired_time}
          onTimerCompleted={() => {this.disableStickyButton()}}
          labelTitle={this.getLabelTitle()}
          buttonTitle={this.getButtonTitle()}
          onClick={() => {this.onStickyButtonClicked()}} />}
      </div>
    )
  }
}
