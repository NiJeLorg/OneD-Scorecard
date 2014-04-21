/*
* this script sets up the bar chart drop down changes based on selection
*/
	
$(document).ready(function() {

    $("#selectPriorityArea").change(function() {
        var val = $(this).val();
        if (val == "1") {
            $("#selectIndicator").html("<option value='61'>Economy Index</option><option value='1'>Export Value</option><option value='2'>Per Capita Real GDP</option><option value='4'>Percent Change in High Tech Employment</option><option value='5'>Percent Change in Knowledge Industry Employment</option><option value='6'>Median Household Income</option><option value='7'>Per Capita Personal Income</option><option value='8'>Percent of Population Ages 25 to 34</option><option value='9'>Percent of Population Below 100% of Poverty Level</option><option value='10'>Technology Patents per 10,000 People</option><option value='11'>Business Tax Climate Index</option><option value='12'>R&D Performed as Share of GDP</option><option value='13'>Venture Captial Investment Dollars Per Capita</option>");
        } else if (val == "2") {
            $("#selectIndicator").html("<option value='62'>Education Index</option><option value='14'>Percent Ages 25 to 34 with Bachelor's Degree or Higher</option><option value='15'>Percent with Bachelor's Degree or Higher</option><option value='16'>Educational Expenditures Per FTE student</option><option value='17'>Educational Expenditures Per Pupil</option><option value='18'>Percent Enrolled in School, Pre-K - High School</option><option value='19'>Percent with High School Diploma or Higher</option><option value='20'>4th Grade NAEP Math Scores</option><option value='21'>4th Grade NAEP Reading Scores</option><option value='22'>4th Grade NAEP Science Scores</option><option value='23'>8th Grade NAEP Math Scores</option><option value='24'>8th Grade NAEP Reading Scores</option><option value='25'>8th Grade NAEP Science Scores</option><option value='26'>Percent Unemployed with No High School Degree</option>");
        } else if (val == "3") {
            $("#selectIndicator").html("<option value='63'>Equity Index</option><option value='27'>Percent of Population Foreign Born</option><option value='28'>Gini Index</option><option value='29'>Lowest Quintile of Households Share of Aggregate Income</option><option value='30'>Second Lowest Quintile of Households Share of Aggregate Income</option><option value='31'>Middle Quintile of Households Share of Aggregate Income</option><option value='32'>Second Highest Quintile of Households Share of Aggregate Income</option><option value='33'>Highest Quintile of Households Share of Aggregate Income</option><option value='34'>Top 5% of Households Share of Aggregate Income</option><option value='35'>Median Household Income for Black Households</option><option value='36'>Median Household Income for Hispanic Households</option><option value='37'>Median Household Income for Non-Hispanic White Households</option><option value='38'>Median Household Income for All Households</option><option value='39'>Percent of Black Population Under 18 Below 100% of Poverty Level</option><option value='40'>Percent of Hispanic Population Under 18 Below 100% of Poverty Level</option><option value='41'>Percent of Non-Hispanic White Population Under 18 Below 100% of Poverty Level</option><option value='42'>Percent of Population Under 18 Below 100% of Poverty Level</option><option value='43'>Black Home Owner Occupied Rate</option><option value='44'>Hispanic Home Owner Occupied Rate</option><option value='45'>Non-Hispanic White Home Owner Occupied Rate</option><option value='46'>Home Owner Occupied Rate</option>");
        } else if (val == "4") {
            $("#selectIndicator").html("<option value='64'>Quality of Life Index</option><option value='47'>Percent of Days AQI Was Reported To Be Good</option><option value='48'>Home Owner Occupied Rate</option><option value='49'>Percent Change in Population</option><option value='50'>Percent of Population Without Health Insurance Coverage</option><option value='51'>Number of Violent Crimes Per 100,000 Residents</option><option value='52'>Volunteer Hours Per Resident</option><option value='53'>Percent of Population Overweight or Obese</option><option value='54'>Physicians per 100,000 residents</option>");
        } else if (val == "5") {
            $("#selectIndicator").html("<option value='65'>Regional Transit Index</option><option value='55'>Annual Hours of Delay Per Auto Commuter</option><option value='56'>Percent of Workers 16 and Over Driving to Work Alone</option><option value='57'>Percent of Workers With No Vehicle</option><option value='58'>State Funding of Public Transit Per 1,000 Residents</option><option value='59'>Annual Unlinked Passenger Bus Trips</option><option value='60'>Percent of Bridges That Are Functionally Obsolete</option>");
    	} else if (val == "6") {
	        $("#selectIndicator").html("<option value='66'>OneD Index</option>");
	    }

		var order = $( "#selectOrder" ).val();
		var indicator = $( "#selectIndicator" ).val();
		var year = $( "#barChartSlider" ).slider( 'getValue' );
		updateBarChartData(year, indicator, order);
		

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

	