import React, {Component} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
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

class Play extends Component {
  cardSwipeRef;
  state = {
    optionSelected: 'Truth',
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
  };

  componentDidMount() {
    this.cardSwipeRef = React.createRef();
    this.getCategoryDataFromCategory();
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
    console.log(language);
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

  render() {
    const {gradient} = this.state;
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const bannerAdUnitId = 'ca-app-pub-6388480553530535/2267808216';
    return (
      <LinearGradient
        colors={[gradient.first, gradient.second]}
        style={styles.Play}>
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
        <StatusBar hidden />
        <View style={styles.topbar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Categories', {})}
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
        </View>
        <View style={styles.CardContainer}>
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
            handleYup={() => {
              this.toggle('Dare', true);
            }}
            handleNope={() => {
              this.toggle('Truth', true);
            }}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={false}
            onClickHandler={() => {}}
          />
        </View>

        <View style={styles.Buttons}>
          <ActionButton
            style={{flex: 1, marginLeft: 30, marginRight: 10}}
            title={translate('start')}
            onPress={() => this.toggle('Truth')}
          />
          {/* <ActionButton
            style={{flex: 1, marginRight: 30, marginLeft: 10}}
            title={translate('dare')}
            onPress={() => this.toggle('Dare')}
          /> */}
        </View>
      </LinearGradient>
    );
  }

  toggle(event, swipe) {
    if (this.state.showSwipeText) {
      this.setState({showSwipeText: false});
    }
    if (!swipe) {
      if (event === 'Dare') {
        this.cardSwipeRef.current._forceRightSwipe();
      } else {
        this.cardSwipeRef.current._forceLeftSwipe();
      }
    }
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
