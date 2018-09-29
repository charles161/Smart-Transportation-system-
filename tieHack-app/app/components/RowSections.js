import React from 'react';
import { View } from 'react-native';

const RowSections = (props) => {
  return (
    <View style={[styles.containerstyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerstyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent:'space-around'
  }
};

export { RowSections };
