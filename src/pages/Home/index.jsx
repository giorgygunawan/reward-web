import React, { Component } from 'react'

import './style.css'
import Button, { Theme, Size } from '../../components/atoms/Button'
import Label, { Level, Color } from '../../components/atoms/Label'


export default class Home extends Component {

  render() {
    return (
      <div>
        <Button theme={Theme.FILL} size={Size.SMALL} disabled={false}>
          <Label level={Level.BODY} color={Color.WHITE}> kucing
          </Label>
        </Button>
        <Label level={Level.BODY} color={Color.BLACK}> kucing <Label level={Level.BODY_BOLD} color={Color.BLACK}>garong</Label>
        </Label>
      </div>
    )
  }
}
