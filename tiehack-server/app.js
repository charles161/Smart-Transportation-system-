var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.40.36');
client.on('connect', function () {
client.subscribe('sense')
console.log("subscribed to sense");
let count=0;
setInterval(function() {
  count++;
client.publish('balance', JSON.stringify(count));
}, 2000);
});
client.on('message', function (topic, message) {
context = message.toString();
console.log(topic+" "+context)
});
