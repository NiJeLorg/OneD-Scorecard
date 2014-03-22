/*
* this script updates the pinwheels when a user selects one of the options from the dropdown list
*/

$(document).ready(function(){
	$( ".pinwheelChange" ).change( function() {
		var orderPinwheels = $(this).val();
		var year = $( "#pinwheelSlider" ).slider( 'getValue' );
		updatePinwheelsByYear(year, orderPinwheels);
	});	
});