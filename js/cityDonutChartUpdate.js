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

// refresh chart
function refreshCityDonutChartData() {
	// initial variables
	var year = d3.max(datasetIndicators, function(d) { return d.year; });
	var selectedIndicator = 7;	
	var cityFilter = 15;

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
	
	// update slider
	year = parseInt(year);
	$( "#cityDonutChartSlider" ).slider( 'setValue', year );
	
	// update dropdown
	$( "#selectPriorityAreaDonut" ).val( '1' );
	$( "#selectIndicatorDonut" ).html("<option value='1'>Total Value of Exports</option><option value='2'>Per Capita GDP for Metropolitan Area (GMP)</option><option value='4'>Percent Change in High Tech Jobs</option><option value='5'>Percent Change in Knowledge Industry Employment</option><option value='7' selected='selected'>Per Capita Personal Income</option><option value='10'>Number of Technology Patents per 10K People</option><option value='11'>Business Tax Climate Index</option><option value='12'>Research & Development, Share of State GDP</option>");
	$( "#selectCityDonut" ).val( '15' );
		


}


