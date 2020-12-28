import React, {Component} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import RNFirebase from 'react-native-firebase';
import * as RNIap from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {ActionButton, CategoryRow} from '../../components';
import {
  CATEGORY_EMBARRASING,
  CATEGORY_ENTERTAINMENT,
  CATEGORY_FUNNY,
  CATEGORY_KIDS,
  CATEGORY_PARTY,
  CATEGORY_RANDOM,
} from '../../constants/strings';
import categories from '../../utils/categories';
import colors from '../../utils/colors';
import {translate} from '../../utils/Helper';
import {styles} from './styles';

const free_categories = [
  CATEGORY_EMBARRASING,
  CATEGORY_FUNNY,
  CATEGORY_RANDOM,
  CATEGORY_KIDS,
];

const itemSkus = Platform.select({
  android: [
    'dirty_category_iap',
    'sexy_product_iap',
    'couples_product_iap',
    'flirty_category_iap',
    'teens_category_iap',
    'party_iap',
    'family_iap',
    'friends_iap',
    'drinking_iap',
    'unlock_all_subscription',
    'unlock_all_iap',
    'wtf_iap',
  ],
});

class Categories extends Component {
  state = {
    products: [],
    purchases: [],
    subscriptions: [],
    showCategories: false,
  };

  componentDidMount() {
    try {
      RNIap.initConnection().then((conn) => {
        RNIap.getSubscriptions(itemSkus).then((res) => {
          this.setState({
            subscriptions: res,
          });
        });

        // conn is true
        RNIap.getProducts(itemSkus)
          .then((res) => {
            this.setState({
              products: res,
            });
          })
          .catch((err) => {});

        RNIap.getAvailablePurchases()
          .then((res) => {
            console.log('Purchases', res);
            let purchased_products = res.map((item) => item.productId);
            this.setState({
              purchases: purchased_products,
              showCategories: true,
            });
          })
          .catch((err) => {});

        RNIap.purchaseUpdatedListener((purchase) => {
          let {purchases} = this.state;
          try {
            RNIap.finishTransaction(purchase, false)
              .then((res) => {
                console.log(res);
                console.log('acknowledge purchase successfully');
                if (!purchases.includes(purchase.productId)) {
                  this.setState({
                    purchases: [...purchases, purchase.productId],
                  });
                }
              })
              .catch((err) => {});
          } catch (e) {}
        });
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  getCategoryData = (filter, value) => {
    return categories.find((item) => item[filter] === value);
  };

  onPlayClicked = (category) => {
    this.props.changeCategory(category);
    this.props.navigation.goBack();
  };
  onBuyClicked = (prod_id) => {
    console.log(prod_id, this.state);
    RNFirebase.analytics().logEvent(`Buy_${prod_id}_Clicked`);
    RNIap.requestPurchase(prod_id).catch((err) => {});
  };

  onSubscribeClicked(id) {
    RNIap.requestSubscription(id).then((res) => {
      // console.log(res);
    });
  }

  hasProductBeenBought = (prod_id) => {
    let {purchases} = this.state;
    let result = purchases.includes(prod_id);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  isUnlockAllPurchasedOrSubscribed = () => {
    let {purchases} = this.state;
    let result =
      purchases.includes('unlock_all_subscription') ||
      purchases.includes('unlock_all_iap');
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {products, subscriptions, showCategories} = this.state;
    const {isShowingPaidCategories} = this.props.store;

    return (
      <LinearGradient
        colors={[colors.primary, colors.primaryLighter, colors.accentColor]}
        style={styles.Play}>
        <View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.headerText}>Game Modes</Text>

            {showCategories &&
              free_categories.map((category) => {
                let categoryData = this.getCategoryData('category', category);
                return (
                  <CategoryRow
                    img={categoryData.image}
                    title={translate(categoryData.title)}
                    subTitle={translate(categoryData.subTitle)}
                    onPress={() => {
                      this.onPlayClicked(categoryData.category);
                    }}
                    buttonText={translate('play')}
                  />
                );
              })}
            {showCategories &&
              (() => {
                let categoryData = this.getCategoryData(
                  'product_id',
                  'unlock_all_iap',
                );
                if (!this.isUnlockAllPurchasedOrSubscribed()) {
                  return (
                    <View
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 11,
                        backgroundColor: 'white',
                        padding: 5,
                        borderRadius: 14,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 20,
                          fontWeight: '700',
                          padding: 5,
                          flexDirection: 'row',
                        }}>
                        {translate(categoryData.title)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                        }}>
                        {translate(categoryData.subTitle)}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          textAlign: 'center',
                          marginLeft: 'auto',
                          flexDirection: 'row',
                          padding: 10,
                        }}>
                        <ActionButton
                          textStyle={{
                            fontSize: 15,
                            margin: 0,
                          }}
                          style={{
                            backgroundColor: colors.green,
                            paddingLeft: 15,
                            paddingBottom: 10,
                            paddingRight: 15,
                            paddingTop: 10,

                            fontSize: 5,
                            alignSelf: 'flex-start',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            alignItem: 'center',
                            justifyContent: 'center',
                          }}
                          title={translate('unlockAll')}
                          onPress={() => {
                            // this.onSubscribeClicked(item.productId);
                            this.onBuyClicked(categoryData.product_id);
                          }}
                        />
                      </View>
                    </View>
                  );
                }
              })()}

            {showCategories &&
              isShowingPaidCategories &&
              products.map((item) => {
                if (item.productId !== 'unlock_all_iap') {
                  let categoryData = this.getCategoryData(
                    'product_id',
                    item.productId,
                  );

                  if (
                    this.isUnlockAllPurchasedOrSubscribed() ||
                    this.hasProductBeenBought(item.productId)
                  ) {
                    return (
                      <CategoryRow
                        img={categoryData.image}
                        title={translate(categoryData.title)}
                        subTitle={translate(categoryData.subTitle)}
                        onPress={() =>
                          this.onPlayClicked(categoryData.category)
                        }
                        buttonText={translate('play')}
                      />
                    );
                  } else {
                    return (
                      <CategoryRow
                        img={categoryData.image}
                        title={translate(categoryData.title)}
                        subTitle={translate(categoryData.subTitle)}
                        onPress={() => this.onBuyClicked(item.productId)}
                        buttonText={translate('buy')}
                      />
                    );
                  }
                }
              })}
          </ScrollView>
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
    changeCategory: (category) => dispatch({type: 'update', payload: category}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
