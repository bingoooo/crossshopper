'use strict';


/* ---------------------
// Challenges requests
--------------------- */
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


/* ---------------------
// Offers requests part
--------------------- */
function getOffers(id){
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
		url: '/api/Offer/' + id,
		type: 'post',
		dataType: 'json',
	}).done(function(data){
		console.log('Success :', data);
	});
};
function postOffer(id, title, description, ID, ChallengeID, amount, expired, price, image, type, UserID){
	var start = new Date(Date.now());
	var end = new Date(Date.now()+(1000*60*60*24*2));
	start = start.toDateString();
	$.ajax({
		url: '/api/Offer',
		type: 'post',
		dataType: 'json',
		data : {
			"Id": id,
    		"Title": title,
    		"Description": description,
    		"StartDate": start,
		    "EndDate": end,
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
		url: '/AcceptOffer?offerId=' + id,
		type: 'post',
		dataType: 'json',
	}).done(function(data){
		console.log('Success :', data);
	});	
}



/* -------------------
// Login/logout Part
------------------- */
function postLogin(){
	var login = $('#user').val();
	var pwd = $('#pwd').val();
	console.log('login :', login);
	console.log('password : ', pwd);
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
function postLogout(){

}


/* --------------------------
// Envoi de l'url à scrapper
--------------------------- */
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
	}).fail(function(xhr, status, errorThrown){
		console.log('Erreur :', xhr, status, errorThrown);
	});
};


/* ----------------------
// Démarrage Application
----------------------- */
$(document).ready(function(){

	// Scrapper link
	$('#execute').click(function(){
		var url = $('#exampleInputEmail1').val();
		console.log(url);
		scrap(url);
	});

	// Login link
	$('#beLog').click(function(event){
		event.preventDefault();
		postLogin();
	});
	
	// get Challenges for display
	$('#getChallenges').click(function(event){
		event.preventDefault();
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