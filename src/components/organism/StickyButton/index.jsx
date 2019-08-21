import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Theme, Size } from '../../atoms/Button'
import Countdown from 'react-countdown-now'
import PropTypes from 'prop-types'

import './style.css'

class StickyButton extends Component {
  constructor() {
    super();
    this.state = {
      hideCountdownTimer: false,
    };
  }

  hideCountdownTimer() {
    this.setState({
      hideCountdownTimer: true
    })
  }

  getCountDownTimer(time, onTimerCompleted) {
    if (Date.now() >= time) {
      return null
    } else {
      return <Countdown date={time} onComplete={() => {
          onTimerCompleted();
        }}/>
    }
  }

  render() {
    const { labelTitle, buttonTitle, onClick, countDownDate, isButtonDisabled, onTimerCompleted, className } = this.props
    const classProps = classnames(
      "organism-sticky-button",
      className
    )
    return (
    <div className={classProps}>
      <div className="organism-sticky-button-container">
        <Label className="organism-sticky-button-label" level={LabelLevel.BODY_BOLD} color={LabelColor.BLACK}> {labelTitle} {!this.state.hideCountdownTimer && countDownDate && this.getCountDownTimer(countDownDate, onTimerCompleted)}</Label>
        <div className="empty-space"></div>
        <Button className="organism-sticky-button-button" disabled={isButtonDisabled} theme={Theme.FILL} size={Size.MEDIUM} onClick={onClick}>
          <Label level={LabelLevel.BODY} color={LabelColor.WHITE}> {buttonTitle} </Label>
        </Button>
      </div>
    </div>
  )
  }
}

StickyButton.propTypes = {
  className: PropTypes.string,
  labelTitle: PropTypes.string,
  buttonTitle: PropTypes.string,
  countDownDate: PropTypes.number,
  isButtonDisabled: PropTypes.boolean,
  onTimerCompleted: Function,
  onClick: Function
}

StickyButton.defaultProps = {
  className: ''
}

export default StickyButton
