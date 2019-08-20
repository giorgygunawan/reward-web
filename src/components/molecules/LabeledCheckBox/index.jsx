
import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Label, { Level as LabelLevel, Color} from '../../atoms/Label'
import './style.css'


class LabeledCheckBox extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
    };
  }

  onChangeHandler(event) {
    console.log(event.target.value)
  }

  changeState() {
    this.setState((prevState, props) => ({
      isChecked: !prevState.isChecked
    }));
  }

  render() {
    const { title, className } = this.props
    const classProps = classnames(
      "molecules-labeled-check-box-container",
      className
    )
    return <div className={classProps} onClick={() => {this.changeState()}}>
        <input className="molecules-labeled-check-box" type="checkbox" checked={this.state.isChecked} onChange={(event) => this.onChangeHandler(event)}/>
        <Label className="molecules-labeled-check-box-label" level={LabelLevel.BODY} color={Color.BLACK}>{title}</Label>
      </div>
  }
}

LabeledCheckBox.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onChangeHandler: Function
}

LabeledCheckBox.defaultProps = {
  className: ''
}

export default LabeledCheckBox
