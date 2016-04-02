$(document).ready(function(){
	
	
	$('.mh-submit').click(function(event){
		event.preventDefault();
		$('.mh-inscription').toggle();
		$('.mh-ajout-article').toggle();
	})

	$('.mh-publie').click(function(event){
		event.preventDefault();
		$('.mh-ajout-article').toggle();
		$('.mh-article').toggle();
		
	})

	$('.mh-publie').click(function(event){
		var title = $('#title').val();
		var description = $('#description').val();
		var price = $('#price').val();
		var image = $('#image').val();
		$('#mh-premier-article').append('<div class="container mh-article"><div class="row"><img src="' + image + '" alt="image perceuse" class="col-md-3"><div class="col-md-5"><h3>' + title + '</h3><h4>' + price + '</h4></div><div><img src="http://www.location-orcieres.fr/img/icone_favoris.png" alt="Favori" class="col-md-offset-2 col-md-2"></div></div><div class="row"><button class="col-md-offset-10 col-md-2 btn btn-success">je peux faire mieux</button></div></div>');
	})	
	
	

});