var express = require('express');
var nodemailer = require('nodemailer');
var $ = require('jquery');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var users = {
	"admin" : "admin",
	"shopper" : "shopper",
};
var challenges;

var header = fs.readFileSync(__dirname + '/html/header.html', 'utf-8');
var footer = fs.readFileSync(__dirname + '/html/footer.html', 'utf-8');
var body = fs.readFileSync(__dirname + '/html/accueil.html', 'utf-8')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', function(req, res, next){
	var page = header + body + footer;
	res.sendFile(__dirname + '/html/index.html'); 	// option en one static page
	// res.send(page);								// option en dynamic page (WIP)
});

app.post('/login', function(req, res, next){
	console.log('logged');
	res.send(users);
});

app.get('/api/scrap', function(req, res, next){
	var url = req.query.url;
	var json = {title: "", description: "", price: "", image: ""};
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var title;
			var description;
			var price;
			var image;
			$('#productTitle').filter(function(){
				var data = $(this);
				json.title = data.html();
			});
			$('#priceblock_ourprice').filter(function(){
				var data = $(this);
				json.price = data.html();
			});
			$('#feature-bullets').filter(function(){
				var data = $(this);
				json.description = data.html();
			});
			$('#landingImage').filter(function(){
				var data = $(this);
				json.image = data.attr('src');
			});
		}
	res.send(json);
	});
});

app.listen(3000, function()  {
	console.log('CrossShopper, http://127.0.0.1:3000');
});