'use strict';

function getChallenges(){
	fetch('http://crossshopper.com/api/Challenge')
	// fetch('/api/Challenge')
		.then(
			function(response){
				response.json().then(function(data){
					console.log(data);
				});
			}
		);
};

function getChallenge(id){
	// fetch('http://crossshopper.com/api/Challenge/' + id)
	fetch('/api/Challenge?id=' + id)
		.then(
			function(response){
				response.json().then(function(data){
					console.log(data);
				});
			}
		);
};

function postChallenge(id, title, description, price, image, type){
	$.ajax({
		// url: 'http://crossshopper.com/api/Challenge',
		url: '/api/Challenge',
		type: 'post',
		dataType: 'json',
		data : {
  			"Id": id,
			"Title": title,
			"Description": description,
			"StartDate": "2016-04-02T00:28:05.612Z",
			"ExpiryDate": "2016-04-02T00:28:05.612Z",
			"Price": price,
			"ImageData": image,
			"Type": type
		},
	}).done(function(data){
		console.log('Success :', data);
	});
};

function getOffers(id){
	// fetch('http://crossshopper.com/GetOffersFromChallenge?ChallengeId=' + id)
	fetch('/GetOffersFromChallenge?ChallengeId=' + id)
		.then(
			function(response){
				response.json().then(function(data){
					console.log(data);
				});
			}
		);
};

function getOffer(id){
	$.ajax({
		// url: 'http://crossshopper.com/api/Offer/' + id,
		url: '/api/Offer/' + id,
		type: 'post',
		dataType: 'json',
	}).done(function(data){
		console.log('Success :', data);
	});
};

function postOffer(id, title, description, ID, ChallengeID, amount, expiref, price, image, type, UserID){
	var start = new Date(Date.now());
	var end = new Date(Date.now()+(1000*60*60*24*2));
	start = start.toDateString();
	$.ajax({
		// url: 'http://crossshopper.com/api/Offer',
		url: '/api/Offer',
		type: 'post',
		dataType: 'json',
		data : {
			"Id": id,
    		"Title": title,
    		"Description": description,
    		"StartDate": "2016-04-02T00:28:05.763Z",
		    "EndDate": "2016-04-02T00:28:05.763Z",
		    "ID": ID,
		    "ChallengeID": challenge_id,
		    "Amount": amount,
		    "Expired": expired,
		    "UserID": useridr2
		},
	}).done(function(data){
		console.log('Success :', data);
	});
};

function acceptOffer(id){
	$.ajax({
		// url: 'http://crossshopper.com/AcceptOffer?offerId=' + id,
		url: '/AcceptOffer?offerId=' + id,
		type: 'post',
		dataType: 'json',
	}).done(function(data){
		console.log('Success :', data);
	});	
}

function postLogin(){
	var login = $('#login').val();
	var pwd = $('#pwd').val();
	$.ajax({
		url: '/login',
		type: 'post',
		dataType: 'json',
		data : {
			"login" : login,
			"pwd" : pwd,
		},
	}).done(function(data){
		console.log('Success :', data);
	});
}

// var url = 'http://www.amazon.fr/Umbro-Velocita-Chaussures-Football-Comp%C3%A9tition/dp/B00XRWGMDM?ie=UTF8&redirect=true&ref_=br_asw_pdt-1';
function scrap(url){
	var self = this;
	var product = {};
	$.ajax({
		url: '/api/scrap',
		type: 'get',
		dataType: 'json',
		data: {
			url: url,
		},
	}).done(function(data){
		console.log(data);
		$('#title').val(data.title);
		$('#description').val(data.description);
		$('#price').val(data.price);
		$('#image').val(data.image);
		var tpl = $('#offer-tpl').html();
		var html = Mustache.render(tpl, data);
		$('#offers').html(html);
	}).fail(function(xhr, status, errorThrown){
		console.log('Erreur :', xhr, status, errorThrown);
	});
};

$(document).ready(function(){
	// console.log(start);
	$('#execute').click(function(){
		var url = $('#path').val();
		console.log(url);
		scrap(url);
	});
	$('#beLog').click(function(event){
		event.preventDefault();
		postLogin();
	});
	$('a').click(function(event){
		event.preventDefault();
	});
	$('#getChallenges').click(function(event){
		// event.preventDefault();
		console.log('Challenge');
		$.ajax({
			url: "http://crossshopper.com/api/Challenge",
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			var challenges = {"challenges": data};
			console.log(challenges);
			var tpl = $('#challenges-tpl').html();
			var html = Mustache.render(tpl, challenges);
			console.log(html);
			$('#template').html(html);
		});
	});
});