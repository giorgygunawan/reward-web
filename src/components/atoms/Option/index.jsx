
import React, { Component } from 'react'
import classnames from 'classnames'

import './style.css'

export const Type = {
  RADIO: 'atoms-option-radio',
}

type Props = {
  index: number,
  type: string,
  isSelected: boolean,
  onClick: Function,
  children: React.Node,
  className: string,
}

const getOptionContainerClassName = (type: string, isSelected: string) => {
  switch(type) {
    case Type.RADIO:
      return isSelected ? "atoms-option-container-radio-selected" : "atoms-option-container-radio"
    default:
      return isSelected ? "atoms-option-container-radio-selected" : "atoms-option-container-radio"
  }
}

const getOptionIndicatorClassName = (type: string, isSelected: string) => {
  switch(type) {
    case Type.RADIO:
      return isSelected ? "fa fa-check atoms-option-radio-selected" : "atoms-option-radio hidden"
    default:
      return isSelected ? "fa fa-check atoms-option-radio-selected" : "atoms-option-radio hidden"
  }
}

const Option = (props: Props): Component => {
  const { type, isSelected, onClick, children, className, index } = props
  const classProps = classnames(
    "atoms-option",
    className
  )

  return (
    <div className={ classProps } onClick={() => onClick(index)}>
      <div className={ getOptionContainerClassName(type, isSelected) } >
        <div className={ getOptionIndicatorClassName(type, isSelected) }>
        </div>
      </div>
      <div className="atoms-option-value">
      { children }
      </div>
    </div>
  )
}

Option.defaultProps = {
  index: 0,
  type: Type.RADIO,
  isSelected: false,
  onClick: () => {},
  className: '',
}

export default Option
