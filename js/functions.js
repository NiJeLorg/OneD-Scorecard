/*
* houses all functions used by the set up scripts
* dataset: csv data
*/

/**** Code for data manipulation ****/
// parses strings to integers or floating point numbers for the entire dataset
function parseNumbers(dataset) {
	$.each(dataset, function( i, d ) {
		d.id = parseInt(d.id);
		d.geoid = parseInt(d.geoid); 
		d.lat = parseFloat(d.lat);
		d.lon = parseFloat(d.lon);
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
		rowOfData.meta = { id: d.id, geoid: d.geoid, metro: d.metro, year: d.year, lat: d.lat, lon: d.lon, oned_index: d.oned_index };
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
	
	