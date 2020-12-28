import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {ActionButton, InviteRow} from '../../components';
import {getPlayers, setPlayers} from '../../utils/AsyncStorage';
import colors from '../../utils/colors';
import {translate} from '../../utils/Helper';
import {styles} from './Styles';
export default class Home extends Component {
  state = {
    inputText: '',
    players: [],
    gradient: {
      first: colors.primary,
      second: colors.primaryLighter,
      third: colors.accentColor,
    },
  };

  componentDidMount() {
    getPlayers().then((players) => {
      console.log(players, 'get players');
      if (players) {
        this.setState({players: JSON.parse(players)});
      }
    });
  }

  onInputChange = (text) => {
    this.setState({
      inputText: text,
    });
  };

  onAddClicked = () => {
    let {players, inputText} = this.state;
    if (inputText !== '') {
      players.push(inputText);

      this.setState({
        players: players,
        inputText: '',
      });
    }
  };

  onRemoveItemClicked = (index) => {
    let {players} = this.state;
    players.splice(index, 1);
    this.setState({
      players,
    });
  };

  onStartClicked = () => {
    const {players} = this.state;
    if (players.length < 2) {
      Toast.show(translate('addPlayersError'));
    } else {
      const {navigation} = this.props;
      setPlayers(JSON.stringify(players));
      navigation.navigate('TurnBased', {
        players: players,
      });
    }
  };

  render() {
    const {gradient, players, inputText} = this.state;
    return (
      <View style={{display: 'flex', height: Dimensions.get('window').height}}>
        <ScrollView>
          <LinearGradient
            colors={[gradient.first, gradient.second, gradient.third]}
            style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.headerText}> {translate('addPlayers')}</Text>
            <TextInput
              placeholder={translate('enterName')}
              style={styles.inputField}
              value={inputText}
              onChangeText={this.onInputChange}
            />
            <ActionButton
              style={{
                marginVertical: 10,
                backgroundColor: '#ffffff10',
                elevation: 1,
              }}
              title={translate('add')}
              onPress={() => this.onAddClicked()}></ActionButton>
          </LinearGradient>
          <View style={styles.buttons}>
            <FlatList
              data={players}
              renderItem={({item, index}) => (
                <InviteRow
                  roomName={item}
                  onPress={() => this.onRemoveItemClicked(index)}
                />
              )}
              keyExtractor={(item, index) => index}
            />

            <ActionButton
              style={{
                marginVertical: 10,
                backgroundColor: colors.buttonPrimaryColor,
              }}
              title={translate('start')}
              onPress={() => this.onStartClicked()}></ActionButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}
