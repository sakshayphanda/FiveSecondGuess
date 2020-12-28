import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
import {HOW_TO_PLAY} from '../../constants/strings';
import ActionButton from '../ActionButton';
import {translate} from '../../utils/Helper';
const screenWidth = Dimensions.get('window').width;
export default function Modal({onPress, visible}) {
  const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.translucent,
      zIndex: 5,
    },

    content: {
      backgroundColor: colors.white,
      padding: 10,
      width: screenWidth - 60,
      zIndex: 1,
      borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
      color: colors.primary,
      textAlign: 'center',
    },
    divider: {
      height: 2,
      backgroundColor: colors.primary,
      marginHorizontal: 20,
    },
    textContainer: {
      marginTop: 20,
      padding: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 20,
      flexWrap: 'wrap',
    },
    button: {
      padding: 30,
      zIndex: 3,
      backgroundColor: colors.accentColor,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: colors.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  if (!visible) return null;
  return (
    <View style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.title}>{translate('howToPlay')}</Text>
        <View style={styles.divider}></View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{translate('howtoplay_1')}</Text>
          <Text style={styles.text}>{translate('howtoplay_2')}</Text>
          <Text style={styles.text}>{translate('howtoplay_3')}</Text>
          <Text style={styles.text}>{translate('howtoplay_4')}</Text>
          <Text style={styles.text}>{translate('howtoplay_5')}</Text>
          <Text style={styles.text}>{translate('howtoplay_6')}</Text>
        </View>
        <ActionButton
          title={translate('close')}
          onPress={onPress}
          style={styles.button}></ActionButton>
      </View>
    </View>
  );
}
