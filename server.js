var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
});

app.listen(3000, () => {
	console.log('CrossShopper, http://127.0.0.1:3000');
});