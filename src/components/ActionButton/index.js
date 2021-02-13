import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
function ActionButton(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}>
      <Text style={[styles.text, props.textStyle]}>
        {props.title || 'Un-named'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff80',
    borderRadius: 69,
    shadowOffset: {
      height: 3,
      width: 1,
    },
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 17,
  },
});

export default ActionButton;
