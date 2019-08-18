
import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color} from '../../atoms/Label'
import Button, { Theme, Size } from '../../atoms/Button'
import './style.css'

type Props = {
  className: string,
  textFieldLabelText: string,
  textFieldHintText: string,
  textFieldName: string,
  isValid: boolean,
  errorText: string,
  textFieldPlaceHolder: string,
  onChangeHandler: Function,
  onHintClicked: Function
}

const TextField = (props: Props): Component => {
  const { className, textFieldLabelText, textFieldHintText, textFieldName, onChangeHandler, onHintClicked, isValid, errorText, textFieldPlaceHolder } = props
  const classProps = classnames(
    "molecules-text-field-container",
    className
  )

  return (
      <div className={classProps}>
      { (textFieldLabelText != null || textFieldHintText != null) ?  (
        <div className="molecules-text-field-misc-container">
          <Label className="molecules-text-field-misc-label" level={LabelLevel.BODY_BOLD} color={Color.BLACK}> {textFieldLabelText} </Label>
          <div className="empty-space"> </div>
          <Button className="molecules-text-field-misc-hint" onClick={onHintClicked} theme={Theme.TEXT} size={Size.NONE}>
            <Label level={LabelLevel.BODY} color={Color.PRIMARY}> {textFieldHintText} </Label>
          </Button>
        </div>) : (
          null
        )
      }
        <input type="text" name={textFieldName} placeholder={textFieldPlaceHolder} onChange={onChangeHandler} className={(isValid ? "molecules-text-field" : "molecules-text-field-invalid") + " molecules-text-field-font"}/>
      { errorText != null && !isValid ? <Label className="molecules-text-field-error" level={LabelLevel.BODY} color={Color.RED}>{errorText}</Label> : null }
      </div>
  )
}

TextField.defaultProps = {
  isValid: true,
  errorText: 'Invalid Value',
  className: ''
}

export default TextField
