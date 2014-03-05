/*
* this script sets up the global variables and SVG container for the map
*/

// sets the svg container for the states for placement, width and height in setup.js	
var svgContainerStates = d3.select(".statesArray")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
	
// run function to draw the states
createStates(svgContainerStates, projection);
	