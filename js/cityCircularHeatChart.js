/*
* create city level circular heat chart to display the city level dataset, as well as the right hand table housing the indicators
* svgContainer: the SVG container to place the diagram into
* dataset: the csv data 
* leverages the reusable circular heat chart in assets/js/cityCircularHeatChart.js extended from work by by Peter Cook (https://github.com/prcweb/d3-circularheat)
*/

function createCityCircularHeatChart(svgContainer, dataset, datasetIndicators) {
    /* Arc functions */
    rsa = function(d, i) {
		//console.log(d.start);
        return ((d.start * 2 * Math.PI) / numSegments);
    }
    rea = function(d, i) {
		//console.log(d.end);
        return (d.end * 2 * Math.PI) / numSegments;
    }	
	
	var chart = cityCircularHeatChart()
	    .segmentHeight(36)
	    .innerRadius(30)
	    .numSegments(14)
		.ids(dataset.ids)
		.datasetIndicators(datasetIndicators)
		
			   
	   svgContainer.selectAll('svg')
	       .data([dataset.indicators])
	       .enter()
	       .append('svg')
		   .attr("width", widthHeatChart)
		   .attr("height", height)  
	       .call(chart);
		   	   
   	//set up container for mouseover interaction
   	var div = d3.select(".cityCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
	
	// create a transparent overlay for mouseover   
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 30,
    numSegments = 14,
    segmentHeight = 36,
    accessor = function(d) {return d;},
	offset = height/2;
   		   	   
	g = svgContainer.select("svg")
		.append('g')
		.classed("circular-heat-overlay", true)
		.attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

	g.selectAll("path")
		.data(dataset.ids)
		.enter()
		.append("path")
		.attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
		

		// set up on mouseover events
		.on("mouseover", function(d, i) {
			console.log(dataset.meta[0].metro);
			// only show mouseover if id exists
			if (d == -99) {
				// do nothing on mouseover
			} else {
				d3.select(this)
					.attr("stroke", "#6D6E70")		   
					.attr("stroke-width", "3px");		   
			
			    div.transition()
			        .duration(250)
			        .style("opacity", 1);
					
				// pull textTick record
				var textTick = getTextTick(d);
				//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
				
				var rawValue = dataset.indicators[i];
				var value = textTick.tickFormat(rawValue)
				
	            div.html(
					'<h4>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h4>' +
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

				
			} // close if id is not -99
			
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
   		.data(dataset.priorityAreas)
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
   		.data(dataset.priorityAreas)
   		.enter()
   		.append("path")
   		.attr("d", d3.svg.arc().innerRadius(innerRadius + (segmentHeight * 5)).outerRadius(innerRadius + (segmentHeight * 5) + 15).startAngle(rsa).endAngle(rea))
   		.attr('fill', function(d) { return d.color; })
		.attr("stroke", "#6D6E70")		   
		.attr("stroke-width", "3px");
		
		
	// create segment labels
    // Unique id so that the text path defs are unique - is there a better way to do this?
    var id = d3.selectAll(".circular-heat-bounding-rim")[0].length;
    var segmentLabelOffset = 2;
    var r = innerRadius + Math.ceil(dataset.priorityAreas.length / numSegments) * segmentHeight + segmentLabelOffset;
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
        .data(dataset.priorityAreas).enter()
        .append("text")
        .append("textPath")
        .attr("xlink:href", "#segment-label-path-"+id)
        .attr("startOffset", function(d, i) { return (((d.start + d.end) - (d.priorityArea.length / 16)) / 2) * 100 / numSegments + "%";})
        .text(function(d) {return d.priorityArea;});
		
		
	   
	
}


function updateCityCircularHeatChart(svgContainer, dataset) {
	
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
		var textTick = getTextTick(ids[i]);
		var colorClass = textTick.tableClass;
		
		if (colorClass == 'economy') {
			range = ["white", "#a6c0d0"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'education') {
			range = ["white", "#d94f26"];
			var color = d3.scale.linear().domain(domain).range(range);			
		} else if (colorClass == 'equity') {
			range = ["white", "#20698a"];
			var color = d3.scale.linear().domain(domain).range(range);
		} else if (colorClass == 'quality_of_life') {
			range = ["white", "#f5a91d"];
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
	function setDomain(i) {
		var textTick = getTextTick(ids[i]);
		//console.log(Object.size(textTick));
		if (Object.size(textTick) == 0) {
			domain = [0,0];
		} else {
			var accessorFunction = textTick.accessorFunction;
			domain = d3.extent(datasetIndicators, accessorFunction);			
		}
		return domain;
	}

	   
   	//set up container for mouseover interaction
   	var div = d3.select(".cityCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
	   
	// creat a transparent overlay for mouseover 
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 30,
    numSegments = 14,
    segmentHeight = 36,
	domain = null,
    accessor = function(d) {return d;},
	offset = height/2;
	  		
	chart = svgContainer.select(".circular-heat");
	
	chart.selectAll("path")
		.data(dataset.indicators)
		.transition().duration(1000)
        .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
        .attr("fill", function(d, i) {
			var domain = setDomain(i);
			var color = colorFunction(i);
			return color(accessor(d));
		});
			   	   
	g = svgContainer.select(".circular-heat-overlay");
	
	g.selectAll("path")
		.data(dataset.ids)		
		// set up on mouseover events
		// set up on mouseover events
		.on("mouseover", function(d, i) {
			console.log(dataset.meta[0].metro);
			// only show mouseover if id exists
			if (d == -99) {
				// do nothing on mouseover
			} else {
				d3.select(this)
					.attr("stroke", "#6D6E70")		   
					.attr("stroke-width", "3px");		   
			
			    div.transition()
			        .duration(250)
			        .style("opacity", 1);
					
				// pull textTick record
				var textTick = getTextTick(d);
				//textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers With No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;} };
				
				var rawValue = dataset.indicators[i];
				var value = textTick.tickFormat(rawValue);
				
	            div.html(
					'<h4>' + textTick.indicatorName + ', ' + dataset.meta[0].year +'</h4>' +
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

				
			} // close if id is not -99
			
	   })
	   .on("mouseout", function() {
			d3.select(this)
				.attr("stroke-width", "0px");		   
	   
		   div.transition()
		       .duration(250)
		       .style("opacity", 1e-6);
			
	   });
	   
	
}

