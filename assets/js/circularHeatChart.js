function nationalCircularHeatChart() {
    var margin = {top: 20, right: 20, bottom: 20, left: 0},
    innerRadius = 50,
    numSegments = 24,
    segmentHeight = 20,
    domain = null,
    range = ["white", "red"],
    accessor = function(d) {return d;},
    radialLabels = segmentLabels = [];

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this);

			var offset = height/2;
            g = svg.append("g")
                .classed("circular-heat", true)
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");


            g.selectAll("path").data(data)
                .enter().append("path")
                .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
                .attr("fill", function(d, i) {
					domain = domainFunction(i, data);
					var color = colorFunction(i);
					return color(accessor(d));
				});
				
			domain = null;


            // Unique id so that the text path defs are unique - is there a better way to do this?
            var id = d3.selectAll(".circular-heat")[0].length;

            //Radial labels
            var lsa = 0.01; //Label start angle
            var labels = svg.append("g")
                .classed("labels", true)
                .classed("radial", true)
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            labels.selectAll("def")
                .data(radialLabels).enter()
                .append("def")
                .append("path")
                .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
                .attr("d", function(d, i) {
                    var r = innerRadius + ((i + 0.2) * segmentHeight);
                    return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) + 
                            " a" + r + " " + r + " 0 1 1 -1 0";
                });

            labels.selectAll("text")
                .data(radialLabels).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
                .style("font-size", 0.6 * segmentHeight + 'px')
                .text(function(d) {return d;});

            //Segment labels
            var segmentLabelOffset = 2;
            var r = innerRadius + Math.ceil(data.length / numSegments) * segmentHeight + segmentLabelOffset;
            labels = svg.append("g")
                .classed("labels", true)
                .classed("segment", true)
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            labels.append("def")
                .append("path")
                .attr("id", "segment-label-path-"+id)
                .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

            labels.selectAll("text")
                .data(segmentLabels).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", "#segment-label-path-"+id)
                .attr("startOffset", function(d, i) {return i * 100 / numSegments + "%";})
                .text(function(d) {return d;});
        });

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

    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    };

    chart.range = function(_) {
        if (!arguments.length) return range;
        range = _;
        return chart;
    };

    chart.radialLabels = function(_) {
        if (!arguments.length) return radialLabels;
        if (_ == null) _ = [];
        radialLabels = _;
        return chart;
    };

    chart.segmentLabels = function(_) {
        if (!arguments.length) return segmentLabels;
        if (_ == null) _ = [];
        segmentLabels = _;
        return chart;
    };

    chart.accessor = function(_) {
        if (!arguments.length) return accessor;
        accessor = _;
        return chart;
    };

    return chart;
}
