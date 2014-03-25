/*
* this script updates the pinwheels when a user selects one of the options from the dropdown list
*/

$(document).ready(function(){
	$( ".pinwheelChangeMap" ).change( function() {
		var orderPinwheels = $(this).val();
		var year = $( "#mapSlider" ).slider( 'getValue' );
		updatePinwheelsByYearMap(year, orderPinwheels);
	});	
	$( ".pinwheelChangeArray" ).change( function() {
		var orderPinwheels = $(this).val();
		var year = $( "#pinwheelSlider" ).slider( 'getValue' );
		updatePinwheelsByYearArray(year, orderPinwheels);
	});	
});