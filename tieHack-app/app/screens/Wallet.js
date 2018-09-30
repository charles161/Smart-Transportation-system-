import React, { Component } from 'react'
import { View, TextInput,ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail} from 'native-base'
import { styles } from '../styles';
import {CardSection} from '../components/common'
const uri = require('../img/avatar.png');
import { connect } from 'react-redux';
import {mqtt } from '../action'

class Connect extends Component {
  componentWillMount = () => {
    this.props.mqtt();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
 
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
          to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
      }
    }
  }

 

  render() {
    return (
        <View style={{flex:1}}>
          <View style={[styles.card,{padding:10}]}>
          <CardSection>
                <Thumbnail small source={require('../img/avatar.png')} style={{padding:10}} /><Text style={{padding:10}}>Charles M</Text>
          </CardSection>
          <CardSection>
                <Text>Balance: Rs.<Text style={{fontSize:30}}>{this.props.balance}</Text></Text>
          </CardSection>
          </View>
          <Text style={{padding:20,paddingTop:30}}>Last Transactions:</Text>
          <ScrollView>
          {this.props.lastTx != undefined && this.props.lastTx.length? this.props.lastTx.map((val,i) => (
            <View style={[styles.card, { padding: 10 }]} key={i}>
                <CardSection>
                  <Text>Mode: <Text style={{ fontWeight: "bold" }}>{val.name}</Text></Text> 
                </CardSection>
                <CardSection>
                  <Text>Rs.<Text style={{fontWeight:"bold"}}>{val.spent}</Text></Text> 
                </CardSection>
                <CardSection>
                  <Text>Category: <Text style={{ fontWeight: "bold" }}>{val.category}</Text></Text> 
                </CardSection>
              </View>
            )) : null}
          </ScrollView>
        </View>
    )
  }
}


const mapStateToProps = ({ getBalance, getLastTx }) => {
  const balance = getBalance.response;
  const lastTx = getLastTx.response;
  return {
    balance, lastTx
  };
};


export default connect(mapStateToProps, {mqtt})(Connect);