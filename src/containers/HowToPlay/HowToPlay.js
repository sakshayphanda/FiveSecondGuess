import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ActionButton } from '../../components';
import { styles } from './style';

export default function HowToPlay({ navigation, route }) {
  const { otherParam } = route?.params ? route?.params : '';
  return (
    <LinearGradient colors={['#741aee', '#7c4ae4', '#fe376f']} style={styles.Play}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'white'}}>These are some Dummy rules</Text>

        <Text>{otherParam}</Text>
        {/* <ActionButton title="Go back" onPress={() => navigation.goBack()} /> */}
        <ActionButton
          title="Home"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </LinearGradient>
  );
}

