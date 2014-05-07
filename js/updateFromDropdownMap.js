/*
* this script updates the pinwheels when a user selects one of the options from the dropdown list
*/

$(document).ready(function(){
	$( "#selectEducation" ).change( function() {
		var education = $(this).val();
		var economy = $( "#selectEconomy" ).val();
		var neighborhood = $( "#selectNeighborhood" ).val();
		var selected = "ED";
		updateMap(education, economy, neighborhood, selected);
	});	
	$( "#selectEconomy" ).change( function() {
		var economy = $(this).val();
		var education = $( "#selectEducation" ).val();
		var neighborhood = $( "#selectNeighborhood" ).val();
		var selected = "EE";
		updateMap(education, economy, neighborhood, selected);
	});	
	$( "#selectNeighborhood" ).change( function() {
		var neighborhood = $(this).val();
		var economy = $( "#selectEconomy" ).val();
		var education = $( "#selectEducation" ).val();
		var selected = "N";
		updateMap(education, economy, neighborhood, selected);
	});
});