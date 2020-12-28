import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/containers/Home/Home';
import {Linking, I18nManager} from 'react-native';
import store from './src/store';
import {Provider} from 'react-redux';
import Categories from './src/containers/Categories/Categories';
import Play from './src/containers/Play/Play';
import AddPlayers from './src/containers/AddPlayers/AddPlayers';
import TurnBased from './src/containers/TurnBased/TurnBased';
import firebase from 'react-native-firebase';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, translationGetters} from './src/utils/Helper';
import {useState} from 'react';
import {getLanguage, setLanguage} from './src/utils/AsyncStorage';
import NetInfo from "@react-native-community/netinfo";

const setI18nConfig = (lang = null) => {
  //console.log('Stored language : ' + lang);
  const fallback = {languageTag: 'en', isRTL: false};
  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  store.dispatch({type: 'updateSystemLanguage', payload: languageTag});

  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
  if (lang) {
    store.dispatch({type: 'updateLanguage', payload: lang});
    i18n.translations = {[lang]: translationGetters[lang]()};
    i18n.locale = lang;
  } else {
    store.dispatch({type: 'updateLanguage', payload: languageTag});
    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
    setLanguage(languageTag);
  }
};

const Stack = createStackNavigator();

function App() {
  const [state, setstate] = useState(false);

  React.useEffect(() => {
    store.dispatch({type: 'updateLanguage', payload: 'fr'});
    async function fetchLang() {
      const lang = await getLanguage();
      if (lang) {
        setI18nConfig(lang); // set initial config
        setstate(true);
      } else {
        setI18nConfig();
      }
      setstate(true);
    }

    fetchLang();
    NetInfo.fetch().then(state => {
     // console.log("Connection type", state.type);
     // console.log("Is connected?", state.isConnected);
      if(state.isConnected) {
        checkPermission();
        messageListener();
      }
    });

    RNLocalize.addEventListener('change', handleLocalizationChange);

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, [state]);

  let handleLocalizationChange = () => {
    getLanguage().then((lang) => {
      setI18nConfig(); // set initial config
    });
  };

  let checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  let getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
    } else {
    }
  };

  let requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  let messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {});

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        Linking.openURL(notificationOpen.notification['_data']['Link']);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
    }

    this.messageListener = firebase.messaging().onMessage((message) => {});
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="home"
          headerMode="screen"
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'darkslateblue',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TurnBased"
            component={TurnBased}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Play" component={Play} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen
            name="AddPlayers"
            component={AddPlayers}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
