import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../utils/colors';

let SCREEN_WIDTH;

Dimensions.addEventListener('change', () => {
  SCREEN_WIDTH = isPortrait
    ? Dimensions.get('window').width
    : Dimensions.get('window').height;

  console.log(SCREEN_WIDTH, 'width');
});
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },

  topbar: {
    top: 0,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  category_option: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  category_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    height: Dimensions.get('window').height - 80,
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  CardContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: '#ffffff00',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  Card: {
    width: '80%',
    height: '90%',
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    flex: 1.2,
  },
  CardOption: {
    flex: 0.5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  CardSentence: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '80%',
    padding: 20,
    flex: 0.6,
  },
  title: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 35,
    fontWeight: 'bold',
  },
  statement: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 30,
  },
  Buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseOption: {
    color: 'white',
    fontSize: 30,
  },
});

export default styles;
