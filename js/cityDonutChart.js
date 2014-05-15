/*
* create city donut to display the city level dataset, as well as the right hand table housing the indicators
* svgContainer: the SVG container to place the diagram into
* dataset: the csv data 
* leverages the reusable circular heat chart in assets/js/cityCircularHeatChart.js extended from work by by Peter Cook (https://github.com/prcweb/d3-circularheat)
*/

function createCityDountChart(svgContainer, dataset, selectedIndicator) {
	
	// no legend for now
	/*
	// draw legend once
	if ($( window ).width() > 992) {
		var left = (($( window ).width()) * 0.48) - (($( window ).width()) * 0.01);
	} else if ($( window ).width() > 1200) {
		var left = (($( window ).width()) * 0.48) - (($( window ).width()) * 0.03);
	} else {
		var left = (($( window ).width()) * 0.48);
	}
	var legendHeat = d3.select("#heatLegendDonut").append("div")
		.append("img")
		.attr("class", "legendsVis")
	    .attr("src", "assets/images/IntensityLegend2Small.png")
	    .attr("width", 150)
	    .attr("height", 98)		    
        .style("left", left + "px")     
        .style("top", (((($( window ).width()) * 2.5) * 100) / width) + "px");
	*/
		
    /* Arc functions */
    rsa = function(d, i) {
		//console.log(d.start);
        return (i * 2 * Math.PI) / numSegments;
    }
    rea = function(d, i) {
		//console.log(d.end);
        return ((i + 1) * 2 * Math.PI) / numSegments;
    }

    /* Arc functions */
    ir = function(d, i) {
        return d.innerRadius;
    }
    or = function(d, i) {
        return d.outerRadius;
    }
    sa = function(d, i) {
        //return ((d.sliceNumber/d.sliceWidth) * d.catetoryCount * 2 * Math.PI) / numSegments;
		return ( ( (d.catetoryCount - 1) + ( (d.sliceNumber - 1) / d.sliceWidth ) ) * 2 * Math.PI ) / numSegments;
    }
    ea = function(d, i) {
        //return (((d.sliceNumber + 1)/d.sliceWidth) * d.catetoryCount * 2 * Math.PI) / numSegments;
		return ( ( (d.catetoryCount - 1) + ( d.sliceNumber / d.sliceWidth ) ) * 2 * Math.PI ) / numSegments;
    }
	
    /* color functions */
	// set color based on the ring
    function colorFunction(id) {
		var textTick = getTextTick(id);
		var colorClass = textTick.tableClass;
		
		if (colorClass == 'economy') {
			range = ["white", "#a6c0d0"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 26 && colorClass == 'education') { // Percent Teens Not Enrolled in School, No HS Diploma, Unemployed -- scored inversely
			range = ["#d94f26", "white"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (colorClass == 'education') {
			range = ["white", "#d94f26"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (id == 28 && colorClass == 'equity') { // Gini Index inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 32 && colorClass == 'equity') { // Second Highest Quintile of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 33 && colorClass == 'equity') { // Highest Quintile of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 34 && colorClass == 'equity') { // Top 5% of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 39 && colorClass == 'equity') { // Percent of Black Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 40 && colorClass == 'equity') { // Percent of Hispanic Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 41 && colorClass == 'equity') { // Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 42 && colorClass == 'equity') { // Percent of Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'equity') {
			range = ["white", "#20698a"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 50 && colorClass == 'quality_of_life') { // Percent Population Without Health Insurance inversely scored
			range = ["#f5a91d", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 51 && colorClass == 'quality_of_life') { // Total Violent Crimes per 100,000 Residents
			range = ["#f5a91d", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'quality_of_life') {
			range = ["white", "#f5a91d"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 55 && colorClass == 'transit') { // Annual Hours of Delay per Auto Commuter
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 56 && colorClass == 'transit') { // Percent of Workers 16+ Driving Alone to Work
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 57 && colorClass == 'transit') { // Percent of Workers with No Vehicle
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'transit') {
			range = ["white", "#87af3f"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else {
			range = ["none", "none"];
			var color = d3.scale.linear().domain(domain).range(range);		
		}		
		return color;
    }
	
	// set domain for colors
	function setDomain(id) {
		var textTick = getTextTick(id);
		if (Object.size(textTick) == 0) {
			domain = [0,0];
		} else {
			var accessorFunction = textTick.accessorFunction;
			domain = d3.extent(datasetIndicators, accessorFunction);			
		}
		return domain;
	}
	
   	//set up container for dropdown interaction
	// pull textTick record
	var textTick = getTextTick(selectedIndicator);
	//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
	var value = textTick.tickFormat(dataset.economy[4].value);
	if (value == 0) {
		value = "No Data Available";
	}

   	var div = d3.select(".cityDonutChartSidebarSelected")
   	    .style("opacity", 1)	
        .html(
			'<h4>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h4>' +
			'<table class="table table-condensed">' +
				'<tr>' +
					'<td class="' + textTick.tableClass + '-rect">' +
					'</td>' +
					'<td class="' + textTick.tableClass + '">' +
						dataset.meta[0].metro + ': ' + value +
					'</td>' +
				'</tr>' +
			'</table>'				
		);
	
    var margin = {top: 0, right: 20, bottom: 0, left: 0},
	numSegments = 5,
	innerRadius = 30,
	outerRadius = innerRadius + 180,
    domain = null,
    range = ["white", "red"],
	accessor = function(d) {return d;},
	offset = height/2;	
					   
    graph = svgContainer.append("g")
        .classed("circular-heat", true)
        .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
		
    graph.selectAll("path")
		.data(dataset.indicators)
        .enter().append("path")
        .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
		.style("fill-opacity", 1)
        .attr("fill", function(d, i) {
			var domain = setDomain(d.id);
			var color = colorFunction(d.id);
			return color(accessor(d.value));
		});

	
	// create segments for regions
   	seg = svgContainer.append('g')
   		.classed("circular-heat-dividers", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

   	seg.selectAll("path")
   		.data(dataset.priorityAreas)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(rsa).endAngle(rea))
   		.attr('fill', 'none')
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "1.5px");
		
	// create segments for region labels   
   	br = svgContainer.append('g')
   		.classed("circular-heat-bounding-rim", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

   	br.selectAll("path")
   		.data(dataset.priorityAreas)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(outerRadius).outerRadius(outerRadius + 20).startAngle(rsa).endAngle(rea))
   		.attr('fill', function(d) { return d.color; })
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "1.5px");
		   	   
   	//set up container for mouseover interaction
   	var div = d3.select(".cityDonutChartSidebar")
   	    .style("opacity", 1);
	   		   	   
	g = svgContainer.append('g')
		.classed("circular-heat-overlay", true)
		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

	g.selectAll("path")
		.data(dataset.indicators)
		.enter()
		.append("path")
		.attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
		.attr("stroke", function(d) { 
			if (d.id == selectedIndicator) {
				return "#303030";
			} else {
				return "none"; 
			} 
		})
		.attr("stroke-width", function(d) { 
			if (d.id == selectedIndicator) {
				return "3px";
			} else {
				return "0px"; 
			} 
		})
		
		

		// set up on mouseover events
		.on("mouseover", function(d, i) {
			//console.log(dataset.meta[0].metro);
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.id == selectedIndicator) {
						return "#303030";
					} else {
						return "#6D6E70"; 
					} 
				})
				.attr("stroke-width", "3px");		   
		
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
				
			// pull textTick record
			var textTick = getTextTick(d.id);
			//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
			
			if (d.value == 0) {
				var value = "No Data Available";
			} else {
				var value = textTick.tickFormat(d.value);				
			}
			
            div.html(
				'<h5>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h5>' +
				'<table class="table table-condensed heatmapTable">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick.tableClass + '">' +
							dataset.meta[0].metro + ': ' + value +
						'</td>' +
					'</tr>' +
				'</table>'				
			);
		
	   })
	   .on("mouseout", function() {
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.id == selectedIndicator) {
						return "#303030";
					} else {
						return "none"; 
					} 
				})		   			
				.attr("stroke-width", function(d) { 
					if (d.id == selectedIndicator) {
						return "3px";
					} else {
						return "0px"; 
					} 
				});		   
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   	
		
	// create segment labels
    // Unique id so that the text path defs are unique - is there a better way to do this?
    var id = d3.selectAll(".circular-heat-bounding-rim")[0].length;
    var segmentLabelOffset = 2;
    var r = outerRadius + segmentLabelOffset;
   	labels = svgContainer.append('g')
        .classed("labels", true)
        .classed("segment", true)
        .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
		   
    labels.append("def")
        .append("path")
        .attr("id", "segment-label-path-"+id)
        .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

    labels.selectAll("text")
        .data(dataset.priorityAreas).enter()
        .append("text")
        .append("textPath")
        .attr("xlink:href", "#segment-label-path-"+id)
        .attr("startOffset", function(d, i) {return (i + 0.35) * 100 / numSegments + "%";})
        .text(function(d) {return d.priorityArea;});
		
	
}


function updateCityDonutChart(svgContainer, dataset, selectedIndicator) {
    /* Arc functions */
    rsa = function(d, i) {
		//console.log(d.start);
        return (i * 2 * Math.PI) / numSegments;
    }
    rea = function(d, i) {
		//console.log(d.end);
        return ((i + 1) * 2 * Math.PI) / numSegments;
    }

    /* Arc functions */
    ir = function(d, i) {
        return d.innerRadius;
    }
    or = function(d, i) {
        return d.outerRadius;
    }
    sa = function(d, i) {
        //return ((d.sliceNumber/d.sliceWidth) * d.catetoryCount * 2 * Math.PI) / numSegments;
		return ( ( (d.catetoryCount - 1) + ( (d.sliceNumber - 1) / d.sliceWidth ) ) * 2 * Math.PI ) / numSegments;
    }
    ea = function(d, i) {
        //return (((d.sliceNumber + 1)/d.sliceWidth) * d.catetoryCount * 2 * Math.PI) / numSegments;
		return ( ( (d.catetoryCount - 1) + ( d.sliceNumber / d.sliceWidth ) ) * 2 * Math.PI ) / numSegments;
    }
	
    /* color functions */
	// set color based on the ring
    function colorFunction(id) {
		var textTick = getTextTick(id);
		var colorClass = textTick.tableClass;
		
		if (colorClass == 'economy') {
			range = ["white", "#a6c0d0"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 26 && colorClass == 'education') { // Percent Teens Not Enrolled in School, No HS Diploma, Unemployed -- scored inversely
			range = ["#d94f26", "white"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (colorClass == 'education') {
			range = ["white", "#d94f26"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (id == 28 && colorClass == 'equity') { // Gini Index inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 32 && colorClass == 'equity') { // Second Highest Quintile of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 33 && colorClass == 'equity') { // Highest Quintile of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 34 && colorClass == 'equity') { // Top 5% of Households Share of Aggregate Income inversely scored
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 39 && colorClass == 'equity') { // Percent of Black Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 40 && colorClass == 'equity') { // Percent of Hispanic Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 41 && colorClass == 'equity') { // Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 42 && colorClass == 'equity') { // Percent of Population Under 18 Below 100% of Poverty Level
			range = ["#20698a", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'equity') {
			range = ["white", "#20698a"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 50 && colorClass == 'quality_of_life') { // Percent Population Without Health Insurance inversely scored
			range = ["#f5a91d", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 51 && colorClass == 'quality_of_life') { // Total Violent Crimes per 100,000 Residents
			range = ["#f5a91d", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'quality_of_life') {
			range = ["white", "#f5a91d"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 55 && colorClass == 'transit') { // Annual Hours of Delay per Auto Commuter
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 56 && colorClass == 'transit') { // Percent of Workers 16+ Driving Alone to Work
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (id == 57 && colorClass == 'transit') { // Percent of Workers with No Vehicle
			range = ["#87af3f", "white"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'transit') {
			range = ["white", "#87af3f"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else {
			range = ["none", "none"];
			var color = d3.scale.linear().domain(domain).range(range);		
		}		
		return color;
    }
	
	// set domain for colors
	function setDomain(id) {
		var textTick = getTextTick(id);
		if (Object.size(textTick) == 0) {
			domain = [0,0];
		} else {
			var accessorFunction = textTick.accessorFunction;
			domain = d3.extent(datasetIndicators, accessorFunction);			
		}
		return domain;
	}
	
   	//set up container for dropdown interaction
	// pull textTick record
	var textTick = getTextTick(selectedIndicator);
	var textTick1 = getTextTick(selectedIndicator-3);
	var textTick2 = getTextTick(selectedIndicator-2);
	var textTick3 = getTextTick(selectedIndicator-1);
	//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
	var value = 0;
	var value1 = 0;
	var value2 = 0;
	var value3 = 0;
	
	// iterate though the indicators dataset to find the value
	$.each(dataset.indicators, function( i, d ) {	
		if (dataset.indicators[i].id == selectedIndicator) {
			if (d.value == 0) {
				value = "No Data Available";
			} else {
				value = textTick.tickFormat(dataset.indicators[i].value);			
			}				
		}
		
		// harcoding for the three varibles with multiple components
		if ((dataset.indicators[i].id == 38 && selectedIndicator == 38) || (dataset.indicators[i].id == 42 && selectedIndicator == 42) || (dataset.indicators[i].id == 46 && selectedIndicator == 46)) {
			var count1 = i-3;
			var count2 = i-2;
			var count3 = i-1;
			
			if (dataset.indicators[count1].value == 0) {
				value1 = "No Data Available";
			} else {
				value1 = textTick1.tickFormat(dataset.indicators[count1].value);			
			}
			
			if (dataset.indicators[count2].value == 0) {
				value2 = "No Data Available";
			} else {
				value2 = textTick1.tickFormat(dataset.indicators[count2].value);			
			}
			
			if (dataset.indicators[count3].value == 0) {
				value3 = "No Data Available";
			} else {
				value3 = textTick1.tickFormat(dataset.indicators[count3].value);			
			}
		}
	});

	// harcoding for the three varibles with multiple components
	if (selectedIndicator == 38 || selectedIndicator == 42 || selectedIndicator == 46) {
		
	   	var div = d3.select(".cityDonutChartSidebarSelected")
	   	    .style("opacity", 1)	
	        .html(
				'<h4>' + textTick.indicatorName +  ', ' + dataset.meta[0].metro + ', ' + dataset.meta[0].year +'</h4>' +
				'<table class="table table-condensed">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick.tableClass + '">' +
							textTick.indicatorName + ': ' + value +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="' + textTick1.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick1.tableClass + '">' +
							textTick1.indicatorName + ': ' + value1 +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="' + textTick2.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick2.tableClass + '">' +
							textTick2.indicatorName + ': ' + value2 +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="' + textTick3.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick3.tableClass + '">' +
							textTick3.indicatorName + ': ' + value3 +
						'</td>' +
					'</tr>' +
				'</table>'				
			);				
	
	} else {
	   	var div = d3.select(".cityDonutChartSidebarSelected")
	   	    .style("opacity", 1)	
	        .html(
				'<h4>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h4>' +
				'<table class="table table-condensed">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick.tableClass + '">' +
							dataset.meta[0].metro + ': ' + value +
						'</td>' +
					'</tr>' +
				'</table>'				
			);	
	}

	
    var margin = {top: 0, right: 20, bottom: 0, left: 0},
	numSegments = 5,
	innerRadius = 30,
	outerRadius = innerRadius + 180,
    domain = null,
    range = ["white", "red"],
	accessor = function(d) {return d;},
	offset = height/2;	
	   
	  		
	chart = svgContainer.select(".circular-heat");
	
	chart.selectAll("path")
		.data(dataset.indicators)
		.transition().duration(1000)
        .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
        .attr("fill", function(d, i) {
			var domain = setDomain(d.id);
			var color = colorFunction(d.id);
			return color(accessor(d.value));				
		})
		.style("fill-opacity", function(d, i) {
			if (((selectedIndicator == 38 || selectedIndicator == 37 || selectedIndicator == 36 || selectedIndicator == 35 ) && d.id == 38) || ((selectedIndicator == 42 || selectedIndicator == 41 || selectedIndicator == 40 || selectedIndicator == 39 ) && d.id == 42) || ((selectedIndicator == 46 || selectedIndicator == 45 || selectedIndicator == 44 || selectedIndicator == 43 ) && d.id == 46)) {
				return 0;
			} else {
				return 1;		
			}			
		});
		
   	//set up container for mouseover interaction
   	var div = d3.select(".cityDonutChartSidebar")
   	    .style("opacity", 1e-6);
			   	   
	g = svgContainer.select(".circular-heat-overlay");
	
	g.selectAll("path")
		.data(dataset.indicators)
		.attr("stroke", function(d) { 
			if (d.id == selectedIndicator) {
				return "#303030";
			} else {
				return "none"; 
			} 
		})
		.attr("stroke-width", function(d) { 
			if (d.id == selectedIndicator) {
				return "3px";
			} else {
				return "0px"; 
			} 
		})
				
		// set up on mouseover events
		.on("mouseover", function(d, i) {
			//console.log(dataset.meta[0].metro);
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.id == selectedIndicator) {
						return "#303030";
					} else {
						return "#6D6E70"; 
					} 
				})
				.attr("stroke-width", "3px");		   
		
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
				
			// pull textTick record
			var textTick = getTextTick(d.id);
			//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
			
			if (d.value == 0) {
				var value = "No Data Available";
			} else {
				var value = textTick.tickFormat(d.value);			
			}
					
            div.html(
				'<h5>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h5>' +
				'<table class="table table-condensed heatmapTable">' +
					'<tr>' +
						'<td class="' + textTick.tableClass + '-rect">' +
						'</td>' +
						'<td class="' + textTick.tableClass + '">' +
							dataset.meta[0].metro + ': ' + value +
						'</td>' +
					'</tr>' +
				'</table>'				
			);
		
	   })
	   .on("mouseout", function() {
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.id == selectedIndicator) {
						return "#303030";
					} else {
						return "none"; 
					} 
				})		   			
				.attr("stroke-width", function(d) { 
					if (d.id == selectedIndicator) {
						return "3px";
					} else {
						return "0px"; 
					} 
				});	
				
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });	   
	
}

