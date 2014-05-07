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
	$( "#selectIndicator" ).change( function() {
		var indicator = $(this).val();
		var order = $( "#selectOrder" ).val();
		var city = $( "#selectCity" ).val();
		var year = $( "#barChartSlider" ).slider( 'getValue' );
		updateBarChartData(year, indicator, order, city);
	});	
	$( "#selectOrder" ).change( function() {
		var order = $(this).val();
		var indicator = $( "#selectIndicator" ).val();
		var city = $( "#selectCity" ).val();
		var year = $( "#barChartSlider" ).slider( 'getValue' );
		updateBarChartData(year, indicator, order, city);
	});	
	$( "#selectCity" ).change( function() {
		var city = $(this).val();
		var order = $( "#selectOrder" ).val();
		var indicator = $( "#selectIndicator" ).val();
		var year = $( "#barChartSlider" ).slider( 'getValue' );
		updateBarChartData(year, indicator, order, city);
	});
	
	/*
	$( ".cityHeatChartDropdown" ).change( function() {
		var city = $(this).val();
		var year = $( "#cityHeatChartSlider" ).slider( 'getValue' );
		updateCityCircularHeatChartData(year, city);
	});
	*/
		
	$( "#selectIndicatorDonut" ).change( function() {
		var indicator = $(this).val();
		var city = $( "#selectCityDonut" ).val();
		var year = $( "#cityDonutChartSlider" ).slider( 'getValue' );
		updateCityDonutChartData(year, city, indicator);
	});	
	$( "#selectCityDonut" ).change( function() {
		var city = $(this).val();
		var indicator = $( "#selectIndicatorDonut" ).val();
		var year = $( "#cityDonutChartSlider" ).slider( 'getValue' );
		updateCityDonutChartData(year, city, indicator);
	});
	$( ".nationalCircularHeatChartDropdown" ).change( function() {
		var city = $(this).val();
		var year = $( "#nationalHeatChartSlider" ).slider( 'getValue' );
		updateCircularHeatChart(year, city);
	});	
});