import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class ColumnSections extends Component {
  render() {
    return (
      <View style={[{flexDirection:"column",justifyContent:'space-around'},this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}