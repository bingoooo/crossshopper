// Bibliothèque utilisée

var express = require('express');
var nodemailer = require('nodemailer');
var $ = require('jquery');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app = express();


// table utilisateur par défaut
var passwords = {
	"admin" : "admin",
	"shopper" : "shopper",
};

var users = [
	{
		"CountryID": 0,
		"Id": 0,
		"PseudoName": "admin",
		"FirstName": "Benjamin",
		"LastName": "Dant",
		"RegistrationDate": "2016-04-03T17:50:19.698Z",
		"Active": true,
		"ProfileImage": "none",
		"Email": "sukkhato@gmail.com",
		"AddressID": 0,
		"PhoneNumber": "0674609348",
		"PhoneValidated": true,
		"EmailValidated": true,
		"Banned": false,
		"Street": "18 place de Bologne",
		"City": "Toulouse",
		"PostCode": "31000",
		"House": "Appt 7206 Bât C"
	},
	{
		"CountryID": 0,
		"Id": 1,
		"PseudoName": "shopper",
		"FirstName": "Binh",
		"LastName": "Van Dang",
		"RegistrationDate": "2016-04-03T17:50:19.698Z",
		"Active": true,
		"ProfileImage": "none",
		"Email": "sukkhato@hotmail.com",
		"AddressID": 0,
		"PhoneNumber": "0674609348",
		"PhoneValidated": true,
		"EmailValidated": true,
		"Banned": false,
		"Street": "18 place de Bologne",
		"City": "Toulouse",
		"PostCode": "31000",
		"House": "Appt 7206 Bât C"
	}
];

var challenges;

// Authorisation Cross Access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Dossier utilisé pour les fichiers statiques situés à la racine du site
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());

// Chemin vers l'index
app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/html/index.html');
});

// Chemin vers la page de soumission de challenge
app.get('/demande', function(req, res, next){
	res.sendFile(__dirname + '/html/article.html');
});

// Work in Progress : chemin vers la page de proposition d'offres
app.get('/offre', function(req, res, next){
	res.send('lolo');
});

app.get('/challenges', function(req, res, next){
	res.send(challenges);
});

app.post('/challenge', function(req, res, next){
	console.log(req.body);
	var data = req.body;
	fs.appendFileSync('challenges.json', data);
});

app.post('/login', function(req, res, next){
	console.log('logged :', req.body);
	if((passwords[req.body.login] == req.body.pwd)){
		for (var i = 0; i < users.length; i++) {
			if (users[i].PseudoName == req.body.login) return users[i];
		}
	} else {
		res.json({message: "Pas d'utilisateur à ce nom..."});
	}
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