import React, { Component } from 'react'

import './style.css'
import Button, { Theme, Size } from '../../components/atoms/Button'
import Label, { Level, Color } from '../../components/atoms/Label'
import Option from '../../components/atoms/Option'
import Container, { Theme as ContainerTheme, Size as ContainerSize } from '../../components/atoms/Container'
import Dialog from '../../components/molecules/modal/Dialog'
import OptionGroup from '../../components/molecules/OptionGroup'

export default class Home extends Component {

  render() {
    return (
      <div>
        <Button theme={Theme.FILL} size={Size.SMALL} disabled={false}>
          kucing
        </Button>
        <Label level={Level.BODY} color={Color.BLACK}> kucing <Label level={Level.BODY_BOLD} color={Color.BLACK}>garong</Label>
        </Label>
        <Container theme={ContainerTheme.BORDER} size={ContainerSize.LARGE}>
          <Label level={Level.BODY} color={Color.BLACK}> kucing <Label level={Level.BODY_BOLD} color={Color.BLACK}>garong</Label>
          </Label>
        </Container>
        <Dialog>
          test
        </Dialog>
        <Option onClick={(index) => {console.log(index);}}> <Label level={Level.BODY} color={Color.BLACK}> kucing </Label> </Option>
        <OptionGroup></OptionGroup>
      </div>
    )
  }
}
