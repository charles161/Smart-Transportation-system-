var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://10.0.10.97');
client.on('connect', function () {
client.subscribe('user')
client.subscribe('travel')
client.subscribe('maps')
let maps = []
let started =false;
console.log("subscribed to user and travel");
 });
 let count=0;
 setInterval(() => {
count++;
client.publish("balance",JSON.stringify(count))
 },2000)
client.on('message', function (topic, message) {
  console.log(topic, message.toString())
  if(topic === 'user'){
    let user = message.toString();
    if(user == 11 || user == 12){
      client.publish('pi', "on");
      if(maps.length){
        
      }
    }

  }
  if(topic == 'travel'){
    let user = message.toString();
    if (user == 11 || user == 12) {
      client.publish('pi', "on");
    }
  }
  if(topic == 'maps'){
    maps = JSON.parse(message.toString())
    client.publish('info', "Scan your personal RFID tag in any nearby Bus");
  }
});
