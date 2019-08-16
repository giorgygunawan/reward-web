import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Label, { Level as LabelLevel} from '../../atoms/Label'
import Option from '../../atoms/Option'

import './style.css'

class OptionGroup extends Component {

    constructor() {
        super();
        this.state = {
          selectedIndex: null,
          selectedValue: null
        };
    }

    selectOption(index){
        this.setState({
          selectedIndex: index,
          selectedValue: this.props.options[index],
        });
        this.props.onOptionSelected(this.props.options[index])
    }


  render() {
    const { options, className } = this.props
    const classProps = classnames(
      "molecules-option-group",
      className
    )
    return (
      <div className={classProps}>
        {options.map( (option, index) =>
          <Option key={index} className="molecules-option-group-spacing" isSelected={(this.state.selectedIndex == null) ? (this.props.defaultSelectedIndex === index) : (this.state.selectedIndex === index)} index={index} onClick={this.selectOption.bind(this)}>
            <Label key={index} level={LabelLevel.H2_BOLD}>{option}</Label>
          </Option>
        )}
      </div>
    )
  }
}

OptionGroup.propTypes = {
  options: PropTypes.array,
  onOptionSelected: Function,
  defaultSelectedIndex: Number,
  className: PropTypes.string
}

OptionGroup.defaultProps = {
  options: [],
  className: ''
}

export default OptionGroup
