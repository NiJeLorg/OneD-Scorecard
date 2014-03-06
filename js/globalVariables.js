/*
* this script sets up the global variables for all svg containers
*/

// width and height of all svg containers
var width = 900;
var height = 550;

// sets map projection needed for the map drawing and the pinwheel drawing
var projection = d3.geo.albersUsa()
    .scale(1100)
    .translate([width / 2, height / 2]);
	
