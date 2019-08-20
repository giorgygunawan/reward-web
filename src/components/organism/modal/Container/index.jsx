import React, { Component } from 'react'
import classnames from 'classnames'
import Button, { Theme as ButtonTheme, Size as ButtonSize } from '../../../atoms/Button'
import Label, { Color as LabelColor, Level as LabelLevel} from '../../../atoms/Label'

import './style.css'

export const CloseButtonType = {
  HIDE: 'organism-modal-container-close-button-type-hide',
  CROSS: 'organism-modal-container-close-button-type-cross',
  NONE: 'organism-modal-container-close-button-type-none'
}

type Props = {
  closeButtonType: string,
  onCloseButtonClick: Function,
  children: React.Node,
  className: string,
}

const getCloseButtonType = (type: string, onCloseButtonClick: Function) => {
  switch(type) {
    case CloseButtonType.HIDE:
      return (
      <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end organism-modal-container-button-close">
        <Label color={LabelColor.PRIMARY} level={LabelLevel.BODY_BOLD}>
          hide
        </Label>
      </Button>
    )
    case CloseButtonType.CROSS:
      return (
        <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end organism-modal-container-button-close">
          <Label color={LabelColor.BLACK} level={LabelLevel.H2}>
            <i className="fa fa-close"></i>
          </Label>
        </Button>
    )
    case CloseButtonType.NONE:
      return null;
    default:
    return (
    <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end organism-modal-container-button-close">
      <Label color={LabelColor.PRIMARY} level={LabelLevel.BODY_BOLD}>
        hide
      </Label>
    </Button>
  )
  }

}

const Container = (props: Props): Component => {
  const { children, className, closeButtonType, onCloseButtonClick } = props
  const classProps = classnames(
    "organism-modal-container",
    className
  )
  return (
    <div className= {classProps}>
      {getCloseButtonType(closeButtonType, onCloseButtonClick)}
      {children}
    </div>
  )
}

Container.defaultProps = {
  closeButtonType: CloseButtonType.CROSS,
  onCloseButtonClick:  () => {},
  className: ''
}

export default Container
