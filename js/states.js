/*
* Create states fuction
* svgContainer: the SVG container to place the states into
* projection: map projection for data
* based on Mike Bostock's TopoJson code @ http://bl.ocks.org/mbostock/4108203 and http://bl.ocks.org/mbostock/4136647
*/

function createStates(svgContainerStates, projection) {

	var path = d3.geo.path()
	    .projection(projection);

	var defs = svgContainerStates.append("defs");

	defs.append("filter")
	    .attr("id", "blur")
	  .append("feGaussianBlur")
	    .attr("stdDeviation", 5);

	d3.json("assets/topojson/us.json", function(error, us) {
	  defs.append("path")
	      .datum(topojson.feature(us, us.objects.land))
	      .attr("id", "land")
	      .attr("d", path);

	  svgContainerStates.append("use")
	      .attr("class", "land-glow")
	      .attr("xlink:href", "#land");

	  svgContainerStates.append("use")
	      .attr("class", "land-fill")
	      .attr("xlink:href", "#land");

	  svgContainerStates.append("path")
	      .datum(topojson.mesh(us, us.objects.states, function(a, b) {
	        return a !== b; // a border between two states
	      }))
	      .attr("class", "state-boundary")
	      .attr("d", path);
	});

	d3.select(self.frameElement).style("height", height + "px");
	
}