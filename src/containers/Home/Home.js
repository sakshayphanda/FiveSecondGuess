import React, {Component} from 'react';
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  View,
  I18nManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Modal} from '../../components';
import ActionButton from '../../components/ActionButton';
import {languages} from '../../constants/languages';
import colors from '../../utils/colors';
import {styles} from './style';
import {Picker} from '@react-native-community/picker';

import {translate, translationGetters} from '../../utils/Helper';
import i18n from 'i18n-js';
import {
  getAppOpenCount,
  getLanguage,
  setAppOpenCount,
  setLanguage,
  setDoNotShowRating,
  getDoNotShowRating
} from '../../utils/AsyncStorage';
import RatingDialog from '../../components/RatingDialog';
import AsyncStorage from '@react-native-community/async-storage';

export class Home extends Component {
  state = {
    showHowToPlay: false,
    gradient: {
      first: colors.primary,
      second: colors.primaryLighter,
      third: colors.primaryDarker,
    },
    showRatingDialog: false,
  };
  onToggleHowToPlay = () => {
    this.setState({
      showHowToPlay: !this.state.showHowToPlay,
    });
  };

  likedthisApp(state) {
    console.log(state, 'like this app');
    if(!state) {
      setDoNotShowRating(JSON.stringify(true));
    }
  }
  
  rateThisApp = (state) => {
    console.log(state, 'rate');
    if(state === 'no') {
      setAppOpenCount(JSON.stringify(0));
    } else if(state === 'never') {
      setDoNotShowRating(JSON.stringify(true));
    } else {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.androidmate.drinking.party.couples.dirty.truth.or.dare',
      );
      setDoNotShowRating(JSON.stringify(true));
    }
  }

  componentDidMount() {
    getAppOpenCount()
      .then((count) => {
        if (!count) {
          setAppOpenCount(JSON.stringify(0));
        } else {
          setAppOpenCount('' + ++count);
          getDoNotShowRating().then(
            (state) => {
              console.log(state);
              if (JSON.parse(count) >= 10 && !JSON.parse(state)) {
                this.setState({
                  showRatingDialog: true,
                });
              }
            }
          );
          console.log('did mount', count);
        }
      })
      .catch((e) => {});
  }

  render() {
    const {gradient} = this.state;
    const {language} = this.props.store;

    return (
      <View style={styles.Home}>
        <StatusBar hidden />
        <LinearGradient
          colors={[gradient.first, gradient.second]}
          style={styles.LogoContainer}>
          <View style={{elevation: 20, shadowColor: 'black'}}>
            {/* <Image style={{ width: 220, height: 220, borderRadius: 10 }} source={logo} /> */}
            <Text style={styles.Title}>Truth Or Dare</Text>
          </View>
        </LinearGradient>
        <Modal
          visible={this.state.showHowToPlay}
          onPress={() => this.onToggleHowToPlay()}
        />

        <RatingDialog
          visible={this.state.showRatingDialog}
          likeThisApp={this.likedthisApp}
          rateThisApp={this.rateThisApp}
        />

        <View style={styles.Buttons}>
          <View>
            <Picker
              selectedValue={language}
              style={{height: 50, width: 150, marginLeft: 'auto'}}
              onValueChange={(itemValue, itemIndex) => {
                this.props.changeLanguage(itemValue);
                translate.cache.clear();
                // update layout direction
                // I18nManager.forceRTL(isRTL);
                // set i18n-js config
                i18n.translations = {
                  [itemValue]: translationGetters[itemValue](),
                };
                i18n.locale = itemValue;
                console.log('Selected lang', itemValue);
                setLanguage(itemValue).then((resp) => {
                  getLanguage().then((l) => console.log(l));
                });
              }}>
              {Object.keys(languages).map((language) => {
                return (
                  <Picker.Item label={languages[language]} value={language} />
                );
              })}
            </Picker>
          </View>
          <ScrollView>
            <ActionButton
              style={{backgroundColor: colors.buttonPrimaryColor}}
              title={translate('play')}
              onPress={() => this.props.navigation.navigate('Play')}
            />
            <ActionButton
              style={{backgroundColor: colors.buttonPrimaryColor}}
              title={translate('turnBased')}
              onPress={() => {
                this.props.navigation.navigate('AddPlayers', {});
              }}
            />
            <ActionButton
              style={{backgroundColor: colors.buttonPrimaryColor}}
              title={translate('howToPlay')}
              onPress={() => {
                this.onToggleHowToPlay();
              }}
            />
            <ActionButton
              style={{backgroundColor: colors.buttonPrimaryColor}}
              title={translate('moreGames')}
              onPress={() => {
                Linking.openURL(
                  'https://play.google.com/store/apps/developer?id=Androidmate',
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store: store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) =>
      dispatch({type: 'updateLanguage', payload: language}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
