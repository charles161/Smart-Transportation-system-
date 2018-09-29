window.navigator.userAgent = 'ReactNative';
import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity,TextInput, Text } from 'react-native';
import { Container, Header, Content,  Icon} from 'native-base';
import {RedButton,RowSections} from '../components'
import MapView, {Marker} from 'react-native-maps';
import { Client, Message } from 'react-native-paho-mqtt';
const { width, height } = Dimensions.get('window');

let LATITUDEDELTA = 0.0922;
let LONGITUDEDELTA = LATITUDEDELTA * (width / height);
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

export default class Track extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 11.077544,
        longitude: 76.988968,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA,
      },
      nearbyPeople:[],
      messages: [],
      userId: null,
      newmessage:'',
      rideStarted:false,
      zoomed: false,
      topView: [
        {
          name:'Ride Time',
          value:'0:0:0'
        },
        {
          name: 'Stop Time',
          value: '0:0:0'
        },
        {
          name: 'Distance',
          value: '0:0:0'
        }
      ],
      bottomView: [
        {
          name: 'Average Speed',
          value: '0:0:0'
        },
        {
          name: 'Top Speed',
          value: '0:0:0'
        },
        {
          name: 'Elevation',
          value: '0:0:0'
        }
      ]
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  determineUser() {
    this.socket.emit('userJoined', null);
    this.socket.on('userJoined', (userId) => {
      this.setState({ userId });
    });
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }
  
  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    //this._storeMessages(messages);
  }

  _storeMessages(messages) {
    let prevNearby = this.state.nearbyPeople;
    let reg = messages[0].text.split(';');
    let latitude = Number(reg[0]), longitude = Number(reg[1]);
    
    prevNearby.push({latitude,longitude});
    this.setState({nearbyPeople:prevNearby});
  }

  onConnect() {
    alert("connected")
  }

// called when the client loses its connection
onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  
}

  componentDidMount() {
    // const client = new Client({ uri: 'ws://10.1.75.71:3000/ws', clientId: '', storage: myStorage });
    // client.on('connectionLost', (responseObject) => {
    //   if (responseObject.errorCode !== 0) {
    //     alert(responseObject.errorMessage);
    //   }
    // });
    // client.on('messageReceived', (message) => {
    //   alert(message.payloadString);
    // });
    // // connect the client
    // client.connect()
    //   .then(() => {
    //     alert('onConnect');
    //   })
    //   .then(() => {
    //     const message = new Message('Hello');
    //     message.destinationName = 'World';
    //     client.send(message);
    //   })
    //   .catch((responseObject) => {
    //     if (responseObject.errorCode !== 0) {
    //      alert('onConnectionLost:' + responseObject.errorMessage);
    //     }
    //   });

    navigator.geolocation.getCurrentPosition(
      position => {
        let latitude, longitude;
        latitude = parseFloat(position.coords.latitude);
        longitude = parseFloat(position.coords.longitude);
        let region = {
          latitude, longitude, latitudeDelta: LATITUDEDELTA, longitudeDelta: LONGITUDEDELTA
        }
        // alert("location found")
        this.setState({ initialRegion: region });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 2000000, maximumAge: 10000000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      let latitude, longitude;
      latitude = parseFloat(position.coords.latitude);
      longitude = parseFloat(position.coords.longitude);
      let region = {
        latitude, longitude, latitudeDelta: LATITUDEDELTA, longitudeDelta: LONGITUDEDELTA
      }
      this.setState({ initialRegion: region });
      let message = { chatId: 1, text: JSON.stringify(region), user: { _id: 'charles' }, createdAt: new Date() }
      //this.socket.emit('message', message);
    })
  }

  secondScreen = () => {
    this.props.navigator.push({
      screen: 'Connect', // unique ID registered with Navigation.registerScreen
      title: 'cool', // navigation bar title of the pushed screen (optional)
    });
  }

  onNavigatorEvent(event){
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'add') {
        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
          to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
      }
    }
  
    if (event.type == 'DeepLink') {
      if (event.link == 'cool') {
        this.props.navigator.showModal({
          screen: "Connect", // unique ID registered with Navigation.registerScreen
          title: "Modal", // title of the screen as appears in the nav bar (optional)
          passProps: {}, // simple serializable object that will pass as props to the modal (optional)
          navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
          animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
      }
    }
  }

  render() {
  
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center'}} >
       <View>
          <MapView
            style={{ width, height: this.state.zoomed ? 400 : 220}}
            region={this.state.initialRegion}>
            <Marker
              coordinate={this.state.initialRegion}
              pinColor='#0000FF'
            />
            {
              this.state.nearbyPeople.length ? this.state.nearbyPeople.map(val => {
                const { latitude, longitude } = val;
                return <Marker key={latitude} coordinate={{ latitude, longitude, latitudeDelta: LATITUDEDELTA, longitudeDelta: LONGITUDEDELTA }} title='coollllllllll' />
              }) : null
            }
          </MapView>
          <View>
          </View>
       </View>
      </View>
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

}