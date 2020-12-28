import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 0.43,
    backgroundColor: colors.primary,
  },

  headerText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 30,
    margin: 20,
  },

  inputField: {
    backgroundColor: colors.white,
    fontSize: 20,
    padding: 20,
    margin: 20,
    borderRadius: 69,
  },

  addButton: {
    backgroundColor: colors.accentColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    elevation: 5,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  buttons: {
    flex: 0.6,
    padding: 15,
    justifyContent: 'center',
  },
});
