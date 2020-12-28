import React, {Component} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {ActionButton, WheelOfFortune} from '../../components';
import categories from '../../utils/categories';
import colors from '../../utils/colors';
import {getWordListPerLanguage, translate} from '../../utils/Helper';
import styles from './styles';
import firebase from 'react-native-firebase';
import { color } from 'react-native-reanimated';

const tempPlayers = ['A', 'B', 'C', 'D'];
// const rewards = participants.map(e => ({ uri: `https://i.pravatar.cc/300?${e}` }))
const tempStyles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: colors.green,
  },
  section: {
    flex: 0.5,
  },
  turnText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  wheelContainer: {
    flex: 1,
  },
});
class TurnBased extends Component {
  state = {
    optionSelected: '',
    statement: '',
    categoryName: '',
    categoryImage: '',
    size: 0,
    wordlist: [],
    showingWheel: true,
    winnerName: tempPlayers[0],
    winnerIndex: 0,
    gradient: {
      first: '#000',
      second: '#000',
      third: '#000',
    },
    participants: this.props.route.params.players
      ? this.props.route.params.players
      : tempPlayers,
  };
  componentDidMount() {
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.initCategory();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    //  this.getCategoryDataFromCategory()
  }

  componentWillUnmount() {
    console.log('unmount');
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getCategoryDataFromCategory();
    }
  }

  handleBackButtonClick() {
    // navigation.goBack();
    console.log(this.props);

    const {navigation} = this.props;
    navigation.popToTop();
    return true;
  }

  initCategory() {
    var result = categories.find((obj) => {
      return obj.category === this.props.category;
    });
    this.setState({
      categoryName: result.title,
      categoryImage: result.image,
    });
  }

  getCategoryDataFromCategory = () => {
    let {category} = this.props;
    let language = this.props.language;

    let optionSelected = this.state.optionSelected;
    var result = categories.find((obj) => {
      return obj.category === this.props.category;
    });
    let size, statement, wordlist;
    if (optionSelected) {
      wordlist = getWordListPerLanguage(category, optionSelected, language);
      size = wordlist.length;
      let randomPos = Math.floor(Math.random() * wordlist.length);
      statement = wordlist[randomPos];
      //Swap statement at random pos and last position
      let temp = wordlist[randomPos];
      wordlist[randomPos] = wordlist[size - 1];
      wordlist[size - 1] = temp;
      size = size - 1;
    }

    this.setState({
      categoryName: result.title,
      categoryImage: result.image,
      statement: statement,
      size: size,
      wordlist: wordlist,
    });
  };

  // Finds a random position
  // set the statement to that statement
  // Replaces statement to last statement
  // decreases size of list
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

  navigate = (name, props) => {
    const {navigation} = this.props;
    navigation.navigate(name, props);
  };

  onNextClicked = () => {
    //  RNFirebase.analytics().logEvent('Next_Clicked');
    this.setRandomWordFromList();
    this.setState({
      showingWheel: true,
      gradient: {
        first: '#000',
        second: '#000',
        third: '#000',
      },
    });
  };

  onWinnerSelected = (winnerName, i) => {
    this.setState({
      winnerName: winnerName,
      winnerIndex: i,
      showingWheel: false,
      gradient: {
        first: colors.primary,
        second: colors.primaryLighter,
        third: colors.accentColor,
      },
    });
  };

  toggle(event) {
    const prevOptionSelected = this.state.optionSelected;
    this.setState(
      event === 'Dare'
        ? {
            optionSelected: event,
            gradient: {
              first: colors.secondary,
              second: colors.secondaryLighter,
            },
          }
        : {
            optionSelected: event,
            gradient: {
              first: colors.primary,
              second: colors.primaryLighter,
            },
          },
      () => {
        if (prevOptionSelected !== event) {
          this.getCategoryDataFromCategory();
        } else {
          this.setRandomWordFromList();
        }
      },
    );
  }

  next() {
    this.setState({
      optionSelected: '',
      statement: '',
      showingWheel: true,
      gradient: {
        first: '#000',
        second: '#000',
        third: '#000',
      },
    });
  }

  render() {
    const {
      gradient,
      categoryImage,
      categoryName,
      showingWheel,
      winnerName,
      participants,
      winnerIndex,
    } = this.state;
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const bannerAdUnitId = 'ca-app-pub-6388480553530535/2267808216';

    return (
      <LinearGradient
        colors={[gradient.first, gradient.second]}
        style={styles.container}>
        <Banner
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
        />
        {!showingWheel && (
          <View style={styles.topbar}>
            <TouchableOpacity
              onPress={() => this.navigate('Categories', {})}
              style={styles.category_option}>
              <View style={styles.category_content}>
                <Image style={{width: 20, height: 20}} source={categoryImage} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                    fontSize: 13,
                    fontFamily: 'arial',
                  }}>
                  {translate(categoryName)}
                </Text>
                {/* <Icon name="angle-down" size={25} color={colors.black} /> */}
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!showingWheel && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={tempStyles.turnText}>{`${winnerName}'s ${translate(
              'turn',
            )}`}</Text>
            <View style={styles.CardContainer}>
              {this.state.optionSelected ? (
                <View style={styles.Card}>
                  <View style={styles.CardOption}>
                    <Text
                      style={{
                        color: gradient.first,
                        fontSize: 33,
                        fontWeight: 'bold',
                        padding: 20,
                        width: '100%',
                        textAlign: 'center',
                      }}>
                      {translate(this.state.optionSelected.toLowerCase())}
                    </Text>
                  </View>
                  <View style={styles.CardSentence}>
                    <Text
                      style={{
                        color: '#00000090',
                        fontSize: 22,
                        textAlign: 'center',
                      }}>
                      {this.state.statement}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.chooseOption}>
                    {translate('chooseAnOption')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.Buttons}>
              {!this.state.optionSelected ? (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <ActionButton
                    style={{flex: 1, marginHorizontal: 10}}
                    title={translate('truth')}
                    onPress={() => this.toggle('Truth')}
                  />
                  <ActionButton
                    style={{flex: 1, marginHorizontal: 10}}
                    title={translate('dare')}
                    onPress={() => this.toggle('Dare')}
                  />
                </View>
              ) : (
                <ActionButton
                  style={{minWidth: '80%'}}
                  title="Next"
                  onPress={() => this.next()}
                />
              )}
            </View>
          </ScrollView>
        )}

        {/* Wheel of Turns  */}
        {showingWheel && (
          <View style={tempStyles.wheelContainer}>
            <WheelOfFortune
              onRef={(ref) => (this.child = ref)}
              rewards={participants}
              knobSize={20}
              borderWidth={3}
              borderColor={'#FFF'}
              innerRadius={50}
              backgroundColor={'#D04F48'}
              duration={3000}
              winner={winnerIndex}
              getWinner={(value, index) => this.onWinnerSelected(value, index)}
            />
          </View>
        )}
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (store) => {
  return store;
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnBased);
