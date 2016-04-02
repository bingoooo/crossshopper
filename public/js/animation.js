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
});