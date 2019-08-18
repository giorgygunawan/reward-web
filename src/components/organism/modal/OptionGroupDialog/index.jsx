import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Color as LabelColor, Level as LabelLevel} from '../../../atoms/Label'
import Container from '../Container'
import OptionGroup from '../../../molecules/OptionGroup'
import './style.css'

type Props = {
  title: string,
  hideTitle: boolean,
  subtitle: string,
  hideSubtitle: boolean,
  isHidden: boolean,
  options: Array,
  className: string,
}

const OptionGroupDialog = (props: Props): Component => {
  const { title, subtitle, className, closeButtonType, onCloseButtonClick, hideTitle, hideSubtitle, options, onOptionSelected, defaultSelectedIndex, isHidden } = props
  const classProps = classnames(
    "organism-modal-option-group-dialog",
    className
  )
  return (
    <div className={isHidden ? "hidden" : "organism-modal-option-group-dialog-container"}>
        <Container className={classProps} closeButtonType={closeButtonType} onCloseButtonClick={onCloseButtonClick}>
          <Label color={LabelColor.BLACK} level={LabelLevel.H2_BOLD} className={hideTitle ? "hidden" : "organism-modal-option-group-dialog-label-title"}> {title} </Label>
          <Label color={LabelColor.BLACK} level={LabelLevel.H2} className={hideSubtitle ? "hidden" : "organism-modal-option-group-dialog-label-subtitle"}> {subtitle} </Label>
          <OptionGroup defaultSelectedIndex={defaultSelectedIndex} options={options} onOptionSelected={(selectedValue) => onOptionSelected(selectedValue)}/>
        </Container>
    </div>
  )
}

OptionGroupDialog.defaultProps = {
  title: 'default title',
  hideTitle: false,
  subtitle: 'default subtitle',
  hideSubtitle: false,
  isHidden: true,
  options: [],
  className: ''
}

export default OptionGroupDialog
