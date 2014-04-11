/*
* this script opens the scorecard data, parses numbers and dates, filters by year, then iterates through each record and 
* creates pinwheels for the map and array, and sends data to the circular charts and bar charts
*/

/**** Code to open dataset and preform functions ****/	
// function to create pinwheels
function originalPinwheels() {
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
		
			// for the pinwheel array:  set the center for each pinwheel depending on the number shown and width and height of chart
			var centerX = centerXScale(city - ((Math.floor((city-1)/countPerRow)) * countPerRow));
			var centerY = (Math.floor((city-1)/countPerRow) * (height/numberOfRows)) + topPadding; 
		
			// set size and smallestPie for chart pinwheels
			var smallestPie = 10;
			var size = 30;
		
			createPinwheel(size, smallestPie, rowOfData, svgContainer, centerX, centerY);
		
			// clear centerX and centerY to position the pinwheels on the map
			centerX = 0;
			centerY = 0;
		
			// reset size for pinwheel and smallestPie
			smallestPie = 8;
			size = 16;	
		
			// set centers of pinwheels for map
			centerX = projection([rowOfData.meta.lon, rowOfData.meta.lat])[0];
			centerY = projection([rowOfData.meta.lon, rowOfData.meta.lat])[1];
		
			// draw pinwheels on the map: container set up in statesPinwheel.js
			createPinwheel(size, smallestPie, rowOfData, svgContainerStates, centerX, centerY);

		});
		
		// create initial the national level circular heat chart and table from this dataset
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var filteredDataByYear = orderByRegion(byRegion);

		// set up data to be passed to the chart
		var circularChartData = createObjectForCircularHeatChart(filteredDataByYear);

		// calculat the number of cities
		var numberOfCities = Object.size(circularChartData.meta);
		
		// create national level circular heat chart
		createNationalCircularHeatChart(svgContainerNationalCircularHeatChart, circularChartData, numberOfCities);
		
		// clear the year filter
		clearFilterByYear(byYear);
		
		/**** Pass dataset to the slider ****/
		generateSlider(dataset);
	

	});
	
}



/**** Close code to open dataset and preform functions ****/