/*
* this function opens the scorecard indicator data, filters it, and plots it on the bar chart
*/

/**** Code to open dataset and preform functions ****/	
// function to create origianl bar chart
function originalBarChart() {
	// use d3 to open process and scale csv data
	d3.csv("data/dummyIndicatorData.csv", function(data) { 	
		datasetIndicators = data;

		//functions to parse dates and numbers to ensure these are javascript dates and numbers
		parseNumbersIndicators(datasetIndicators);
		parseDates(datasetIndicators);
	
		// function to set up crossfilter dimensions
		// set a variable for crossfilter on the dataset
		var cf = crossfilter(datasetIndicators);	
		var byYear = setupCrossfilterByYear(cf, datasetIndicators);
	
		// set initial year as the max year in the array to initially filter the data
		var year = d3.max(datasetIndicators, function(d) { return d.year; });
		
		// filter the dataset for just this year using the filter function we created
		var filteredDataByYear = filterByYear(byYear, year);
	
		// pick initial indicator
		var indicator = $( "#selectIndicator" ).val();
		
		// pick initial order
		var order = $( "#selectOrder" ).val();
		
		// set indicator to d.value and order for plotting
		var orderedDataByYear = pickOrderIndicatorData(cf, filteredDataByYear, indicator, order);
	
		// get text and ticks
		var textTick = getTextTick(indicator);
		
		// create bar chart
		createBarChart(svgContainerBarChart, orderedDataByYear, textTick);
		
		// clear the year filter
		clearFilterByYear(byYear);	

	});
	
}

/**** Close code to open dataset and preform functions ****/