import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Color as LabelColor, Level as LabelLevel} from '../../../atoms/Label'
import Container, { CloseButtonType } from '../Container'
import './style.css'

type Props = {
  isHidden: boolean,
  className: string,
}

const LoadingDialog = (props: Props): Component => {
  const {className, isHidden } = props
  const classProps = classnames(
    "organism-modal-loading",
    className
  )
  return (
    <div className={isHidden ? "hidden" : "organism-modal-loading-container"}>
        <Container className={classProps} closeButtonType={CloseButtonType.NONE}>
          <Label color={LabelColor.BLACK} level={LabelLevel.H2_BOLD} className={"organism-modal-loading-title"}> Loading </Label>
        </Container>
    </div>
  )
}

LoadingDialog.defaultProps = {
  isHidden: true,
  options: [],
  className: ''
}

export default LoadingDialog
