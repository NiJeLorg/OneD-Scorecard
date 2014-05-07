/*
* this script updates crosslet for the Kirwan map
*/

function updateMap(education, economy, neighborhood) {

	// remove map from dom
	$( "#onedMap" ).replaceWith( "<div id='onedMap'></div>" );
		
	// format functions
	var percentFormat = d3.format(",.1");
	var numberFormat = d3.format(",.2");
	var dollarFormat = d3.format("$,.0f");
	
	var config = {};
	config.map = {};
	config.data = {};
	config.dimensions = {};
	config.dimensions.kirwanIndex = {};
	config.dimensions.ED = {};
	config.dimensions.EE = {};
	config.dimensions.N = {};
	config.defaults = {};
	config.map = { 
  	    leaflet: {
  			url: "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",    // backup in case stamen layer doesn't work  
  			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
  	    },
  	    view: {
  	      center: [42.5,-83.0],
  	      zoom: 9
  	    },
  	    geo: {
  	      url: "assets/topojson/detroit_region_fips_4326.geojson",
  	      name_field: "FIPS",
  	      id_field: "FIPS"
  	    } 
	};
	config.data = {
	    version: "1.0",
	    id_field: "FIPS"
	};
	config.dimensions.kirwanIndex = {
        title: "Kirwan Institute Opportunity Index",
        data: {
          dataSet: "data/kirwanData.csv",
		  method: d3.csv,		
          field: "COMP",
  		  colorscale: d3.scale.linear().domain([1, 10, 20]).range([ "#1b7837", "#f7f7f7", "#762a83" ]).interpolate(d3.cie.interpolateLab)  
  	    },
  		format: {
  			short: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
  			long: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
			input: function(){return Math.round},
  			axis: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
  		} 
      };
	
	// pass in ED depending on selection
  	if (education == 'ED1') {
		config.dimensions.ED= {	   
  	        title: "Childhood Poverty",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU1",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		}
	      };
		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1' selected='selected'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
  	} else if (education == 'ED2') {
		config.dimensions.ED= {	   
  	        title: "High School Dropout Rate",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU2",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		} 
	      };
  		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2' selected='selected'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
  	} else if (education == 'ED3') {
		config.dimensions.ED= {	   
  	        title: "Persons 16-19 No HS Diploma, Unemployed",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU3",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		} 
	      };
    		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3' selected='selected'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
  	} else if (education == 'ED4') {
		config.dimensions.ED= {	   
  	        title: "High School Completion",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU4",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		} 
	      };
  		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4' selected='selected'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
  	} else if (education == 'ED5') {
		config.dimensions.ED= {	   
  	        title: "Reading Proficiency",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU5",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		}  
	      };
    		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5' selected='selected'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
  	} else if (education == 'ED6') {
		config.dimensions.ED= {	   
  	        title: "Math Proficiency",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU6",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		}   
	      };
  		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'  selected='selected'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div>";
	} else if (education == 'ED7') {
		config.dimensions.ED= {	   
  	        title: "Student Poverty",
  	        data: {
  	          dataSet: "data/kirwanData.csv",
  			  method: d3.csv,		
  	          field: "EDU7",
  	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	  	    },
  	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  		}   
	      };
		var comboBoxED = "<div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7' selected='selected'>Student Poverty</option></select></div>";
	} else {}				  

  	if (economy == 'EE1') {
	  	config.dimensions.EE= {	   
	        title: "Public Assistance Rate",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "EE1",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#a6c0d0"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
  	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  				input: function(){return Math.round},
  	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      };
  		var comboBoxEE = "<div class=\"form-group\"><select id=\"selectEconomy\" class=\"form-control mapDropdown\"><option value='EE1' selected='selected'>Public Assistance Rate</option><option value='EE2'>Median Household Income</option><option value='EE3'>Unemployment Rate</option><option value='EE4'>Percentage Change in Jobs Within 5 Mile Radius</option></select></div>";
	} else if (economy == 'EE2') {
	  	config.dimensions.EE= {	   
	        title: "Median Household Income",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "EE2",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#a6c0d0"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return dollarFormat(d)}},
	  			long: function(){return function(d) {return dollarFormat(d)}},
	  			axis: function(){return function(d) {return dollarFormat(d)}},
	  		} 
	      };
    	var comboBoxEE = "<div class=\"form-group\"><select id=\"selectEconomy\" class=\"form-control mapDropdown\"><option value='EE1'>Public Assistance Rate</option><option value='EE2' selected='selected'>Median Household Income</option><option value='EE3'>Unemployment Rate</option><option value='EE4'>Percentage Change in Jobs Within 5 Mile Radius</option></select></div>";
		  
	} else if (economy == 'EE3') {
	  	config.dimensions.EE= {	   
	        title: "Unemployment Rate",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "EE3",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#a6c0d0"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      };
      	var comboBoxEE = "<div class=\"form-group\"><select id=\"selectEconomy\" class=\"form-control mapDropdown\"><option value='EE1'>Public Assistance Rate</option><option value='EE2'>Median Household Income</option><option value='EE3' selected='selected'>Unemployment Rate</option><option value='EE4'>Percentage Change in Jobs Within 5 Mile Radius</option></select></div>";
		  
	} else if (economy == 'EE4') {
	  	config.dimensions.EE= {	   
	        title: "Job Change Within a 5 Mile Radius",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "EE4",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#a6c0d0"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      };
      var comboBoxEE = "<div class=\"form-group\"><select id=\"selectEconomy\" class=\"form-control mapDropdown\"><option value='EE1'>Public Assistance Rate</option><option value='EE2'>Median Household Income</option><option value='EE3'>Unemployment Rate</option><option value='EE4' selected='selected'>Percentage Change in Jobs Within 5 Mile Radius</option></select></div>";
		  		
	} else {}

  	if (neighborhood == 'N1') {
	  	config.dimensions.N= {	   
	        title: "Percent Vacant Property",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "N1",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      }; 
		var comboBoxN = "<div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1' selected='selected'>Vacant Property</option><option value='N2'>Property Values</option><option value='N3'>Homeownership rates</option><option value='N4'>Poverty Rates</option><option value='N5'>Percentage Population Change</option></select></div>";
	} else if (neighborhood == 'N2') {
	  	config.dimensions.N= {	   
	        title: "Property Values",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "N2",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return dollarFormat(d)}},
	  			long: function(){return function(d) {return dollarFormat(d)}},
	  			axis: function(){return function(d) {return dollarFormat(d)}},
	  		} 
	      }; 
  		var comboBoxN = "<div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1'>Vacant Property</option><option value='N2' selected='selected'>Property Values</option><option value='N3'>Homeownership rates</option><option value='N4'>Poverty Rates</option><option value='N5'>Percentage Population Change</option></select></div>";
	} else if (neighborhood == 'N3') {
	  	config.dimensions.N= {
	        title: "Homeownership Rates",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "N3",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      }; 
    		var comboBoxN = "<div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1'>Vacant Property</option><option value='N2'>Property Values</option><option value='N3' selected='selected'>Homeownership rates</option><option value='N4'>Poverty Rates</option><option value='N5'>Percentage Population Change</option></select></div>";
	} else if (neighborhood == 'N4') {
	  	config.dimensions.N= {
	        title: "Poverty Rates",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "N4",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      }; 
  		var comboBoxN = "<div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1'>Vacant Property</option><option value='N2'>Property Values</option><option value='N3'>Homeownership rates</option><option value='N4' selected='selected'>Poverty Rates</option><option value='N5'>Percentage Population Change</option></select></div>";
	} else if (neighborhood == 'N5') {
	  	config.dimensions.N= {
	        title: "Percentage Population Change",
	        data: {
	          dataSet: "data/kirwanData.csv",
			  method: d3.csv,		
	          field: "N5",
	  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
	  	    },
	  		format: {
	  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
				input: function(){return Math.round},
	  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
	  		} 
	      }; 
    	var comboBoxN = "<div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1'>Vacant Property</option><option value='N2'>Property Values</option><option value='N3'>Homeownership rates</option><option value='N4'>Poverty Rates</option><option value='N5' selected='selected'>Percentage Population Change</option></select></div>";
	} else {}
	  
	config.defaults = {
		colorscale: d3.scale.linear().domain([1, 10, 20]).range([ "#1b7837", "#f7f7f7", "#762a83" ]).interpolate(d3.cie.interpolateLab),  
	    order: ["ED", "EE", "N", "kirwanIndex"],
	    active: "kirwanIndex"
	};
	
	
	comboBoxInnerHtml = "<form class=\"form-inline\" role=\"form\">" + comboBoxED + comboBoxEE + comboBoxN + "</form>";
	

	console.log(config);
	a=new crosslet.MapView($("#onedMap"),config);
	
	setUpNewDropdowns();
	
}


function setUpNewDropdowns() {
	$(document).ready(function(){
		$( "#selectEducation" ).change( function() {
			var education = $(this).val();
			var economy = $( "#selectEconomy" ).val();
			var neighborhood = $( "#selectNeighborhood" ).val();
			updateMap(education, economy, neighborhood);
		});	
		$( "#selectEconomy" ).change( function() {
			var economy = $(this).val();
			var education = $( "#selectEducation" ).val();
			var neighborhood = $( "#selectNeighborhood" ).val();
			updateMap(education, economy, neighborhood);
		});	
		$( "#selectNeighborhood" ).change( function() {
			var neighborhood = $(this).val();
			var economy = $( "#selectEconomy" ).val();
			var education = $( "#selectEducation" ).val();
			updateMap(education, economy, neighborhood);
		});
	});
}
 