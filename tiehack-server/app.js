var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://10.0.10.97');
let maps = []
let lasttx = []
let count = 0;
let balance = 100
let carbon = 0
client.on('connect', function () {
client.subscribe('user')
client.subscribe('travel')
client.subscribe('maps')
  
let started =false;
console.log("subscribed to user and travel");
 });

let time=0;
setInterval(() => {
count++;
  client.publish('balance', JSON.stringify(balance))
  client.publish('carbon', JSON.stringify(carbon))
 },1000)
client.on('message', function (topic, message) {
  console.log(topic, message.toString())
  if(topic === 'user'){
    let user = message.toString();
    if(user == 11){
      client.publish('pi', "on")
      client.publish('info', "Ride started ...");
      count=0;
    }
  }
  if(topic == 'travel'){
    let user = message.toString();
    if (user == 11) {
      let c =count;
      client.publish('pi', "on");
      client.publish('info', "Ride ended ...");
      if(count>60) {
        client.publish("credits",JSON.stringify(count-60))
        balance-=count-60
        count=0
      }
      else{
        balance-=count
        count=0
      }
      client.publish('balance',JSON.stringify(balance))
      lasttx.push({name:"Bus",spent:balance,category:"Transport"})
      client.publish('last_transactions',JSON.stringify(lasttx));
    }
  }
  if(topic == 'maps'){
    maps = JSON.parse(message.toString())

    client.publish('info', "We recommend you to take a bus ");
    setTimeout(() => {
      client.publish('info', "Scan your personal RFID tag in any nearby Bus to commute");
    },3000)
    
  }
});
