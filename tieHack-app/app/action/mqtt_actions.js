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

const client = new Client({ uri: 'ws://10.0.10.97:3000/ws', clientId: clientId.toString(), storage: myStorage });

export const mqtt = () => {
  return async function (dispatch) {
    await client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
      }
    });
    await client.on('messageReceived', (message) => {
      if (message.destinationName === 'balance') {
        dispatch({
          type: message.destinationName ,
          payload: Number(message.payloadString)
        });
      }
      if (message.destinationName === 'credits') {
        dispatch({
          type: message.destinationName,
          payload: Number(message.payloadString)
        });
        alert("Congrats ! You have won " + Number(message.payloadString) + " credits.")
      }
      if (message.destinationName === 'info') {
        dispatch({
          type: message.destinationName,
          payload: message.payloadString
        });
      }
      if (message.destinationName === 'last_transactions') {
        dispatch({
          type: message.destinationName ,
          payload: JSON.parse(message.payloadString)
        });
      }
    });

    await client.connect()
      .then(() => {
        client.subscribe('balance');
        client.subscribe('transactions')
        client.subscribe('credits')
        client.subscribe('info')
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          alert('onConnectionLost:' + responseObject.errorMessage);
        }
      });
  };
};

export {client,Message}

//catch a ride


