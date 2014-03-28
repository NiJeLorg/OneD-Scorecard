/*
* create national level circular heat chart to display the national dataset, as well as the right hand table housing the indicators
* svgContainer: the SVG container to place the diagram into
* dataset: the csv data 
* leverages the reusable circular heat chart in assets/js/circularHeatChart.js extended from work by by Peter Cook (https://github.com/prcweb/d3-circularheat)
*/

function createNationalCircularHeatChart(svgContainer, dataset, numberOfCities) {
	var chart = nationalCircularHeatChart()
	    .segmentHeight(43)
	    .innerRadius(30)
	    .numSegments(numberOfCities);
	    //.radialLabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
	    //.segmentLabels(["Midnight", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "Midday", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]);
			   
	   svgContainer.selectAll('svg')
	       .data([dataset.indicies])
	       .enter()
	       .append('svg')
		   .attr("width", widthHeatChart)
		   .attr("height", height)  
	       .call(chart);
		   
	   /* Add a mouseover event with table next to chart 
	   svgContainer.selectAll("path").on('mouseover', function() {
	       var d = d3.select(this).data();
	       console.log(d);
	   });
	   */
	   
   	//set up container for mouseover interaction
   	var div = d3.select(".nationalCircularHeatChartSidebar")
   	    .style("opacity", 1e-6);
	   
	// creat a transparent overlay for mouseover   
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 30,
    numSegments = numberOfCities,
    segmentHeight = 43,
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
				'<table class="table table-condensed">' +
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
	   
		
   /* Arc functions */
   ir = function(d, i) {
       return innerRadius + Math.floor(i/numSegments) * segmentHeight;
   }
   or = function(d, i) {
       return innerRadius + Math.floor(i/numSegments) + (segmentHeight * 5);
   }
   sa = function(d, i) {
       return (i * 2 * Math.PI) / numSegments;
   }
   ea = function(d, i) {
       return ((i + 1) * 2 * Math.PI) / numSegments;
   }	


   /* Configuration getters/setters */
   chart.margin = function(_) {
       if (!arguments.length) return margin;
       margin = _;
       return chart;
   };

   chart.innerRadius = function(_) {
       if (!arguments.length) return innerRadius;
       innerRadius = _;
       return chart;
   };

   chart.numSegments = function(_) {
       if (!arguments.length) return numSegments;
       numSegments = _;
       return chart;
   };

   chart.segmentHeight = function(_) {
       if (!arguments.length) return segmentHeight;
       segmentHeight = _;
       return chart;
   };

   chart.accessor = function(_) {
       if (!arguments.length) return accessor;
       accessor = _;
       return chart;
   };
	   
	
}

