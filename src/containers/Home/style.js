import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
    Home: {
        backgroundColor: 'darkslateblue',
        height: '100%'
    },
    LogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20, 
        flex: 0.65,
        backgroundColor: colors.primary
    },
    Title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    Buttons: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 30,
        justifyContent: 'center',

    }
})