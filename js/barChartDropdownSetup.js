/*
* this script sets up the bar chart drop down changes based on selection
*/
	
$(document).ready(function() {

    $("#selectPriorityArea").change(function() {
        var val = $(this).val();
        if (val == "1") {
            $("#selectIndicator").html("<option value='61'>Economy Index</option><option value='1'>Total Value of Exports</option><option value='2'>Per Capita GDP for Metropolitan Area (GMP)</option><option value='4'>Percent Change in High Tech Jobs</option><option value='5'>Percent Change in Knowledge Industry Employment</option><option value='7'>Per Capita Personal Income</option><option value='10'>Number of Technology Patents per 10K People</option><option value='11'>Business Tax Climate Index</option><option value='12'>Research & Development, Share of State GDP</option>");
        } else if (val == "2") {
            $("#selectIndicator").html("<option value='62'>Education Index</option><option value='14'>Young & Talented Population, Education Attainment Bachelors+, 25-34</option><option value='15'>Education Attainment Bachelors+, 25+</option><option value='18'>Percent Population Enrolled in School, 3+</option><option value='19'>Education Attainment High School+, 18+</option><option value='26'>Percent Teens Not Enrolled in School, No HS Diploma, Unemployed</option><option value='16'>State Appropriations Per Pupil</option><option value='17'>State Expenditures Per Pupil</option>");
        } else if (val == "3") {
            $("#selectIndicator").html("<option value='63'>Equity Index</option><option value='27'>Percent of Population Foreign Born</option><option value='28'>Gini Index</option><option value='29'>Lowest Quintile of Households Share of Aggregate Income</option><option value='30'>Second Lowest Quintile of Households Share of Aggregate Income</option><option value='31'>Middle Quintile of Households Share of Aggregate Income</option><option value='32'>Second Highest Quintile of Households Share of Aggregate Income</option><option value='33'>Highest Quintile of Households Share of Aggregate Income</option><option value='34'>Top 5% of Households Share of Aggregate Income</option><option value='35'>Median Household Income for Black Households</option><option value='36'>Median Household Income for Hispanic Households</option><option value='37'>Median Household Income for Non-Hispanic White Households</option><option value='38'>Median Household Income for All Households</option><option value='39'>Percent of Black Population Under 18 Below 100% of Poverty Level</option><option value='40'>Percent of Hispanic Population Under 18 Below 100% of Poverty Level</option><option value='41'>Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level</option><option value='42'>Percent of Population Under 18 Below 100% of Poverty Level</option><option value='43'>Percent Housing Owner Occupied for Black Households</option><option value='44'>Percent Housing Owner Occupied for Hispanic Households</option><option value='45'>Percent Housing Owner Occupied for Non-Hispanic White Households</option><option value='46'>Percent Housing Owner Occupied</option>");
        } else if (val == "4") {
			$("#selectIndicator").html("<option value='64'>Quality of Life Index</option><option value='47'>Air Quality Index, Percent of \"Good\" Days</option><option value='49'>Percent Change in Population</option><option value='50'>Percent Population Without Health Insurance</option><option value='51'>Total Violent Crimes per 100,000 Residents</option><option value='52'>Average Volunteer Rate, Hours Per Resident</option><option value='53'>Percent of Population neither Overweight nor Obese</option>");
        } else if (val == "5") {
            $("#selectIndicator").html("<option value='65'>Regional Transit Index</option><option value='55'>Annual Hours of Delay per Auto Commuter</option><option value='57'>Percent of Workers with No Vehicle</option><option value='56'>Percent of Workers 16+ Driving Alone to Work</option><option value='58'>Public Transportation Funding, State Dollars per 1,000 Residents</option><option value='59'>Percent of Transit Ridership Occurring on a Bus</option>");
    	} else if (val == "6") {
	        $("#selectIndicator").html("<option value='66'>OneD Index</option>");
	    }

		var order = $( "#selectOrder" ).val();
		var indicator = $( "#selectIndicator" ).val();
		var city = $( "#selectCity" ).val();
		var year = $( "#barChartSlider" ).slider( 'getValue' );
		updateBarChartData(year, indicator, order, city);
		
	});
		
		
	// add options to the donut chart visualization in the same manner
    $("#selectPriorityAreaDonut").change(function() {
        var val = $(this).val();
        if (val == "1") {
            $("#selectIndicatorDonut").html("<option value='1'>Total Value of Exports</option><option value='2'>Per Capita GDP for Metropolitan Area (GMP)</option><option value='4'>Percent Change in High Tech Jobs</option><option value='5'>Percent Change in Knowledge Industry Employment</option><option value='7'>Per Capita Personal Income</option><option value='10'>Number of Technology Patents per 10K People</option><option value='11'>Business Tax Climate Index</option><option value='12'>Research & Development, Share of State GDP</option>");
        } else if (val == "2") {
            $("#selectIndicatorDonut").html("<option value='14'>Young & Talented Population, Education Attainment Bachelors+, 25-34</option><option value='15'>Education Attainment Bachelors+, 25+</option><option value='18'>Percent Population Enrolled in School, 3+</option><option value='19'>Education Attainment High School+, 18+</option><option value='26'>Percent Teens Not Enrolled in School, No HS Diploma, Unemployed</option><option value='16'>State Appropriations Per Pupil</option><option value='17'>State Expenditures Per Pupil</option>");
        } else if (val == "3") {
			$("#selectIndicatorDonut").html("<option value='27'>Percent of Population Foreign Born</option><option value='28'>Gini Index</option><option value='29'>Lowest Quintile of Households Share of Aggregate Income</option><option value='30'>Second Lowest Quintile of Households Share of Aggregate Income</option><option value='31'>Middle Quintile of Households Share of Aggregate Income</option><option value='32'>Second Highest Quintile of Households Share of Aggregate Income</option><option value='33'>Highest Quintile of Households Share of Aggregate Income</option><option value='34'>Top 5% of Households Share of Aggregate Income</option><option value='35'>Median Household Income for Black Households</option><option value='36'>Median Household Income for Hispanic Households</option><option value='37'>Median Household Income for Non-Hispanic White Households</option><option value='38'>Median Household Income for All Households</option><option value='39'>Percent of Black Population Under 18 Below 100% of Poverty Level</option><option value='40'>Percent of Hispanic Population Under 18 Below 100% of Poverty Level</option><option value='41'>Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level</option><option value='42'>Percent of Population Under 18 Below 100% of Poverty Level</option><option value='43'>Percent Housing Owner Occupied for Black Households</option><option value='44'>Percent Housing Owner Occupied for Hispanic Households</option><option value='45'>Percent Housing Owner Occupied for Non-Hispanic White Households</option><option value='46'>Percent Housing Owner Occupied</option>");
        } else if (val == "4") {
            $("#selectIndicatorDonut").html("<option value='47'>Air Quality Index, Percent of \"Good\" Days</option><option value='49'>Percent Change in Population</option><option value='50'>Percent Population Without Health Insurance</option><option value='51'>Total Violent Crimes per 100,000 Residents</option><option value='52'>Average Volunteer Rate, Hours Per Resident</option><option value='53'>Percent of Population neither Overweight nor Obese</option>");
			
        } else if (val == "5") {
            $("#selectIndicatorDonut").html("<option value='55'>Annual Hours of Delay per Auto Commuter</option><option value='56'>Percent of Workers 16+ Driving Alone to Work</option><option value='57'>Percent of Workers with No Vehicle</option><option value='58'>Public Transportation Funding, State Dollars per 1,000 Residents</option><option value='59'>Percent of Transit Ridership Occurring on a Bus</option>");
    	}

		var indicator = $( "#selectIndicatorDonut" ).val();
		var city = $( "#selectCityDonut" ).val();
		var year = $( "#cityDonutChartSlider" ).slider( 'getValue' );
		updateCityDonutChartData(year, city, indicator);
	

    });
	

});

//update priority area bar chart with nav bar click
function setMenusFromNavBar(id) {
	$("#selectPriorityArea").val(id);
	$("#selectPriorityArea").change();
}

// sets active menu bar
$(".nav li").on("click", function() {
  $(".nav li").removeClass("active");
  $(this).addClass("active");
});
