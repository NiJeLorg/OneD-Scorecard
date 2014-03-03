/*
* this script sets up the global variables and SVG container for the createPinwheel function, and then calls that function
*/

// sets size of pinwheel, width, height and padding for the array and the svg container to send it to
var width = 800;
var height = 600;
var topPadding = 60;
var sidePadding = 70;
var size = 40;
var numberOfRows = 7;
var svgContainer = d3.select(".pinwheel")
	.append("svg")
	.attr("width", width)
	.attr("height", height);


/**** Code for data manipulation ****/
// parses strings to integers or floating point numbers for the entire dataset
function parseNumbers(dataset) {
	$.each(dataset, function( i, d ) {
		d.id = parseInt(d.id);
		d.geoid = parseInt(d.geoid); 
		d.oned_index = parseFloat(d.oned_index);
		d.economy_index = parseFloat(d.economy_index);
		d.education_index = parseFloat(d.education_index);
		d.equity_index = parseFloat(d.equity_index);
		d.quality_of_life_index = parseFloat(d.quality_of_life_index);
		d.transit_index = parseFloat(d.transit_index);
	});
}

// parses strings to dates for the entier dataset
function parseDates(dataset) {
	var yearFormat = d3.time.format("%Y");

	$.each(dataset, function( i, d ) {
		var year_string = d.year;
		d.year_object = yearFormat.parse(year_string);
	});
}


// using crossfilter, accepts a dataset, sets up dimensions for that record and returns a crossfilter object
// for reference: (crossfilter API: https://github.com/square/crossfilter/wiki/API-Reference)
function setupCrossfilterByGeoID(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byGeoID = cf.dimension(function(d) { return d.geoid; });
	return byGeoID;	
}

function setupCrossfilterByYear(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byYear = cf.dimension(function(d) { return d.year; });
	return byYear;
}

// set up functions to filter data (using crossfilter) by year or geoID and clear these filters
function filterByYear (byYear, year) {
	byYear.filterExact(year);
	var filteredData = byYear.top(Infinity);
	return filteredData;
}

function filterByGeoID (byGeoID, city) {
	byGeoID.filterExact(city);
	var filteredData = byGeoID.top(Infinity);
	return filteredData;
}

function clearFilterByYear(byYear) {
	byYear.filterAll();	
}

function clearFilterByGeoID(byGeoID) {
	byGeoID.filterAll();
}

// function to create an object for the pinwheel function to read
function createObjectForPinwheel(filteredData) {	
	// create an object with the city names and ids segregated from the indicies for easy ploting
	var rowOfData = {};	
	rowOfData.meta = []
	rowOfData.indicies = []	
	$.each(filteredData, function( i, d ) {
		rowOfData.meta = { id: d.id, geoid: d.geoid, metro: d.metro, year: d.year, oned_index: d.oned_index };
		rowOfData.indicies.push({ name: 'Economy Index', index: d.economy_index, angle: 247.5 });
		rowOfData.indicies.push({ name: 'Education Index', index: d.education_index, angle: 292.5 });
		rowOfData.indicies.push({ name: 'Equity Index', index: d.equity_index, angle: 337.5 });
		rowOfData.indicies.push({ name: 'Quality of Life Index', index: d.quality_of_life_index, angle: 22.5 });
		rowOfData.indicies.push({ name: 'Transit Index', index: d.transit_index, angle: 67.5 });
	});
		
	// return the selected row
	return rowOfData;
}

/**** End code for data manipulation ****/	
	
	
/**** Code to open dataset and preform functions ****/	
	
// set dataset as a global, empty variable
var dataset = '';

// use d3 to open process and scale csv data
d3.csv("data/dummyIndexData.csv", function(data) { 
	dataset = data;

	//functions to parse dates and numbers to ensure these are javascript dates and numbers
	parseNumbers(dataset);
	parseDates(dataset);
	
	// function to set up crossfilter dimensions
	// set a globa variable for crossfilter on the dataset
	var cf = crossfilter(dataset);	
	var byGeoID = setupCrossfilterByGeoID(cf, dataset);
	var byYear = setupCrossfilterByYear(cf, dataset);
	
	// set initial year as the max year in the array to initially filter the data
	var year = d3.max(dataset, function(d) { return d.year; });
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);
	
	// get size of the dataset for determining the number of rows and columns of pinwheels
	var count = filteredDataByYear.length;
	var countPerRow = Math.ceil(count/numberOfRows);
	
	// D3 scale for the x position of pinwheel graphics
	var centerXScale = d3.scale.linear()
		.domain([1, countPerRow]) // numbers go from 1 to the number of elements per row
		.range([sidePadding, width-sidePadding]) // number of pixels left to right
		.clamp(true);
	
		
	// iterate through each city and plot pinwheels for each city at intervals along the chart
	$.each(filteredDataByYear, function( i, d ) {		
		var city = d.geoid;

		// filter data to this city
		var filteredDataByGeoID = filterByGeoID(byGeoID, city);
		
		// clear filter for city for next one
		clearFilterByGeoID(byGeoID); 
		
		var rowOfData = createObjectForPinwheel(filteredDataByGeoID);
		
		// set the center for each pinwheel depending on the number shown and width and height of chart
		var centerX = centerXScale(city - ((Math.floor((city-1)/countPerRow)) * countPerRow));
		var centerY = (Math.floor((city-1)/countPerRow) * (height/numberOfRows)) + topPadding; 
		
		createPinwheel(size, rowOfData, svgContainer, centerX, centerY);		
	});
	
	// clear the year filter
	clearFilterByYear(byYear);
	

});

/**** Close code to open dataset and preform functions ****/