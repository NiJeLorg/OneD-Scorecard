/*
* this script sets up the global variables and SVG container for the createPinwheel function, and then calls that function
*/

// sets size of pinwheel and the svg container to send it to
var size = 400;
var svgContainer = d3.select(".pinwheel")
	.append("svg")
	.attr("width", 600)
	.attr("height", 600);


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
function crossfilterByGeoID(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byGeoID = cf.dimension(function(d) { return d.geoid; });
	return byGeoID;	
}

function crossfilterByYear(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byYear = cf.dimension(function(d) { return d.year; });
	return byYear;
}


// function to filter data using crossfilter to a single geography for a single year
function filterData(byGeoID, byYear, city, year) {
	// pick the records from the CSV where geoid = 15 (Detroit)
	byGeoID.filterExact(city);
	byYear.filterExact(year);
	var filteredData = byYear.top(1);
	
	// clear filters
	byGeoID.filterAll();
	byYear.filterAll();
	
	// create an object with the city names and ids segregated from the indicies for easy ploting
	var rowOfData = {};	
	rowOfData.meta = [];
	rowOfData.indicies = [];	
	$.each(filteredData, function( i, d ) {
		rowOfData.meta = { id: d.id, geoid: d.geoid, metro: d.metro, year: d.year, oned_index: d.oned_index };
		rowOfData.indicies.push({ name: 'Economy Index', value: d.economy_index, angle: 0 });
		rowOfData.indicies.push({ name: 'Education Index', value: d.education_index, angle: 45 });
		rowOfData.indicies.push({ name: 'Equity Index', value: d.equity_index, angle: 90 });
		rowOfData.indicies.push({ name: 'Quality of Life Index', value: d.quality_of_life_index, angle: 135 });
		rowOfData.indicies.push({ name: 'Transit Index', value: d.transit_index, angle: 180 });
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
	var byGeoID = crossfilterByGeoID(cf, dataset);
	var byYear = crossfilterByYear(cf, dataset);
	
	// function to pull a single record and pass to the createPinwheel function -- eventually we'll have a foreach loop here that will draw pinwheels for each city by year
	var city = 15;
	var year = 2010;
	var rowOfData = filterData(byGeoID, byYear, city, year);

	//console.log(rowOfData.indicies);
	// function to draw the pinwheel chart
	createPinwheel(size, rowOfData, svgContainer)

});

/**** Close code to open dataset and preform functions ****/