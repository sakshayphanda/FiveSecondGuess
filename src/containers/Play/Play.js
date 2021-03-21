import React, {Component} from 'react';
import {Image, StatusBar, Text, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import ActionButton from '../../components/ActionButton';
import categories from '../../utils/categories';
import colors from '../../utils/colors';
import {getWordListPerLanguage, translate} from '../../utils/Helper';
import {styles} from './style';
import firebase from 'react-native-firebase';
import SwipeCards from 'react-native-swipe-cards';
import Card from '../../components/Card/Card';
import {
  STATE_GUESSED_IT,
  STATE_LOADING,
  STATE_START,
} from '../../constants/strings';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Animated from 'react-native-reanimated';
import Sound from 'react-native-sound';

class Play extends Component {
  cardSwipeRef;
  whoosh;
  buzzerSound;
  state = {
    optionSelected: 'All',
    categoryName: '',
    categoryImage: '',
    size: 0,
    wordlist: [],
    statement: '',
    gradient: {
      first: colors.primary,
      second: colors.primaryLighter,
      third: colors.primaryDarker,
    },
    showSwipeText: true,
    timerRunning: false,
    currentTime: 0,
    gameState: STATE_START,
    isTimerStarted: false,
    time: 5,
    timeUp: false,
  };

  componentDidMount() {
    this.cardSwipeRef = React.createRef();
    this.getCategoryDataFromCategory();

    // Enable playback in silence mode
    Sound.setCategory('Playback');
    this.buzzerSound = new Sound('buzzer.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }               
    }
    );
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    this.whoosh = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          this.whoosh.getDuration() +
          'number of channels: ' +
          this.whoosh.getNumberOfChannels(),
      );
    });

    this.whoosh.setVolume(1);

    // Position the sound to the full right in a stereo field
    this.whoosh.setPan(1);

    // Loop indefinitely until stop() is called
    this.whoosh.setNumberOfLoops(-1);

    // Get properties of the player instance
    console.log('volume: ' + this.whoosh.getVolume());
    console.log('pan: ' + this.whoosh.getPan());
    console.log('loops: ' + this.whoosh.getNumberOfLoops());

    // Seek to a specific point in seconds
    this.whoosh.setCurrentTime(2.5);

    // Get the current playback point in seconds
    this.whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

    // Pause the sound
    this.whoosh.pause();


  }

  componentDidUpdate(prevProps) {
    if (prevProps.store.category !== this.props.store.category) {
      this.setState({
        categoryName: this.props.store.category,
      });
      this.getCategoryDataFromCategory();
    }

    if (prevProps.store.language !== this.props.store.language) {
      this.getCategoryDataFromCategory();
    }
  }

  getCategoryDataFromCategory = () => {
    let category = this.props.store.category;
    let language = this.props.store.language;
    let optionSelected = this.state.optionSelected;
    var result = categories.find((obj) => {
      return obj.category === this.props.store.category;
    });
    let wordlist = getWordListPerLanguage(category, optionSelected, language);
    let size = wordlist.length;
    let randomPos = Math.floor(Math.random() * wordlist.length);
    let statement = wordlist[randomPos];
    //Swap statement at random pos and last position
    let temp = wordlist[randomPos];
    wordlist[randomPos] = wordlist[size - 1];
    wordlist[size - 1] = temp;
    size = size - 1;

    this.setState({
      categoryName: result.title,
      categoryImage: result.image,
      statement: statement,
      size: size,
      wordlist: wordlist,
    });
  };

  setRandomWordFromList = () => {
    let {size, wordlist} = this.state;
    if (size > 0) {
      let randomPos = Math.floor(Math.random() * size);
      let statement = wordlist[randomPos];

      //Swap statement at random pos and last position
      let temp = wordlist[randomPos];
      wordlist[randomPos] = wordlist[size - 1];
      wordlist[size - 1] = temp;
      size = size - 1;
      this.setState({
        size: size,
        wordlist: wordlist,
        statement: statement,
      });
    } else {
      size = wordlist.length;
      this.setState(
        {
          size: size,
        },
        () => {
          this.setRandomWordFromList();
        },
      );
    }
  };

  handleYup = (event) => {
    const prevOptionSelected = this.state.optionSelected;
    if (prevOptionSelected !== event) {
      this.getCategoryDataFromCategory();
    } else {
      this.setRandomWordFromList();
    }
  };

  // When the timer is done
  // Change Question to "Did you nailed it ?"
  // Show Guess it Button
  startTimer = () => {
    if (this.interval == null) {
      this.setState(
        {
          isTimerStarted: true,
          timerRunning: true,
          currentTime: 0,
          gameState: STATE_LOADING,
        },
        () => {},
      );
    } else {
      this.startTimer();
    }
  };

  onYesNoClicked = () => {
    this.setState(
      {
        gameState: STATE_START,
      },
      () => this.setRandomWordFromList(),
    );
  };

  countdownComponent = () => {
    const {isTimerStarted, time} = this.state;
    return (
      isTimerStarted && (
        <CountdownCircleTimer
          isPlaying={isTimerStarted}
          duration={5}
          strokeWidth={5}
          initialRemainingTime={time}
          size={60}
          onComplete={() => {
            this.setState({
              isTimerStarted: false,
              time: 5,
              statement: 'Challenge successful?',
              timeUp: true,
            });
            // Stop the sound and rewind to the beginning
            this.whoosh.stop(() => {
              this.buzzerSound.play((success) => {
                if (success) {
                  console.log('successfully finished playing buzzer');
                } else {
                  console.log('buzzer playback failed due to audio decoding errors');
                }
              });
            }

            );
          }}
          colors={[
            ['#004777', 0.4],
            ['#F7B801', 0.4],
            ['#A30000', 0.2],
          ]}>
          {({remainingTime, animatedColor}) => (
            <Animated.Text style={{color: 'white'}}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      )
    );
  };

  // will be implemented in future
  guessedItButton = (state) => {
    this.cardSwipeRef.current._forceRightSwipe();
    this.setRandomWordFromList();
    this.setState({
      timeUp: false,
    });
  };

  start() {
    this.startTimer();
    //Play the sound with an onEnd callback
    this.whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  showToast = () => {
    ToastAndroid.show('More categories coming soon!', ToastAndroid.SHORT);
  };

  render() {
    const {gradient, currentTime, timeUp, isTimerStarted} = this.state;
    // const Banner = firebase.admob.Banner;
    // const AdRequest = firebase.admob.AdRequest;
    // const request = new AdRequest();
    // const bannerAdUnitId = 'ca-app-pub-6388480553530535/2267808216';
    return (
      <LinearGradient
        colors={[gradient.first, gradient.second]}
        style={styles.Play}>
        {/* <Banner
          style={{position: 'absolute', bottom: 0}}
          unitId={bannerAdUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={(error) => {
            console.log('Advert fail');
          }}
        /> */}
        <StatusBar hidden />

        {/* <View style={styles.topbar}>
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate('Categories', {})
              this.showToast();
            }}
            style={styles.category_option}>
            <View style={styles.category_content}>
              <Image
                style={{width: 20, height: 20, margin: 5}}
                source={this.state.categoryImage}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  fontSize: 13,
                  fontFamily: 'arial',
                }}>
                {translate(this.state.categoryName)}
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.CardContainer}>
          <View style={{height: 60}}>{this.countdownComponent()}</View>
          <SwipeCards
            ref={this.cardSwipeRef}
            cards={this.state.wordlist}
            loop={true}
            showNope={false}
            showYup={false}
            yupText={'Next'}
            nopeText={'Next'}
            cardRemoved={() => {}}
            onLoop={() => {}} // called when cards are now at 0th index
            renderCard={(cardData) => (
              <Card
                {...cardData}
                showSwipeText={this.state.showSwipeText}
                category={translate(this.state.optionSelected.toLowerCase())}
                sentence={this.state.statement}
                gradient={gradient.first}
              />
            )}
            renderNoMoreCards={() => (
              <View>
                <Text>Refresh</Text>
              </View>
            )}
            handleYup={() => {}}
            handleNope={() => {}}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={false}
            onClickHandler={() => {}}
          />
        </View>

        <View style={styles.Buttons}>
          {timeUp ? (
            <>
              <ActionButton
                style={{flex: 1, marginLeft: 20, marginRight: 10}}
                title={'Nailed it'}
                onPress={() => this.guessedItButton()}
              />
              <ActionButton
                style={{flex: 1, marginLeft: 10, marginRight: 20}}
                title={'Failed it'}
                onPress={() => this.guessedItButton()}
              />
            </>
          ) : (
            !isTimerStarted && (
              <ActionButton
                style={{flex: 1, marginLeft: 30, marginRight: 30}}
                title={translate('start')}
                onPress={() => this.start()}
              />
            )
          )}
        </View>
      </LinearGradient>
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

export default connect(mapStateToProps, mapDispatchToProps)(Play);
