/*
* Creates the sliders that play change in data by year
* Using bootstrap-slider.js (https://github.com/seiyria/bootstrap-slider)
*/

function generateSlider(dataset) {
	// set up initial min and max years and ensure they are integers
	var minYear = parseInt(d3.min(dataset, function(d) { return d.year; }));
	var maxYear = parseInt(d3.max(dataset, function(d) { return d.year; }));

    $( "#mapSlider" ).slider({
		value: maxYear,
		min: minYear,
		max: maxYear,
		step: 1
	});
	
    $( "#pinwheelSlider" ).slider({
		value: maxYear,
		min: minYear,
		max: maxYear,
		step: 1
	});
	
	// build event listeners on slider
	$( "#mapSlider" ).on( 'slideStop', function( event ) {
		updatePinwheelsByYear(event.value, orderPinwheels);
	} );	

	// build event listener on slider
	$( "#pinwheelSlider" ).on( 'slideStop', function( event ) {
		updatePinwheelsByYear(event.value, orderPinwheels);
	} );
	
			
};

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
 	   this.timeoutID = setTimeout(function () {   		   
 	      $( "#mapSlider" ).slider( 'setValue', yearCount );		  
 	      $( "#pinwheelSlider" ).slider( 'setValue', yearCount );
		  updatePinwheelsByYear(yearCount, orderPinwheels);
		  yearCount++;
 	      if (yearCount<=maxYear) {
 	      	 play(yearCount, maxYear, state);
 	      }      
 	   }, 1000);			
	} else {
		window.clearTimeout(this.timeoutID);
	}        
};   

