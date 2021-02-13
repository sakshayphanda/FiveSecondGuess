import React, {Component} from 'react';
import Swipe from '../../assets/images/swipe.png';
import {Image, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {styles} from './style';

class Card extends Component {
    constructor(props) {
      super(props);
    }
   
    render() {
      return (
        <View style={[styles.Card]}>
      
          <View style={styles.CardSentence}>
              <ScrollView >
                  <Text
                    style={{
                      color: '#00000095',
                      fontSize: 22,
                      textAlign: 'center',
                    }}>
                    {this.props.sentence}
                  </Text>
                  </ScrollView>


          </View>
  
        
      </View> )
    }
  }

  const mapStateToProps = (store) => {
    return {
      store: store,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);
  