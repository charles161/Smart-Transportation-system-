import React, { Component } from 'react'
import { View, TextInput,ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail} from 'native-base'
import { styles } from '../styles';
import {CardSection} from '../components/common'
const uri = require('../img/avatar.png');


import { Client, Message } from 'react-native-paho-mqtt';
let clientId = Math.floor(Math.random() * 9000) + 1000;
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

const client = new Client({ uri: 'ws://10.0.10.97:3000/ws', clientId: '', storage: myStorage });

export default class Connect extends Component {
  componentWillMount = () => {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state={
    balance:0.0,
    lastTransactions: [
      {
        name: 'Bus',
        category:'Transport',
        spent: 15
      },
      {
        name: 'Bus',
        category: 'Transport',
        spent: 200
      },
      {
        name: 'Bus',
        category: 'Transport',
        spent: 40
      },
      {
        name: 'Bus',
        category: 'Transport',
        spent: 200
      },
      {
        name: 'Bus',
        category: 'Transport',
        spent: 40
      }
    ]
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

  componentDidMount() {
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
      }
    });
    client.on('messageReceived', (message) => {
      if(message.destinationName === 'balance'){
        this.setState({ balance: Number(message.payloadString)})
      }
    });

    client.connect()
      .then(() => {
        client.subscribe('balance');
        client.subscribe('transactions')
        alert('onConnect');
      })
      .then(() => {
        setInterval(() => {
          
          const message = new Message("cool");
          message.destinationName = 'pi';
          client.send(message);
        }, 1000);
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          alert('onConnectionLost:' + responseObject.errorMessage);
        }
      });
  }


  render() {
    return (
        <View style={{flex:1}}>
          <View style={[styles.card,{padding:10}]}>
          <CardSection>
                <Thumbnail small source={require('../img/avatar.png')} style={{padding:10}} /><Text style={{padding:10}}>Charles M</Text>
          </CardSection>
          <CardSection>
                <Text>Balance: Rs.<Text style={{fontSize:30}}>{this.state.balance}</Text></Text>
          </CardSection>
          </View>
          <Text style={{padding:20,paddingTop:30}}>Last Transactions:</Text>
          <ScrollView>
            {this.state.lastTransactions.map((val,i) => (
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
            ))}
          </ScrollView>
        </View>
     
    )
  }
}