/*
* this function updates the pinwheels based on user section; runs updatePinwheel in pinwheel.js
*/
		
function updateCityCircularHeatChartData(year, cityFilter) {
	// set a global variable for crossfilter on the dataset
	var cf = crossfilter(datasetIndicators);	
	var byYear = setupCrossfilterByYear(cf, datasetIndicators);
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);

	// filter data by city
	var byGeoID = setupCrossfilterByGeoID(cf, datasetIndicators);
	var filteredDataByGeoID = filterByGeoID(byGeoID, cityFilter);

	// clear filter for city for next one
	clearFilterByGeoID(byGeoID); 

	// set up data to be passed to the chart
	var circularChartData = createObjectForCircularHeatChartCity(filteredDataByGeoID);
	
	// create national level circular heat chart
	updateCityCircularHeatChart(svgContainerCityCircularHeatChart, circularChartData, datasetIndicators);
			
	// clear the year filter
	clearFilterByYear(byYear);	


}


