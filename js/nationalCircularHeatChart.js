/*
* create national level circular heat chart to display the national dataset, as well as the right hand table housing the indicators
* svgContainer: the SVG container to place the diagram into
* dataset: the csv data 
* leverages the reusable circular heat chart in assets/js/circularHeatChart.js extended from work by by Peter Cook (https://github.com/prcweb/d3-circularheat)
*/

function createNationalCircularHeatChart(svgContainer, dataset, numberOfCities) {
	
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
	    .segmentHeight(40)
	    .innerRadius(30)
	    .numSegments(numberOfCities)
			   
	   svgContainer.selectAll('svg')
	       .data([dataset.indicies])
	       .enter()
	       .append('svg')
		   .attr("width", widthHeatChart)
		   .attr("height", height)  
	       .call(chart);
		   	   
   	//set up container for mouseover interaction
   	var div = d3.select(".nationalCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
	   
	// creat a transparent overlay for mouseover   
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 30,
    numSegments = numberOfCities,
    segmentHeight = 40,
    accessor = function(d) {return d;},
	offset = height/2;
		   	   
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
		
		
		// set up on mouseover events
		.on("mouseover", function(d) {
			//console.log(d);
			
			d3.select(this)
				.attr("stroke", "#6D6E70")		   
				.attr("stroke-width", "3px");		   
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
            div.html(
				'<h3>' + d.metro + '</h3>' +
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
				.attr("stroke-width", "0px");		   
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   
	// create inner rim
   	ir = svgContainer.select("svg")
   		.append('g')
   		.classed("circular-heat-bounding-inner-rim", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
		
	ir.append("circle")
		.attr('r', innerRadius)
		.attr('fill', 'none')
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "3px");
	
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
		.attr("stroke-width", "3px");
			
	// create segments for region labels   
   	br = svgContainer.select("svg")
   		.append('g')
   		.classed("circular-heat-bounding-rim", true)
   		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");
	   
   	br.selectAll("path")
   		.data(dataset.regions)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(innerRadius + (segmentHeight * 5)).outerRadius(innerRadius + (segmentHeight * 5) + 15).startAngle(rsa).endAngle(rea))
   		.attr('fill', '#BBBDBF')
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "3px");
		
		
		
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


function updateNationalCircularHeatChart(svgContainer, dataset, numberOfCities) {
	
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
	
		   
	   
   	//set up container for mouseover interaction
   	var div = d3.select(".nationalCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
	   
	// creat a transparent overlay for mouseover   
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 30,
    numSegments = numberOfCities,
    segmentHeight = 40,
    domain = null,
    accessor = function(d) {return d;},
	offset = height/2;
	
    var autoDomain = false;
    if (domain === null) {
        domain = d3.extent(dataset.indicies, accessor);
        autoDomain = true;
    }
	
	chart = svgContainer.select(".circular-heat");
	
	chart.selectAll("path")
		.data(dataset.indicies)
		.transition().duration(1000)
        .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
        .attr("fill", function(d, i) {
			var color = colorFunction(i);
			return color(accessor(d));
		});

    if(autoDomain)
        domain = null;
			   	   
	g = svgContainer.select(".circular-heat-overlay");
	
	g.selectAll("path")
		.data(dataset.meta)		
		// set up on mouseover events
		.on("mouseover", function(d) {
						
			d3.select(this)
				.attr("stroke", "#6D6E70")		   
				.attr("stroke-width", "3px");		   
			
		    div.transition()
		        .duration(250)
		        .style("opacity", 1);
			
            div.html(
				'<h3>' + d.metro + '</h3>' +
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
				.attr("stroke-width", "0px");		   
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   
	
}

