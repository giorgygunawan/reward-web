import React, { Component } from 'react'

import './style.css'
import data from './data'
import Button, { Theme, Size } from '../../components/atoms/Button'
import Label, { Level, Color } from '../../components/atoms/Label'
import Card from '../../components/molecules/Card'
import OptionGroupDialog from '../../components/organism/modal/OptionGroupDialog'

export default class Home extends Component {

  constructor() {
      super();
      this.state = {
        isOptionGroupDialogHidden: true
      };
  }

  setOptionGroupDialogHidden(isHidden) {
    this.setState({
      isOptionGroupDialogHidden: isHidden
    });
  }

  render() {
    return (
      <div className="pages-home-container">
        <OptionGroupDialog isHidden={this.state.isOptionGroupDialogHidden} onCloseButtonClick={() => this.setOptionGroupDialogHidden(true)} defaultSelectedIndex={0} title="Sort by" hideSubtitle={true} options={['Latest','Expiring Soon','Flash Sales','A - Z','Z - A']} onOptionSelected={(selectedValue)=>{console.log(selectedValue)}}/>
        <Label className="pages-home-label-title" level={Level.H1_BOLD} color={Color.BLACK}> Exclusive Reward for Astro Subscribers </Label>
        <div className="pages-home-card-list-header-container">
          <Label className="pages-home-label-rewards" level={Level.H2_BOLD} color={Color.BLACK}> REWARDS </Label>
          <div className="empty-space"></div>
          <Button className="pages-home-button-sort" theme={Theme.TEXT} size={Size.NONE} onClick={() => {this.setOptionGroupDialogHidden(false)}}>
            <Label className="pages-home-label-sort" level={Level.BODY} color={Color.PRIMARY}> SORT </Label>
          </Button>
        </div>
        <div className="pages-home-card-list-container">
          {data.map( (value) =>
            <Card cardImageSource = {value.image}
              cardImageAlt = {value.title}
              avatarImageSource = { value.vendor_image }
              avatarImageAlt = { value.vendor }
              avatarTitle = { value.vendor }
              avatarSubtitle = { value.type }
              cardTitle = {value.title} />
          )}
        </div>
      </div>
    )
  }
}
