import React, { Component } from 'react'
import { API } from "aws-amplify";
import './style.css'
import Label, { Color, Level } from '../../components/atoms/Label'
import Container, { Theme } from '../../components/atoms/Container'
import RewardDetails from '../../components/organism/RewardDetails'
import StickyButton from '../../components/organism/StickyButton'
import LoadingDialog from '../../components/organism/modal/LoadingDialog'
import Dialog, { Type as DialogType } from '../../components/organism/modal/Dialog'
import { REDEMPTION_TYPE } from '../../general/Enums'
import { CloseButtonType } from '../../components/organism/modal/Container'

export default class Details extends Component {
  constructor() {
      super();
      this.state = {
        isLoading: true,
        hideRedeemDialog: true,
        hideQrDialog: true,
        hideCodeDialog: true,
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
      if (this.state.reward.is_redeemed) {
        if (this.state.reward.redemption_type.toLowerCase() === REDEMPTION_TYPE.REDEEM_ONLINE.toLowerCase()) {
          this.hideRewardCodeDialog(false)
        } else {
          this.hideRewardQRDialog(false)
        }
      } else {
        this.showRedeemDialog()
      }
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
        if (Date.now() > this.state.reward.expiry_date) {
          return "This offer is expired"
        } else {
          if (Date.now() < this.state.reward.flash_sale_date) {
            return "Flash Sale starts in"
          } else {
            return "This offer is valid for 60 minutes upon redemption"
          }
        }
      }
    } else {
      return "This offer is valid for 60 minutes upon redemption"
    }
  }

  getCountDownDate() {
    if (Date.now() < this.state.reward.flash_sale_date) {
      return parseInt(this.state.reward.flash_sale_date,10)
    } else {
      return this.state.reward.redemption_expired_time
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

  hideRewardCodeDialog(value) {
    this.setState({
      hideCodeDialog: value
    })
  }

  hideRewardQRDialog(value) {
    this.setState({
      hideQrDialog: value
    })
  }

  disableStickyButton(value) {
    this.setState({
      isStickyButtonDisabled: value
    })
  }

  onTimerCompleted() {
    if(Date.now() >= this.state.reward.flash_sale_date) {
      if (this.state.reward.redemption_expired_time && Date.now() >= this.state.reward.redemption_expired_time) {
        this.disableStickyButton(true)
      } else {
        this.disableStickyButton(false)
      }
    } else {
      this.disableStickyButton(true)
    }
  }

  render() {
    return (
      <div className="pages-details-container">
        <LoadingDialog isHidden={!this.state.isLoading}/>
        <Dialog className="pages-details-code-dialog"
          isHidden={this.state.hideCodeDialog}
          closeButtonType={CloseButtonType.HIDE}
          title="Your offer is ready"
          subtitle={"Apply this code during checkout"}
          negativeTitle={"COPY CODE"}
          affirmativeTitle={"SHOP NOW"}
          onNegativeButtonClick={() => {this.hideRewardCodeDialog(true)}}
          onAffirmativeButtonClick={() => {
            this.hideRewardCodeDialog(true);
          }}
          onCloseButtonClick={() => {this.hideRewardCodeDialog(true)}}>
          <Container theme={Theme.BORDER}>
            <Label level={Level.H2_BOLD} color={Color.BLACK}>
            {this.state.reward && this.state.reward.reward_code}
            </Label>
          </Container>
        </Dialog>
        <Dialog className="pages-details-qr-dialog"
          type={DialogType.ONE_BUTTON}
          isHidden={this.state.hideQrDialog}
          closeButtonType={CloseButtonType.HIDE}
          title="Your offer is ready"
          subtitle={"Present this qr to the offline store. The offer would be automatically applied to your purchases"}
          affirmativeTitle={"OKAY"}
          onAffirmativeButtonClick={() => {
            this.hideRewardQRDialog(true);
          }}
          onCloseButtonClick={() => {this.hideRewardQRDialog(true)}}>
          <Container theme={Theme.BORDER}>
            {this.state.reward && <img src={this.state.reward.reward_qr} alt="qr reward"/>}
          </Container>
        </Dialog>
        <Dialog className="pages-details-redeem-dialog"
          isHidden={this.state.hideRedeemDialog}
          closeButtonType={CloseButtonType.CROSS}
          title="Redeem this offer now?"
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
          isButtonDisabled={Date.now() <= this.state.reward.flash_sale_date || Date.now() >= this.state.reward.redemption_expired_time || this.state.isStickyButtonDisabled}
          countDownDate={this.getCountDownDate()}
          onTimerCompleted={() => {this.onTimerCompleted()}}
          labelTitle={this.getLabelTitle()}
          buttonTitle={this.getButtonTitle()}
          onClick={() => {this.onStickyButtonClicked()}} />}
      </div>
    )
  }
}
