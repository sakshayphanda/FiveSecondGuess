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
    justifyContent: 'center',
  },
  CardSentence: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  CardSwipeText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
