import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'

import './style.css'

type Props = {
  imageSource: string,
  imageAlt: string,
  labelTitle: string,
  className: string,
}

const CardImage = (props: Props): Component => {
  const { imageSource, imageAlt, labelTitle, className } = props
  const classProps = classnames(
    "molecules-card-image-container",
    className
  )
  return (
    <div className= {classProps}>
        <img className="molecules-card-image" src={imageSource} alt={imageAlt} />
        <Label className={ labelTitle == null ? "hidden" : "molecules-card-image-label" }color={LabelColor.WHITE} level={LabelLevel.BODY_BOLD}> {labelTitle} </Label>
    </div>
  )
}

CardImage.defaultProps = {
  imageAlt: 'default alt',
  className: ''
}

export default CardImage
