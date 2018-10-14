window.navigator.userAgent = 'ReactNative';
import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity,TextInput } from 'react-native';
import { Container, Header, Content,  Icon,Button,Text} from 'native-base';
import {RedButton,RowSections} from '../components'
import MapView, {Marker} from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { client,Message } from '../action'

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

 class Track extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 11.077544,
        longitude: 76.988968,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA,
      },
      destinationRegion: {
        latitude: 11.077544,
        longitude: 76.988968,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA,
      },
      nearbyTransport:[],
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
    let prevNearby = this.state.nearbyTransport;
    let reg = messages[0].text.split(';');
    let latitude = Number(reg[0]), longitude = Number(reg[1]);
    
    prevNearby.push({latitude,longitude});
    this.setState({nearbyTransport:prevNearby});
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

   onMessageSend = () => {
     const message = new Message(JSON.stringify([this.state.initialRegion,this.state.destinationRegion]));
     message.destinationName = 'maps';
     client.send(message);
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
      <View style={{ flex: 1, alignItems: 'center'}} >
      
          <MapView
            style={{ width, height: 400}}
            region={this.state.destinationRegion}>
            <Marker
            title="current location"
              coordinate={this.state.initialRegion}
              key={1}
            />
          <Marker draggable = {true}
          
          title="destination"
          key={2}
            coordinate={this.state.destinationRegion}
            onDrag={(e) => this.setState({ destinationRegion: e.nativeEvent.coordinate })}
            onDragStart={(e) => this.setState({ destinationRegion: e.nativeEvent.coordinate })}
            onDragEnd={(e) => this.setState({ destinationRegion: e.nativeEvent.coordinate })}
            pinColor='#0000FF'
          />
            {
              this.state.nearbyTransport.length ? this.state.nearbyTransport.map(val => {
                const { latitude, longitude } = val;
                return <Marker key={latitude} coordinate={{ latitude, longitude, latitudeDelta: LATITUDEDELTA, longitudeDelta: LONGITUDEDELTA }} title='coollllllllll' />
              }) : null
            }
          </MapView>
        
          <View>
            <Button onPress={() => this.onMessageSend()}>
              <Text>Check Out for Ride...</Text>
            </Button>
            <Text style={{padding:20,fontWeight:"bold",color:'black'}}>{this.props.info}</Text>
          </View>
      </View>
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
}

const mapStateToProps = ({ getCredits,getInfo }) => {
  const credits = getCredits.response;
  const info = getInfo.response;
  return {
    credits, info
  };
};


export default connect(mapStateToProps, null)(Track);