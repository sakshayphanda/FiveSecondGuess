import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import PropTypes from 'prop-types'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function CategoryRow({ title, subTitle, buttonText, img, onPress }) {

  // CategoryRow.defaultProps = {
  //   buttonText: 'Buy d'
  // }

  const styles = StyleSheet.create({
    row: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightGrey,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 1,
    },
    contentContainer: {
      flexDirection: 'column',
      flex: 0.9
    },
    header: {
      flexDirection: 'row'
    },
    headerText: {
      color: Colors.black,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      fontFamily: 'arial'
    },
    subText: {
      color: Colors.black,
      fontSize: 15,
      flexShrink: 1
    },
    button: {
      backgroundColor: colors.green,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      shadowOffset: {
        height: 3,
        width: 1,
      },
      shadowColor: 'rgba(87,84,84,1)',
      shadowOpacity: 0.22,
      shadowRadius: 7,
      elevation: 5,
    },
    buttonText: {
      fontSize: 16,
      color: Colors.white,
    },
  });

  if (!buttonText) {
    buttonText = 'Play'
  }

  return (
    <View style={styles.row}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image style={{ width: 25, height: 25 }} source={img} />
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <Text style={styles.subText}>{subTitle}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
