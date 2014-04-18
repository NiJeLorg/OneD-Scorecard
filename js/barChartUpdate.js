/*
* this function updates the bar chart
*/

/**** Code to open dataset and preform functions ****/	
// function to update the bar chart
function updateBarChartData(year, indicator, order) {
	// use d3 to open process and scale csv data
	d3.csv("data/dummyIndicatorData.csv", function(data) { 	
		datasetIndicators = data;

		//functions to parse dates and numbers to ensure these are javascript dates and numbers
		parseNumbersIndicators(datasetIndicators);
		parseDates(datasetIndicators);
	
		// function to set up crossfilter dimensions
		// set a globa variable for crossfilter on the dataset
		var cf = crossfilter(datasetIndicators);	
		var byYear = setupCrossfilterByYear(cf, datasetIndicators);
			
		// filter the dataset for just this year using the filter function we created
		var filteredDataByYear = filterByYear(byYear, year);
					
		// set indicator to d.value and order for plotting
		var orderedDataByYear = pickOrderIndicatorData(cf, filteredDataByYear, indicator, order);
	
		// get text and ticks
		var textTick = getTextTick(indicator);
		
		// create bar chart
		updateBarChart(svgContainerBarChart, orderedDataByYear, textTick);
		
		// clear the year filter
		clearFilterByYear(byYear);	

	});
	
}

/**** Close code to open dataset and preform functions ****/