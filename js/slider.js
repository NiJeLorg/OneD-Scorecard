/*
* Creates the sliders that play change in data by year
* Using bootstrap-slider.js (https://github.com/seiyria/bootstrap-slider)
*/


// pause until document is ready to set up slider
$( document ).ready(function() {

	// set up initial min and max years 
	var minYear = d3.min(dataset, function(d) { return d.year; });
	var maxYear = d3.max(dataset, function(d) { return d.year; });
	
    $( "#mapSlider" ).slider({
		value: maxYear,
		min: minYear,
		max: maxYear,
		step: 1
	});

});
