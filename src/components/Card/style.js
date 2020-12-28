import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    Card: {
        backgroundColor: 'white',
        minWidth: '80%',
        maxWidth: '80%',
        height: '100%',
        elevation: 10,
        alignItems: 'center',
        borderRadius: 15,
        flex: 0.9,
        display: 'flex',
        padding: 20,
    },
  CardOption: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    flex: 1.5,

  },
  CardSentence: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '80%',
    padding: 10,
    flex: 5,
  },
  CardSwipeText: {
    flexDirection: 'column', 
    alignItems: 'center',
  }
});