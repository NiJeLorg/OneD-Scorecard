/*
* this function updates the pinwheels based on user section; runs updatePinwheel in pinwheel.js
*/
		
function updateCityDonutChartData(year, cityFilter, selectedIndicator) {
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

	// create dataset to be passed to donut chart
	var donutChartData = createObjectForDountChartCity(filteredDataByGeoID);
	
	// create donut chart
	updateCityDonutChart(svgContainerCityDonutChart, donutChartData, selectedIndicator);
			
	// clear the year filter
	clearFilterByYear(byYear);	


}


