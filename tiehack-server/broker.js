var mosca = require('mosca');
var settings = {
		port:1883
		}

var server = new mosca.Server({
	http: {
		port:3000,
		bundle:true,
		static:'./'
	}
});

server.on('ready', function(){
console.log("ready");
});
