/*
* sandbox for building the OneD Scorecard pinwheel
* creates a pinwheel in the "pinwheel" div
* based on Nelson Minar's Wind Rose code @ https://gist.github.com/NelsonMinar/3589712
*

/*
* Create pinwheel function 
* size: sets the width and height of each pinwheel created
* rowOfData: the row of data being passed to the function (each row represents the OneD indicies for each city for one year)
* svgContainer: the SVG container we cant to pass the pinwheel back to
*/
function createPinwheel(size, rowOfData, svgContainer, centerX, centerY) {
	
	/**** Common pinwheel code ****/
	// Function to draw a single arc for the pinwheel
	// Input: Drawing options object containing
	// width: degrees of width to draw (ie 5 or 15)
	// from: integer, inner radius
	// to: function returning the outer radius
	// Output: a function that when called, generates SVG paths.
	// It expects to be called via D3 with data objects from totalsToFrequences()
	var arc = function(o) {
		//console.log(o);
		return d3.svg.arc()
			.startAngle(function(d) { return (d.angle - o.width) * Math.PI/180; })
			.endAngle(function(d) { return (d.angle + o.width) * Math.PI/180; })
			.innerRadius(o.from)
			.outerRadius(function(d) { return o.to(d.index) });
	};

	/**** End common pinwheel code ****/


	/**** Code for creating the pinwheel ****/

	// Map a index value to an outer radius for the chart
	var indexToRadiusScale = d3.scale.linear()
		.domain([0, 5]) // indicies go from 0 to 5
		.range([0, size]) // output range 
		.clamp(true);
	
	function indexToRadius(d) { 
		return indexToRadiusScale(d); 
	}

	// Options for drawing the complex arc chart
	var pinwheelArcOptions = {
		width: 22.5,
		from: 0,
		to: indexToRadius
	} 

	// repeating scale with your own colors
	var colorFunc = d3.scale.ordinal()
		.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);


	// Function to draw all of the pinwheel arcs
	function drawComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions) {
		//console.log(rowOfData.indicies);
		// Draw the main wind rose arcs
		svgContainer.append("svg:g")
			.attr("class", "arcs")
			.selectAll("path")
			.data(rowOfData.indicies)
			.enter()
			.append("svg:path")
			.attr("d", arc(pinwheelArcOptions))
			.style("fill", function(d, i) { return colorFunc(i); })
			.attr("transform", "translate(" + centerX + "," + centerY + ")")
			.append("svg:title")
			.text(function(d) { return d.index }); 
 	}
	
	
	// draw the visualization
	drawComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions);
	
	/**** End code for creating the pinwheel ****/

} // close createPinwheel function



