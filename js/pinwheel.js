/*
* sandbox for building the OneD Scorecard pinwheel
* creates a pinwheel in the "pinwheel" div
*/

/**** Begin block for SVG setup ****/

// build svg margins and width and height of graphic
var margin = {top: 10, right: 20, bottom: 10, left: 20}, 
	width = 400 - margin.left - margin.right, 
	height = 400 - margin.top - margin.bottom;

//Create main SVG element
var svgpinwheel = d3.select(".pinwheel")
	.append("svg")
	.attr("width", 400)
	.attr("height", 400);

// set high level pie and arc variables for use in the drawPinwheel function
/**** Setting fixed inner and outer radius for pie wedges, but scaling the outer radius to the data is one potential path to creating the pinwheels ****/
var outerRadius = width / 2;
var innerRadius = 0;
var arc = d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);

var pie = d3.layout.pie();

// using basic ordinal colors for now
var color = d3.scale.category10();

// setting up margins for centering pie chart in the svg container
var traslateDistanceLeft = outerRadius + margin.left;
var traslateDistanceTop = outerRadius + margin.top;


/**** End block for SVG setup ****/



/**** Begin block for data parsing and setup ****/

// set dataset as a global, empty variable
var dataset = '';

// use d3 to open process and scale csv data
d3.csv("data/dummyIndexData.csv", function(data) { 
	dataset = data;
	
	//functions to parse dates and numbers to ensure these are javascript dates and numbers
	parseNumbers(dataset);
	parseDates(dataset);
	
	// function to draw the pinwheel chart
	drawPinwheel(dataset);

	//console.log(dataset);
	
});

function parseNumbers(dataset) {
	$.each(dataset, function( i, d ) {
		d.id = parseInt(d.id);
		d.geoid = parseInt(d.geoid); 
		d.oned_index = parseFloat(d.oned_index);
		d.economy_index = parseFloat(d.economy_index);
		d.education_index = parseFloat(d.education_index);
		d.equity_index = parseFloat(d.equity_index);
		d.quality_of_life_index = parseFloat(d.quality_of_life_index);
		d.transit_index = parseFloat(d.transit_index);
	});
}

function parseDates(dataset) {
	var yearFormat = d3.time.format("%Y");

	$.each(dataset, function( i, d ) {
		var year_string = d.year;
		d.year_object = yearFormat.parse(year_string);
	});
}


function drawPinwheel(dataset) {
	// load dataset into crossfilter (crossfilter API: https://github.com/square/crossfilter/wiki/API-Reference)
	var cf = crossfilter(dataset);	
	
	// set up a crossfilter dimension for id (we'll set up other dimensions later for date and geoid)
	var byID = cf.dimension(function(d) { return d.id; });
	
	// pick the record from the CSV where id = 78
	byID.filterExact(78);
	
	// extract the record from the crossfilter selection
	var firstRecord = byID.top(1);
	
	console.log(firstRecord);
	
	// for starters, create a simple array to populate the pie chart using the five indicies 	
	$.each(firstRecord, function( i, d ) {
		indicies = [ d.economy_index, d.education_index, d.equity_index, d.quality_of_life_index, d.transit_index ];
	});
		
	/**** From Scott Murray's 01_pie.html example from Interactive Data Visualization for the Web ****/
	//Set up groups
	var arcs = svgpinwheel.selectAll("g.arc")
				  .data(pie(indicies))
				  .enter()
				  .append("g")
				  .attr("class", "arc")
				  .attr("transform", "translate(" + traslateDistanceLeft + "," + traslateDistanceTop + ")");
	
	//Draw arc paths
	arcs.append("path")
	    .attr("fill", function(d, i) {
	    	return color(i);
	    })
	    .attr("d", arc);
	
	//Labels
	arcs.append("text")
	    .attr("transform", function(d) {
	    	return "translate(" + arc.centroid(d) + ")";
	    })
	    .attr("text-anchor", "middle")
	    .text(function(d) {
	    	return d.value;
	    });
	
}






