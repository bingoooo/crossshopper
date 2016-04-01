'use strict';

function getChallenges(){
	fetch('http://crossshopper.com/api/Challenge')
		.then(
			function(response){
				response.json().then(function(data){
					console.log(data);
				});
			}
		);
};

function getChallenge(id){
	fetch('http://crossshopper.com/api/Challenge/' + id)
		.then(
			function(response){
				response.json().then(function(data){
					console.log(data);
				});
			}
		);
};

function postChallenge(title, description, price, image){
	$.ajax({
		url: 'http://crossshopper.com/api/Challenge',
		type: 'post',
		dataType: 'json',
		data : {
  			"Title": title,
  			"Description": description,
  			"StartDate": "2016-04-01T08:45:10.783Z",
  			"ExpiryDate": "2016-04-01T08:45:10.783Z",
  			"Price": price,
  			"ImageData": image,
		},
	}).done(function(data){
		console.log('Success :', data);
	});
};

function getOffers(id){
	fetch('http://crossshopper.com/GetOffersFromChallenge?ChallengeId=' + id)
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
		url: 'http://crossshopper.com/api/Offer/' + id,
		type: 'post',
		dataType: 'json',
	}).done(function(data){
		console.log('Success :', data);
	});
};

function postOffer(title, description, price, image){
	$.ajax({
		url: 'http://crossshopper.com/api/Offer',
		type: 'post',
		dataType: 'json',
		data : {
  			"Title": title,
  			"Description": description,
  			"StartDate": "2016-04-01T08:45:10.783Z",
  			"ExpiryDate": "2016-04-01T08:45:10.783Z",
  			"Price": price,
  			"ImageData": image,
		},
	}).done(function(data){
		console.log('Success :', data);
	});
};

function acceptOffer(id){
	$.ajax({
		url: 'http://crossshopper.com/AcceptOffer?offerId=' + id,
		type: 'post',
		dataType: 'json',
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
	$('#execute').click(function(){
		var url = $('#path').val();
		console.log(url);
		scrap(url);
	});
	// scrap(url);
});