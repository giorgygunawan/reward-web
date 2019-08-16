import React, { Component } from 'react'

import './style.css'
import data from './data'
import RewardDetails from '../../components/organism/RewardDetails'
import StickyButton from '../../components/organism/StickyButton'
export default class Details extends Component {

  render() {
    return (
      <div className="pages-details-container">
        <RewardDetails bannerImageSource = {data.bannerImageSource}
        bannerImageAlt = {data.bannerImageAlt}
        bannerLabelTitle = {data.bannerLabelTitle}
        avatarImageSource = {data.avatarImageSource}
        avatarImageAlt = {data.avatarImageAlt}
        avatarTitle = {data.avatarTitle}
        avatarSubtitle = {data.avatarSubtitle}
        title = {data.title}
        subtitle = {data.subtitle}
        redemptionPeriod = {data.redemptionPeriod}
        website = {data.website}
        location = {data.location}
        faqs = {data.faqs}/>
      <StickyButton labelTitle={"test"} buttonTitle={"test"} onClick={() => {console.log('clicked')}} />
      </div>
    )
  }
}
