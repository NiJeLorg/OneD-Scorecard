/*
* this function updates the bar chart
*/

// function to update the bar chart
function updateBarChartData(year, indicator, order, city) {

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
	updateBarChart(svgContainerBarChart, orderedDataByYear, textTick, city);
	
	// clear the year filter
	clearFilterByYear(byYear);	

}

// function to reset the bar chart
function refreshBarChartData() {
	
	// initial variables
	var year = d3.max(datasetIndicators, function(d) { return d.year; });
	var indicator = 66;	
	var order = 1;
	var city = 15;
	
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
	updateBarChart(svgContainerBarChart, orderedDataByYear, textTick, city);
	
	// clear the year filter
	clearFilterByYear(byYear);	
	
	// update slider
	year = parseInt(year);
	$( "#barChartSlider" ).slider( 'setValue', year );
	
	// update dropdown
	$( "#selectPriorityArea" ).val( '0' );
	$( "#selectIndicator" ).html("<option value='66'>OneD Index</option>");
	$( "#selectOrder" ).val( '1' );
	$( "#selectCity" ).val( '15' );


}