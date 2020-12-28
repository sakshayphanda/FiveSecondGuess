import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
const screenWidth = Dimensions.get('window').width;
export default function CustomAlert({
  title,
  positiveText,
  negativeText,
  onSuccess,
  onFail,
  visible,
}) {
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
      zIndex: 1,
    },
    content: {
      backgroundColor: colors.primary,
      padding: 10,
      width: screenWidth - 60,
      zIndex: 1,
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 50,
      color: colors.white,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    button: {
      padding: 20,
      zIndex: 3,
      backgroundColor: colors.primaryDarker,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: colors.white,
      fontWeight: 'bold',
    },
  });

  if (!visible) return null;
  return (
    <View style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onFail} style={styles.button}>
            <Text style={styles.buttonText}>{negativeText}</Text>
          </TouchableOpacity>
          {positiveText !== '' && <View style={{ width: 10 }}></View>}
          {positiveText !== '' && (
            <TouchableOpacity onPress={onSuccess} style={styles.button}>
              <Text style={styles.buttonText}>{positiveText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
