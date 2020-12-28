import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function RoomRow({ roomName, onPress }) {
  const styles = StyleSheet.create({
    row: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightGrey,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 1,
    },
    imgContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      padding: 5,
      width: '85%',
      height: '100%',
      color: Colors.black,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold',
      fontFamily: 'arial'
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      shadowOffset: {
        height: 3,
        width: 1,
      },
    },
    buttonIcon: {
      padding: 5,
    },
  });
  return (
    <View style={styles.row}>
      <View style={styles.imgContainer}>
        <Text style={styles.text}>{roomName}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonIcon}><Text style={{ color: 'white'}}>x</Text></View>
      </TouchableOpacity>
    </View>
  );
}
