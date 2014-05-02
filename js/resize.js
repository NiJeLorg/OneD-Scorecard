/*
* resize viewports function
*/

$(window).resize(function() {
  var w = ($( window ).width()) * 0.68;
  console.log($( window ).width());
  // don't allow view width to be > than width
  if (w > width) {
  	w = width;
  }

  svgContainerStates.attr("width", w);
  svgContainerStates.attr("height", w * height / width);
    
  svgContainer.attr("width", w);
  svgContainer.attr("height", w * height / width);
  
  svgContainerBarChart.attr("width", w);
  svgContainerBarChart.attr("height", w * height / width);
  
  
  // use the width of the window for heat/donut charts -- float:left interfers with .width()
  var whc = ($( window ).width()) * 0.40;
  if (whc > widthHeatChart) {
  	whc = widthHeatChart;
  }
  
  svgContainerNationalCircularHeatChart.attr("width", whc);
  svgContainerNationalCircularHeatChart.attr("height", whc * height / widthHeatChart);

  svgContainerCityDonutChart.attr("width", whc);
  svgContainerCityDonutChart.attr("height", whc * height / widthHeatChart);
  
});
