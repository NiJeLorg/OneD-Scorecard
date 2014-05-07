/*
* this script updates the pinwheels when a user selects one of the options from the dropdown list
*/

$(document).ready(function(){
	$( "#selectEducation" ).change( function() {
		var education = $(this).val();
		var economy = $( "#selectEconomy" ).val();
		var neighborhood = $( "#selectNeighborhood" ).val();
		updateMap(education, economy, neighborhood);
	});	
	$( "#selectEconomy" ).change( function() {
		var economy = $(this).val();
		var education = $( "#selectEducation" ).val();
		var neighborhood = $( "#selectNeighborhood" ).val();
		updateMap(education, economy, neighborhood);
	});	
	$( "#selectNeighborhood" ).change( function() {
		var neighborhood = $(this).val();
		var economy = $( "#selectEconomy" ).val();
		var education = $( "#selectEducation" ).val();
		updateMap(education, economy, neighborhood);
	});
});