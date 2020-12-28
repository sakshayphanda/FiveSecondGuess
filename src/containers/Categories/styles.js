import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../utils/colors';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222426',
},
Play: {
    height: '100%'
},

headerText: {
    textAlign: 'center',
    margin: 20,
    color: colors.white,
    fontSize: 40,
    fontWeight: 'bold'
},

content: {
    alignContent: 'center',
    justifyContent: 'center',
},

btnContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0
},
btn: {

    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
},
btnText: {
    color: colors.black,

}});