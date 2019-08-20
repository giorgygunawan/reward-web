import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Countdown from 'react-countdown-now'

import './style.css'

class CardImage extends Component {

  constructor() {
    super();
    this.state = {
      hideCountdownTimer: false,
    };
  }

  getCountDownTimer = (time) => {
    if (Date.now() >= time) {
      return null
    } else {
      return <Countdown date={time} onComplete={() => {this.hideCountdownTimer()}}/>
    }
  }

  hideCountdownTimer = () => {
    this.setState({
      hideCountdownTimer: true
    })
  }

  render() {
    const { imageSource, imageAlt, labelTitle, className, countDownDate } = this.props
    const classProps = classnames(
      "molecules-card-image-container",
      className
    )
    return (
      <div className= {classProps}>
          <img className="molecules-card-image" src={imageSource} alt={imageAlt} />
          <Label className={ labelTitle == null ? "hidden" : "molecules-card-image-label" }color={LabelColor.WHITE} level={LabelLevel.BODY_BOLD}>
            {labelTitle} {!this.state.hideCountdownTimer && countDownDate && this.getCountDownTimer(countDownDate)}
          </Label>
      </div>
    )
  }
}

CardImage.propTypes = {
  imageSource: PropTypes.string,
  imageAlt: PropTypes.string,
  labelTitle: PropTypes.string,
  countDownDate: PropTypes.number,
  className: PropTypes.string,
}


CardImage.defaultProps = {
  imageAlt: 'default alt',
  countDownDate: 1566297450000,
  className: ''
}

export default CardImage
