import React, { Component } from 'react'
import {  Button,  Text } from 'native-base';

export class RedButton extends Component {
  render() {
    return (
      <Button style={[{ alignSelf: 'center', margin: 10 }, this.props.style]} bordered={this.props.bordered} danger onPress={this.props.onPress}>
        <Text> {this.props.value} </Text>
      </Button>
    )
  }
}
