import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/colors';
import ActionButton from '../ActionButton';
const screenWidth = Dimensions.get('window').width;

export default function RatingDialog({likeThisApp, rateThisApp, visible}) {
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

  const [title, setTitle] = useState('Did you liked this app?');
  const [visibleState, setvisibleState] = useState(visible);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setvisibleState(visible);
    return () => {
    }
  }, [visible])

  if (!visibleState) return null;
  return (
    <View style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider}></View>
        {liked && (
          <>
            <ActionButton
              title="Yes"
              onPress={() => {
                setvisibleState(false);
                rateThisApp('yes')}}
              style={styles.button}></ActionButton>

            <ActionButton
              title="No"
              onPress={() => {
                setvisibleState(false);
                rateThisApp('no');
              }}
              style={styles.button}></ActionButton>

            <ActionButton
              title="Never"
              onPress={() => {
                setvisibleState(false);
                rateThisApp('never');
              }}
              style={styles.button}></ActionButton>
          </>
        )}
        {!liked && (
          <>
            <ActionButton
              title="Yes"
              onPress={() => {
                setTitle('Would you like to rate?');
                setLiked(true);
                likeThisApp(true);
              }}
              style={styles.button}></ActionButton>

            <ActionButton
              title="No"
              onPress={() => {
                setvisibleState(false);
                likeThisApp(false);
              }}
              style={styles.button}></ActionButton>
          </>
        )}
      </View>
    </View>
  );
}
