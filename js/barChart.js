/*
* Create and update bar chart functions 
* svgContainer: the SVG container we want to pass the bar chart back to
* datasetIndicators: filtered data to be plotted on bar chart
* textTick: the text and ticks that show up on the chart
* based on simple bar chart from Mike Bostock @ http://bl.ocks.org/mbostock/3885304
*/
function createBarChart(svgContainer, datasetIndicators, textTick) {
	
	//set up container for mouseover interaction
	var div = d3.select("body").append("div")
	    .attr("class", "pinwheelTooltip")
	    .style("opacity", 1e-6);
	
	var margin = {top: 20, right: 20, bottom: 20, left: 90},
	    widthBarChart = width - margin.left - margin.right,
	    heightBarChart = height - margin.top - margin.bottom;
		
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, widthBarChart], .1);

	var y = d3.scale.linear()
	    .range([heightBarChart, margin.top]);
		
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
		.tickFormat(textTick.tickFormat);
		
	var svg = svgContainer.append("g")
		.attr("class", "mainWrapper")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
    x.domain(datasetIndicators.map(function(d) { return d.metro; }));
	
	//set y domain from zero to d.max only if d.min is above zero
	var dataMin = d3.min(datasetIndicators, function(d) { return d.value; });
	if ( dataMin > 0 || dataMin == -99 ) {
		var min = 0;
	} else {
		var min = d3.min(datasetIndicators, function(d) { return d.value; });
	}
	
	// if an index, set the Y domain max to 5
	if (textTick.index == 'Yes') {
		y.domain([min, 5]);
	} else {
	    y.domain([min, d3.max(datasetIndicators, function(d) { return d.value; })]);		
	}
	

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
	  	.attr("class", "axisText")
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("x", "-" + margin.top)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(textTick.text);

    svg.selectAll(".bar")
        .data(datasetIndicators, function(d) { return d.id; })
      .enter().append("rect")
	    .attr("class", function(d) { 
			if (d.geoid == 15 && textTick.tableClass == 'economy') { 
				return "barDetroitEconomy"; 
			} else if (d.geoid == 15 && textTick.tableClass == 'education') {
				return "barDetroitEducation";
			} else if (d.geoid == 15 && textTick.tableClass == 'equity') {
				return "barDetroitEquity";
			} else if (d.geoid == 15 && textTick.tableClass == 'quality_of_life') {
				return "barDetroitQol";
			} else if (d.geoid == 15 && textTick.tableClass == 'transit') {
				return "barDetroitTransit";
			} else if (d.geoid == 15 && textTick.tableClass == 'oned') {
				return "barDetroit";
			} else {
				return "bar";
			} 
		})
        .attr("x", function(d, i) { return x(d.metro); })
        .attr("width", x.rangeBand())
        .attr("y", function(d, i) { return y(Math.max(0, d.value)); })
        .attr("height", function(d) { 
        	if (d.value != -99) {
        		return Math.abs(y(d.value) - y(0)); 
        	} else {
        		return 0; 
        	}
        	
        })
		
		// set up on mouseover events
		.on("mouseover", function(d) {
			//console.log(d);
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
			if (textTick.scored == "Positive" && textTick.index == "No") {
				var plusMinus = '<span class="glyphicon glyphicon-plus"></span>';			
			} else if (textTick.scored == "Negative" && textTick.index == "No") {
				var plusMinus = '<span class="glyphicon glyphicon-minus"></span>';							
			} else {
				var plusMinus = '';
			}
			
            div.html(
				'<h5>' + d.metro + '</h5>' +
				'<h5>' + d.year + '</h5>' +
				'<table class="table table-condensed">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' + plusMinus + '</td>' +
						'<td class="' + textTick.tableClass + '">' +
							textTick.indicatorName + ': ' + textTick.tickFormat(d.value) +
						'</td>' +
					'</tr>' +
				'</table>'				
			)  
            .style("left", (d3.event.pageX + 23) + "px")     
            .style("top", (d3.event.pageY - 40) + "px");
			
	   })

		.on("mousemove", function(d) {

			div.style("left", (d3.event.pageX + 23) + "px")     
               .style("top", (d3.event.pageY - 40) + "px");
			  
		})

	   .on("mouseout", function() {
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   
	svg.append("g")
		.attr("class", "x axis")
		.append("line")
		.attr("y1", y(0))
		.attr("y2", y(0))
		.attr("x1", 0)
		.attr("x2", width - margin.right);
		
	// print "no data" if dataset max and min = 0
	if ((d3.min(datasetIndicators, function(d) { return d.value; }) == 0 ) && (d3.max(datasetIndicators, function(d) { return d.value; }) == 0 )) {
		svg.append("g")
			.attr("class", "noData")
			.append("text")
			.attr("x", widthBarChart)
			.attr("y", heightBarChart)
			.text("No Data Available");
	}
		

} // close createBarChart function


// update barchart
function updateBarChart(svgContainer, datasetIndicators, textTick, city) {
	
	var noData = svgContainer.select(".noData");
	if (!noData) {
		// do nothing
	} else {
		noData.remove();
	}
			
	//set up container for mouseover interaction
	var div = d3.select("body").append("div")
	    .attr("class", "pinwheelTooltip")
	    .style("opacity", 1e-6);
	
	var margin = {top: 20, right: 20, bottom: 20, left: 90},
	    widthBarChart = width - margin.left - margin.right,
	    heightBarChart = height - margin.top - margin.bottom;
		
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, widthBarChart], .1);

	var y = d3.scale.linear()
	    .range([heightBarChart, margin.top]);
		
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
		.tickFormat(textTick.tickFormat);
						
    x.domain(datasetIndicators.map(function(d) { return d.metro; }));

	//set y domain from zero to d.max only if d.min is above zero
	var dataMin = d3.min(datasetIndicators, function(d) { return d.value; });
	if ( dataMin > 0 || dataMin == -99 ) {
		var min = 0;
	} else {
		var min = d3.min(datasetIndicators, function(d) { return d.value; });
	}
	
	// if an index, set the Y domain max to 5
	if (textTick.index == 'Yes') {
		y.domain([min, 5]);
	} else {
	    y.domain([min, d3.max(datasetIndicators, function(d) { return d.value; })]);		
	}
	
	var svg = svgContainer.select(".mainWrapper");

    svgContainer.select(".axisText")
		.transition().duration(1500)
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("x", "-" + margin.top)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(textTick.text);

    svgContainer.select(".y.axis")
		.transition().duration(1500)
        .call(yAxis);
		
    var rect = svg.selectAll("rect")	
		.data(datasetIndicators, function(d) { return d.id; });
		
	rect.enter().append("rect")
	    .attr("class", function(d) { 
			if (d.geoid == 15 && textTick.tableClass == 'economy') { 
				return "barDetroitEconomy"; 
			} else if (d.geoid == 15 && textTick.tableClass == 'education') {
				return "barDetroitEducation";
			} else if (d.geoid == 15 && textTick.tableClass == 'equity') {
				return "barDetroitEquity";
			} else if (d.geoid == 15 && textTick.tableClass == 'quality_of_life') {
				return "barDetroitQol";
			} else if (d.geoid == 15 && textTick.tableClass == 'transit') {
				return "barDetroitTransit";
			} else if (d.geoid == 15 && textTick.tableClass == 'oned') {
				return "barDetroit";
			} else if (d.geoid == city) {
				return "barSelected";
			} else {
				return "bar";
			} 
		})
	    .attr("x", function(d, i) { return x(d.metro); })
	    .attr("width", x.rangeBand())
	    .attr("y", function(d, i) { return y(Math.max(0, d.value)); })
	    .attr("height", 0 );
				
	rect.transition().duration(1500)
	    .attr("class", function(d) { 
			if (d.geoid == 15 && textTick.tableClass == 'economy') { 
				return "barDetroitEconomy"; 
			} else if (d.geoid == 15 && textTick.tableClass == 'education') {
				return "barDetroitEducation";
			} else if (d.geoid == 15 && textTick.tableClass == 'equity') {
				return "barDetroitEquity";
			} else if (d.geoid == 15 && textTick.tableClass == 'quality_of_life') {
				return "barDetroitQol";
			} else if (d.geoid == 15 && textTick.tableClass == 'transit') {
				return "barDetroitTransit";
			} else if (d.geoid == 15 && textTick.tableClass == 'oned') {
				return "barDetroit";
			} else if (d.geoid == city) {
				return "barSelected";
			} else {
				return "bar";
			} 
		})
        .attr("x", function(d) { return x(d.metro); })
        .attr("width", x.rangeBand())
        .attr("y", function(d, i) { return y(Math.max(0, d.value)); })
        .attr("height", function(d) { 
        	if (d.value != -99) {
        		return Math.abs(y(d.value) - y(0)); 
        	} else {
        		return 0; 
        	}
        	
        })
		
	rect.exit()
		.transition()
		.duration(1500)
		.attr("height", 0 )
		.remove();
		
		
		// set up on mouseover events
	rect.on("mouseover", function(d) {
			//console.log(d);
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
			if (textTick.scored == "Positive" && textTick.index == "No") {
				var plusMinus = '<span class="glyphicon glyphicon-plus"></span>';			
			} else if (textTick.scored == "Negative" && textTick.index == "No") {
				var plusMinus = '<span class="glyphicon glyphicon-minus"></span>';							
			} else {
				var plusMinus = '';
			}
		
            div.html(
				'<h5>' + d.metro + '</h5>' +
				'<h5>' + d.year + '</h5>' +
				'<table class="table table-condensed">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' + plusMinus + '</td>' +
						'<td class="' + textTick.tableClass + '">' +
							textTick.indicatorName + ': ' + textTick.tickFormat(d.value) +
						'</td>' +
					'</tr>' +
				'</table>'				
			) 
            .style("left", (d3.event.pageX + 23) + "px")     
            .style("top", (d3.event.pageY - 40) + "px");
			
	   })

		.on("mousemove", function(d) {

			div.style("left", (d3.event.pageX + 23) + "px")     
               .style("top", (d3.event.pageY - 40) + "px");
			  
		})

	   .on("mouseout", function() {
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   
   	svgContainer.select(".x.axis")
		.select("line")
		.transition().duration(1500)
   		.attr("y1", y(0))
   		.attr("y2", y(0))
   		.attr("x1", 0)
   		.attr("x2", width - margin.right);
		
	// print "no data" if dataset max and min = 0
	if ((d3.min(datasetIndicators, function(d) { return d.value; }) == 0 ) && (d3.max(datasetIndicators, function(d) { return d.value; }) == 0 )) {
		svgContainer.append("g")
			.attr("class", "noData")
			.append("text")
			.attr("x", widthBarChart/2.3)
			.attr("y", heightBarChart/2)
			.attr("font-size", "36px")
			.attr("fill", "#6D6E70")
			.text("No Data Available");
	} 
	  
	

} // close update bar chart function






