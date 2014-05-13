/*
* this function updates the pinwheels based on user section; runs updatePinwheel in pinwheel.js
*/
		
function updateCircularHeatChart(year, city) {
	// set a global variable for crossfilter on the dataset
	var cf = crossfilter(dataset);	
	var byYear = setupCrossfilterByYear(cf, dataset);
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);

	// sort data by region
	var byRegion = setupCrossfilterByRegion(cf, dataset);
	var filteredDataByYear = orderByRegion(byRegion);

	// set up data to be passed to the chart
	var circularChartData = createObjectForCircularHeatChart(filteredDataByYear);

	// calculat the number of cities
	var numberOfCities = Object.size(circularChartData.meta);

	// create national level circular heat chart
	updateNationalCircularHeatChart(svgContainerNationalCircularHeatChart, circularChartData, numberOfCities, city);

	// clear the year filter
	clearFilterByYear(byYear);

}


function refreshCircularHeatChart() {
	// set a global variable for crossfilter on the dataset
	var cf = crossfilter(dataset);	
	var byYear = setupCrossfilterByYear(cf, dataset);
	
	// set initial year as the max year in the array to initially filter the data
	var year = d3.max(dataset, function(d) { return d.year; });
	
	// filter the dataset for just this year using the filter function we created
	var filteredDataByYear = filterByYear(byYear, year);

	// sort data by region
	var byRegion = setupCrossfilterByRegion(cf, dataset);
	var filteredDataByYear = orderByRegion(byRegion);

	// set up data to be passed to the chart
	var circularChartData = createObjectForCircularHeatChart(filteredDataByYear);

	// calculat the number of cities
	var numberOfCities = Object.size(circularChartData.meta);
	
	// set Detroit as the default city
	var city = 15;

	// create national level circular heat chart
	updateNationalCircularHeatChart(svgContainerNationalCircularHeatChart, circularChartData, numberOfCities, city);

	// clear the year filter
	clearFilterByYear(byYear);
	
	// update slider
	year = parseInt(year);
	$( "#nationalHeatChartSlider" ).slider( 'setValue', year );
	
	// update dropdown
	$( ".nationalCircularHeatChartDropdown" ).val( '15' );
	

}


