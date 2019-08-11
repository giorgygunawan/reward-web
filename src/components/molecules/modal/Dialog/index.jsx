import React, { Component } from 'react'
import classnames from 'classnames'
import Button, { Theme as ButtonTheme, Size as ButtonSize } from '../../../atoms/Button'
import Label, { Color as LabelColor, Level as LabelLevel} from '../../../atoms/Label'
import Container, { CloseButtonType } from '../Container'

import './style.css'

export const Type = {
  ONE_BUTTON: 'molecules-modal-dialog-one-button',
  DUAL_BUTTON: 'molecules-modal-dialog-dual-button'
}

export const ButtonAlignment = {
  VERTICAL: 'flex flex-column',
  HORIZONTAL: 'flex flex-row'
}

type Props = {
  title: string,
  hideTitle: boolean,
  subtitle: string,
  hideSubtitle: boolean,
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


const getAffirmativeLabelColor = (type: string): String => {
  switch(type) {
    case Type.ONE_BUTTON:
      return LabelColor.BLACK
    case Type.DUAL_BUTTON:
      return LabelColor.WHITE
    default:
      return LabelColor.BLACK
  }
}

const Dialog = (props: Props): Component => {
  const { title, subtitle, children, className, negativeTitle, affirmativeTitle, type, buttonAlignment, closeButtonType, onNegativeButtonClick, onAffirmativeButtonClick, onCloseButtonClick, hideTitle, hideSubtitle } = props
  const classProps = classnames(
    "molecules-modal-dialog",
    className
  )
  return (
    <Container closeButtonType={closeButtonType} onCloseButtonClick={onCloseButtonClick} className= {classProps}>
      <Label color={LabelColor.BLACK} level={LabelLevel.H2_BOLD} className={hideTitle ? "hidden" : "molecules-modal-dialog-label-title"}> {title} </Label>
      <Label color={LabelColor.BLACK} level={LabelLevel.H2} className={hideSubtitle ? "hidden" : "molecules-modal-dialog-label-subtitle"}> {subtitle} </Label>
      {children}
      <div className={buttonAlignment}>
        <Button onClick={onNegativeButtonClick} theme={getNegativeButtonTheme(type)} size={ButtonSize.MEDIUM} className={getNegativeButtonClass(type, buttonAlignment)}>
          <Label color={LabelColor.BLACK} level={LabelLevel.BODY}> { negativeTitle } </Label>
        </Button>
        <Button onClick={onAffirmativeButtonClick} theme={getAffirmativeButtonTheme(type)} size={ButtonSize.MEDIUM} className={getAffirmativeButtonClass(type, buttonAlignment)}>
          <Label color={getAffirmativeLabelColor(type)} level={LabelLevel.BODY}> { affirmativeTitle } </Label>
        </Button>
      </div>
    </Container>
  )
}

Dialog.defaultProps = {
  title: 'default title',
  hideTitle: false,
  subtitle: 'default subtitle',
  hideSubtitle: false,
  negativeTitle: 'default button title',
  affirmativeTitle: 'default button title',
  type: Type.DUAL_BUTTON,
  closeButtonType: CloseButtonType.HIDE,
  buttonAlignment: ButtonAlignment.HORIZONTAL,
  onNegativeButtonClick:  () => {},
  onAffirmativeButtonClick:  () => {},
  onCloseButtonClick:  () => {},
  className: ''
}

export default Dialog
