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

function setupCrossfilterByOneDIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byOneDIndex = cf.dimension(function(d) { return d.oned_index; });
	return byOneDIndex;
}

function setupCrossfilterByEconomyIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byEconomyIndex = cf.dimension(function(d) { return d.economy_index; });
	return byEconomyIndex;
}

function setupCrossfilterByEducationIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byEducationIndex = cf.dimension(function(d) { return d.education_index; });
	return byEducationIndex;
}

function setupCrossfilterByEquityIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byEquityIndex = cf.dimension(function(d) { return d.equity_index; });
	return byEquityIndex;
}

function setupCrossfilterByQualityOfLifeIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byQualityOfLifeIndex = cf.dimension(function(d) { return d.quality_of_life_index; });
	return byQualityOfLifeIndex;
}

function setupCrossfilterByTransitIndex(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byTransitIndex = cf.dimension(function(d) { return d.transit_index; });
	return byTransitIndex;
}

function setupCrossfilterByRegion(cf, dataset) {		
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byRegion = cf.dimension(function(d) { return d.region + '|' + d.metro; });
	return byRegion;
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

function orderByOneDIndex (byOneDIndex) {
	var filteredData = byOneDIndex.top(Infinity);
	return filteredData;
}

function orderByEconomyIndex (byEconomyIndex) {
	var filteredData = byEconomyIndex.top(Infinity);
	return filteredData;
}

function orderByEducationIndex (byEducationIndex) {
	var filteredData = byEducationIndex.top(Infinity);
	return filteredData;
}

function orderByEquityIndex (byEquityIndex) {
	var filteredData = byEquityIndex.top(Infinity);
	return filteredData;
}

function orderByQualityOfLifeIndex (byQualityOfLifeIndex) {
	var filteredData = byQualityOfLifeIndex.top(Infinity);
	return filteredData;
}

function orderByTransitIndex (byTransitIndex) {
	var filteredData = byTransitIndex.top(Infinity);
	return filteredData;
}

function orderByRegion (byRegion) {
	var filteredData = byRegion.bottom(Infinity);
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

// function to create an object for the circular heat chart to read
function createObjectForCircularHeatChart(filteredData) {	
	// create an object with the city names and ids segregated from the indicies for easy ploting
	var circularChartData = {};	
	circularChartData.meta = []
	circularChartData.economyIndex = []
	circularChartData.educationIndex = []
	circularChartData.equityIndex = []
	circularChartData.qualityOfLifeIndex = []
	circularChartData.transitIndex = []
	circularChartData.indicies = []
	circularChartData.regions = []
	$.each(filteredData, function( i, d ) {		
		circularChartData.meta.push({ id: d.id, geoid: d.geoid, metro: d.metro, region: d.region, year: d.year, lat: d.lat, lon: d.lon, oned_index: d.oned_index, economy_index: d.economy_index, education_index: d.education_index, equity_index: d.equity_index, quality_of_life_index: d.quality_of_life_index, transit_index: d.transit_index });
		circularChartData.economyIndex.push(d.economy_index);
		circularChartData.educationIndex.push(d.education_index);
		circularChartData.equityIndex.push(d.equity_index);
		circularChartData.qualityOfLifeIndex.push(d.quality_of_life_index);
		circularChartData.transitIndex.push(d.transit_index);
		
		// get region counts
		var key = d.region;
		if (!circularChartData.regions[key]) {
			circularChartData.regions[key] = {
				region: d.region,
				count: 0,
				start: 0,
				end: 0
			};
		}
		circularChartData.regions[key].count++;
		
	});
	
	var lastKey = '';
	Object.keys(circularChartData.regions).forEach(function(key) {
		if (lastKey == '') {
			circularChartData.regions[key].start = 0;
			circularChartData.regions[key].end = circularChartData.regions[key].count;
			//console.log(circularChartData.regions[key].end);
		    circularChartData.regions.push(circularChartData.regions[key]);
		} else {
			circularChartData.regions[key].start = circularChartData.regions[lastKey].end;
			//console.log(lastKey);
			//console.log(circularChartData.regions[lastKey].start);
			circularChartData.regions[key].end = circularChartData.regions[lastKey].end + circularChartData.regions[key].count;
			//console.log(circularChartData.regions[key].end);
		    circularChartData.regions.push(circularChartData.regions[key]);
		}
		lastKey = key;
	});
	
	circularChartData.indicies = circularChartData.economyIndex.concat(circularChartData.educationIndex, circularChartData.equityIndex, circularChartData.qualityOfLifeIndex, circularChartData.transitIndex);
		
	// return the re-oriented dataset
	return circularChartData;
}

// extender for Object class that determines the object length
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**** End code for data manipulation ****/	
	
	