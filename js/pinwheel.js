/*
* Create and update pinwheel functions 
* size: sets the width and height of each pinwheel created
* rowOfData: the row of data being passed to the function (each row represents the OneD indicies for each city for one year)
* svgContainer: the SVG container we want to pass the pinwheel back to
* centerX: X coordinates for the center of the pinwheel
* centerY: Y coordinates for the center of the pinwheel
* based on Nelson Minar's Wind Rose code @ https://gist.github.com/NelsonMinar/3589712
*/
function createPinwheel(size, smallestPie, rowOfData, svgContainer, centerX, centerY) {
	
	/**** Common pinwheel code ****/
	// Function to draw a single arc for the pinwheel
	// Input: Drawing options object containing
	// width: degrees of width to draw (ie 5 or 15)
	// from: integer, inner radius
	// to: function returning the outer radius
	// Output: a function that when called, generates SVG paths.
	// It expects to be called via D3 with data objects from totalsToFrequences()
	var arc = function(o) {
		//console.log(o);
		return d3.svg.arc()
			.startAngle(function(d) { return (d.angle - o.width) * Math.PI/180; })
			.endAngle(function(d) { return (d.angle + o.width) * Math.PI/180; })
			.innerRadius(o.from)
			.outerRadius(function(d) { return o.to(d.index) });
	};

	/**** End common pinwheel code ****/


	/**** Code for creating the pinwheel ****/

	// Map a index value to an outer radius for the chart
	var indexToRadiusScale = d3.scale.linear()
		.domain([0, 5]) // indicies go from 0 to 5
		.range([smallestPie, size]) // output range 
		.clamp(true);
	
	function indexToRadius(d) { 
		return indexToRadiusScale(d); 
	}

	// Options for drawing the complex arc chart
	var pinwheelArcOptions = {
		width: 22.5,
		from: 0,
		to: indexToRadius
	} 

	// repeating scale with your own colors
	var colorFunc = d3.scale.ordinal()
		.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);

	// set location of strike area for popups 
	var popupCenterX = centerX - (size*1.5)/2;
	var popupCenterY = centerY - (size*1.5)/2;
	var rectSize = size*1.5;
	
	//set up container for mouseover interaction
	var div = d3.select("body").append("div")
	    .attr("class", "pinwheelTooltip")
	    .style("opacity", 1e-6);	

	// Function to draw all of the pinwheel arcs
	function drawComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions) {
		// need Ids for pinwheels to update later
		var gGeoid = 'g' + rowOfData.meta.geoid;
		var rectGeoid = 'rect' + rowOfData.meta.geoid;
		// Draw the main wind rose arcs
		var pinwheel = svgContainer.append("svg:g")
			.attr("class", "arcs")
			.attr("id", gGeoid)
			.selectAll("path")
			.data(rowOfData.indicies)
			.enter()
			.append("svg:path")
			.attr("d", arc(pinwheelArcOptions))
			.style("fill", function(d, i) { return colorFunc(i); })
			.attr("transform", "translate(" + centerX + "," + centerY + ")");
			
		var clickableOverlay = svgContainer.append("svg:g")
			.selectAll("rect") // need an empty rectangle to catch the on mouseover and click events
			.data([rowOfData])
			.enter()
			.append("svg:rect")
			.attr("id", rectGeoid)
			.attr('width', rectSize) // the whole width of g/svg
			.attr('height', rectSize) // the whole heigh of g/svg
			.attr("transform", "translate(" + popupCenterX + "," + popupCenterY + ")")
			.attr('fill', 'none')
			.attr('pointer-events', 'all')			
			
			// set up on mouseover events
			.on("mouseover", function(d) {
				//console.log(d);
				
			    div.transition()
			        .duration(250)
			        .style("opacity", 1);
				
	            div.html(
					'<h5>' + d.meta.metro + '</h5>' +
					'<h5>' + d.meta.year + '</h5>' +
					'<table class="table table-condensed">' +
						'<tr>' +
							'<td class="oned-rect">' +
							'</td>' +
							'<td class="oned">' +
								'OneD Index: ' + d.meta.oned_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="economy-rect">' +
							'</td>' +
							'<td class="economy">' +
								d.indicies[0].name + ': ' + d.indicies[0].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="education-rect">' +
							'</td>' +
							'<td class="education">' +
								d.indicies[1].name + ': ' + d.indicies[1].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="equity-rect">' +
							'</td>' +
							'<td class="equity">' +
								d.indicies[2].name + ': ' + d.indicies[2].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="quality_of_life-rect">' +
							'</td>' +
							'<td class="quality_of_life">' +
								d.indicies[3].name + ': ' + d.indicies[3].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="transit-rect">' +
							'</td>' +
							'<td class="transit">' +
								d.indicies[4].name + ': ' + d.indicies[4].index +
							'</td>' +
						'</tr>' +
					'</table>'				
				)  
	                .style("left", (d3.event.pageX + 15) + "px")     
	                .style("top", (d3.event.pageY - 100) + "px");
				
		   })
		   .on("mouseout", function() {
		   
			   div.transition()
			       .duration(250)
			       .style("opacity", 1e-6);
				
		   });
			
 	}
	
	
	// draw the visualization
	drawComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions);
	
	/**** End code for creating the pinwheel ****/

} // close createPinwheel function


// update pinwheel
function updatePinwheel(size, smallestPie, rowOfData, svgContainer, centerX, centerY) {
			
	/**** Common pinwheel code ****/
	// Function to draw a single arc for the pinwheel
	// Input: Drawing options object containing
	// width: degrees of width to draw (ie 5 or 15)
	// from: integer, inner radius
	// to: function returning the outer radius
	// Output: a function that when called, generates SVG paths.
	// It expects to be called via D3 with data objects from totalsToFrequences()
	var arc = function(o) {
		//console.log(o);
		return d3.svg.arc()
			.startAngle(function(d) { return (d.angle - o.width) * Math.PI/180; })
			.endAngle(function(d) { return (d.angle + o.width) * Math.PI/180; })
			.innerRadius(o.from)
			.outerRadius(function(d) { return o.to(d.index) });
	};

	/**** End common pinwheel code ****/


	/**** Code for creating the pinwheel ****/

	// Map a index value to an outer radius for the chart
	var indexToRadiusScale = d3.scale.linear()
		.domain([0, 5]) // indicies go from 0 to 5
		.range([smallestPie, size]) // output range 
		.clamp(true);
	
	function indexToRadius(d) { 
		return indexToRadiusScale(d); 
	}

	// Options for drawing the complex arc chart
	var pinwheelArcOptions = {
		width: 22.5,
		from: 0,
		to: indexToRadius
	} 

	// repeating scale with your own colors
	var colorFunc = d3.scale.ordinal()
		.range(["#BCD3DD","#ED8E7C","#88A8B5","#F7C98D","#B3CE7A"]);

	// set location of strike area for popups 
	var popupCenterX = centerX - (size*1.5)/2;
	var popupCenterY = centerY - (size*1.5)/2;
	var rectSize = size*1.5;
	
	//set up container for mouseover interaction
	var div = d3.select("body").append("div")
	    .attr("class", "pinwheelTooltip")
	    .style("opacity", 1e-6);	

	// Function to draw all of the pinwheel arcs
	function updateComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions) {
		// need Ids for pinwheels to update later
		var geoid = rowOfData.meta.geoid;

		// Draw the main wind rose arcs
		var pinwheel = svgContainer.select("#g" + geoid)
			.selectAll("path")
			.data(rowOfData.indicies)
			.transition().duration(1000)
			.attr("d", arc(pinwheelArcOptions))
			.style("fill", function(d, i) { return colorFunc(i); });
			//.attr("transform", "translate(" + centerX + "," + centerY + ")");
			
		var clickableOverlay = svgContainer.select("#rect" + geoid)
			.data([rowOfData])
						
			// set up on mouseover events
			.on("mouseover", function(d) {
				//console.log(d);
				
			    div.transition()
			        .duration(250)
			        .style("opacity", 1);
				
	            div.html(
					'<h5>' + d.meta.metro + '</h5>' +
					'<h5>' + d.meta.year + '</h5>' +
					'<table class="table table-condensed">' +
						'<tr>' +
							'<td class="oned-rect">' +
							'</td>' +
							'<td class="oned">' +
								'OneD Index: ' + d.meta.oned_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="economy-rect">' +
							'</td>' +
							'<td class="economy">' +
								d.indicies[0].name + ': ' + d.indicies[0].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="education-rect">' +
							'</td>' +
							'<td class="education">' +
								d.indicies[1].name + ': ' + d.indicies[1].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="equity-rect">' +
							'</td>' +
							'<td class="equity">' +
								d.indicies[2].name + ': ' + d.indicies[2].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="quality_of_life-rect">' +
							'</td>' +
							'<td class="quality_of_life">' +
								d.indicies[3].name + ': ' + d.indicies[3].index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="transit-rect">' +
							'</td>' +
							'<td class="transit">' +
								d.indicies[4].name + ': ' + d.indicies[4].index +
							'</td>' +
						'</tr>' +
					'</table>'				
				)  
	                .style("left", (d3.event.pageX + 15) + "px")     
	                .style("top", (d3.event.pageY - 100) + "px");
				
		   })
		   .on("mouseout", function() {
		   
			   div.transition()
			       .duration(250)
			       .style("opacity", 1e-6);
				
		   });
			
 	}
	
	
	// draw the visualization
	updateComplexArcs(svgContainer, rowOfData, colorFunc, pinwheelArcOptions);
	
	/**** End code for creating the pinwheel ****/

} // close createPinwheel function






