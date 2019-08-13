import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel} from '../../atoms/Label'

import './style.css'


type Props = {
  imageSource: string,
  imageAlt: string,
  title: string,
  subtitle: string,
  children: React.Node,
  className: string,
}

const Avatar = (props: Props): Component => {
  const { imageSource, imageAlt, title, subtitle, className } = props
  const classProps = classnames(
    "molecules-avatar",
    className
  )
  return (
    <div className= {classProps}>
      <img src={imageSource} alt={imageAlt} class="molecules-avatar-image"/>
      <div className="molecules-avatar-label-container">
        <Label className="molecules-avatar-label-title" level={LabelLevel.H2_BOLD}>{title}</Label>
        <Label className="molecules-avatar-label-subtitle" level={LabelLevel.BODY}>{subtitle}</Label>
      </div>
    </div>
  )
}

Avatar.defaultProps = {
  imageAlt: 'alt has not been described',
  className: ''
}

export default Avatar
