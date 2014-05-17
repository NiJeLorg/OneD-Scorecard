/*
* houses all functions used by the set up scripts
* dataset: csv data
*/

/**** Code for data manipulation ****/
// parses strings to integers or floating point numbers for the entire index dataset
function parseNumbers(dataset) {
	$.each(dataset, function( i, d ) {
		d.id = parseInt(d.id);
		d.geoid = parseInt(d.geoid); 
		d.lat = parseFloat(d.lat);
		d.lon = parseFloat(d.lon);
		d.oned_index = parseFloat(d.oned_index);
		d.economy_index = parseFloat(d.economy_index);
		d.education_index = parseFloat(d.education_index);
		d.equity_index = parseFloat(d.equity_index);
		d.quality_of_life_index = parseFloat(d.quality_of_life_index);
		d.transit_index = parseFloat(d.transit_index);
	});
}

function parseNumbersIndicators(dataset) {
	$.each(dataset, function( i, d ) {
		d.id = parseInt(d.id);
		d.geoid = parseInt(d.geoid); 
		d.lat = parseFloat(d.lat);
		d.lon = parseFloat(d.lon);
		d.econ_exports = parseFloat(d.econ_exports);
		d.econ_gmp = parseFloat(d.econ_gmp);
		d.econ_hightech = parseFloat(d.econ_hightech);
		d.econ_kiemploy = parseFloat(d.econ_kiemploy);
		d.econ_pcpi = parseFloat(d.econ_pcpi);
		d.econ_techpatents = parseFloat(d.econ_techpatents);
		d.econ_biztaxindex = parseFloat(d.econ_biztaxindex);
		d.econ_rdsharegdp = parseFloat(d.econ_rdsharegdp);
		d.edu_pctbachhigher2534 = parseFloat(d.edu_pctbachhigher2534);
		d.edu_pctbachhigher = parseFloat(d.edu_pctbachhigher);
		d.edu_ppstatebudget = parseFloat(d.edu_ppstatebudget);
		d.edu_ppspending = parseFloat(d.edu_ppspending);
		d.edu_enrolled = parseFloat(d.edu_enrolled);
		d.edu_hsdiploma = parseFloat(d.edu_hsdiploma);
		d.edu_unemployednohs = parseFloat(d.edu_unemployednohs);
		d.equity_fbpop = parseFloat(d.equity_fbpop);
		d.equity_gini = parseFloat(d.equity_gini);
		d.equity_incshareq1 = parseFloat(d.equity_incshareq1);
		d.equity_incshareq2 = parseFloat(d.equity_incshareq2);
		d.equity_incshareq3 = parseFloat(d.equity_incshareq3);
		d.equity_incshareq4 = parseFloat(d.equity_incshareq4);
		d.equity_incshareq5 = parseFloat(d.equity_incshareq5);
		d.equity_incsharetop5 = parseFloat(d.equity_incsharetop5);
		d.equity_medhhincblack = parseFloat(d.equity_medhhincblack);
		d.equity_medhhinchisp = parseFloat(d.equity_medhhinchisp);
		d.equity_medhhincwhite = parseFloat(d.equity_medhhincwhite);
		d.equity_medhhinctotal = parseFloat(d.equity_medhhinctotal);
		d.equity_childpovrtblack = parseFloat(d.equity_childpovrtblack);
		d.equity_childpovrthisp = parseFloat(d.equity_childpovrthisp);
		d.equity_childpovrtwhite = parseFloat(d.equity_childpovrtwhite);
		d.equity_childpovrttotal = parseFloat(d.equity_childpovrttotal);
		d.equity_homeownershipblack = parseFloat(d.equity_homeownershipblack);
		d.equity_homeownershiphisp = parseFloat(d.equity_homeownershiphisp);
		d.equity_homeownershipwhite = parseFloat(d.equity_homeownershipwhite);
		d.equity_homeownershiptotal = parseFloat(d.equity_homeownershiptotal);
		d.qol_aqi = parseFloat(d.qol_aqi);
		d.qol_popchange = parseFloat(d.qol_popchange);
		d.qol_popwohealthins = parseFloat(d.qol_popwohealthins);
		d.qol_vcrimert = parseFloat(d.qol_vcrimert);
		d.qol_vthourspc = parseFloat(d.qol_vthourspc);
		d.qol_obese = parseFloat(d.qol_obese);
		d.transit_hoursdelayedpc = parseInt(d.transit_hoursdelayedpc);
		d.transit_caralone = parseFloat(d.transit_caralone);
		d.transit_novehicle = parseFloat(d.transit_novehicle);
		d.transit_statefunding = parseFloat(d.transit_statefunding);
		d.transit_bustrips = parseFloat(d.transit_bustrips);
	});
}

// parses strings to dates for the entier dataset
function parseDates(dataset) {
	var yearFormat = d3.time.format("%Y");

	$.each(dataset, function( i, d ) {
		var year_string = d.year;
		d.year_object = yearFormat.parse(year_string);
	});
}

// select which indicator to plot and order the dataset
function pickOrderIndicatorData(cf, dataset, indicator, order) {
	if (indicator == 1) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_exports;		
		});
	} else if (indicator == 2) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_gmp;		
		});
	} else if (indicator == 3) {
	} else if (indicator == 4) {
		$.each(dataset, function( i, d ) {
			d.value = d.econ_hightech;		
		});
	} else if (indicator == 5) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_kiemploy;		
		});
	} else if (indicator == 6) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_mhhinc;		
		});
	} else if (indicator == 7) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_pcpi;		
		});
	} else if (indicator == 8) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_pop2534;		
		});
	} else if (indicator == 9) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_povrt;		
		});
	} else if (indicator == 10) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_techpatents;		
		});
	} else if (indicator == 11) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_biztaxindex;		
		});
	} else if (indicator == 12) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_rdsharegdp;		
		});
	} else if (indicator == 13) {
		$.each(dataset, function( i, d ) {	
			d.value = d.econ_vcpc;		
		});
	} else if (indicator == 14) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_pctbachhigher2534;		
		});
	} else if (indicator == 15) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_pctbachhigher;		
		});
	} else if (indicator == 16) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_ppstatebudget;		
		});
	} else if (indicator == 17) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_ppspending;		
		});
	} else if (indicator == 18) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_enrolled;		
		});
	} else if (indicator == 19) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_hsdiploma;		
		});
	} else if (indicator == 20) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep4math;		
		});
	} else if (indicator == 21) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep4read;		
		});
	} else if (indicator == 22) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep4sci;		
		});
	} else if (indicator == 23) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep8math;		
		});
	} else if (indicator == 24) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep8read;		
		});
	} else if (indicator == 25) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_naep8sci;		
		});
	} else if (indicator == 26) {
		$.each(dataset, function( i, d ) {	
			d.value = d.edu_unemployednohs;		
		});
	} else if (indicator == 27) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_fbpop;		
		});
	} else if (indicator == 28) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_gini;		
		});
	} else if (indicator == 29) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incshareq1;		
		});
	} else if (indicator == 30) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incshareq2;		
		});
	} else if (indicator == 31) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incshareq3;		
		});
	} else if (indicator == 32) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incshareq4;		
		});
	} else if (indicator == 33) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incshareq5;		
		});
	} else if (indicator == 34) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_incsharetop5;		
		});
	} else if (indicator == 35) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_medhhincblack;		
		});
	} else if (indicator == 36) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_medhhinchisp;		
		});
	} else if (indicator == 37) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_medhhincwhite;		
		});
	} else if (indicator == 38) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_medhhinctotal;		
		});
	} else if (indicator == 39) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_childpovrtblack;		
		});
	} else if (indicator == 40) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_childpovrthisp;		
		});
	} else if (indicator == 41) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_childpovrtwhite;		
		});
	} else if (indicator == 42) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_childpovrttotal;		
		});
	} else if (indicator == 43) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_homeownershipblack;		
		});
	} else if (indicator == 44) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_homeownershiphisp;		
		});
	} else if (indicator == 45) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_homeownershipwhite;		
		});
	} else if (indicator == 46) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_homeownershiptotal;		
		});
	} else if (indicator == 47) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_aqi;		
		});
	} else if (indicator == 48) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_homeownershiptotal;		
		});
	} else if (indicator == 49) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_popchange;		
		});
	} else if (indicator == 50) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_popwohealthins;		
		});
	} else if (indicator == 51) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_vcrimert;		
		});
	} else if (indicator == 52) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_vthourspc;		
		});
	} else if (indicator == 53) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_obese;		
		});
	} else if (indicator == 54) {
		$.each(dataset, function( i, d ) {	
			d.value = d.qol_physicians;		
		});
	} else if (indicator == 55) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_hoursdelayedpc;		
		});
	} else if (indicator == 56) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_caralone;		
		});
	} else if (indicator == 57) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_novehicle;		
		});
	} else if (indicator == 58) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_statefunding;		
		});
	} else if (indicator == 59) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_bustrips;		
		});
	} else if (indicator == 60) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_bridgecondition;		
		});
	} else if (indicator == 61) {
		$.each(dataset, function( i, d ) {	
			d.value = d.economy_index;		
		});
	} else if (indicator == 62) {
		$.each(dataset, function( i, d ) {	
			d.value = d.education_index;		
		});
	} else if (indicator == 63) {
		$.each(dataset, function( i, d ) {	
			d.value = d.equity_index;		
		});
	} else if (indicator == 64) {
		$.each(dataset, function( i, d ) {	
			d.value = d.quality_of_life_index;		
		});
	} else if (indicator == 65) {
		$.each(dataset, function( i, d ) {	
			d.value = d.transit_index;		
		});
	} else if (indicator == 66) {
		$.each(dataset, function( i, d ) {	
			d.value = d.oned_index;		
		});
	} else {}
	
	var byValue = setupCrossfilterByValue(cf, dataset);
	var orderedData = orderByValue(cf, byValue, order);
	clearFilterByValue(byValue);
	return orderedData;
}


// set text and number tick format for bar chart
function getTextTick(indicator) {
	var textTick = {};
	
	if (indicator == 1) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.0f"), tableClass: 'economy', indicatorName: 'Total Value of Exports', accessorFunction: function(d) {return d.econ_exports;}, index: 'No', scored: 'Positive'};
	} else if (indicator == 2) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.0f"), tableClass: 'economy', indicatorName: 'Per Capita GDP for Metropolitan Area (GMP)', accessorFunction: function(d) {return d.econ_gmp;}, index: 'No', scored: 'Positive'};
	} else if (indicator == 3) {
	} else if (indicator == 4) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'economy', indicatorName: 'Percent Change in High Tech Jobs', accessorFunction: function(d) {return d.econ_hightech;}, index: 'No', scored: 'Positive'};
	} else if (indicator == 5) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'economy', indicatorName: 'Percent Change in Knowledge Industry Employment', accessorFunction: function(d) {return d.econ_kiemploy;}, index: 'No', scored: 'Positive'};
	} else if (indicator == 6) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.0f"), tableClass: 'economy', indicatorName: 'Median Household Income', accessorFunction: function(d) {return d.econ_mhhinc;}, index: 'No', scored: 'Positive'};
	} else if (indicator == 7) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.0f"), tableClass: 'economy', indicatorName: 'Per Capita Personal Income', accessorFunction: function(d) {return d.econ_pcpi;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 8) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'economy', indicatorName: 'Percent of Population Ages 25 to 34', accessorFunction: function(d) {return d.econ_pop2534;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 9) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'economy', indicatorName: 'Percent of Population Below 100% of Poverty Level', accessorFunction: function(d) {return d.econ_povrt;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 10) {
		textTick = { text: 'Number', tickFormat: d3.format(",.1"), tableClass: 'economy', indicatorName: 'Number of Technology Patents per 10K People', accessorFunction: function(d) {return d.econ_techpatents;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 11) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2"), tableClass: 'economy', indicatorName: 'Business Tax Climate Index', accessorFunction: function(d) {return d.econ_biztaxindex;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 12) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'economy', indicatorName: 'Research & Development, Share of State GDP', accessorFunction: function(d) {return d.econ_rdsharegdp;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 13) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'economy', indicatorName: 'Venture Captial Investment Dollars Per Capita', accessorFunction: function(d) {return d.econ_vcpc;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 14) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'education', indicatorName: 'Young & Talented Population, Education Attainment Bachelors+, 25-34', accessorFunction: function(d) {return d.edu_pctbachhigher2534;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 15) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'education', indicatorName: 'Education Attainment Bachelors+, 25+', accessorFunction: function(d) {return d.edu_pctbachhigher;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 16) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'education', indicatorName: 'State Appropriations Per Pupil', accessorFunction: function(d) {return d.edu_ppstatebudget;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 17) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'education', indicatorName: 'State Expenditures Per Pupil', accessorFunction: function(d) {return d.edu_ppspending;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 18) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'education', indicatorName: 'Percent Population Enrolled in School, 3+', accessorFunction: function(d) {return d.edu_enrolled;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 19) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'education', indicatorName: 'Education Attainment High School+, 18+', accessorFunction: function(d) {return d.edu_hsdiploma;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 20) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '4th Grade NAEP Math Scores', accessorFunction: function(d) {return d.edu_naep4math;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 21) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '4th Grade NAEP Reading Scores', accessorFunction: function(d) {return d.edu_naep4read;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 22) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '4th Grade NAEP Science Scores', accessorFunction: function(d) {return d.edu_naep4sci;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 23) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '8th Grade NAEP Math Scores', accessorFunction: function(d) {return d.edu_naep8math;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 24) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '8th Grade NAEP Reading Scores', accessorFunction: function(d) {return d.edu_naep8read;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 25) {
		textTick = { text: 'Score', tickFormat: d3.format(",.2"), tableClass: 'education', indicatorName: '8th Grade NAEP Science Scores', accessorFunction: function(d) {return d.edu_naep8sci;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 26) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'education', indicatorName: 'Percent Teens Not Enrolled in School, No HS Diploma, Unemployed', accessorFunction: function(d) {return d.edu_unemployednohs;}, index: 'No', scored: 'Negative'  };
	} else if (indicator == 27) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent of Population Foreign Born', accessorFunction: function(d) {return d.equity_fbpop;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 28) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2"), tableClass: 'equity', indicatorName: 'Gini Index', accessorFunction: function(d) {return d.equity_gini;}, index: 'No', scored: 'Negative'  };
	} else if (indicator == 29) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Lowest Quintile of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incshareq1;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 30) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Second Lowest Quintile of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incshareq2;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 31) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Middle Quintile of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incshareq3;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 32) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Second Highest Quintile of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incshareq4;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 33) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Highest Quintile of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incshareq5;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 34) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Top 5% of Households Share of Aggregate Income', accessorFunction: function(d) {return d.equity_incsharetop5;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 35) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'equity', indicatorName: 'Median Household Income for Black Households', accessorFunction: function(d) {return d.equity_medhhincblack;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 36) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'equity', indicatorName: 'Median Household Income for Hispanic Households', accessorFunction: function(d) {return d.equity_medhhinchisp;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 37) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'equity', indicatorName: 'Median Household Income for Non-Hispanic White Households', accessorFunction: function(d) {return d.equity_medhhincwhite;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 38) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'equity', indicatorName: 'Median Household Income for All Households', accessorFunction: function(d) {return d.equity_medhhinctotal;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 39) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent of Black Population Under 18 Below 100% of Poverty Level', accessorFunction: function(d) {return d.equity_childpovrtblack;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 40) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent of Hispanic Population Under 18 Below 100% of Poverty Level', accessorFunction: function(d) {return d.equity_childpovrthisp;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 41) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level', accessorFunction: function(d) {return d.equity_childpovrtwhite;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 42) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent of Population Under 18 Below 100% of Poverty Level', accessorFunction: function(d) {return d.equity_childpovrttotal;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 43) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent Housing Owner Occupied for Black Households', accessorFunction: function(d) {return d.equity_homeownershipblack;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 44) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent Housing Owner Occupied for Hispanic Households', accessorFunction: function(d) {return d.equity_homeownershiphisp;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 45) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent Housing Owner Occupied for Non-Hispanic White Households', accessorFunction: function(d) {return d.equity_homeownershipwhite;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 46) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'equity', indicatorName: 'Percent Housing Owner Occupied', accessorFunction: function(d) {return d.equity_homeownershiptotal;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 47) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Air Quality Index, Percent of "Good" Days', accessorFunction: function(d) {return d.qol_aqi;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 48) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Home Owner Occupied Rate', accessorFunction: function(d) {return d.qol_homeownershiptotal;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 49) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Percent Change in Population', accessorFunction: function(d) {return d.qol_popchange;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 50) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Percent Population Without Health Insurance', accessorFunction: function(d) {return d.qol_popwohealthins;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 51) {
		textTick = { text: 'Number', tickFormat: d3.format(",.1f"), tableClass: 'quality_of_life', indicatorName: 'Total Violent Crimes per 100,000 Residents', accessorFunction: function(d) {return d.qol_vcrimert;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 52) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Average Volunteer Rate', accessorFunction: function(d) {return d.qol_vthourspc;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 53) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'quality_of_life', indicatorName: 'Percent of Population neither Overweight nor Obese', accessorFunction: function(d) {return d.qol_obese;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 54) {
		textTick = { text: 'Number', tickFormat: d3.format(",.0f"), tableClass: 'quality_of_life', indicatorName: 'Physicians per 100,000 Residents', accessorFunction: function(d) {return d.qol_physicians;}, index: 'No', scored: 'Positive'  };
	} else if (indicator == 55) {
		textTick = { text: 'Number', tickFormat: d3.format(",.0f"), tableClass: 'transit', indicatorName: 'Annual Hours of Delay per Auto Commuter', accessorFunction: function(d) {return d.transit_hoursdelayedpc;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 56) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers 16+ Driving Alone to Work', accessorFunction: function(d) {return d.transit_caralone;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 57) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Workers with No Vehicle', accessorFunction: function(d) {return d.transit_novehicle;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 58) {
		textTick = { text: 'Dollars', tickFormat: d3.format("$,.2f"), tableClass: 'transit', indicatorName: 'Public Transportation Funding, State Dollars per 1,000 Residents', accessorFunction: function(d) {return d.transit_statefunding;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 59) {
		textTick = { text: 'Number', tickFormat: d3.format(",.0f"), tableClass: 'transit', indicatorName: 'Annual Nummber of Transit Rides Occurring on a Bus, in Thousands', accessorFunction: function(d) {return d.transit_bustrips;}, index: 'No', scored: 'Positive' };
	} else if (indicator == 60) {
		textTick = { text: 'Percent', tickFormat: d3.format(",.1%"), tableClass: 'transit', indicatorName: 'Percent of Bridges That Are Functionally Obsolete', accessorFunction: function(d) {return d.transit_bridgecondition;}, index: 'No', scored: 'Negative' };
	} else if (indicator == 61) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'economy', indicatorName: 'Economy Index', accessorFunction: function(d) {return d.economy_index;}, index: 'Yes', scored: 'Positive' };
	} else if (indicator == 62) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'education', indicatorName: 'Education Index', accessorFunction: function(d) {return d.education_index;}, index: 'Yes', scored: 'Positive' };
	} else if (indicator == 63) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'equity', indicatorName: 'Equity Index', accessorFunction: function(d) {return d.equity_index;}, index: 'Yes', scored: 'Positive' };
	} else if (indicator == 64) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'quality_of_life', indicatorName: 'Quality of Life Index', accessorFunction: function(d) {return d.quality_of_life;}, index: 'Yes', scored: 'Positive' };
	} else if (indicator == 65) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'transit', indicatorName: 'Transit Index', accessorFunction: function(d) {return d.transit_index;}, index: 'Yes', scored: 'Positive' };
	} else if (indicator == 66) {
		textTick = { text: 'Index', tickFormat: d3.format(",.2f"), tableClass: 'oned', indicatorName: 'OneD Index', accessorFunction: function(d) {return d.oned_index;}, index: 'Yes', scored: 'Positive' };
	} else {}
	
	return textTick;
}




// using crossfilter, accepts a dataset, sets up dimensions for that record and returns a crossfilter object
// for reference: (crossfilter API: https://github.com/square/crossfilter/wiki/API-Reference)
function setupCrossfilterByGeoID(cf, dataset) {		
	var byGeoID = cf.dimension(function(d) { return d.geoid; });
	return byGeoID;	
}

function setupCrossfilterByYear(cf, dataset) {		
	var byYear = cf.dimension(function(d) { return d.year; });
	return byYear;
}

function setupCrossfilterByOneDIndex(cf, dataset) {		
	var byOneDIndex = cf.dimension(function(d) { return d.oned_index; });
	return byOneDIndex;
}

function setupCrossfilterByEconomyIndex(cf, dataset) {		
	var byEconomyIndex = cf.dimension(function(d) { return d.economy_index; });
	return byEconomyIndex;
}

function setupCrossfilterByEducationIndex(cf, dataset) {		
	var byEducationIndex = cf.dimension(function(d) { return d.education_index; });
	return byEducationIndex;
}

function setupCrossfilterByEquityIndex(cf, dataset) {		
	var byEquityIndex = cf.dimension(function(d) { return d.equity_index; });
	return byEquityIndex;
}

function setupCrossfilterByQualityOfLifeIndex(cf, dataset) {		
	var byQualityOfLifeIndex = cf.dimension(function(d) { return d.quality_of_life_index; });
	return byQualityOfLifeIndex;
}

function setupCrossfilterByTransitIndex(cf, dataset) {		
	var byTransitIndex = cf.dimension(function(d) { return d.transit_index; });
	return byTransitIndex;
}

function setupCrossfilterByRegion(cf, dataset) {		
	var byRegion = cf.dimension(function(d) { return d.region + '|' + d.metro; });
	return byRegion;
}

function setupCrossfilterByRegionOnly(cf, dataset) {		
	var byRegionOnly = cf.dimension(function(d) { return d.region; });
	return byRegionOnly;
}

function setupCrossfilterByCityOnly(cf, dataset) {		
	var byCityOnly = cf.dimension(function(d) { return d.metro; });
	return byCityOnly;
}

function setupCrossfilterByValue(cf, dataset) {		
	var byValue = cf.dimension(function(d) { return d.value; });
	return byValue;	
}

// set up functions to filter data (using crossfilter) by year or geoID and clear these filters
function filterByYear (byYear, year) {
	byYear.filterExact(year);
	var filteredData = byYear.top(Infinity);
	return filteredData;
}

function filterByGeoID (byGeoID, city) {
	byGeoID.filterExact(city);
	var filteredData = byGeoID.top(Infinity);
	return filteredData;
}

function orderByOneDIndex (byOneDIndex) {
	var filteredData = byOneDIndex.top(Infinity);
	return filteredData;
}

function orderByEconomyIndex (byEconomyIndex) {
	var filteredData = byEconomyIndex.top(Infinity);
	return filteredData;
}

function orderByEducationIndex (byEducationIndex) {
	var filteredData = byEducationIndex.top(Infinity);
	return filteredData;
}

function orderByEquityIndex (byEquityIndex) {
	var filteredData = byEquityIndex.top(Infinity);
	return filteredData;
}

function orderByQualityOfLifeIndex (byQualityOfLifeIndex) {
	var filteredData = byQualityOfLifeIndex.top(Infinity);
	return filteredData;
}

function orderByTransitIndex (byTransitIndex) {
	var filteredData = byTransitIndex.top(Infinity);
	return filteredData;
}

function orderByRegion (byRegion) {
	var filteredData = byRegion.bottom(Infinity);
	return filteredData;
}

function orderByCity (byCity) {
	var filteredData = byCity.bottom(Infinity);
	return filteredData;
}

function orderByValue (cf, byValue, order) {
	if (order == 1) {
		var orderedData = byValue.top(Infinity);		
	} else if (order == 2) {
		var orderedData = byValue.bottom(Infinity);				
	} else if (order == 3) {
		var byRegionOnly = setupCrossfilterByRegionOnly(cf, dataset);
		byRegionOnly.filterExact('Midwest');
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var orderedData = orderByRegion(byRegion);
		clearFilterByRegionOnly(byRegionOnly);			
	} else if (order == 4) {
		var byRegionOnly = setupCrossfilterByRegionOnly(cf, dataset);
		byRegionOnly.filterExact('Northeast');
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var orderedData = orderByRegion(byRegion);
		clearFilterByRegionOnly(byRegionOnly);			
	} else if (order == 5) {
		var byRegionOnly = setupCrossfilterByRegionOnly(cf, dataset);
		byRegionOnly.filterExact('Southeast');
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var orderedData = orderByRegion(byRegion);
		clearFilterByRegionOnly(byRegionOnly);			
	} else if (order == 6) {
		var byRegionOnly = setupCrossfilterByRegionOnly(cf, dataset);
		byRegionOnly.filterExact('Southwest');
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var orderedData = orderByRegion(byRegion);
		clearFilterByRegionOnly(byRegionOnly);			
	} else if (order == 7) {
		var byRegionOnly = setupCrossfilterByRegionOnly(cf, dataset);
		byRegionOnly.filterExact('West');
		// sort data by region
		var byRegion = setupCrossfilterByRegion(cf, dataset);
		var orderedData = orderByRegion(byRegion);
		clearFilterByRegionOnly(byRegionOnly);			
	} else {}
	return orderedData;
}


function clearFilterByYear(byYear) {
	byYear.filterAll();	
}

function clearFilterByGeoID(byGeoID) {
	byGeoID.filterAll();
}

function clearFilterByValue(byValue) {
	byValue.filterAll();
}

function clearFilterByRegionOnly(byRegionOnly) {
	byRegionOnly.filterAll();
}

function clearFilterByCityOnly(byCityOnly) {
	byCityOnly.filterAll();
}

// function to pad lat lons for map
function padLatLons(dataset) {
	$.each(dataset, function( i, d ) {
		if (d.geoid == 45) { // Sacramento
			d.lon = d.lon + 0.75;
		} else if (d.geoid == 49) { // San Francisco
			d.lon = d.lon - 0.5;
		} else if (d.geoid == 3) { // Austin
			d.lat = d.lat + 0.6;
		} else if (d.geoid == 37) { // Orlando
			d.lon = d.lon + 0.5;
		} else if (d.geoid == 52) { // Tampa Bay
			d.lon = d.lon - 0.5;
		} else if (d.geoid == 19) { // Greenville
			d.lon = d.lon + 0.5;
			d.lat = d.lat - 0.9;
		} else if (d.geoid == 42) { // Raleigh
			d.lon = d.lon + 0.7;
		} else if (d.geoid == 18) { // Greensburro
			d.lat = d.lat + 0.3;
		} else if (d.geoid == 53) { // Virgina Beach
			d.lon = d.lon + 0.5;
		} else if (d.geoid == 1) { // Albany
			d.lat = d.lat + 0.5;
		} else if (d.geoid == 5) { // Boston
			d.lon = d.lon + 0.7;
		} else if (d.geoid == 20) { // Hartford
			d.lon = d.lon + 0.2;
			d.lat = d.lat + 0.2;
		} else if (d.geoid == 35) { // NYC
			d.lat = d.lat + 0.2;
		} else if (d.geoid == 38) { // Philly
			d.lon = d.lon - 0.5;
			d.lat = d.lat + 0.2;
		} else if (d.geoid == 44) { // Rochester
			d.lon = d.lon + 1.1;
		} else if (d.geoid == 31) { // Milwaukee
			d.lon = d.lon - 0.3;
			d.lat = d.lat + 0.3;
		} else if (d.geoid == 28) { // Louisville
			d.lon = d.lon - 0.7;
			d.lat = d.lat - 0.3;
		} else if (d.geoid == 9) { // Cincinnati
			d.lon = d.lon + 0.3;
			d.lat = d.lat - 0.5;
		} else if (d.geoid == 11) { // Columbus, OH
			d.lon = d.lon + 0.8;
			d.lat = d.lat - 0.5;
		} else if (d.geoid == 13) { // Dayton, OH
			d.lon = d.lon + 0.2;
			d.lat = d.lat + 0.5;
		} else if (d.geoid == 22) { // Indy
			d.lon = d.lon - 0.2;
		}			
	});
	
}

// function to create an object for the pinwheel function to read
function createObjectForPinwheel(filteredData) {	
	// create an object with the city names and ids segregated from the indicies for easy ploting
	var rowOfData = {};	
	rowOfData.meta = [];
	rowOfData.indicies = [];	
	$.each(filteredData, function( i, d ) {		
		rowOfData.meta.push({ id: d.id, geoid: d.geoid, metro: d.metro, year: d.year, lat: d.lat, lon: d.lon, oned_index: d.oned_index });
		rowOfData.indicies.push({ name: 'Economy Index', index: d.economy_index, angle: 247.5 });
		rowOfData.indicies.push({ name: 'Education Index', index: d.education_index, angle: 292.5 });
		rowOfData.indicies.push({ name: 'Equity Index', index: d.equity_index, angle: 337.5 });
		rowOfData.indicies.push({ name: 'Quality of Life Index', index: d.quality_of_life_index, angle: 22.5 });
		rowOfData.indicies.push({ name: 'Transit Index', index: d.transit_index, angle: 67.5 });
	});
	// return the selected row
	return rowOfData;
}

// function to create an object for the national-level circular heat chart to read
function createObjectForCircularHeatChart(filteredData) {	
	// create an object with the city names and ids segregated from the indicies for easy ploting
	var circularChartData = {};	
	circularChartData.meta = []
	circularChartData.economyIndex = []
	circularChartData.educationIndex = []
	circularChartData.equityIndex = []
	circularChartData.qualityOfLifeIndex = []
	circularChartData.transitIndex = []
	circularChartData.indicies = []
	circularChartData.regions = []
	$.each(filteredData, function( i, d ) {		
		circularChartData.meta.push({ id: d.id, geoid: d.geoid, metro: d.metro, region: d.region, year: d.year, lat: d.lat, lon: d.lon, oned_index: d.oned_index, economy_index: d.economy_index, education_index: d.education_index, equity_index: d.equity_index, quality_of_life_index: d.quality_of_life_index, transit_index: d.transit_index });
		circularChartData.economyIndex.push(d.economy_index);
		circularChartData.educationIndex.push(d.education_index);
		circularChartData.equityIndex.push(d.equity_index);
		circularChartData.qualityOfLifeIndex.push(d.quality_of_life_index);
		circularChartData.transitIndex.push(d.transit_index);
		
		// get region counts
		var key = d.region;
		if (!circularChartData.regions[key]) {
			circularChartData.regions[key] = {
				region: d.region,
				count: 0,
				start: 0,
				end: 0
			};
		}
		circularChartData.regions[key].count++;
		
	});
	
	var lastKey = '';
	Object.keys(circularChartData.regions).forEach(function(key) {
		if (lastKey == '') {
			circularChartData.regions[key].start = 0;
			circularChartData.regions[key].end = circularChartData.regions[key].count;
			//console.log(circularChartData.regions[key].end);
		    circularChartData.regions.push(circularChartData.regions[key]);
		} else {
			circularChartData.regions[key].start = circularChartData.regions[lastKey].end;
			//console.log(lastKey);
			//console.log(circularChartData.regions[lastKey].start);
			circularChartData.regions[key].end = circularChartData.regions[lastKey].end + circularChartData.regions[key].count;
			//console.log(circularChartData.regions[key].end);
		    circularChartData.regions.push(circularChartData.regions[key]);
		}
		lastKey = key;
	});
	
	circularChartData.indicies = circularChartData.economyIndex.concat(circularChartData.educationIndex, circularChartData.equityIndex, circularChartData.qualityOfLifeIndex, circularChartData.transitIndex);
		
	// return the re-oriented dataset
	return circularChartData;
}

// extender for Object class that determines the object length
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


// function to create an object for the city-level circular heat chart to read
function createObjectForCircularHeatChartCity(filteredData) {	
	// create an object with the city metadata and ids segregated from the indicies for easy ploting
	var circularChartData = {};	
	circularChartData.meta = []
	circularChartData.rung1 = []
	circularChartData.rung2 = []
	circularChartData.rung3 = []
	circularChartData.rung4 = []
	circularChartData.rung5 = []
	circularChartData.rung1Id = []
	circularChartData.rung2Id = []
	circularChartData.rung3Id = []
	circularChartData.rung4Id = []
	circularChartData.rung5Id = []
	circularChartData.indicators = []
	circularChartData.ids = []
	circularChartData.priorityAreas = []
	$.each(filteredData, function( i, d ) {		
		circularChartData.meta.push({ id: d.id, geoid: d.geoid, metro: d.metro, region: d.region, year: d.year, lat: d.lat, lon: d.lon });
		circularChartData.rung1.push(d.econ_exports, d.econ_gmp, d.econ_hightech, d.edu_pctbachhigher2534, d.edu_pctbachhigher, d.edu_ppstatebudget, d.equity_fbpop, d.equity_gini, d.equity_incshareq1, d.equity_incshareq2, d.qol_aqi, d.qol_homeownershiptotal, d.transit_hoursdelayedpc, d.transit_caralone);
		circularChartData.rung2.push(d.econ_kiemploy, d.econ_mhhinc, d.econ_pcpi, d.edu_ppspending, d.edu_enrolled, d.edu_hsdiploma, d.equity_incshareq3, d.equity_incshareq4, d.equity_incshareq5, d.equity_incsharetop5, d.qol_popchange, d.qol_popwohealthins, d.transit_novehicle, -99);
		circularChartData.rung3.push(d.econ_pop2534, d.econ_povrt, -99, d.edu_naep4math, d.edu_naep4read, d.edu_naep4sci, d.equity_medhhincblack, d.equity_medhhinchisp, d.equity_medhhincwhite, d.equity_medhhinctotal, d.qol_vcrimert, d.qol_vthourspc, d.transit_statefunding, -99);
		circularChartData.rung4.push(d.econ_techpatents, d.econ_biztaxindex, -99, d.edu_naep8math, d.edu_naep8read, -99, d.equity_childpovrtblack, d.equity_childpovrthisp, d.equity_childpovrtwhite, d.equity_childpovrttotal, d.qol_obese, -99, d.transit_bustrips, -99);
		circularChartData.rung5.push(d.econ_rdsharegdp, d.econ_vcpc, -99, d.edu_naep8sci, d.edu_unemployednohs, -99, d.equity_homeownershipblack, d.equity_homeownershiphisp, d.equity_homeownershipwhite, d.equity_homeownershiptotal, d.qol_physicians, -99, d.transit_bridgecondition, -99);

		circularChartData.rung1Id.push(1, 2, 4, 14, 15, 16, 27, 28, 29, 30, 47, 48, 55, 56);
		circularChartData.rung2Id.push(5, 6, 7, 17, 18, 19, 31, 32, 33, 34, 49, 50, 57, -99);
		circularChartData.rung3Id.push(8, 9, -99, 20, 21, 22, 35, 36, 37, 38, 51, 52, 58, -99);
		circularChartData.rung4Id.push(10, 11, -99, 23, 24, -99, 39, 40, 41, 42, 53, -99, 59, -99);
		circularChartData.rung5Id.push(12, 13, -99, 25, 26, -99, 43, 44, 45, 46, 54, -99, 60, -99);
				
		// set priority area wedge widths 
		circularChartData.priorityAreas[0] = { priorityArea: 'Economy', color: '#a6c0d0', start: 0, end: 3 };
		circularChartData.priorityAreas[1] = { priorityArea: 'Education', color: '#d94f26', start: 3, end: 6 };
		circularChartData.priorityAreas[2] = { priorityArea: 'Social Equity', color: '#20698a', start: 6, end: 10 };
		circularChartData.priorityAreas[3] = { priorityArea: 'Quality of Life', color: '#f5a91d', start: 10, end: 12 };
		circularChartData.priorityAreas[4] = { priorityArea: 'Regional Transit', color: '#87af3f', start: 12, end: 14 };
		
	});
	
	circularChartData.indicators = circularChartData.rung1.concat(circularChartData.rung2, circularChartData.rung3, circularChartData.rung4, circularChartData.rung5);
	circularChartData.ids = circularChartData.rung1Id.concat(circularChartData.rung2Id, circularChartData.rung3Id, circularChartData.rung4Id, circularChartData.rung5Id);
		
	// return the re-oriented dataset
	return circularChartData;
}


// function to create an object for the city-level circular heat chart to read
function createObjectForDountChartCity(filteredData) {	
	// create an object with the city metadata and ids segregated from the indicies for easy ploting
	// variables:
	// sliceWidth -- equal to the number of full width variables in each priority area
	// sliceNumber -- number order of slice within each category
	// categoryCount -- a counter numebr for each category
	// innerRadius -- center except for the 
	// outerRadius -- outer lelve except for the variables taht only take up a third of the slice
	// value -- used to create the colors
	// id -- indicator ID used for transitions
	// 
	
	var donutChartData = {};	
	donutChartData.meta = []
	donutChartData.economy = []
	donutChartData.education = []
	donutChartData.equity = []
	donutChartData.qol = []
	donutChartData.transit = []
	donutChartData.indicators = []
	donutChartData.priorityAreas = [];
	var innerRadius = 30;
	var outerRadius = innerRadius + 180;
	$.each(filteredData, function( i, d ) {		
		donutChartData.meta.push({ id: d.id, geoid: d.geoid, metro: d.metro, region: d.region, year: d.year, lat: d.lat, lon: d.lon });
		donutChartData.economy.push(
			{ id: 1, value: d.econ_exports, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 1, catetoryCount: 1 },
			{ id: 2, value: d.econ_gmp, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 2, catetoryCount: 1 },
			{ id: 4, value: d.econ_hightech, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 3, catetoryCount: 1 },
			{ id: 5, value: d.econ_kiemploy, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 4, catetoryCount: 1 },
			{ id: 7, value: d.econ_pcpi, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 5, catetoryCount: 1 },
			{ id: 10, value: d.econ_techpatents, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 6, catetoryCount: 1 },
			{ id: 11, value: d.econ_biztaxindex, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 7, catetoryCount: 1 },
			{ id: 12, value: d.econ_rdsharegdp, sliceWidth: 8, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 8, catetoryCount: 1 }
		);
		donutChartData.education.push(
			{ id: 14, value: d.edu_pctbachhigher2534, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 1, catetoryCount: 2 },
			{ id: 15, value: d.edu_pctbachhigher, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 2, catetoryCount: 2 },
			{ id: 18, value: d.edu_enrolled, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 3, catetoryCount: 2 },
			{ id: 19, value: d.edu_hsdiploma, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 4, catetoryCount: 2 },
			{ id: 16, value: d.edu_ppstatebudget, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 5, catetoryCount: 2 },
			{ id: 17, value: d.edu_ppspending, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 6, catetoryCount: 2 },
			{ id: 26, value: d.edu_unemployednohs, sliceWidth: 7, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 7, catetoryCount: 2 }
		);
		donutChartData.equity.push(
			{ id: 27, value: d.equity_fbpop, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 1, catetoryCount: 3 },
			{ id: 28, value: d.equity_gini, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 2, catetoryCount: 3 },
			{ id: 29, value: d.equity_incshareq1, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 3, catetoryCount: 3 },
			{ id: 30, value: d.equity_incshareq2, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 4, catetoryCount: 3 },
			{ id: 31, value: d.equity_incshareq3, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 5, catetoryCount: 3 },
			{ id: 32, value: d.equity_incshareq4, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 6, catetoryCount: 3 },
			{ id: 33, value: d.equity_incshareq5, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 7, catetoryCount: 3 },
			{ id: 34, value: d.equity_incsharetop5, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 8, catetoryCount: 3 },
			{ id: 35, value: d.equity_medhhincblack, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 25, catetoryCount: 3 },
			{ id: 36, value: d.equity_medhhinchisp, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 26, catetoryCount: 3 },
			{ id: 37, value: d.equity_medhhincwhite, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 27, catetoryCount: 3 },
			{ id: 38, value: d.equity_medhhinctotal, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 9, catetoryCount: 3 },
			{ id: 39, value: d.equity_childpovrtblack, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 28, catetoryCount: 3 },
			{ id: 40, value: d.equity_childpovrthisp, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 29, catetoryCount: 3 },
			{ id: 41, value: d.equity_childpovrtwhite, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 30, catetoryCount: 3 },			
			{ id: 42, value: d.equity_childpovrttotal, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 10, catetoryCount: 3 },			
			{ id: 43, value: d.equity_homeownershipblack, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 31, catetoryCount: 3 },
			{ id: 44, value: d.equity_homeownershiphisp, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 32, catetoryCount: 3 },
			{ id: 45, value: d.equity_homeownershipwhite, sliceWidth: 33, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 33, catetoryCount: 3 },
			{ id: 46, value: d.equity_homeownershiptotal, sliceWidth: 11, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 11, catetoryCount: 3 }
		);
		donutChartData.qol.push(
			{ id: 47, value: d.qol_aqi, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 1, catetoryCount: 4 },
			{ id: 49, value: d.qol_popchange, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 2, catetoryCount: 4 },
			{ id: 50, value: d.qol_popwohealthins, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 3, catetoryCount: 4 },
			{ id: 51, value: d.qol_vcrimert, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 4, catetoryCount: 4 },
			{ id: 52, value: d.qol_vthourspc, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 5, catetoryCount: 4 },
			{ id: 53, value: d.qol_obese, sliceWidth: 6, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 6, catetoryCount: 4 }
		);
		donutChartData.transit.push(
			{ id: 55, value: d.transit_hoursdelayedpc, sliceWidth: 5, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 1, catetoryCount: 5 },
			{ id: 56, value: d.transit_caralone, sliceWidth: 5, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 2, catetoryCount: 5 },
			{ id: 57, value: d.transit_novehicle, sliceWidth: 5, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 3, catetoryCount: 5 },
			{ id: 58, value: d.transit_statefunding, sliceWidth: 5, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 4, catetoryCount: 5 },
			{ id: 59, value: d.transit_bustrips, sliceWidth: 5, innerRadius: innerRadius, outerRadius: outerRadius, sliceNumber: 5, catetoryCount: 5 }
		);
				
		// set priority area wedge widths 
		donutChartData.priorityAreas[0] = { priorityArea: 'Economy', color: '#a6c0d0', start: 0, end: 1 };
		donutChartData.priorityAreas[1] = { priorityArea: 'Education', color: '#d94f26', start: 1, end: 2 };
		donutChartData.priorityAreas[2] = { priorityArea: 'Social Equity', color: '#20698a', start: 2, end: 3 };
		donutChartData.priorityAreas[3] = { priorityArea: 'Quality of Life', color: '#f5a91d', start: 3, end: 4 };
		donutChartData.priorityAreas[4] = { priorityArea: 'Regional Transit', color: '#87af3f', start: 4, end: 5 };
		
	});
	
	donutChartData.indicators = donutChartData.economy.concat(donutChartData.education, donutChartData.equity, donutChartData.qol, donutChartData.transit);
		
	// return the re-oriented dataset
	return donutChartData;
}




/**** End code for data manipulation ****/	
	