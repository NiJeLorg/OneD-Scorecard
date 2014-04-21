/*
* this function updates the pinwheels based on user section; runs updatePinwheel in pinwheel.js
*/
		
function updatePinwheelsByYearMap(year, orderPinwheels) {
	// function to set up crossfilter dimensions
	// set a global variable for crossfilter on the dataset
	var cf = crossfilter(dataset);	
	var byGeoID = setupCrossfilterByGeoID(cf, dataset);
	var byYear = setupCrossfilterByYear(cf, dataset);
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);
	
	// set up dataset order if orderPinwheels is set to anything else than 1
	if (orderPinwheels == 1) {
		var byOneDIndex = setupCrossfilterByOneDIndex(cf, dataset);
		var filteredDataByYear = orderByOneDIndex(byOneDIndex);
		// send over standard color function
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,1,1,1,1]);
	} else if (orderPinwheels == 2) {
		var byEconomyIndex = setupCrossfilterByEconomyIndex(cf, dataset);
		var filteredDataByYear = orderByEconomyIndex(byEconomyIndex);		
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,0.3,0.3,0.3,0.3]);
	} else if (orderPinwheels == 3) {
		var byEducationIndex = setupCrossfilterByEducationIndex(cf, dataset);
		var filteredDataByYear = orderByEducationIndex(byEducationIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.3,1,0.3,0.3,0.3]);
	} else if (orderPinwheels == 4) {
		var byEquityIndex = setupCrossfilterByEquityIndex(cf, dataset);
		var filteredDataByYear = orderByEquityIndex(byEquityIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.3,0.3,1,0.3,0.3]);
	} else if (orderPinwheels == 5) {
		var byQualityOfLifeIndex = setupCrossfilterByQualityOfLifeIndex(cf, dataset);
		var filteredDataByYear = orderByQualityOfLifeIndex(byQualityOfLifeIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.3,0.3,0.3,1,0.3]);
	} else if (orderPinwheels == 6) {
		var byTransitIndex = setupCrossfilterByTransitIndex(cf, dataset);
		var filteredDataByYear = orderByTransitIndex(byTransitIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.3,0.3,0.3,0.3,1]);
	} else {
		// send over standard color function
		var colorFunc = d3.scale.ordinal()
			//.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,1,1,1,1]);		
	}
	
	// iterate through each city and plot pinwheels for each city at intervals along the chart
	$.each(filteredDataByYear, function( i, d ) {		
		var city = d.geoid;
		if (orderPinwheels == 1) {
			var order = city;
		} else {
			var order = i + 1;			
		}

		// filter data to this city
		var filteredDataByGeoID = filterByGeoID(byGeoID, city);
		
		// clear filter for city for next one
		clearFilterByGeoID(byGeoID); 
		
		var rowOfData = createObjectForPinwheel(filteredDataByGeoID);

		// reset size for pinwheel and smallestPie
		smallestPie = 8;
		size = 16;	
		
		// set centers of pinwheels for map
		centerX = projection([rowOfData.meta.lon, rowOfData.meta.lat])[0];
		centerY = projection([rowOfData.meta.lon, rowOfData.meta.lat])[1];
		
		// draw pinwheels on the map: container set up in statesPinwheel.js
		updatePinwheel(size, smallestPie, rowOfData, svgContainerStates, centerX, centerY, colorFunc, opacityFunc);

	});
	
	// clear the year filter
	clearFilterByYear(byYear);
		
}



function updatePinwheelsByYearArray(year, orderPinwheels) {
	// function to set up crossfilter dimensions
	// set a global variable for crossfilter on the dataset
	var cf = crossfilter(dataset);	
	var byGeoID = setupCrossfilterByGeoID(cf, dataset);
	var byYear = setupCrossfilterByYear(cf, dataset);
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);
	
	// set up dataset order if orderPinwheels is set to anything else than 1
	if (orderPinwheels == 2) {
		var byOneDIndex = setupCrossfilterByOneDIndex(cf, dataset);
		var filteredDataByYear = orderByOneDIndex(byOneDIndex);
		// send over standard color function
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,1,1,1,1]);		
	} else if (orderPinwheels == 3) {
		var byEconomyIndex = setupCrossfilterByEconomyIndex(cf, dataset);
		var filteredDataByYear = orderByEconomyIndex(byEconomyIndex);		
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,0.1,0.1,0.1,0.1]);		
	} else if (orderPinwheels == 4) {
		var byEducationIndex = setupCrossfilterByEducationIndex(cf, dataset);
		var filteredDataByYear = orderByEducationIndex(byEducationIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.1,1,0.1,0.1,0.1]);
	} else if (orderPinwheels == 5) {
		var byEquityIndex = setupCrossfilterByEquityIndex(cf, dataset);
		var filteredDataByYear = orderByEquityIndex(byEquityIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.1,0.1,1,0.1,0.1]);			
	} else if (orderPinwheels == 6) {
		var byQualityOfLifeIndex = setupCrossfilterByQualityOfLifeIndex(cf, dataset);
		var filteredDataByYear = orderByQualityOfLifeIndex(byQualityOfLifeIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.1,0.1,0.1,1,0.1]);			
	} else if (orderPinwheels == 7) {
		var byTransitIndex = setupCrossfilterByTransitIndex(cf, dataset);
		var filteredDataByYear = orderByTransitIndex(byTransitIndex);
		// update color function to highlight selected index
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([0.1,0.1,0.1,0.1,1]);
	} else if (orderPinwheels == 8) {
		// add when we add in population data
		// send over standard color function
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,1,1,1,1]);					
	} else {
		// send over standard color function
		var colorFunc = d3.scale.ordinal()
			.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);
			//.range(["#a6c0d0","#d94f26","#20698a","#f5a91d","#87af3f"]);
		var opacityFunc = d3.scale.ordinal()
			.range([1,1,1,1,1]);					
	}
	
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
		if (orderPinwheels == 1) {
			var order = city;
		} else {
			var order = i + 1;			
		}

		// filter data to this city
		var filteredDataByGeoID = filterByGeoID(byGeoID, city);
		
		// clear filter for city for next one
		clearFilterByGeoID(byGeoID); 
		
		var rowOfData = createObjectForPinwheel(filteredDataByGeoID);
		
		// for the pinwheel array:  set the center for each pinwheel depending on the number shown and width and height of chart
		var centerX = centerXScale(order - ((Math.floor((order-1)/countPerRow)) * countPerRow));
		var centerY = (Math.floor((order-1)/countPerRow) * (height/numberOfRows)) + topPadding; 
		
		// set size and smallestPie for chart pinwheels
		var smallestPie = 10;
		var size = 30;
				
		updatePinwheel(size, smallestPie, rowOfData, svgContainer, centerX, centerY, colorFunc, opacityFunc);
		
	});
	
	// clear the year filter
	clearFilterByYear(byYear);
		
}