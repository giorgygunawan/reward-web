
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
  onHintClicked: Function,
  onDropdownTextFieldClicked: Function
}

const TextField = (props: Props): Component => {
  const { className, textFieldValue, textFieldLabelText, textFieldHintText, textFieldName, onHintClicked, onDropdownTextFieldClicked, isValid, errorText, textFieldPlaceHolder } = props
  const classProps = classnames(
    "molecules-dropdown-text-field-container",
    className
  )

  return (
      <div className={classProps}>
      { (textFieldLabelText != null || textFieldHintText != null) ?  (
        <div className="molecules-dropdown-text-field-misc-container">
          <Label className="molecules-dropdown-text-field-misc-label" level={LabelLevel.BODY_BOLD} color={Color.BLACK}> {textFieldLabelText} </Label>
          <div className="empty-space"> </div>
          <Button className="molecules-dropdown-text-field-misc-hint" onClick={onHintClicked} theme={Theme.TEXT} size={Size.NONE}>
            <Label level={LabelLevel.BODY} color={Color.PRIMARY}>
              {textFieldHintText}
            </Label>
          </Button>
        </div>) : (
          null
        )
      }
      <div className="molecules-dropdown-text-field-pseudo" onClick={onDropdownTextFieldClicked}>
        <div className="fa fa-caret-down fa-lg molecules-dropdown-text-field-arrow"></div>
        <div className={(isValid ? "molecules-dropdown-text-field" : "molecules-dropdown-text-field-invalid")}>
          <Label level={LabelLevel.BODY} color={textFieldValue ? Color.BLACK : Color.LIGHT_GREY}>
            {textFieldValue ? textFieldValue : textFieldPlaceHolder}
          </Label>
        </div>
        <input type="hidden" name={textFieldName} value={textFieldValue}/>
      </div>
      { errorText != null && !isValid ? <Label className="molecules-dropdown-text-field-error" level={LabelLevel.BODY} color={Color.RED}>{errorText}</Label> : null }
      </div>
  )
}

TextField.defaultProps = {
  isValid: true,
  errorText: 'Invalid Value',
  className: ''
}

export default TextField
