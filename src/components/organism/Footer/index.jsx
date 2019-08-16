import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'

import './style.css'

type Props = {
  className: string,
}

const Footer = (props: Props): Component => {
  const { className } = props
  const classProps = classnames(
    "organism-footer",
    className
  )
  return (
    <div className={classProps}>
      <Label className="organism-footer-label" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}> Copyright 2019 © Measat Broadcast Network Sdn Bhd (240064-A).</Label>
      <Label className="organism-footer-label" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}> All Rights Reserved</Label>
    </div>
  )
}

Footer.defaultProps = {
  imageAlt: 'default alt',
  className: ''
}

export default Footer
