import React, { Component } from 'react'
import classnames from 'classnames'
import Button, { Theme as ButtonTheme, Size as ButtonSize } from '../../../atoms/Button'
import Label, { Color as LabelColor, Level as LabelLevel} from '../../../atoms/Label'

import './style.css'

export const Type = {
  ONE_BUTTON: 'molecules-modal-dialog-one-button',
  DUAL_BUTTON: 'molecules-modal-dialog-dual-button'
}


export const ButtonAlignment = {
  VERTICAL: 'flex flex-column',
  HORIZONTAL: 'flex flex-row'
}

export const CloseButtonType = {
  HIDE: 'molecules-modal-dialog-close-button-type-hide',
  CROSS: 'molecules-modal-dialog-close-button-type-cross'
}

type Props = {
  title: string,
  subtitle: string,
  negativeTitle: string,
  affirmativeTitle: string,
  type: string,
  closeButtonType: string,
  buttonAlignment: string,
  onNegativeButtonClick: Function,
  onAffirmativeButtonClick: Function,
  onCloseButtonClick: Function,
  children: React.Node,
  className: string,
}

const getNegativeButtonClass = (type: string, alignment: string): String => {
  switch(type) {
    case Type.ONE_BUTTON:
      return "hidden"
    case Type.DUAL_BUTTON:
      return alignment === ButtonAlignment.HORIZONTAL ? "molecules-modal-negative-button-dual-horizontal w-50" : "molecules-modal-negative-button-dual w-100"
    default:
      return ""
  }
}

const getAffirmativeButtonClass = (type: string, alignment: string): String => {
  switch(type) {
    case Type.ONE_BUTTON:
      return "molecules-modal-affirmative-button-one w-100"
    case Type.DUAL_BUTTON:
      return alignment === ButtonAlignment.HORIZONTAL ? "molecules-modal-affirmative-button-dual-horizontal w-50" : "molecules-modal-affirmative-button-dual w-100"
    default:
      return ""
  }
}

const getNegativeButtonTheme = (type: string): String => {
  switch(type) {
    case Type.ONE_BUTTON:
      return ButtonTheme.BORDER
    case Type.DUAL_BUTTON:
      return ButtonTheme.BORDER
    default:
      return ButtonTheme.BORDER
  }
}

const getAffirmativeButtonTheme = (type: string, alignment: string): String => {
  switch(type) {
    case Type.ONE_BUTTON:
      return ButtonTheme.BORDER
    case Type.DUAL_BUTTON:
      return ButtonTheme.FILL
    default:
      return ButtonTheme.FILL
  }
}

const getCloseButtonType = (type: string, onCloseButtonClick: Function) => {
  switch(type) {
    case CloseButtonType.HIDE:
      return (
      <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end molecules-modal-dialog-button-close">
        <Label color={LabelColor.PRIMARY} level={LabelLevel.BODY_BOLD}>
          hide
        </Label>
      </Button>
    )
    case CloseButtonType.CROSS:
      return (
        <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end molecules-modal-dialog-button-close">
          <Label color={LabelColor.BLACK} level={LabelLevel.H2}>
            <i class="fa fa-close"></i>
          </Label>
        </Button>
    )
    default:
    return (
    <Button onClick={onCloseButtonClick} theme={ButtonTheme.TEXT} size={ButtonSize.NONE} className="self-end molecules-modal-dialog-button-close">
      <Label color={LabelColor.PRIMARY} level={LabelLevel.BODY_BOLD}>
        hide
      </Label>
    </Button>
  )
  }

}

const Dialog = (props: Props): Component => {
  const { title, subtitle, children, className, negativeTitle, affirmativeTitle, type, buttonAlignment, closeButtonType, onNegativeButtonClick, onAffirmativeButtonClick, onCloseButtonClick } = props
  const classProps = classnames(
    "molecules-modal-dialog",
    className
  )
  return (
    <div className= {classProps}>
      {getCloseButtonType(closeButtonType, onCloseButtonClick)}
      <Label color={LabelColor.BLACK} level={LabelLevel.H2_BOLD} className="molecules-modal-dialog-label-title"> {title} </Label>
      <Label color={LabelColor.BLACK} level={LabelLevel.H2} className="molecules-modal-dialog-label-subtitle"> {subtitle} </Label>
      {children}
      <div className={buttonAlignment}>
        <Button onClick={onNegativeButtonClick} theme={getNegativeButtonTheme(type)} size={ButtonSize.MEDIUM} className={getNegativeButtonClass(type, buttonAlignment)}>
          <Label color={LabelColor.BLACK} level={LabelLevel.BODY}> { negativeTitle } </Label>
        </Button>
        <Button onClick={onAffirmativeButtonClick} theme={getAffirmativeButtonTheme(type)} size={ButtonSize.MEDIUM} className={getAffirmativeButtonClass(type, buttonAlignment)}>
          <Label color={LabelColor.WHITE} level={LabelLevel.BODY}> { affirmativeTitle } </Label>
        </Button>
      </div>
    </div>
  )
}

Dialog.defaultProps = {
  title: 'default title',
  subtitle: 'default subtitle',
  negativeTitle: 'default button title',
  affirmativeTitle: 'default button title',
  type: Type.DUAL_BUTTON,
  CloseButtonType: CloseButtonType.HIDE,
  buttonAlignment: ButtonAlignment.VERTICAL,
  onNegativeButtonClick:  () => {},
  onAffirmativeButtonClick:  () => {},
  onCloseButtonClick:  () => {},
  className: ''
}

export default Dialog
