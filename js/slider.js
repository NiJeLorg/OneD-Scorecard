/*
* Creates the sliders that play change in data by year
* Using bootstrap-slider.js (https://github.com/seiyria/bootstrap-slider)
*/


// pause until document is ready to set up slider
$( document ).ready(function() {
	// set up initial min and max years and ensure they are integers
	var minYear = parseInt(d3.min(dataset, function(d) { return d.year; }));
	var maxYear = parseInt(d3.max(dataset, function(d) { return d.year; }));
	
    $( "#mapSlider" ).slider({
		value: maxYear,
		min: minYear,
		max: maxYear,
		step: 1
	});
		
	// build event listener on slider
	$( "#mapSlider" ).on( "slidechange", function( event, ui ) {
		updatePinwheelsByYear(ui.value);
	} );

    $( "#pinwheelSlider" ).slider({
		value: maxYear,
		min: minYear,
		max: maxYear,
		step: 1
	});
		
	// build event listener on slider
	$( "#pinwheelSlider" ).on( "slidechange", function( event, ui ) {
		updatePinwheelsByYear(ui.value);
	} );
		
});


// function to start and stop animation
function playStopAnimation(state) {
	// set up initial min and max years and ensure they are integers
	var minYear = parseInt(d3.min(dataset, function(d) { return d.year; }));
	var maxYear = parseInt(d3.max(dataset, function(d) { return d.year; }));
	var yearCount = minYear;
	play(yearCount, maxYear, state);
}

function play(yearCount, maxYear, state) {  
	if (state == 'play') {
		console.log(yearCount);
 	   this.timeoutID = setTimeout(function () {   
 	      $( "#mapSlider" ).slider( "value", yearCount );
 	      $( "#pinwheelSlider" ).slider( "value", yearCount );
		  yearCount++;
 	      if (yearCount<=maxYear) {
 	      	 play(yearCount, maxYear, state);
 	      }      
 	   }, 1000);			
	} else {
		console.log('stop');
		window.clearTimeout(this.timeoutID);
	}        
};   

