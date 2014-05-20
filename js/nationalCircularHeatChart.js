/*
* create national level circular heat chart to display the national dataset, as well as the right hand table housing the indicators
* svgContainer: the SVG container to place the diagram into
* dataset: the csv data 
* leverages the reusable circular heat chart in assets/js/circularHeatChart.js extended from work by by Peter Cook (https://github.com/prcweb/d3-circularheat)
*/

function createNationalCircularHeatChart(svgContainer, dataset, numberOfCities, city) {
	
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
	var legendHeat = d3.select("#heatLegend").append("div")
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
        return ((d.start * 2 * Math.PI) / numSegments);
    }
    rea = function(d, i) {
		//console.log(d.end);
        return (d.end * 2 * Math.PI) / numSegments;
    }	
	
	var chart = nationalCircularHeatChart()
	    .segmentHeight(36)
	    .innerRadius(30)
	    .numSegments(numberOfCities)
		.margin({top: 0, right: 20, bottom: 0, left: 0})
			   
	   svgContainer.selectAll('svg')
	       .data([dataset.indicies])
	       .enter()
	       .append('svg')
	       .call(chart);
		   	   
   	//set up container for mouseover interaction
   	var div = d3.select(".nationalCircularHeatChartSidebar")
   	    .style("opacity", 1);

   	//set up container for dropdown interaction
	$.each(dataset.meta, function( i, d ) {
		if (dataset.meta[i].geoid == city) {
		   	var div = d3.select(".nationalCircularHeatChartSidebarSelected")
		   	    .style("opacity", 1)
				.html(
					'<h4>' + dataset.meta[i].metro + '</h4>' +
					'<table class="table table-condensed">' +
						'<tr>' +
							'<td class="oned-rect">' +
							'</td>' +
							'<td class="oned">' +
								'OneD Index: ' + dataset.meta[i].oned_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="economy-rect">' +
							'</td>' +
							'<td class="economy">' +
								'Economy Index: ' + dataset.meta[i].economy_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="education-rect">' +
							'</td>' +
							'<td class="education">' +
								'Education Index: ' + dataset.meta[i].education_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="equity-rect">' +
							'</td>' +
							'<td class="equity">' +
								'Equity Index: ' + dataset.meta[i].equity_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="quality_of_life-rect">' +
							'</td>' +
							'<td class="quality_of_life">' +
								'Quality of Life Index: ' + dataset.meta[i].quality_of_life_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="transit-rect">' +
							'</td>' +
							'<td class="transit">' +
								'Transit Index: ' + dataset.meta[i].transit_index +
							'</td>' +
						'</tr>' +
					'</table>'		
				);
		}	
	});
	   
   	// set up varibles
    var margin = {top: 0, right: 20, bottom: 0, left: 0},
    innerRadius = 30,
    numSegments = numberOfCities,
    segmentHeight = 36,
    accessor = function(d) {return d;},
	offset = height/2;
	
	// create segments for regions
   	seg = svgContainer.select("svg")
   		.append('g')
   		.classed("circular-heat-dividers", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
   
   	seg.selectAll("path")
   		.data(dataset.regions)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(innerRadius + (segmentHeight * 5)).startAngle(rsa).endAngle(rea))
   		.attr('fill', 'none')
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "1.5px");
			
	// create segments for region labels   
   	br = svgContainer.select("svg")
   		.append('g')
   		.classed("circular-heat-bounding-rim", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
	   
   	br.selectAll("path")
   		.data(dataset.regions)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(innerRadius + (segmentHeight * 5)).outerRadius(innerRadius + (segmentHeight * 5) + 20).startAngle(rsa).endAngle(rea))
   		.attr('fill', '#BBBDBF')
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "1.5px");

	// create a transparent overlay for mouseover 	   
	g = svgContainer.select("svg")
		.append('g')
		.classed("circular-heat-overlay", true)
		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

	g.selectAll("path")
		.data(dataset.meta)
		.enter()
		.append("path")
		.attr("id", function(d) { return 'g' + d.geoid })
		.attr("d", d3.svg.arc().innerRadius(ir).outerRadius(innerRadius + (segmentHeight * 5)).startAngle(sa).endAngle(ea))
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
		.attr("stroke", function(d) { 
			if (d.geoid == city) {
				return "#303030";
			} else {
				return "none"; 
			} 
		})
		.attr("stroke-width", function(d) { 
			if (d.geoid == city) {
				return "3px";
			} else {
				return "0px"; 
			} 
		})
		
		
		// set up on mouseover events
		.on("mouseover", function(d) {
			//console.log(d);
			
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.geoid == city) {
						return "#303030";
					} else {
						return "#6D6E70"; 
					} 
				})
				.attr("stroke-width", "3px");		   
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
            div.html(
				'<h5>' + d.metro + ', ' + d.year +'</h5>' +
				'<table class="table table-condensed heatmapTable">' +
					'<tr>' +
						'<td class="oned-rect">' +
						'</td>' +
						'<td class="oned">' +
							'OneD Index: ' + d.oned_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="economy-rect">' +
						'</td>' +
						'<td class="economy">' +
							'Economy Index: ' + d.economy_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="education-rect">' +
						'</td>' +
						'<td class="education">' +
							'Education Index: ' + d.education_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="equity-rect">' +
						'</td>' +
						'<td class="equity">' +
							'Equity Index: ' + d.equity_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="quality_of_life-rect">' +
						'</td>' +
						'<td class="quality_of_life">' +
							'Quality of Life Index: ' + d.quality_of_life_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="transit-rect">' +
						'</td>' +
						'<td class="transit">' +
							'Transit Index: ' + d.transit_index +
						'</td>' +
					'</tr>' +
				'</table>'				
			);
			
	   })
	   .on("mouseout", function() {
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.geoid == city) {
						return "#303030";
					} else {
						return "none"; 
					} 
				})		   			
				.attr("stroke-width", function(d) { 
					if (d.geoid == city) {
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
    var r = innerRadius + Math.ceil(dataset.regions.length / numSegments) * segmentHeight + segmentLabelOffset;
   	labels = svgContainer.select("svg")
   		.append('g')
        .classed("labels", true)
        .classed("segment", true)
        .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
		   
    labels.append("def")
        .append("path")
        .attr("id", "segment-label-path-"+id)
        .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

    labels.selectAll("text")
        .data(dataset.regions).enter()
        .append("text")
        .append("textPath")
        .attr("xlink:href", "#segment-label-path-"+id)
        .attr("startOffset", function(d, i) { return (((d.start + d.end) - (d.region.length / 3)) / 2) * 100 / numSegments + "%";})
        .text(function(d) {return d.region;});
		
		
	   
	
}


function updateNationalCircularHeatChart(svgContainer, dataset, numberOfCities, city) {
	
    /* Arc functions */
    rsa = function(d, i) {
		//console.log(d.start);
        return ((d.start * 2 * Math.PI) / numSegments);
    }
    rea = function(d, i) {
		//console.log(d.end);
        return (d.end * 2 * Math.PI) / numSegments;
    }
    /* Arc functions */
    ir = function(d, i) {
        return innerRadius + Math.floor(i/numSegments) * segmentHeight;
    }
    or = function(d, i) {
        return innerRadius + segmentHeight + Math.floor(i/numSegments) * segmentHeight;
    }
    sa = function(d, i) {
        return (i * 2 * Math.PI) / numSegments;
    }
    ea = function(d, i) {
        return ((i + 1) * 2 * Math.PI) / numSegments;
    }
	
    /* color functions */
	// set color based on the ring
    function colorFunction(i) {
        var colorNumber = Math.floor(i/numSegments);
		if (colorNumber == 0) {
			range = ["white", "#a6c0d0"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorNumber == 1) {
			range = ["white", "#d94f26"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (colorNumber == 2) {
			range = ["white", "#20698a"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorNumber == 3) {
			range = ["white", "#f5a91d"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorNumber == 4) {
			range = ["white", "#87af3f"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else {
			range = ["white", "red"];
			var color = d3.scale.linear().domain(domain).range(range);		
		}		
		return color;
    }
	
    /* domain function */
	// set domain based on the ring
    function domainFunction(i, data) {
        var domainNumber = Math.floor(i/numSegments);
		var domainBottom = domainNumber * numSegments;
		var domainTop = (domainNumber + 1) * numSegments;
		// slice array to bottom and top values
		var dataSlice = data.slice(domainBottom, domainTop);		
		domain = d3.extent(dataSlice, accessor);				
		return domain;
    }	
	
		   
	   
   	//set up container for mouseover interaction
   	var div = d3.select(".nationalCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
		
   	//set up container for dropdown interaction
	$.each(dataset.meta, function( i, d ) {
		if (dataset.meta[i].geoid == city) {
		   	var div = d3.select(".nationalCircularHeatChartSidebarSelected")
		   	    .style("opacity", 1)
				.html(
					'<h4>' + dataset.meta[i].metro + '</h4>' +
					'<table class="table table-condensed">' +
						'<tr>' +
							'<td class="oned-rect">' +
							'</td>' +
							'<td class="oned">' +
								'OneD Index: ' + dataset.meta[i].oned_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="economy-rect">' +
							'</td>' +
							'<td class="economy">' +
								'Economy Index: ' + dataset.meta[i].economy_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="education-rect">' +
							'</td>' +
							'<td class="education">' +
								'Education Index: ' + dataset.meta[i].education_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="equity-rect">' +
							'</td>' +
							'<td class="equity">' +
								'Equity Index: ' + dataset.meta[i].equity_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="quality_of_life-rect">' +
							'</td>' +
							'<td class="quality_of_life">' +
								'Quality of Life Index: ' + dataset.meta[i].quality_of_life_index +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="transit-rect">' +
							'</td>' +
							'<td class="transit">' +
								'Transit Index: ' + dataset.meta[i].transit_index +
							'</td>' +
						'</tr>' +
					'</table>'		
				);
		}	
	});
	   
	// creat a transparent overlay for mouseover   
    var margin = {top: 0, right: 20, bottom: 0, left: 0},
    innerRadius = 30,
    numSegments = numberOfCities,
    segmentHeight = 36,
    domain = null,
    accessor = function(d) {return d;},
	offset = height/2;
		
	chart = svgContainer.select(".circular-heat");
	
	chart.selectAll("path")
		.data(dataset.indicies)
		.transition().duration(1000)
        .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
        .attr("fill", function(d, i) {
			domain = domainFunction(i, dataset.indicies);
			var color = colorFunction(i);
			return color(accessor(d));
		});

    domain = null;
			   	   
	g = svgContainer.select(".circular-heat-overlay");
	
	g.selectAll("path")
		.data(dataset.meta)
		.attr("stroke", function(d) { 
			if (d.geoid == city) {
				return "#303030";
			} else {
				return "none"; 
			} 
		})
		.attr("stroke-width", function(d) { 
			if (d.geoid == city) {
				return "3px";
			} else {
				return "0px"; 
			} 
		})
				
		// set up on mouseover events
		.on("mouseover", function(d) {
						
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.geoid == city) {
						return "#303030";
					} else {
						return "#6D6E70"; 
					} 
				})
				.attr("stroke-width", "3px");		   
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
            div.html(
				'<h5>' + d.metro + ', ' + d.year +'</h5>' +
				'<table class="table table-condensed heatmapTable">' +
					'<tr>' +
						'<td class="oned-rect">' +
						'</td>' +
						'<td class="oned">' +
							'OneD Index: ' + d.oned_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="economy-rect">' +
						'</td>' +
						'<td class="economy">' +
							'Economy Index: ' + d.economy_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="education-rect">' +
						'</td>' +
						'<td class="education">' +
							'Education Index: ' + d.education_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="equity-rect">' +
						'</td>' +
						'<td class="equity">' +
							'Equity Index: ' + d.equity_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="quality_of_life-rect">' +
						'</td>' +
						'<td class="quality_of_life">' +
							'Quality of Life Index: ' + d.quality_of_life_index +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="transit-rect">' +
						'</td>' +
						'<td class="transit">' +
							'Transit Index: ' + d.transit_index +
						'</td>' +
					'</tr>' +
				'</table>'				
			);
			
	   })
	   .on("mouseout", function() {
			d3.select(this)
				.attr("stroke", function(d) { 
					if (d.geoid == city) {
						return "#303030";
					} else {
						return "none"; 
					} 
				})		   			
				.attr("stroke-width", function(d) { 
					if (d.geoid == city) {
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

