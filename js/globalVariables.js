/*
* this script sets up the global variables for all svg containers
*/

// width and height of all svg containers
var width = 900;
var widthHeatChart = 550;
var height = 550;

// sets map projection needed for the map drawing and the pinwheel drawing
var projection = d3.geo.albersUsa()
    .scale(1100)
    .translate([width / 2, height / 2]);
	
// set dataset as a global, empty variable
var dataset = '';

// set order of pinwheels in array as global
var orderPinwheels = 1;

// sets size of pinwheel, and padding for the array and the svg container to send it to
var topPadding = 50;
var sidePadding = 70;
var numberOfRows = 6;
var svgContainer = d3.select(".pinwheelArray")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// sets the svg container for the states for placement, width and height in setup.js	
var svgContainerStates = d3.select(".statesArray")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
	
var svgContainerNationalCircularHeatChart = d3.select(".nationalCircularHeatChart");
	

	