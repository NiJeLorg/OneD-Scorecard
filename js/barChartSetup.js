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
		
				
		// create combo box for underneath the circular heat chart and donut chart
		var byCity = setupCrossfilterByCityOnly(cf, datasetIndicators);
		var filteredDataByYear = orderByCity(byCity);
		var cityOptions = '';
		$.each(filteredDataByYear, function( i, d ) {
			if (d.geoid == 15) {
				cityOptions = cityOptions + "<option selected='selected' value='" + d.geoid + "'>" + d.metro + "</option>";
			} else {
				cityOptions = cityOptions + "<option value='" + d.geoid + "'>" + d.metro + "</option>";				
			}
		});
		
        $(".cityHeatChartDropdown").html(cityOptions);
		$(".cityDonutDropdown").html(cityOptions);
		
		clearFilterByCityOnly(byCity);
		
		
		// create initial the city level circular heat chart and table from this dataset
		// filter data to Detroit to start
		var cityFilter = 15;
		var byGeoID = setupCrossfilterByGeoID(cf, datasetIndicators);
		var filteredDataByGeoID = filterByGeoID(byGeoID, cityFilter);

		// clear filter for city for next one
		clearFilterByGeoID(byGeoID); 

		// set up data to be passed to the chart
		var circularChartData = createObjectForCircularHeatChartCity(filteredDataByGeoID);
		
		// create city level circular heat chart
		createCityCircularHeatChart(svgContainerCityCircularHeatChart, circularChartData, datasetIndicators);
		
		// create dataset to be passed to donut chart
		var donutChartData = createObjectForDountChartCity(filteredDataByGeoID);
		
		// create donut chart
		createCityDountChart(svgContainerCityDonutChart, donutChartData);
		
		// clear the year filter
		clearFilterByYear(byYear);	

	});
	
}

/**** Close code to open dataset and preform functions ****/