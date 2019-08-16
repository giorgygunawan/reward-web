import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Theme, Size } from '../../atoms/Button'

import './style.css'

type Props = {
  className: string,
  labelTitle: string,
  buttonTitle: string,
  onClick: Function
}

const StickyButton = (props: Props): Component => {
  const { labelTitle, buttonTitle, onClick, className } = props
  const classProps = classnames(
    "organism-sticky-button",
    className
  )
  return (
    <div className={classProps}>
      <div className="organism-sticky-button-container">
        <Label className="organism-sticky-button-label" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}> {labelTitle}</Label>
          <Button className="organism-sticky-button-button" theme={Theme.FILL} size={Size.MEDIUM}>
            <Label level={LabelLevel.BODY} color={LabelColor.WHITE} onClick={onClick}> {buttonTitle} </Label>
          </Button>
      </div>
    </div>
  )
}

StickyButton.defaultProps = {
  className: ''
}

export default StickyButton
