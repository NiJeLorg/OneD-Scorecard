/*
* this script sets up the global variables for all svg containers
*/

// width and height of all svg containers
var viewWidth = ($( '.cover-container' ).width()) * 0.68;
var width = 900;
var widthHeatChart = 550;
var viewWidthHeatChart = ($( '.cover-container' ).width()) * 0.40;
var height = 500;
var mapHeight = 544;

// don't allow view width to be > than width
if (viewWidth > width) {
	viewWidth = width;
}

// and don't allow it to be bigger than the heat/donut chart widths
if (viewWidthHeatChart > widthHeatChart) {
	viewWidthHeatChart = widthHeatChart;
} 

// sets map projection needed for the map drawing and the pinwheel drawing
var projection = d3.geo.albersUsa()
    .scale(1150)
    .translate([width / 2, mapHeight / 2]);
	
// set dataset as a global, empty variable
var dataset = '';

// set dataset as a global for indicators as well
var datasetIndicators = '';

// sets the svg container for the states for placement, width and height in setup.js	
var svgContainerStates = d3.select(".statesArray")
	.append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + mapHeight)
	.attr("width", viewWidth)
	.attr("height", viewWidth * mapHeight / width);

// set order of pinwheels in array as global
var orderPinwheels = 1;

// sets size of pinwheel, and padding for the array and the svg container to send it to
var topPadding = 45;
var sidePadding = 70;
var numberOfRows = 6;
var svgContainer = d3.select(".pinwheelArray")
	.append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
	.attr("width", viewWidth)
	.attr("height", viewWidth * height / width);
	
// container for the national level circular heat chart	
var svgContainerNationalCircularHeatChart = d3.select(".nationalCircularHeatChart")
	.append('svg')
	.attr("preserveAspectRatio", "xMidYMid")
	.attr("viewBox", "0 0 " + widthHeatChart + " " + height)
	.attr("width", viewWidthHeatChart)
	.attr("height", viewWidthHeatChart * height / widthHeatChart);

	
// container for the bar chart
var svgContainerBarChart = d3.select(".barChart")
	.append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
	.attr("width", viewWidth)
	.attr("height", viewWidth * height / width);

// container for the city level circular heat chart	
//var svgContainerCityCircularHeatChart = d3.select(".cityCircularHeatChart");

// container for the city donut chart	
var svgContainerCityDonutChart = d3.select(".cityDonutChart")
	.append('svg')
	.attr("preserveAspectRatio", "xMidYMid")
	.attr("viewBox", "0 0 " + widthHeatChart + " " + height)
	.attr("width", viewWidthHeatChart)
	.attr("height", viewWidthHeatChart * height / widthHeatChart);

	