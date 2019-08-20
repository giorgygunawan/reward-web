import React, { Component } from 'react'
import { API } from "aws-amplify";
import './style.css'
import Button, { Theme, Size } from '../../components/atoms/Button'
import Label, { Level, Color } from '../../components/atoms/Label'
import Card from '../../components/molecules/Card'
import OptionGroupDialog from '../../components/organism/modal/OptionGroupDialog'
import LoadingDialog from '../../components/organism/modal/LoadingDialog'

export default class Home extends Component {

  constructor() {
      super();
      this.state = {
        isOptionGroupDialogHidden: true,
        isLoading: true,
        rewards: []
      };
  }

  async componentDidMount() {
    try {
      const rewards = await this.getRewardsList();
      console.log(rewards);
      this.setState({ rewards });
      this.sortRewardsBy('Latest');
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getRewardsList() {
    return API.get("rewards", "/rewards");
  }


  setOptionGroupDialogHidden(isHidden) {
    this.setState({
      isOptionGroupDialogHidden: isHidden
    });
  }

  renderRewardList() {
    return <div className="pages-home-card-list-container">
      {this.state.rewards.map( (value) =>
        <Card cardImageSource = {value.image}
          cardImageAlt = {value.title}
          countDownDate = {parseInt(value.flash_sale_date, 10)}
          cardImageLabelTitle = {value.flash_sale_date !== '-1' && value.flash_sale_date ? 'flash sale' : null}
          avatarImageSource = { value.vendor_image }
          avatarImageAlt = { value.vendor }
          avatarTitle = { value.vendor }
          avatarSubtitle = { value.type }
          cardTitle = {value.title} />
      )}
    </div>
  }

  sortRewardsBy(orderKey) {
    const newRewards = this.state.rewards.sort((a, b) => {
      switch(orderKey) {
        case 'Latest':
          return a.created_at - b.created_at;
        case 'Expiring Soon':
          return Math.abs(Date.now() - new Date(a.expiry_date)) - Math.abs(Date.now() - new Date(b.expiry_date));
        case 'Flash Sales':
          return (a.flash_sale_date !== '-1' ? 1 : a.flash_sale_date ? 1 : -1);
        case 'A - Z':
          return ('' + a.title).localeCompare(b.title);
        case 'Z - A':
          return ('' + b.title).localeCompare(a.title);
        default:
          return a.created_at - b.created_at;
      }
    })
    this.setState({
      rewards: newRewards
    });
  }

  render() {
    return (
      <div className="pages-home-container">
        <LoadingDialog isHidden={!this.state.isLoading}/>
        <OptionGroupDialog className="pages-home-sort-dialog" isHidden={this.state.isOptionGroupDialogHidden} onCloseButtonClick={() => this.setOptionGroupDialogHidden(true)} defaultSelectedIndex={0} title="Sort by" hideSubtitle={true} options={['Latest','Expiring Soon','Flash Sales','A - Z','Z - A']} onOptionSelected={(selectedValue)=>{this.sortRewardsBy(selectedValue)}}/>
        <Label className="pages-home-label-title" level={Level.H1_BOLD} color={Color.BLACK}> Exclusive Reward for Subscribers </Label>
        <div className="pages-home-card-list-header-container">
          <Label className="pages-home-label-rewards" level={Level.H2_BOLD} color={Color.BLACK}> REWARDS </Label>
          <div className="empty-space"></div>
          <Button className="pages-home-button-sort" theme={Theme.TEXT} size={Size.NONE} onClick={() => {this.setOptionGroupDialogHidden(false)}}>
            <Label className="pages-home-label-sort" level={Level.BODY} color={Color.PRIMARY}> SORT </Label>
          </Button>
        </div>
        {this.state.isLoading ? null : this.renderRewardList()}
      </div>
    )
  }
}
