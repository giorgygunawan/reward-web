import React, { Component } from 'react'
import classnames from 'classnames'
import Avatar from '../Avatar'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import CardImage from '../CardImage'
import './style.css'


type Props = {
  cardImageSource: string,
  cardImageLabelTitle: string,
  cardImageAlt: string,
  countDownDate: number,
  avatarImageSource: string,
  avatarImageAlt: string,
  avatarTitle: string,
  avatarSubtitle: string,
  cardTitle: string,
  children: React.Node,
  className: string,
}

const Card = (props: Props): Component => {
  const { cardImageSource, cardImageLabelTitle, cardImageAlt, countDownDate, avatarImageSource, avatarImageAlt, avatarTitle, avatarSubtitle, cardTitle, className } = props
  const classProps = classnames(
    "molecules-card",
    className
  )
  return (
    <div className= {classProps}>
      <CardImage className="molecules-card-card-image" imageSource={cardImageSource} imageAlt={cardImageAlt} labelTitle={cardImageLabelTitle} countDownDate={countDownDate} />
      <Avatar className="molecules-card-avatar" imageSource={avatarImageSource} imageAlt={avatarImageAlt} title={avatarTitle} subtitle={avatarSubtitle} />
      <Label className="molecules-card-title" level={LabelLevel.H2_BOLD} color={LabelColor.BLACK}>
        {cardTitle}
      </Label>
    </div>
  )
}

Card.defaultProps = {
  className: ''
}

export default Card
