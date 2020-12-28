import {Dimensions, StyleSheet} from 'react-native';

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

export const styles = StyleSheet.create({
  Play: {
    height: '100%',
  },
  topbar: {
    top: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
  },
  category_option: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 5,
  },
  category_content: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  CardContainer: {
    width: SCREEN_WIDTH,
    padding: 10,
    flex: 6,
    backgroundColor: '#ffffff00',
    justifyContent: 'center',
    alignItems: 'center',

  },


  Buttons: {
    flex: 3.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
