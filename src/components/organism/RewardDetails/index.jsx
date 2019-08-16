import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import CardImage from '../../molecules/CardImage'
import Avatar from '../../molecules/Avatar'

import './style.css'

type Props = {
  bannerImageSource: string,
  bannerImageAlt: string,
  bannerLabelTitle: string,
  avatarImageSource: string,
  avatarImageAlt: string,
  avatarTitle: string,
  avatarSubtitle: string,
  title: string,
  subtitle: string,
  redemptionPeriod: string,
  website: string,
  location: string,
  className: string,
}

const RewardDetails = (props: Props): Component => {
  const {
    className,
    bannerImageSource,
    bannerImageAlt,
    bannerLabelTitle,
    avatarImageSource,
    avatarImageAlt,
    avatarTitle,
    avatarSubtitle,
    title,
    subtitle,
    redemptionPeriod,
    website,
    location,
    faqs
  } = props
  const classProps = classnames(
    "organism-reward-details",
    className
  )
  return (
    <div className={classProps}>
      <CardImage
        imageSource= {bannerImageSource}
        imageAlt= {bannerImageAlt}
        labelTitle= {bannerLabelTitle}/>
      <div className="organism-reward-details-avatar-container">
        <Avatar className="organism-reward-details-avatar" imageSource = {avatarImageSource}
        imageAlt = {avatarImageAlt}
        title = {avatarTitle}
        subtitle = {avatarSubtitle}/>
      </div>
    <Label className="organism-reward-details-title" level={LabelLevel.H2_BOLD} color={LabelColor.BLACK}>{title}</Label>
    <Label className="organism-reward-details-subtitle" level={LabelLevel.BODY} color={LabelColor.BLACK}>{subtitle}</Label>
    <div className="organism-reward-details-redemption-period-container">
      <Label className="organism-reward-details-redemption-period-title" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}>Redemption Period</Label>
      <Label className="organism-reward-details-redemption-period-subtitle" level={LabelLevel.BODY} color={LabelColor.BLACK}>{redemptionPeriod}</Label>
    </div>
    <div className="organism-reward-details-website-container">
      <Label className="organism-reward-details-website-title" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}>Website</Label>
      <Label className="organism-reward-details-website-subtitle"level={LabelLevel.BODY} color={LabelColor.PRIMARY}>{website}</Label>
    </div>
    <div className="organism-reward-details-location-container">
      <Label className="organism-reward-details-location-title" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}>Location</Label>
      <Label className="organism-reward-details-location-subtitle" level={LabelLevel.BODY} color={LabelColor.PRIMARY}>{location}</Label>
    </div>

    <ul className="organism-reward-details-faq-list">
      {
      faqs.map( (faq) =>
        <li className="organism-reward-details-faq-item-li">
          <Label className="organism-reward-details-faq-item-label">{faq}</Label>
        </li>)
      }
    </ul>
    </div>
  )
}

RewardDetails.defaultProps = {
  className: ''
}

export default RewardDetails
