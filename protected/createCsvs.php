<?php
/*
* this script calculates the priority area and One D index values and writes those to a csv
*/

// set INI
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

// database connection info
require('connect.php');

// open csv files for writing
$filecsv = "../data/indexData.csv";
$file2csv = "../data/indicatorData.csv";
$handlecsv = fopen($filecsv, "w");
$handle2csv = fopen($file2csv, "w");

// create csv headers
$csv_header = array('id', 'geoid', 'metro', 'region', 'lat', 'lon', 'year', 'oned_index', 'economy_index', 'education_index', 'equity_index', 'quality_of_life_index', 'transit_index');

$csv_header2 = array('id', 
					'geoid', 
					'metro', 
					'region', 
					'lat', 
					'lon', 
					'year', 
					'oned_index', 
					'economy_index', 
					'education_index', 
					'equity_index', 
					'quality_of_life_index', 
					'transit_index', 
					'econ_exports', 
					'econ_gmp', 
					'econ_hightech', 
					'econ_kiemploy', 
					'econ_pcpi', 
					'econ_techpatents', 
					'econ_biztaxindex', 
					'econ_rdsharegdp', 
					'edu_pctbachhigher2534', 
					'edu_pctbachhigher', 
					'edu_enrolled', 
					'edu_hsdiploma', 
					'edu_unemployednohs', 
					'edu_ppstatebudget', 
					'edu_ppspending', 
					'qol_aqi', 
					'qol_popchange', 
					'qol_popwohealthins', 
					'qol_vcrimert', 
					'qol_vthourspc', 
					'qol_obese', 
					'equity_fbpop', 
					'equity_gini', 
					'equity_incshareq1', 
					'equity_incshareq2', 
					'equity_incshareq3', 
					'equity_incshareq4', 
					'equity_incshareq5', 
					'equity_incsharetop5', 
					'equity_medhhincblack', 
					'equity_medhhinchisp', 
					'equity_medhhincwhite', 
					'equity_medhhinctotal', 
					'equity_childpovrtblack', 
					'equity_childpovrthisp', 
					'equity_childpovrtwhite', 
					'equity_childpovrttotal', 
					'equity_homeownershipblack', 
					'equity_homeownershiphisp', 
					'equity_homeownershipwhite', 
					'equity_homeownershiptotal', 
					'transit_hoursdelayedpc', 
					'transit_caralone', 
					'transit_novehicle', 
					'transit_bustrips', 
					'transit_statefunding'
				);


// write header to csv files
fputcsv($handlecsv, $csv_header);
fputcsv($handle2csv, $csv_header2);

// pull the geography metadata for the csv
$geographies = array();
$query = "SELECT geoid, metroarea, region, lat, lon, state FROM geographies ORDER BY geoid";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $geographies[] = $row;
}
/* free result set */
$result->free();

// create string of geoids for data selection
$geoids= array();
foreach ($geographies as $geoid) {
    $geoids[] = $geoid['geoid'];
}
$geoidsString = join(',',$geoids);

// create string of state names for data selection
$states= array();
foreach ($geographies as $state) {
    $states[] = $state['state'];
}
$states = array_unique($states); // remove extra state names
$statesString = "'" . join("','",$states) . "'"; 


// pull data for economy variables and store in arrays
// Total Value of Exports
$metro_exports = array();
$query = "SELECT geoid, year, export_value FROM metro_exports WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_exports[] = $row;
}
/* free result set */
$result->free();


// Per Capita GDP for Metropolitan Area (GMP)
$metro_GMPpercap = array();
$query = "SELECT geoid, year, per_capita_real_gdp FROM metro_GMPpercap WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_GMPpercap[] = $row;
}
/* free result set */
$result->free();


// Percent Change in High Tech Jobs
$metro_HighTech = array();
$query = "SELECT geoid, year_end, percentchange_hightech_jobs FROM metro_HighTech WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_HighTech[] = $row;
}
/* free result set */
$result->free();


// Percent Change in Knowledge Industry Employment
$metro_KNemp = array();
$query = "SELECT geoid, year_end, percentchange_knowledgeind FROM metro_KNemp WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_KNemp[] = $row;
}
/* free result set */
$result->free();


// Per Capita Personal Income
$metro_pcpi= array();
$query = "SELECT geoid, year, percapita_income FROM metro_pcpi WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_pcpi[] = $row;
}
/* free result set */
$result->free();


//Number of Technology Patents per 10K People
$metro_TechPatentsRt= array();
$query = "SELECT geoid, year, Tech_Patents_per_10k FROM metro_TechPatentsRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_TechPatentsRt[] = $row;
}
/* free result set */
$result->free();


// Business Tax Climate Index
$state_BizTaxIndex= array();
$query = "SELECT state, year, score FROM state_BizTaxIndex WHERE state IN ($statesString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $state_BizTaxIndex[] = $row;
}
/* free result set */
$result->free();


// Research & Development, Share of State GDP
$state_RandD_share_GDP= array();
$query = "SELECT state, year, RD_GDP_share FROM state_RandD_share_GDP WHERE state IN ($statesString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $state_RandD_share_GDP[] = $row;
}

/* free result set */
$result->free();


// if half of the variables have data for any given year, then we calculate a priority area index for that year

// create arrays of years avialable for year variable
// Total Value of Exports
$metro_exports_years = array();
foreach ($metro_exports as $year) {
    $metro_exports_years[] = $year['year'];
}
$metro_exports_years = array_unique($metro_exports_years); // remove duplicate years

// Per Capita GDP for Metropolitan Area (GMP)
$metro_GMPpercap_years = array();
foreach ($metro_GMPpercap as $year) {
    $metro_GMPpercap_years[] = $year['year'];
}
$metro_GMPpercap_years = array_unique($metro_GMPpercap_years); // remove duplicate years

// Percent Change in High Tech Jobs
$metro_HighTech_years = array();
foreach ($metro_HighTech as $year) {
    $metro_HighTech_years[] = $year['year_end'];
}
$metro_HighTech_years = array_unique($metro_HighTech_years); // remove duplicate years

// Percent Change in Knowledge Industry Employment
$metro_KNemp_years = array();
foreach ($metro_KNemp as $year) {
    $metro_KNemp_years[] = $year['year_end'];
}
$metro_KNemp_years = array_unique($metro_KNemp_years); // remove duplicate years

// Per Capita Personal Income
$metro_pcpi_years = array();
foreach ($metro_pcpi as $year) {
    $metro_pcpi_years[] = $year['year'];
}
$metro_pcpi_years = array_unique($metro_pcpi_years); // remove duplicate years

//Number of Technology Patents per 10K People
$metro_TechPatentsRt_years = array();
foreach ($metro_TechPatentsRt as $year) {
    $metro_TechPatentsRt_years[] = $year['year'];
}
$metro_TechPatentsRt_years = array_unique($metro_TechPatentsRt_years); // remove duplicate years

// Business Tax Climate Index
$state_BizTaxIndex_years = array();
foreach ($state_BizTaxIndex as $year) {
    $state_BizTaxIndex_years[] = $year['year'];
}
$state_BizTaxIndex_years = array_unique($state_BizTaxIndex_years); // remove duplicate years

// Research & Development, Share of State GDP
$state_RandD_share_GDP_years= array();
foreach ($state_RandD_share_GDP as $year) {
    $state_RandD_share_GDP_years[] = $year['year'];
}
$state_RandD_share_GDP_years = array_unique($state_RandD_share_GDP_years); // remove duplicate years

// concatonate all years arrays together and count values. If year has more than 50% of variables covered, then include year in analysis
$economy_years_all = array();
$economy_years_count = array();
$economy_years = array();
$economy_years_all = array_merge($metro_exports_years, $metro_GMPpercap_years, $metro_HighTech_years, $metro_KNemp_years, $metro_pcpi_years, $metro_TechPatentsRt_years, $state_BizTaxIndex_years, $state_RandD_share_GDP_years);
$economy_years_count = array_count_values($economy_years_all);
foreach ($economy_years_count as $year => $count) {
	if ($count >= 4) { // at least 4 economy variables with data present for this year
		$economy_years[] = $year;
	}
}

// filter and group data by year
$metro_exports_filtered = array();
foreach ($metro_exports as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_exports_filtered[$year][] = $data;
		}
	}
}

// map values to 0-5 range for each year
$metro_exports_indexed = array();
$metro_exports_values = array();
foreach($economy_years as $year) {
	foreach($metro_exports_filtered[$year] as $data) {
		$metro_exports_values[$year][] = $data['export_value'];
	}
	$metro_exports_max = max($metro_exports_values[$year]);
	$metro_exports_min = min($metro_exports_values[$year]);
	// calculate index scores and store
	foreach($metro_exports_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_exports_min) + ($data['export_value'] * 5)) / ($metro_exports_max - $metro_exports_min));
		$metro_exports_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_GMPpercap_filtered = array();
foreach ($metro_GMPpercap as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_GMPpercap_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_GMPpercap_indexed = array();
$metro_GMPpercap_values = array();
foreach($economy_years as $year) {
	foreach($metro_GMPpercap_filtered[$year] as $data) {
		$metro_GMPpercap_values[$year][] = $data['per_capita_real_gdp'];
	}
	$metro_GMPpercap_max = max($metro_GMPpercap_values[$year]);
	$metro_GMPpercap_min = min($metro_GMPpercap_values[$year]);
	// calculate index scores and store
	foreach($metro_GMPpercap_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_GMPpercap_min) + ($data['per_capita_real_gdp'] * 5)) / ($metro_GMPpercap_max - $metro_GMPpercap_min));
		$metro_GMPpercap_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_HighTech_filtered = array();
foreach ($metro_HighTech as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_HighTech_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_HighTech_indexed = array();
$metro_HighTech_values = array();
foreach($economy_years as $year) {
	foreach($metro_HighTech_filtered[$year] as $data) {
		$metro_HighTech_values[$year][] = $data['percentchange_hightech_jobs'];
	}
	$metro_HighTech_max = max($metro_HighTech_values[$year]);
	$metro_HighTech_min = min($metro_HighTech_values[$year]);
	// calculate index scores and store
	foreach($metro_HighTech_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_HighTech_min) + ($data['percentchange_hightech_jobs'] * 5)) / ($metro_HighTech_max - $metro_HighTech_min));
		$metro_HighTech_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_KNemp_filtered = array();
foreach ($metro_KNemp as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_KNemp_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_KNemp_indexed = array();
$metro_KNemp_values = array();
foreach($economy_years as $year) {
	foreach($metro_KNemp_filtered[$year] as $data) {
		$metro_KNemp_values[$year][] = $data['percentchange_knowledgeind'];
	}
	$metro_KNemp_max = max($metro_KNemp_values[$year]);
	$metro_KNemp_min = min($metro_KNemp_values[$year]);
	// calculate index scores and store
	foreach($metro_KNemp_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_KNemp_min) + ($data['percentchange_knowledgeind'] * 5)) / ($metro_KNemp_max - $metro_KNemp_min));
		$metro_KNemp_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_pcpi_filtered = array();
foreach ($metro_pcpi as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_pcpi_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_pcpi_indexed = array();
$metro_pcpi_values = array();
foreach($economy_years as $year) {
	foreach($metro_pcpi_filtered[$year] as $data) {
		$metro_pcpi_values[$year][] = $data['percapita_income'];
	}
	$metro_pcpi_max = max($metro_pcpi_values[$year]);
	$metro_pcpi_min = min($metro_pcpi_values[$year]);
	// calculate index scores and store
	foreach($metro_pcpi_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_pcpi_min) + ($data['percapita_income'] * 5)) / ($metro_pcpi_max - $metro_pcpi_min));
		$metro_pcpi_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_TechPatentsRt_filtered = array();
foreach ($metro_TechPatentsRt as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$metro_TechPatentsRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_TechPatentsRt_indexed = array();
$metro_TechPatentsRt_values = array();
foreach($economy_years as $year) {
	foreach($metro_TechPatentsRt_filtered[$year] as $data) {
		$metro_TechPatentsRt_values[$year][] = $data['Tech_Patents_per_10k'];
	}
	$metro_TechPatentsRt_max = max($metro_TechPatentsRt_values[$year]);
	$metro_TechPatentsRt_min = min($metro_TechPatentsRt_values[$year]);
	// calculate index scores and store
	foreach($metro_TechPatentsRt_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_TechPatentsRt_min) + ($data['Tech_Patents_per_10k'] * 5)) / ($metro_TechPatentsRt_max - $metro_TechPatentsRt_min));
		$metro_TechPatentsRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$state_BizTaxIndex_filtered = array();
foreach ($state_BizTaxIndex as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$state_BizTaxIndex_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$state_BizTaxIndex_indexed = array();
$state_BizTaxIndex_values = array();
foreach($economy_years as $year) {
	foreach($state_BizTaxIndex_filtered[$year] as $data) {
		$state_BizTaxIndex_values[$year][] = $data['score'];
	}
	$state_BizTaxIndex_max = max($state_BizTaxIndex_values[$year]);
	$state_BizTaxIndex_min = min($state_BizTaxIndex_values[$year]);
	// calculate index scores and store
	foreach($state_BizTaxIndex_filtered[$year] as $data) {
		$calc_index = (((-5*$state_BizTaxIndex_min) + ($data['score'] * 5)) / ($state_BizTaxIndex_max - $state_BizTaxIndex_min));
		$state_BizTaxIndex_indexed[$year][] = array('state' => $data['state'], 'value' => $calc_index);
	}
}

// iterate through the regions and apply the state level values to the regions
$metro_BizTaxIndex_indexed = array();
foreach ($state_BizTaxIndex_indexed as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_BizTaxIndex_indexed[$year][] = array('geoid' => $geo['geoid'], 'value' => $data['value']); 
			}
		}
	}
}

// same for filtered data for the indicators csv
$metro_BizTaxIndex_filtered = array();
foreach ($state_BizTaxIndex_filtered as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_BizTaxIndex_filtered[$year][] = array('geoid' => $geo['geoid'], 'score' => $data['score']); 
			}
		}
	}
}


// filter and group data by year
$state_RandD_share_GDP_filtered = array();
foreach ($state_RandD_share_GDP as $data) {
	foreach($economy_years as $year) {
		if (in_array($year, $data)) {
			$state_RandD_share_GDP_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$state_RandD_share_GDP_indexed = array();
$state_RandD_share_GDP_values = array();
foreach($economy_years as $year) {
	foreach($state_RandD_share_GDP_filtered[$year] as $data) {
		$state_RandD_share_GDP_values[$year][] = $data['RD_GDP_share'];
	}
	$state_RandD_share_GDP_max = max($state_RandD_share_GDP_values[$year]);
	$state_RandD_share_GDP_min = min($state_RandD_share_GDP_values[$year]);
	// calculate index scores and store
	foreach($state_RandD_share_GDP_filtered[$year] as $data) {
		$calc_index = (((-5*$state_RandD_share_GDP_min) + ($data['RD_GDP_share'] * 5)) / ($state_RandD_share_GDP_max - $state_RandD_share_GDP_min));
		$state_RandD_share_GDP_indexed[$year][] = array('state' => $data['state'], 'value' => $calc_index);
	}
}

// iterate through the regions and apply the state level values to the regions
$metro_RandD_share_GDP_indexed = array();
foreach ($state_RandD_share_GDP_indexed as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_RandD_share_GDP_indexed[$year][] = array('geoid' => $geo['geoid'], 'value' => $data['value']); 
			}
		}
	}
}

// same for filtered data for the indicators csv
$metro_RandD_share_GDP_filtered = array();
foreach ($state_RandD_share_GDP_filtered as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_RandD_share_GDP_filtered[$year][] = array('geoid' => $geo['geoid'], 'RD_GDP_share' => $data['RD_GDP_share']); 
			}
		}
	}
}



// create economy index from indexed variables
$economy_index = array();
foreach($economy_years as $year) {
	//add in metro_exports score
	if (isset($metro_exports_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_exports_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_exports_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_GMPpercap score	
	if (isset($metro_GMPpercap_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_GMPpercap_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_GMPpercap_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_HighTech score	
	if (isset($metro_HighTech_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_HighTech_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_HighTech_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_KNemp score	
	if (isset($metro_KNemp_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_KNemp_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_KNemp_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_pcpi score	
	if (isset($metro_pcpi_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_pcpi_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_pcpi_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_TechPatentsRt score	
	if (isset($metro_TechPatentsRt_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_TechPatentsRt_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_TechPatentsRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_BizTaxIndex score	
	if (isset($metro_BizTaxIndex_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_BizTaxIndex_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_BizTaxIndex_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_RandD_share_GDP score	
	if (isset($metro_RandD_share_GDP_indexed[$year])) {
		if (isset($economy_index[$year])) {
			foreach($metro_RandD_share_GDP_indexed[$year] as $data) {
				$key = lookupGeoId($economy_index[$year], $data['geoid']);
				$economy_index[$year][$key]['value'] = $economy_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$economy_index[$year][$key]['count'] = $economy_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_RandD_share_GDP_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$economy_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	// normalize index by the number of variables availible in the year
	foreach($economy_index[$year] as $key => $data) {
		$economy_index[$year][$key]['value'] = ($data['value'] / $data['count']);
	}
	
	 
} // close foreach $economy_years




// pull data for education variables and store in arrays
// Young & Talented Population, Education Attainment Bachelors+, 25-34
$metro_attain25to34bachplus = array();
$query = "SELECT geoid, year, percent_bachelors_and_higher FROM metro_attain25to34bachplus WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_attain25to34bachplus[] = $row;
}
/* free result set */
$result->free();


// Education Attainment Bachelors+, 25+
$metro_bachplus = array();
$query = "SELECT geoid, year, percent_bachelors_and_higher FROM metro_bachplus WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_bachplus[] = $row;
}
/* free result set */
$result->free();


// Percent Population Enrolled in School, 3+
$metro_edu_enrollment = array();
$query = "SELECT geoid, year, percent_enrolled_prek_high FROM metro_edu_enrollment WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_edu_enrollment[] = $row;
}
/* free result set */
$result->free();


// Education Attainment High School+, 18+
$metro_highschool_and_higher_adults = array();
$query = "SELECT geoid, year, percent_hs_and_higher FROM metro_highschool_and_higher_adults WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_highschool_and_higher_adults[] = $row;
}
/* free result set */
$result->free();


// Percent Teens Not Enrolled in School, No HS Diploma, Unemployed
$metro_teens_unemployed_noHS= array();
$query = "SELECT geoid, year, percent_unemployed_no_hs_degree FROM metro_teens_unemployed_noHS WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_teens_unemployed_noHS[] = $row;
}
/* free result set */
$result->free();


// State Appropriations Per Pupil
$state_edu_appropriations= array();
$query = "SELECT state, year, edu_appro_per_fte_student FROM state_edu_appropriations WHERE state IN ($statesString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $state_edu_appropriations[] = $row;
}
/* free result set */
$result->free();


// State Expenditures Per Pupil
$state_edu_expendperpupil= array();
$query = "SELECT state, year, edu_expend_per_pupil FROM state_edu_expendperpupil WHERE state IN ($statesString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $state_edu_expendperpupil[] = $row;
}

/* free result set */
$result->free();


// if half of the variables have data for any given year, then we calculate a priority area index for that year

// create arrays of years avialable for year variable
$metro_attain25to34bachplus_years = array();
foreach ($metro_attain25to34bachplus as $year) {
    $metro_attain25to34bachplus_years[] = $year['year'];
}
$metro_attain25to34bachplus_years = array_unique($metro_attain25to34bachplus_years); // remove duplicate years

$metro_bachplus_years = array();
foreach ($metro_bachplus as $year) {
    $metro_bachplus_years[] = $year['year'];
}
$metro_bachplus_years = array_unique($metro_bachplus_years); // remove duplicate years

$metro_edu_enrollment_years = array();
foreach ($metro_edu_enrollment as $year) {
    $metro_edu_enrollment_years[] = $year['year'];
}
$metro_edu_enrollment_years = array_unique($metro_edu_enrollment_years); // remove duplicate years

$metro_highschool_and_higher_adults_years = array();
foreach ($metro_highschool_and_higher_adults as $year) {
    $metro_highschool_and_higher_adults_years[] = $year['year'];
}
$metro_highschool_and_higher_adults_years = array_unique($metro_highschool_and_higher_adults_years); // remove duplicate years

$metro_teens_unemployed_noHS_years = array();
foreach ($metro_teens_unemployed_noHS as $year) {
    $metro_teens_unemployed_noHS_years[] = $year['year'];
}
$metro_teens_unemployed_noHS_years = array_unique($metro_teens_unemployed_noHS_years); // remove duplicate years

$state_edu_appropriations_years = array();
foreach ($state_edu_appropriations as $year) {
    $state_edu_appropriations_years[] = $year['year'];
}
$state_edu_appropriations_years = array_unique($state_edu_appropriations_years); // remove duplicate years

$state_edu_expendperpupil_years= array();
foreach ($state_edu_expendperpupil as $year) {
    $state_edu_expendperpupil_years[] = $year['year'];
}
$state_edu_expendperpupil_years = array_unique($state_edu_expendperpupil_years); // remove duplicate years

// concatonate all years arrays together and count values. If year has more than 50% of variables covered, then include year in analysis
$education_years_all = array();
$education_years_count = array();
$education_years = array();
$education_years_all = array_merge($metro_attain25to34bachplus_years, $metro_bachplus_years, $metro_edu_enrollment_years, $metro_highschool_and_higher_adults_years, $metro_teens_unemployed_noHS_years, $state_edu_appropriations_years, $state_edu_expendperpupil_years);
$education_years_count = array_count_values($education_years_all);
foreach ($education_years_count as $year => $count) {
	if ($count >= 4) { // at least 4 education variables with data present for this year
		$education_years[] = $year;
	}
}

// filter and group data by year
$metro_attain25to34bachplus_filtered = array();
foreach ($metro_attain25to34bachplus as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$metro_attain25to34bachplus_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_attain25to34bachplus_indexed = array();
$metro_attain25to34bachplus_values = array();
foreach($education_years as $year) {
	foreach($metro_attain25to34bachplus_filtered[$year] as $data) {
		$metro_attain25to34bachplus_values[$year][] = $data['percent_bachelors_and_higher'];
	}
	$metro_attain25to34bachplus_max = max($metro_attain25to34bachplus_values[$year]);
	$metro_attain25to34bachplus_min = min($metro_attain25to34bachplus_values[$year]);
	// calculate index scores and store
	foreach($metro_attain25to34bachplus_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_attain25to34bachplus_min) + ($data['percent_bachelors_and_higher'] * 5)) / ($metro_attain25to34bachplus_max - $metro_attain25to34bachplus_min));
		$metro_attain25to34bachplus_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_bachplus_filtered = array();
foreach ($metro_bachplus as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$metro_bachplus_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_bachplus_indexed = array();
$metro_bachplus_values = array();
foreach($education_years as $year) {
	foreach($metro_bachplus_filtered[$year] as $data) {
		$metro_bachplus_values[$year][] = $data['percent_bachelors_and_higher'];
	}
	$metro_bachplus_max = max($metro_bachplus_values[$year]);
	$metro_bachplus_min = min($metro_bachplus_values[$year]);
	// calculate index scores and store
	foreach($metro_bachplus_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_bachplus_min) + ($data['percent_bachelors_and_higher'] * 5)) / ($metro_bachplus_max - $metro_bachplus_min));
		$metro_bachplus_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_edu_enrollment_filtered = array();
foreach ($metro_edu_enrollment as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$metro_edu_enrollment_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_edu_enrollment_indexed = array();
$metro_edu_enrollment_values = array();
foreach($education_years as $year) {
	foreach($metro_edu_enrollment_filtered[$year] as $data) {
		$metro_edu_enrollment_values[$year][] = $data['percent_enrolled_prek_high'];
	}
	$metro_edu_enrollment_max = max($metro_edu_enrollment_values[$year]);
	$metro_edu_enrollment_min = min($metro_edu_enrollment_values[$year]);
	// calculate index scores and store
	foreach($metro_edu_enrollment_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_edu_enrollment_min) + ($data['percent_enrolled_prek_high'] * 5)) / ($metro_edu_enrollment_max - $metro_edu_enrollment_min));
		$metro_edu_enrollment_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_highschool_and_higher_adults_filtered = array();
foreach ($metro_highschool_and_higher_adults as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$metro_highschool_and_higher_adults_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_highschool_and_higher_adults_indexed = array();
$metro_highschool_and_higher_adults_values = array();
foreach($education_years as $year) {
	foreach($metro_highschool_and_higher_adults_filtered[$year] as $data) {
		$metro_highschool_and_higher_adults_values[$year][] = $data['percent_hs_and_higher'];
	}
	$metro_highschool_and_higher_adults_max = max($metro_highschool_and_higher_adults_values[$year]);
	$metro_highschool_and_higher_adults_min = min($metro_highschool_and_higher_adults_values[$year]);
	// calculate index scores and store
	foreach($metro_highschool_and_higher_adults_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_highschool_and_higher_adults_min) + ($data['percent_hs_and_higher'] * 5)) / ($metro_highschool_and_higher_adults_max - $metro_highschool_and_higher_adults_min));
		$metro_highschool_and_higher_adults_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_teens_unemployed_noHS_filtered = array();
foreach ($metro_teens_unemployed_noHS as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$metro_teens_unemployed_noHS_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_teens_unemployed_noHS_indexed = array();
$metro_teens_unemployed_noHS_values = array();
foreach($education_years as $year) {
	foreach($metro_teens_unemployed_noHS_filtered[$year] as $data) {
		$metro_teens_unemployed_noHS_values[$year][] = $data['percent_unemployed_no_hs_degree'];
	}
	$metro_teens_unemployed_noHS_max = max($metro_teens_unemployed_noHS_values[$year]);
	$metro_teens_unemployed_noHS_min = min($metro_teens_unemployed_noHS_values[$year]);
	// calculate index scores and store -- negatively scored
	foreach($metro_teens_unemployed_noHS_filtered[$year] as $data) {
		$calc_index = (((5*$metro_teens_unemployed_noHS_max) + ($data['percent_unemployed_no_hs_degree'] * -5)) / ($metro_teens_unemployed_noHS_max - $metro_teens_unemployed_noHS_min));		
		$metro_teens_unemployed_noHS_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$state_edu_appropriations_filtered = array();
foreach ($state_edu_appropriations as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$state_edu_appropriations_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$state_edu_appropriations_indexed = array();
$state_edu_appropriations_values = array();
foreach($education_years as $year) {
	foreach($state_edu_appropriations_filtered[$year] as $data) {
		$state_edu_appropriations_values[$year][] = $data['edu_appro_per_fte_student'];
	}
	$state_edu_appropriations_max = max($state_edu_appropriations_values[$year]);
	$state_edu_appropriations_min = min($state_edu_appropriations_values[$year]);
	// calculate index scores and store
	foreach($state_edu_appropriations_filtered[$year] as $data) {
		$calc_index = (((-5*$state_edu_appropriations_min) + ($data['edu_appro_per_fte_student'] * 5)) / ($state_edu_appropriations_max - $state_edu_appropriations_min));
		$state_edu_appropriations_indexed[$year][] = array('state' => $data['state'], 'value' => $calc_index);
	}
}

// iterate through the regions and apply the state level values to the regions
$metro_edu_appropriations_indexed = array();
foreach ($state_edu_appropriations_indexed as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_edu_appropriations_indexed[$year][] = array('geoid' => $geo['geoid'], 'value' => $data['value']); 
			}
		}
	}
}

// same for filtered data for the indicators csv
$metro_edu_appropriations_filtered = array();
foreach ($state_edu_appropriations_filtered as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_edu_appropriations_filtered[$year][] = array('geoid' => $geo['geoid'], 'edu_appro_per_fte_student' => $data['edu_appro_per_fte_student']); 
			}
		}
	}
}


// filter and group data by year
$state_edu_expendperpupil_filtered = array();
foreach ($state_edu_expendperpupil as $data) {
	foreach($education_years as $year) {
		if (in_array($year, $data)) {
			$state_edu_expendperpupil_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$state_edu_expendperpupil_indexed = array();
$state_edu_expendperpupil_values = array();
foreach($education_years as $year) {
	foreach($state_edu_expendperpupil_filtered[$year] as $data) {
		$state_edu_expendperpupil_values[$year][] = $data['edu_expend_per_pupil'];
	}
	$state_edu_expendperpupil_max = max($state_edu_expendperpupil_values[$year]);
	$state_edu_expendperpupil_min = min($state_edu_expendperpupil_values[$year]);
	// calculate index scores and store
	foreach($state_edu_expendperpupil_filtered[$year] as $data) {
		$calc_index = (((-5*$state_edu_expendperpupil_min) + ($data['edu_expend_per_pupil'] * 5)) / ($state_edu_expendperpupil_max - $state_edu_expendperpupil_min));
		$state_edu_expendperpupil_indexed[$year][] = array('state' => $data['state'], 'value' => $calc_index);
	}
}

// iterate through the regions and apply the state level values to the regions
$metro_edu_expendperpupil_indexed = array();
foreach ($state_edu_expendperpupil_indexed as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_edu_expendperpupil_indexed[$year][] = array('geoid' => $geo['geoid'], 'value' => $data['value']); 
			}
		}
	}
}

// same for filtered data for the indicators csv
$metro_edu_expendperpupil_filtered = array();
foreach ($state_edu_expendperpupil_filtered as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_edu_expendperpupil_filtered[$year][] = array('geoid' => $geo['geoid'], 'edu_expend_per_pupil' => $data['edu_expend_per_pupil']); 
			}
		}
	}
}


// create education index from indexed variables
$education_index = array();
foreach($education_years as $year) {
	//add in metro_exports score
	if (isset($metro_attain25to34bachplus_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_attain25to34bachplus_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_attain25to34bachplus_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_bachplusscore	
	if (isset($metro_bachplus_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_bachplus_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_bachplus_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_edu_enrollment score	
	if (isset($metro_edu_enrollment_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_edu_enrollment_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_edu_enrollment_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_highschool_and_higher_adults score	
	if (isset($metro_highschool_and_higher_adults_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_highschool_and_higher_adults_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_highschool_and_higher_adults_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_teens_unemployed_noHS score	
	if (isset($metro_teens_unemployed_noHS_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_teens_unemployed_noHS_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_teens_unemployed_noHS_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_edu_appropriations score	
	if (isset($metro_edu_appropriations_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_edu_appropriations_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_edu_appropriations_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_edu_expendperpupil score	
	if (isset($metro_edu_expendperpupil_indexed[$year])) {
		if (isset($education_index[$year])) {
			foreach($metro_edu_expendperpupil_indexed[$year] as $data) {
				$key = lookupGeoId($education_index[$year], $data['geoid']);
				$education_index[$year][$key]['value'] = $education_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$education_index[$year][$key]['count'] = $education_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_edu_expendperpupil_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$education_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	// normalize index by the number of variables availible in the year
	foreach($education_index[$year] as $key => $data) {
		$education_index[$year][$key]['value'] = ($data['value'] / $data['count']);
	}
	
	 
} // close foreach $education_years



// pull data for quality of life variables and store in arrays
// Air Quality Index, Percent of “Good” Days
$metro_AQI = array();
$query = "SELECT geoid, year, percent_good_AQI FROM metro_AQI WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_AQI[] = $row;
}
/* free result set */
$result->free();


// Percent Change in Population
$metro_PopChgRt = array();
$query = "SELECT geoid, year_end, percent_change_pop FROM metro_PopChgRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_PopChgRt[] = $row;
}
/* free result set */
$result->free();


// Percent Population Without Health Insurance
$metro_UninsRt = array();
$query = "SELECT geoid, year, percent_wo_healthinsu FROM metro_UninsRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_UninsRt[] = $row;
}
/* free result set */
$result->free();


// Total Violent Crimes per 100,000 Residents
$metro_VCrimeRt = array();
$query = "SELECT geoid, year, violent_crime_rate FROM metro_VCrimeRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_VCrimeRt[] = $row;
}
/* free result set */
$result->free();


// Average Volunteer Rate
$metro_VolunteerRt= array();
$query = "SELECT geoid, year, volunteer_rate FROM metro_VolunteerRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_VolunteerRt[] = $row;
}
/* free result set */
$result->free();


//Percent of Population neither Overweight nor Obese
$metro_WellnessIndicators_Obesity= array();
$query = "SELECT geoid, year, percent_not_overweigh_obese FROM metro_WellnessIndicators_Obesity WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_WellnessIndicators_Obesity[] = $row;
}
/* free result set */
$result->free();


// if half of the variables have data for any given year, then we calculate a priority area index for that year

// create arrays of years avialable for year variable
// Total Value of Exports
$metro_AQI_years = array();
foreach ($metro_AQI as $year) {
    $metro_AQI_years[] = $year['year'];
}
$metro_AQI_years = array_unique($metro_AQI_years); // remove duplicate years

// Per Capita GDP for Metropolitan Area (GMP)
$metro_PopChgRt_years = array();
foreach ($metro_PopChgRt as $year) {
    $metro_PopChgRt_years[] = $year['year_end'];
}
$metro_PopChgRt_years = array_unique($metro_PopChgRt_years); // remove duplicate years

// Percent Change in High Tech Jobs
$metro_UninsRt_years = array();
foreach ($metro_UninsRt as $year) {
    $metro_UninsRt_years[] = $year['year'];
}
$metro_UninsRt_years = array_unique($metro_UninsRt_years); // remove duplicate years

// Percent Change in Knowledge Industry Employment
$metro_VCrimeRt_years = array();
foreach ($metro_VCrimeRt as $year) {
    $metro_VCrimeRt_years[] = $year['year'];
}
$metro_VCrimeRt_years = array_unique($metro_VCrimeRt_years); // remove duplicate years

// Per Capita Personal Income
$metro_VolunteerRt_years = array();
foreach ($metro_VolunteerRt as $year) {
    $metro_VolunteerRt_years[] = $year['year'];
}
$metro_VolunteerRt_years = array_unique($metro_VolunteerRt_years); // remove duplicate years

//Number of Technology Patents per 10K People
$metro_WellnessIndicators_Obesity_years = array();
foreach ($metro_WellnessIndicators_Obesity as $year) {
    $metro_WellnessIndicators_Obesity_years[] = $year['year'];
}
$metro_WellnessIndicators_Obesity_years = array_unique($metro_WellnessIndicators_Obesity_years); // remove duplicate years

// concatonate all years arrays together and count values. If year has more than 50% of variables covered, then include year in analysis
$quality_of_life_years_all = array();
$quality_of_life_years_count = array();
$quality_of_life_years = array();
$quality_of_life_years_all = array_merge($metro_AQI_years, $metro_PopChgRt_years, $metro_UninsRt_years, $metro_VCrimeRt_years, $metro_VolunteerRt_years, $metro_WellnessIndicators_Obesity_years);
$quality_of_life_years_count = array_count_values($quality_of_life_years_all);
foreach ($quality_of_life_years_count as $year => $count) {
	if ($count >= 3) { // at least 3 quality_of_life variables with data present for this year
		$quality_of_life_years[] = $year;
	}
}

// filter and group data by year
$metro_AQI_filtered = array();
foreach ($metro_AQI as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_AQI_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_AQI_indexed = array();
$metro_AQI_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_AQI_filtered[$year] as $data) {
		$metro_AQI_values[$year][] = $data['percent_good_AQI'];
	}
	$metro_AQI_max = max($metro_AQI_values[$year]);
	$metro_AQI_min = min($metro_AQI_values[$year]);
	// calculate index scores and store
	foreach($metro_AQI_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_AQI_min) + ($data['percent_good_AQI'] * 5)) / ($metro_AQI_max - $metro_AQI_min));
		$metro_AQI_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_PopChgRt_filtered = array();
foreach ($metro_PopChgRt as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_PopChgRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_PopChgRt_indexed = array();
$metro_PopChgRt_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_PopChgRt_filtered[$year] as $data) {
		$metro_PopChgRt_values[$year][] = $data['percent_change_pop'];
	}
	$metro_PopChgRt_max = max($metro_PopChgRt_values[$year]);
	$metro_PopChgRt_min = min($metro_PopChgRt_values[$year]);
	// calculate index scores and store
	foreach($metro_PopChgRt_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_PopChgRt_min) + ($data['percent_change_pop'] * 5)) / ($metro_PopChgRt_max - $metro_PopChgRt_min));
		$metro_PopChgRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_UninsRt_filtered = array();
foreach ($metro_UninsRt as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_UninsRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_UninsRt_indexed = array();
$metro_UninsRt_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_UninsRt_filtered[$year] as $data) {
		$metro_UninsRt_values[$year][] = $data['percent_wo_healthinsu'];
	}
	$metro_UninsRt_max = max($metro_UninsRt_values[$year]);
	$metro_UninsRt_min = min($metro_UninsRt_values[$year]);
	// calculate index scores and store
	foreach($metro_UninsRt_filtered[$year] as $data) {		
		$calc_index = (((5*$metro_UninsRt_max) + ($data['percent_wo_healthinsu'] * -5)) / ($metro_UninsRt_max - $metro_UninsRt_min));
		$metro_UninsRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_VCrimeRt_filtered = array();
foreach ($metro_VCrimeRt as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_VCrimeRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_VCrimeRt_indexed = array();
$metro_VCrimeRt_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_VCrimeRt_filtered[$year] as $data) {
		$metro_VCrimeRt_values[$year][] = $data['violent_crime_rate'];
	}
	$metro_VCrimeRt_max = max($metro_VCrimeRt_values[$year]);
	$metro_VCrimeRt_min = min($metro_VCrimeRt_values[$year]);
	// calculate index scores and store
	foreach($metro_VCrimeRt_filtered[$year] as $data) {
		$calc_index = (((5*$metro_VCrimeRt_max) + ($data['violent_crime_rate'] * -5)) / ($metro_VCrimeRt_max - $metro_VCrimeRt_min));
		$metro_VCrimeRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_VolunteerRt_filtered = array();
foreach ($metro_VolunteerRt as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_VolunteerRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_VolunteerRt_indexed = array();
$metro_VolunteerRt_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_VolunteerRt_filtered[$year] as $data) {
		$metro_VolunteerRt_values[$year][] = $data['volunteer_rate'];
	}
	$metro_VolunteerRt_max = max($metro_VolunteerRt_values[$year]);
	$metro_VolunteerRt_min = min($metro_VolunteerRt_values[$year]);
	// calculate index scores and store
	foreach($metro_VolunteerRt_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_VolunteerRt_min) + ($data['volunteer_rate'] * 5)) / ($metro_VolunteerRt_max - $metro_VolunteerRt_min));
		$metro_VolunteerRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_WellnessIndicators_Obesity_filtered = array();
foreach ($metro_WellnessIndicators_Obesity as $data) {
	foreach($quality_of_life_years as $year) {
		if (in_array($year, $data)) {
			$metro_WellnessIndicators_Obesity_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_WellnessIndicators_Obesity_indexed = array();
$metro_WellnessIndicators_Obesity_values = array();
foreach($quality_of_life_years as $year) {
	foreach($metro_WellnessIndicators_Obesity_filtered[$year] as $data) {
		$metro_WellnessIndicators_Obesity_values[$year][] = $data['percent_not_overweigh_obese'];
	}
	$metro_WellnessIndicators_Obesity_max = max($metro_WellnessIndicators_Obesity_values[$year]);
	$metro_WellnessIndicators_Obesity_min = min($metro_WellnessIndicators_Obesity_values[$year]);
	// calculate index scores and store
	foreach($metro_WellnessIndicators_Obesity_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_WellnessIndicators_Obesity_min) + ($data['percent_not_overweigh_obese'] * 5)) / ($metro_WellnessIndicators_Obesity_max - $metro_WellnessIndicators_Obesity_min));
		$metro_WellnessIndicators_Obesity_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// create quality_of_life index from indexed variables
$quality_of_life_index = array();
foreach($quality_of_life_years as $year) {
	//add in metro_AQI score
	if (isset($metro_AQI_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_AQI_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_AQI_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_PopChgRt score	
	if (isset($metro_PopChgRt_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_PopChgRt_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_PopChgRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_UninsRt score	
	if (isset($metro_UninsRt_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_UninsRt_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_UninsRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_VCrimeRt score	
	if (isset($metro_VCrimeRt_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_VCrimeRt_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_VCrimeRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_VolunteerRt score	
	if (isset($metro_VolunteerRt_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_VolunteerRt_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_VolunteerRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	//add in metro_WellnessIndicators_Obesity score	
	if (isset($metro_WellnessIndicators_Obesity_indexed[$year])) {
		if (isset($quality_of_life_index[$year])) {
			foreach($metro_WellnessIndicators_Obesity_indexed[$year] as $data) {
				$key = lookupGeoId($quality_of_life_index[$year], $data['geoid']);
				$quality_of_life_index[$year][$key]['value'] = $quality_of_life_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$quality_of_life_index[$year][$key]['count'] = $quality_of_life_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_WellnessIndicators_Obesity_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$quality_of_life_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count);
			}
		}
	}
	
	
	// normalize index by the number of variables availible in the year
	foreach($quality_of_life_index[$year] as $key => $data) {
		$quality_of_life_index[$year][$key]['value'] = ($data['value'] / $data['count']);
	}
	
	 
} // close foreach $quality_of_life_years



// pull data for equity variables and store in arrays
// Percent Population Foreign Born
$metro_ForBornRt = array();
$query = "SELECT geoid, year, percent_of_pop_foreignborn FROM metro_ForBornRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_ForBornRt[] = $row;
}
/* free result set */
$result->free();


// Gini Index
$metro_giniindex = array();
$query = "SELECT geoid, year, gini FROM metro_giniindex WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_giniindex[] = $row;
}
/* free result set */
$result->free();


// Income Level by Quintile
$metro_IncomeShare = array();
$query = "SELECT geoid, year, Lowestquintile, Secondlowestquintile, Middlequintile, Secondhighestquintile, Highestquintile, top_5_percent FROM metro_IncomeShare WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_IncomeShare[] = $row;
}
/* free result set */
$result->free();


// Median Household Income (by Race)
$metro_MedHHInc = array();
$query = "SELECT geoid, year, medhhinc_black, medhhinc_hisp, medhhinc_nonhispwhite, medhhinc_all FROM metro_MedHHInc WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_MedHHInc[] = $row;
}
/* free result set */
$result->free();


// Percent Housing Owner Occupied (by Race)
$metro_ownocc= array();
$query = "SELECT geoid, year, ownocc_rate_black, ownocc_rate_hisp, ownocc_rate_nonhispwhite, ownocc_rate_all FROM metro_ownocc WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_ownocc[] = $row;
}
/* free result set */
$result->free();


//Poverty Rate of Children (by Race)
$metro_PovRtChild= array();
$query = "SELECT geoid, year, percent_black_under18_below100poverty, percent_hisp_under18_below100poverty, percent_nonhispwhite_under18_below100poverty, percent_all_under18_below100poverty FROM metro_PovRtChild WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_PovRtChild[] = $row;
}
/* free result set */
$result->free();


// if half of the variables have data for any given year, then we calculate a priority area index for that year

// create arrays of years avialable for year variable
// Total Value of Exports
$metro_ForBornRt_years = array();
foreach ($metro_ForBornRt as $year) {
    $metro_ForBornRt_years[] = $year['year'];
}
$metro_ForBornRt_years = array_unique($metro_ForBornRt_years); // remove duplicate years

// Per Capita GDP for Metropolitan Area (GMP)
$metro_giniindex_years = array();
foreach ($metro_giniindex as $year) {
    $metro_giniindex_years[] = $year['year'];
}
$metro_giniindex_years = array_unique($metro_giniindex_years); // remove duplicate years

// Percent Change in High Tech Jobs
$metro_IncomeShare_years_1 = array();
$metro_IncomeShare_years_2 = array();
$metro_IncomeShare_years_3 = array();
$metro_IncomeShare_years_4 = array();
$metro_IncomeShare_years_5 = array();
$metro_IncomeShare_years_top = array();
foreach ($metro_IncomeShare as $year) {
    $metro_IncomeShare_years_1[] = $year['year'];
    $metro_IncomeShare_years_2[] = $year['year'];
    $metro_IncomeShare_years_3[] = $year['year'];
    $metro_IncomeShare_years_4[] = $year['year'];
    $metro_IncomeShare_years_5[] = $year['year'];
    $metro_IncomeShare_years_top[] = $year['year'];
}
$metro_IncomeShare_years_1 = array_unique($metro_IncomeShare_years_1); // remove duplicate years
$metro_IncomeShare_years_2 = array_unique($metro_IncomeShare_years_2); // remove duplicate years
$metro_IncomeShare_years_3 = array_unique($metro_IncomeShare_years_3); // remove duplicate years
$metro_IncomeShare_years_4 = array_unique($metro_IncomeShare_years_4); // remove duplicate years
$metro_IncomeShare_years_5 = array_unique($metro_IncomeShare_years_5); // remove duplicate years
$metro_IncomeShare_years_top = array_unique($metro_IncomeShare_years_top); // remove duplicate years

// Percent Change in Knowledge Industry Employment
$metro_MedHHInc_years = array();
foreach ($metro_MedHHInc as $year) {
    $metro_MedHHInc_years[] = $year['year'];
}
$metro_MedHHInc_years = array_unique($metro_MedHHInc_years); // remove duplicate years

// Per Capita Personal Income
$metro_ownocc_years = array();
foreach ($metro_ownocc as $year) {
    $metro_ownocc_years[] = $year['year'];
}
$metro_ownocc_years = array_unique($metro_ownocc_years); // remove duplicate years

//Number of Technology Patents per 10K People
$metro_PovRtChild_years = array();
foreach ($metro_PovRtChild as $year) {
    $metro_PovRtChild_years[] = $year['year'];
}
$metro_PovRtChild_years = array_unique($metro_PovRtChild_years); // remove duplicate years


// concatonate all years arrays together and count values. If year has more than 50% of variables covered, then include year in analysis
$equity_years_all = array();
$equity_years_count = array();
$equity_years = array();
$equity_years_all = array_merge($metro_ForBornRt_years, $metro_giniindex_years, $metro_IncomeShare_years_1, $metro_IncomeShare_years_2, $metro_IncomeShare_years_3, $metro_IncomeShare_years_4, $metro_IncomeShare_years_5, $metro_IncomeShare_years_top, $metro_MedHHInc_years, $metro_ownocc_years, $metro_PovRtChild_years);
$equity_years_count = array_count_values($equity_years_all);
foreach ($equity_years_count as $year => $count) {
	if ($count >= 6) { // at least 6 equity variables with data present for this year
		$equity_years[] = $year;
	}
}

// filter and group data by year
$metro_ForBornRt_filtered = array();
foreach ($metro_ForBornRt as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {			
			$metro_ForBornRt_filtered[$year][] = $data;
		}
	}
}

// map values to 0-5 range for each year
$metro_ForBornRt_indexed = array();
$metro_ForBornRt_values = array();
foreach($equity_years as $year) {
	foreach($metro_ForBornRt_filtered[$year] as $data) {
		$metro_ForBornRt_values[$year][] = $data['percent_of_pop_foreignborn'];
	}
	$metro_ForBornRt_max = max($metro_ForBornRt_values[$year]);
	$metro_ForBornRt_min = min($metro_ForBornRt_values[$year]);
	// calculate index scores and store
	foreach($metro_ForBornRt_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_ForBornRt_min) + ($data['percent_of_pop_foreignborn'] * 5)) / ($metro_ForBornRt_max - $metro_ForBornRt_min));
		$metro_ForBornRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_giniindex_filtered = array();
foreach ($metro_giniindex as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {
			$metro_giniindex_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_giniindex_indexed = array();
$metro_giniindex_values = array();
foreach($equity_years as $year) {
	foreach($metro_giniindex_filtered[$year] as $data) {
		$metro_giniindex_values[$year][] = $data['gini'];
	}
	$metro_giniindex_max = max($metro_giniindex_values[$year]);
	$metro_giniindex_min = min($metro_giniindex_values[$year]);
	// calculate index scores and store
	foreach($metro_giniindex_filtered[$year] as $data) {
		$calc_index = (((5*$metro_giniindex_max) + ($data['gini'] * -5)) / ($metro_giniindex_max - $metro_giniindex_min));
		$metro_giniindex_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_IncomeShare_filtered = array();
foreach ($metro_IncomeShare as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {
			$metro_IncomeShare_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
// for income quintiles score each seperately
$metro_IncomeShare_indexed_1 = array();
$metro_IncomeShare_indexed_2 = array();
$metro_IncomeShare_indexed_3 = array();
$metro_IncomeShare_indexed_4 = array();
$metro_IncomeShare_indexed_5 = array();
$metro_IncomeShare_indexed_top = array();
$metro_IncomeShare_values_1 = array();
$metro_IncomeShare_values_2 = array();
$metro_IncomeShare_values_3 = array();
$metro_IncomeShare_values_4 = array();
$metro_IncomeShare_values_5 = array();
$metro_IncomeShare_values_top = array();
foreach($equity_years as $year) {
	foreach($metro_IncomeShare_filtered[$year] as $data) {
		$metro_IncomeShare_values_1[$year][] = $data['Lowestquintile'];
		$metro_IncomeShare_values_2[$year][] = $data['Secondlowestquintile'];
		$metro_IncomeShare_values_3[$year][] = $data['Middlequintile'];
		$metro_IncomeShare_values_4[$year][] = $data['Secondhighestquintile'];
		$metro_IncomeShare_values_5[$year][] = $data['Highestquintile'];
		$metro_IncomeShare_values_top[$year][] = $data['top_5_percent'];
	}
	$metro_IncomeShare_max_1 = max($metro_IncomeShare_values_1[$year]);
	$metro_IncomeShare_min_1 = min($metro_IncomeShare_values_1[$year]);
	$metro_IncomeShare_max_2 = max($metro_IncomeShare_values_2[$year]);
	$metro_IncomeShare_min_2 = min($metro_IncomeShare_values_2[$year]);
	$metro_IncomeShare_max_3 = max($metro_IncomeShare_values_3[$year]);
	$metro_IncomeShare_min_3 = min($metro_IncomeShare_values_3[$year]);
	$metro_IncomeShare_max_4 = max($metro_IncomeShare_values_4[$year]);
	$metro_IncomeShare_min_4 = min($metro_IncomeShare_values_4[$year]);
	$metro_IncomeShare_max_5 = max($metro_IncomeShare_values_5[$year]);
	$metro_IncomeShare_min_5 = min($metro_IncomeShare_values_5[$year]);
	$metro_IncomeShare_max_top = max($metro_IncomeShare_values_top[$year]);
	$metro_IncomeShare_min_top = min($metro_IncomeShare_values_top[$year]);
	// calculate index scores and store
	foreach($metro_IncomeShare_filtered[$year] as $data) {
		$calc_index_1 = (((-5*$metro_IncomeShare_min_1) + ($data['Lowestquintile'] * 5)) / ($metro_IncomeShare_max_1 - $metro_IncomeShare_min_1));
		$metro_IncomeShare_indexed_1[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_1);
		$calc_index_2 = (((-5*$metro_IncomeShare_min_2) + ($data['Secondlowestquintile'] * 5)) / ($metro_IncomeShare_max_2 - $metro_IncomeShare_min_2));
		$metro_IncomeShare_indexed_2[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_2);
		$calc_index_3 = (((-5*$metro_IncomeShare_min_3) + ($data['Middlequintile'] * 5)) / ($metro_IncomeShare_max_3 - $metro_IncomeShare_min_3));
		$metro_IncomeShare_indexed_3[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_3);
		$calc_index_4 = (((5*$metro_IncomeShare_max_4) + ($data['Secondhighestquintile'] * -5)) / ($metro_IncomeShare_max_4 - $metro_IncomeShare_min_4));
		$metro_IncomeShare_indexed_4[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_4);
		$calc_index_5 = (((5*$metro_IncomeShare_max_5) + ($data['Highestquintile'] * -5)) / ($metro_IncomeShare_max_5 - $metro_IncomeShare_min_5));
		$metro_IncomeShare_indexed_5[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_5);
		$calc_index_top = (((5*$metro_IncomeShare_max_top) + ($data['top_5_percent'] * -5)) / ($metro_IncomeShare_max_top - $metro_IncomeShare_min_top));
		$metro_IncomeShare_indexed_top[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index_top);
	}
}


// filter and group data by year
$metro_MedHHInc_filtered = array();
foreach ($metro_MedHHInc as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {
			$metro_MedHHInc_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
// for med HH income, weight each by 1/3 and compute the overall
$metro_MedHHInc_indexed = array();
$metro_MedHHInc_values_1 = array();
$metro_MedHHInc_values_2 = array();
$metro_MedHHInc_values_3 = array();
foreach($equity_years as $year) {
	foreach($metro_MedHHInc_filtered[$year] as $data) {
		$metro_MedHHInc_values_1[$year][] = $data['medhhinc_black'];
		$metro_MedHHInc_values_2[$year][] = $data['medhhinc_hisp'];
		$metro_MedHHInc_values_3[$year][] = $data['medhhinc_nonhispwhite'];
	}
	$metro_MedHHInc_max_1 = max($metro_MedHHInc_values_1[$year]);
	$metro_MedHHInc_min_1 = min($metro_MedHHInc_values_1[$year]);
	$metro_MedHHInc_max_2 = max($metro_MedHHInc_values_2[$year]);
	$metro_MedHHInc_min_2 = min($metro_MedHHInc_values_2[$year]);
	$metro_MedHHInc_max_3 = max($metro_MedHHInc_values_3[$year]);
	$metro_MedHHInc_min_3 = min($metro_MedHHInc_values_3[$year]);
	// calculate index scores and store
	foreach($metro_MedHHInc_filtered[$year] as $data) {
		$calc_index = (1/3*(((-5*$metro_MedHHInc_min_1) + ($data['medhhinc_black'] * 5)) / ($metro_MedHHInc_max_1 - $metro_MedHHInc_min_1))) + (1/3*(((-5*$metro_MedHHInc_min_2) + ($data['medhhinc_hisp'] * 5)) / ($metro_MedHHInc_max_2 - $metro_MedHHInc_min_2))) + (1/3*(((-5*$metro_MedHHInc_min_3) + ($data['medhhinc_nonhispwhite'] * 5)) / ($metro_MedHHInc_max_3 - $metro_MedHHInc_min_3)));
		$metro_MedHHInc_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_ownocc_filtered = array();
foreach ($metro_ownocc as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {
			$metro_ownocc_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_ownocc_indexed = array();
$metro_ownocc_values_1 = array();
$metro_ownocc_values_2 = array();
$metro_ownocc_values_3 = array();
foreach($equity_years as $year) {
	foreach($metro_ownocc_filtered[$year] as $data) {
		$metro_ownocc_values_1[$year][] = $data['ownocc_rate_black'];
		$metro_ownocc_values_2[$year][] = $data['ownocc_rate_hisp'];
		$metro_ownocc_values_3[$year][] = $data['ownocc_rate_nonhispwhite'];
	}
	$metro_ownocc_max_1 = max($metro_ownocc_values_1[$year]);
	$metro_ownocc_min_1 = min($metro_ownocc_values_1[$year]);
	$metro_ownocc_max_2 = max($metro_ownocc_values_2[$year]);
	$metro_ownocc_min_2 = min($metro_ownocc_values_2[$year]);
	$metro_ownocc_max_3 = max($metro_ownocc_values_3[$year]);
	$metro_ownocc_min_3 = min($metro_ownocc_values_3[$year]);
	// calculate index scores and store
	foreach($metro_ownocc_filtered[$year] as $data) {
		$calc_index = (1/3*(((-5*$metro_ownocc_min_1) + ($data['ownocc_rate_black'] * 5)) / ($metro_ownocc_max_1 - $metro_ownocc_min_1))) + (1/3*(((-5*$metro_ownocc_min_2) + ($data['ownocc_rate_hisp'] * 5)) / ($metro_ownocc_max_2 - $metro_ownocc_min_2))) + (1/3*(((-5*$metro_ownocc_min_3) + ($data['ownocc_rate_nonhispwhite'] * 5)) / ($metro_ownocc_max_3 - $metro_ownocc_min_3)));
		$metro_ownocc_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_PovRtChild_filtered = array();
foreach ($metro_PovRtChild as $data) {
	foreach($equity_years as $year) {
		if (in_array($year, $data)) {
			$metro_PovRtChild_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_PovRtChild_indexed = array();
$metro_PovRtChild_values_1 = array();
$metro_PovRtChild_values_2 = array();
$metro_PovRtChild_values_3 = array();
foreach($equity_years as $year) {
	foreach($metro_PovRtChild_filtered[$year] as $data) {
		$metro_PovRtChild_values_1[$year][] = $data['percent_black_under18_below100poverty'];
		$metro_PovRtChild_values_2[$year][] = $data['percent_hisp_under18_below100poverty'];
		$metro_PovRtChild_values_3[$year][] = $data['percent_nonhispwhite_under18_below100poverty'];
	}
	$metro_PovRtChild_max_1 = max($metro_PovRtChild_values_1[$year]);
	$metro_PovRtChild_min_1 = min($metro_PovRtChild_values_1[$year]);
	$metro_PovRtChild_max_2 = max($metro_PovRtChild_values_2[$year]);
	$metro_PovRtChild_min_2 = min($metro_PovRtChild_values_2[$year]);
	$metro_PovRtChild_max_3 = max($metro_PovRtChild_values_3[$year]);
	$metro_PovRtChild_min_3 = min($metro_PovRtChild_values_3[$year]);
	// calculate index scores and store
	foreach($metro_PovRtChild_filtered[$year] as $data) {
		$calc_index = (1/3*(((5*$metro_PovRtChild_max_1) + ($data['percent_black_under18_below100poverty'] * -5)) / ($metro_PovRtChild_max_1 - $metro_PovRtChild_min_1))) + (1/3*(((5*$metro_PovRtChild_max_2) + ($data['percent_hisp_under18_below100poverty'] * -5)) / ($metro_PovRtChild_max_2 - $metro_PovRtChild_min_2))) + (1/3*(((5*$metro_PovRtChild_max_3) + ($data['percent_nonhispwhite_under18_below100poverty'] * -5)) / ($metro_PovRtChild_max_3 - $metro_PovRtChild_min_3)));
		$metro_PovRtChild_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// create equity index from indexed variables
$equity_index = array();
foreach($equity_years as $year) {
	//add in metro_ForBornRt score
	if (isset($metro_ForBornRt_indexed[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_ForBornRt_indexed[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_ForBornRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
		
	//add in metro_giniindex score	
	if (isset($metro_giniindex_indexed[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_giniindex_indexed[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_giniindex_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score #1 -- Lowest quintile	
	if (isset($metro_IncomeShare_indexed_1[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_1[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_IncomeShare_indexed_1[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score #2 -- Second Lowest quintile	
	if (isset($metro_IncomeShare_indexed_2[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_2[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
			}
			if (isset($data['value'])) {
				$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
			}
		} else {
			foreach($metro_IncomeShare_indexed_2[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score #3 -- Middle quintile	
	if (isset($metro_IncomeShare_indexed_3[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_3[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
			}
			if (isset($data['value'])) {
				$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
			}
		} else {
			foreach($metro_IncomeShare_indexed_3[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score #4 -- Second Highest quintile	
	if (isset($metro_IncomeShare_indexed_4[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_4[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_IncomeShare_indexed_4[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score #5 -- Highest quintile	
	if (isset($metro_IncomeShare_indexed_5[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_5[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_IncomeShare_indexed_5[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_IncomeShare score top -- top 5% of income earners
	if (isset($metro_IncomeShare_indexed_top[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_IncomeShare_indexed_top[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_IncomeShare_indexed_top[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_MedHHInc score	
	if (isset($metro_MedHHInc_indexed[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_MedHHInc_indexed[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_MedHHInc_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_ownocc score	
	if (isset($metro_ownocc_indexed[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_ownocc_indexed[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_ownocc_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_PovRtChild score	
	if (isset($metro_PovRtChild_indexed[$year])) {
		if (isset($equity_index[$year])) {
			foreach($metro_PovRtChild_indexed[$year] as $data) {
				$key = lookupGeoId($equity_index[$year], $data['geoid']);
				$equity_index[$year][$key]['value'] = $equity_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$equity_index[$year][$key]['count'] = $equity_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_PovRtChild_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$equity_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
		
	// normalize index by the number of variables availible in the year
	foreach($equity_index[$year] as $key => $data) {
		$equity_index[$year][$key]['value'] = ($data['value'] / $data['count']);
	}
	
	 
} // close foreach $equity_years

//print_r($equity_index);


// pull data for transit variables and store in arrays
// Annual Hours of Delay per Auto Commuter
$metro_commute_hours_delayed = array();
$query = "SELECT geoid, year, hours_delay_per_communter FROM metro_commute_hours_delayed WHERE geoid IN ($geoidsString)";
echo $query;
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_commute_hours_delayed[] = $row;
}
/* free result set */
$result->free();


// Percent of Workers 16+ Driving Alone to Work
$metro_MeansCarAloneRt = array();
$query = "SELECT geoid, year, percent_workers_drive_alone FROM metro_MeansCarAloneRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_MeansCarAloneRt[] = $row;
}
/* free result set */
$result->free();


// Percent of Workers with No Vehicle
$metro_NoVehRt = array();
$query = "SELECT geoid, year, percent_workers_no_vehicle FROM metro_NoVehRt WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_NoVehRt[] = $row;
}
/* free result set */
$result->free();


// Percent of Transit Ridership Occurring on a Bus
$metro_TransitRidership = array();
$query = "SELECT geoid, year, bus_trips_thousands FROM metro_TransitRidership WHERE geoid IN ($geoidsString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $metro_TransitRidership[] = $row;
}
/* free result set */
$result->free();


// Public Transportation Funding, State Dollars per 1,000 Residents
$state_pubtransit_funding= array();
$query = "SELECT state, year, transit_funding_per_1k FROM state_pubtransit_funding WHERE state IN ($statesString)";
$result = $mysqli->query($query);
while($row = $result->fetch_assoc()){
    $state_pubtransit_funding[] = $row;
}
/* free result set */
$result->free();


// if half of the variables have data for any given year, then we calculate a priority area index for that year

// create arrays of years avialable for year variable
// Total Value of Exports
$metro_commute_hours_delayed_years = array();
foreach ($metro_commute_hours_delayed as $year) {
    $metro_commute_hours_delayed_years[] = $year['year'];
}
$metro_commute_hours_delayed_years = array_unique($metro_commute_hours_delayed_years); // remove duplicate years

// Per Capita GDP for Metropolitan Area (GMP)
$metro_MeansCarAloneRt_years = array();
foreach ($metro_MeansCarAloneRt as $year) {
    $metro_MeansCarAloneRt_years[] = $year['year'];
}
$metro_MeansCarAloneRt_years = array_unique($metro_MeansCarAloneRt_years); // remove duplicate years

// Percent Change in High Tech Jobs
$metro_NoVehRt_years = array();
foreach ($metro_NoVehRt as $year) {
    $metro_NoVehRt_years[] = $year['year'];
}
$metro_NoVehRt_years = array_unique($metro_NoVehRt_years); // remove duplicate years

// Percent Change in Knowledge Industry Employment
$metro_TransitRidership_years = array();
foreach ($metro_TransitRidership as $year) {
    $metro_TransitRidership_years[] = $year['year'];
}
$metro_TransitRidership_years = array_unique($metro_TransitRidership_years); // remove duplicate years

// Business Tax Climate Index
$state_pubtransit_funding_years = array();
foreach ($state_pubtransit_funding as $year) {
    $state_pubtransit_funding_years[] = $year['year'];
}
$state_pubtransit_funding_years = array_unique($state_pubtransit_funding_years); // remove duplicate years

// concatonate all years arrays together and count values. If year has more than 50% of variables covered, then include year in analysis
$transit_years_all = array();
$transit_years_count = array();
$transit_years = array();
$transit_years_all = array_merge($metro_commute_hours_delayed_years, $metro_MeansCarAloneRt_years, $metro_NoVehRt_years, $metro_TransitRidership_years, $state_pubtransit_funding_years);
$transit_years_count = array_count_values($transit_years_all);
foreach ($transit_years_count as $year => $count) {
	if ($count >= 3) { // at least 4 transit variables with data present for this year
		$transit_years[] = $year;
	}
}

// filter and group data by year
$metro_commute_hours_delayed_filtered = array();
foreach ($metro_commute_hours_delayed as $data) {
	foreach($transit_years as $year) {
		if (in_array($year, $data)) {
			$metro_commute_hours_delayed_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_commute_hours_delayed_indexed = array();
$metro_commute_hours_delayed_values = array();
foreach($transit_years as $year) {
	foreach($metro_commute_hours_delayed_filtered[$year] as $data) {
		$metro_commute_hours_delayed_values[$year][] = $data['hours_delay_per_communter'];
	}
	$metro_commute_hours_delayed_max = max($metro_commute_hours_delayed_values[$year]);
	$metro_commute_hours_delayed_min = min($metro_commute_hours_delayed_values[$year]);
	// calculate index scores and store
	foreach($metro_commute_hours_delayed_filtered[$year] as $data) {
		$calc_index = (((5*$metro_commute_hours_delayed_max) + ($data['hours_delay_per_communter'] * -5)) / ($metro_commute_hours_delayed_max - $metro_commute_hours_delayed_min));
		$metro_commute_hours_delayed_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_MeansCarAloneRt_filtered = array();
foreach ($metro_MeansCarAloneRt as $data) {
	foreach($transit_years as $year) {
		if (in_array($year, $data)) {
			$metro_MeansCarAloneRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_MeansCarAloneRt_indexed = array();
$metro_MeansCarAloneRt_values = array();
foreach($transit_years as $year) {
	foreach($metro_MeansCarAloneRt_filtered[$year] as $data) {
		$metro_MeansCarAloneRt_values[$year][] = $data['percent_workers_drive_alone'];
	}
	$metro_MeansCarAloneRt_max = max($metro_MeansCarAloneRt_values[$year]);
	$metro_MeansCarAloneRt_min = min($metro_MeansCarAloneRt_values[$year]);
	// calculate index scores and store
	foreach($metro_MeansCarAloneRt_filtered[$year] as $data) {
		$calc_index = (((5*$metro_MeansCarAloneRt_max) + ($data['percent_workers_drive_alone'] * -5)) / ($metro_MeansCarAloneRt_max - $metro_MeansCarAloneRt_min));
		$metro_MeansCarAloneRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_NoVehRt_filtered = array();
foreach ($metro_NoVehRt as $data) {
	foreach($transit_years as $year) {
		if (in_array($year, $data)) {
			$metro_NoVehRt_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_NoVehRt_indexed = array();
$metro_NoVehRt_values = array();
foreach($transit_years as $year) {
	foreach($metro_NoVehRt_filtered[$year] as $data) {
		$metro_NoVehRt_values[$year][] = $data['percent_workers_no_vehicle'];
	}
	$metro_NoVehRt_max = max($metro_NoVehRt_values[$year]);
	$metro_NoVehRt_min = min($metro_NoVehRt_values[$year]);
	// calculate index scores and store
	foreach($metro_NoVehRt_filtered[$year] as $data) {
		$calc_index = (((5*$metro_NoVehRt_max) + ($data['percent_workers_no_vehicle'] * -5)) / ($metro_NoVehRt_max - $metro_NoVehRt_min));
		$metro_NoVehRt_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$metro_TransitRidership_filtered = array();
foreach ($metro_TransitRidership as $data) {
	foreach($transit_years as $year) {
		if (in_array($year, $data)) {
			$metro_TransitRidership_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$metro_TransitRidership_indexed = array();
$metro_TransitRidership_values = array();
foreach($transit_years as $year) {
	foreach($metro_TransitRidership_filtered[$year] as $data) {
		$metro_TransitRidership_values[$year][] = $data['bus_trips_thousands'];
	}
	$metro_TransitRidership_max = max($metro_TransitRidership_values[$year]);
	$metro_TransitRidership_min = min($metro_TransitRidership_values[$year]);
	// calculate index scores and store
	foreach($metro_TransitRidership_filtered[$year] as $data) {
		$calc_index = (((-5*$metro_TransitRidership_min) + ($data['bus_trips_thousands'] * 5)) / ($metro_TransitRidership_max - $metro_TransitRidership_min));
		$metro_TransitRidership_indexed[$year][] = array('geoid' => $data['geoid'], 'value' => $calc_index);
	}
}


// filter and group data by year
$state_pubtransit_funding_filtered = array();
foreach ($state_pubtransit_funding as $data) {
	foreach($transit_years as $year) {
		if (in_array($year, $data)) {
			$state_pubtransit_funding_filtered[$year][] = $data;			
		}
	}
}

// map values to 0-5 range for each year
$state_pubtransit_funding_indexed = array();
$state_pubtransit_funding_values = array();
foreach($transit_years as $year) {
	foreach($state_pubtransit_funding_filtered[$year] as $data) {
		$state_pubtransit_funding_values[$year][] = $data['transit_funding_per_1k'];
	}
	$state_pubtransit_funding_max = max($state_pubtransit_funding_values[$year]);
	$state_pubtransit_funding_min = min($state_pubtransit_funding_values[$year]);
	// calculate index scores and store
	foreach($state_pubtransit_funding_filtered[$year] as $data) {
		$calc_index = (((-5*$state_pubtransit_funding_min) + ($data['transit_funding_per_1k'] * 5)) / ($state_pubtransit_funding_max - $state_pubtransit_funding_min));
		$state_pubtransit_funding_indexed[$year][] = array('state' => $data['state'], 'value' => $calc_index);
	}
}

// iterate through the regions and apply the state level values to the regions
$metro_pubtransit_funding_indexed = array();
foreach ($state_pubtransit_funding_indexed as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_pubtransit_funding_indexed[$year][] = array('geoid' => $geo['geoid'], 'value' => $data['value']); 
			}
		}
	}
}

// same for filtered data for the indicators csv
$metro_pubtransit_funding_filtered = array();
foreach ($state_pubtransit_funding_filtered as $year => $pass) {
	foreach ($pass as $data) {
		foreach ($geographies as $geo) {
			if (strtolower($data['state']) == strtolower($geo['state'])) {
				$metro_pubtransit_funding_filtered[$year][] = array('geoid' => $geo['geoid'], 'transit_funding_per_1k' => $data['transit_funding_per_1k']); 
			}
		}
	}
}


// create transit index from indexed variables
$transit_index = array();
foreach($transit_years as $year) {
	
	//add in metro_MeansCarAloneRt score	
	if (isset($metro_MeansCarAloneRt_indexed[$year])) {
		if (isset($transit_index[$year])) {
			foreach($metro_MeansCarAloneRt_indexed[$year] as $data) {
				$key = lookupGeoId($transit_index[$year], $data['geoid']);
				$transit_index[$year][$key]['value'] = $transit_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$transit_index[$year][$key]['count'] = $transit_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_MeansCarAloneRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$transit_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_commute_hours_delayed score
	if (isset($metro_commute_hours_delayed_indexed[$year])) {
		if (isset($transit_index[$year])) {
			foreach($metro_commute_hours_delayed_indexed[$year] as $data) {
				$key = lookupGeoId($transit_index[$year], $data['geoid']);
				$transit_index[$year][$key]['value'] = $transit_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$transit_index[$year][$key]['count'] = $transit_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_commute_hours_delayed_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$transit_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
		
	//add in metro_NoVehRt score	
	if (isset($metro_NoVehRt_indexed[$year])) {
		if (isset($transit_index[$year])) {
			foreach($metro_NoVehRt_indexed[$year] as $data) {
				$key = lookupGeoId($transit_index[$year], $data['geoid']);
				$transit_index[$year][$key]['value'] = $transit_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$transit_index[$year][$key]['count'] = $transit_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_NoVehRt_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$transit_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_TransitRidership score	
	if (isset($metro_TransitRidership_indexed[$year])) {
		if (isset($transit_index[$year])) {
			foreach($metro_TransitRidership_indexed[$year] as $data) {
				$key = lookupGeoId($transit_index[$year], $data['geoid']);
				$transit_index[$year][$key]['value'] = $transit_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$transit_index[$year][$key]['count'] = $transit_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_TransitRidership_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$transit_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	//add in metro_BizTaxIndex score	
	if (isset($metro_pubtransit_funding_indexed[$year])) {
		if (isset($transit_index[$year])) {
			foreach($metro_pubtransit_funding_indexed[$year] as $data) {
				$key = lookupGeoId($transit_index[$year], $data['geoid']);
				$transit_index[$year][$key]['value'] = $transit_index[$year][$key]['value'] + $data['value'];
				if (isset($data['value'])) {
					$transit_index[$year][$key]['count'] = $transit_index[$year][$key]['count'] + 1;
				}
			}
		} else {
			foreach($metro_pubtransit_funding_indexed[$year] as $data) {
				if (isset($data['value'])) {
					$count = 1;
				} else {
					$count = 0;
				}
				$transit_index[$year][] = array('geoid' => $data['geoid'], 'value' => $data['value'], 'count' => $count); 
			}
		}
	}
	
	// normalize index by the number of variables availible in the year
	foreach($transit_index[$year] as $key => $data) {
		$transit_index[$year][$key]['value'] = ($data['value'] / $data['count']);
	}
	
	 
} // close foreach $transit_years


// create array of years for looping to create csv
$yearsIntersect = array_intersect($economy_years,$education_years,$quality_of_life_years,$equity_years,$transit_years);

// create OneD index for each relevant year
$oned_index = array();
foreach ($yearsIntersect as $year) {
	foreach ($geographies as $geoidKey => $geoid) {
		$oned_index[$year][$geoidKey] = array('geoid' => $geoid['geoid'], 'value' => 0);
		foreach ($economy_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$geoidKey]['value'] = $oned_index[$year][$geoidKey]['value'] + $data['value'];
			}
		}
		foreach ($education_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$geoidKey]['value'] = $oned_index[$year][$geoidKey]['value'] + $data['value'];
			}
		}
		foreach ($equity_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$geoidKey]['value'] = $oned_index[$year][$geoidKey]['value'] + $data['value'];
			}
		}
		foreach ($quality_of_life_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$geoidKey]['value'] = $oned_index[$year][$geoidKey]['value'] + $data['value'];
			}
		}
		foreach ($transit_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$geoidKey]['value'] = $oned_index[$year][$geoidKey]['value'] + $data['value'];
			}
		}
		// normalize
		foreach($oned_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index[$year][$key]['value'] = ($data['value'] / 5);
			}
		}
	}
}

// write all indicies to csv file
$id = 1;
foreach ($yearsIntersect as $year) {
	foreach ($geographies as $geoidKey => $geoid) {
		$oned_index_value = 0;
		$economy_index_value = 0;
		$education_index_value = 0;
		$equity_index_value = 0;
		$quality_of_life_index_value = 0;
		$transit_index_value = 0;
		$metro_exports_value = 0;
		$metro_GMPpercap_value = 0;
		$metro_HighTech_value = 0;
		$metro_KNemp_value = 0;
		$metro_pcpi_value = 0;
		$metro_TechPatentsRt_value = 0;
		$metro_BizTaxIndex_value = 0;
		$metro_RandD_share_GDP_value = 0;
		$metro_attain25to34bachplus_value = 0;
		$metro_bachplus_value = 0;
		$metro_edu_enrollment_value = 0;
		$metro_highschool_and_higher_adults_value = 0;
		$metro_teens_unemployed_noHS_value = 0;
		$metro_edu_appropriations_value = 0;
		$metro_edu_expendperpupil_value = 0;
		$metro_AQI_value = 0;
		$metro_PopChgRt_value = 0;
		$metro_UninsRt_value = 0;
		$metro_VCrimeRt_value = 0;
		$metro_VolunteerRt_value = 0;
		$metro_WellnessIndicators_Obesity_value = 0;
		$metro_ForBornRt_value = 0;
		$metro_giniindex_value = 0;
		$metro_IncomeShare1_value = 0;
		$metro_IncomeShare2_value = 0;
		$metro_IncomeShare3_value = 0;
		$metro_IncomeShare4_value = 0;
		$metro_IncomeShare5_value = 0;
		$metro_IncomeSharetop_value = 0;
		$metro_MedHHInc1_value = 0;
		$metro_MedHHInc2_value = 0;
		$metro_MedHHInc3_value = 0;
		$metro_MedHHInc4_value = 0;
		$metro_ownocc1_value = 0;
		$metro_ownocc2_value = 0;
		$metro_ownocc3_value = 0;
		$metro_ownocc4_value = 0;
		$metro_PovRtChild1_value = 0;
		$metro_PovRtChild2_value = 0;
		$metro_PovRtChild3_value = 0;
		$metro_PovRtChild4_value = 0;
		$metro_commute_hours_delayed_value = 0;
		$metro_MeansCarAloneRt_value = 0;
		$metro_NoVehRt_value = 0;
		$metro_TransitRidership_value = 0;
		$metro_pubtransit_funding_value = 0;
		

		// find OneD index and pull value variable
		foreach($oned_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$oned_index_value = round($oned_index[$year][$key]['value'], 2);
			}
		}

		// find economy index and pull value variable
		foreach($economy_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$economy_index_value = round($economy_index[$year][$key]['value'], 2);
			}
		}
		
		// find education index and pull value variable
		foreach($education_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$education_index_value = round($education_index[$year][$key]['value'], 2);
			}
		}
		
		// find equity index and pull value variable
		foreach($equity_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$equity_index_value = round($equity_index[$year][$key]['value'], 2);
			}
		}
		
		// find quality of life index and pull value variable
		foreach($quality_of_life_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$quality_of_life_index_value = round($quality_of_life_index[$year][$key]['value'], 2);
			}
		}

		// find quality of life index and pull value variable
		foreach($transit_index[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$transit_index_value = round($transit_index[$year][$key]['value'], 2);
			}
		}
		
		// find and pull value variable
		foreach($metro_exports_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_exports_value = $metro_exports_filtered[$year][$key]['export_value'];
			}
		}

		// find and pull value variable
		foreach($metro_GMPpercap_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_GMPpercap_value = $metro_GMPpercap_filtered[$year][$key]['per_capita_real_gdp'];
			}
		}

		// find and pull value variable
		foreach($metro_HighTech_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_HighTech_value = ($metro_HighTech_filtered[$year][$key]['percentchange_hightech_jobs'] / 100);
			}
		}

		// find and pull value variable
		foreach($metro_KNemp_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_KNemp_value = ($metro_KNemp_filtered[$year][$key]['percentchange_knowledgeind'] / 100);
			}
		}
	
		// find and pull value variable
		foreach($metro_pcpi_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_pcpi_value = $metro_pcpi_filtered[$year][$key]['percapita_income'];
			}
		}

		// find and pull value variable
		foreach($metro_TechPatentsRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_TechPatentsRt_value = $metro_TechPatentsRt_filtered[$year][$key]['Tech_Patents_per_10k'];
			}
		}

		// find and pull value variable
		foreach($metro_BizTaxIndex_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_BizTaxIndex_value = $metro_BizTaxIndex_filtered[$year][$key]['score'];
			}
		}
		
		// find and pull value variable
		foreach($metro_RandD_share_GDP_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_RandD_share_GDP_value = ($metro_RandD_share_GDP_filtered[$year][$key]['RD_GDP_share'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_attain25to34bachplus_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_attain25to34bachplus_value = ($metro_attain25to34bachplus_filtered[$year][$key]['percent_bachelors_and_higher'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_bachplus_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_bachplus_value = ($metro_bachplus_filtered[$year][$key]['percent_bachelors_and_higher'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_edu_enrollment_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_edu_enrollment_value = ($metro_edu_enrollment_filtered[$year][$key]['percent_enrolled_prek_high'] / 100);
			}
		}
	
		// find and pull value variable
		foreach($metro_highschool_and_higher_adults_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_highschool_and_higher_adults_value = ($metro_highschool_and_higher_adults_filtered[$year][$key]['percent_hs_and_higher'] / 100);
			}
		}

		// find and pull value variable
		foreach($metro_teens_unemployed_noHS_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_teens_unemployed_noHS_value = ($metro_teens_unemployed_noHS_filtered[$year][$key]['percent_unemployed_no_hs_degree'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_edu_appropriations_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_edu_appropriations_value = $metro_edu_appropriations_filtered[$year][$key]['edu_appro_per_fte_student'];
			}
		}
		
		// find and pull value variable
		foreach($metro_edu_expendperpupil_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_edu_expendperpupil_value = $metro_edu_expendperpupil_filtered[$year][$key]['edu_expend_per_pupil'];
			}
		}
		
		// find and pull value variable
		foreach($metro_AQI_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_AQI_value = ($metro_AQI_filtered[$year][$key]['percent_good_AQI'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_PopChgRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_PopChgRt_value = ($metro_PopChgRt_filtered[$year][$key]['percent_change_pop'] / 100);
			}
		}		

		// find and pull value variable
		foreach($metro_UninsRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_UninsRt_value = ($metro_UninsRt_filtered[$year][$key]['percent_wo_healthinsu'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_VCrimeRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_VCrimeRt_value = $metro_VCrimeRt_filtered[$year][$key]['violent_crime_rate'];
			}
		}		
		
		// find and pull value variable
		foreach($metro_VolunteerRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_VolunteerRt_value = ($metro_VolunteerRt_filtered[$year][$key]['volunteer_rate'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_WellnessIndicators_Obesity_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_WellnessIndicators_Obesity_value = ($metro_WellnessIndicators_Obesity_filtered[$year][$key]['percent_not_overweigh_obese'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_ForBornRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_ForBornRt_value = ($metro_ForBornRt_filtered[$year][$key]['percent_of_pop_foreignborn'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_giniindex_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_giniindex_value = $metro_giniindex_filtered[$year][$key]['gini'];
			}
		}	
		
		// find and pull value variable
		foreach($metro_IncomeShare_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_IncomeShare1_value = ($metro_IncomeShare_filtered[$year][$key]['Lowestquintile'] / 100);
				$metro_IncomeShare2_value = ($metro_IncomeShare_filtered[$year][$key]['Secondlowestquintile'] / 100);
				$metro_IncomeShare3_value = ($metro_IncomeShare_filtered[$year][$key]['Middlequintile'] / 100);
				$metro_IncomeShare4_value = ($metro_IncomeShare_filtered[$year][$key]['Secondhighestquintile'] / 100);
				$metro_IncomeShare5_value = ($metro_IncomeShare_filtered[$year][$key]['Highestquintile'] / 100);
				$metro_IncomeSharetop_value = ($metro_IncomeShare_filtered[$year][$key]['top_5_percent'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_MedHHInc_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_MedHHInc1_value = $metro_MedHHInc_filtered[$year][$key]['medhhinc_black'];
				$metro_MedHHInc2_value = $metro_MedHHInc_filtered[$year][$key]['medhhinc_hisp'];
				$metro_MedHHInc3_value = $metro_MedHHInc_filtered[$year][$key]['medhhinc_nonhispwhite'];
				$metro_MedHHInc4_value = $metro_MedHHInc_filtered[$year][$key]['medhhinc_all'];
			}
		}
		
		// find and pull value variable
		foreach($metro_ownocc_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_ownocc1_value = ($metro_ownocc_filtered[$year][$key]['ownocc_rate_black'] / 100);
				$metro_ownocc2_value = ($metro_ownocc_filtered[$year][$key]['ownocc_rate_hisp'] / 100);
				$metro_ownocc3_value = ($metro_ownocc_filtered[$year][$key]['ownocc_rate_nonhispwhite'] / 100);
				$metro_ownocc4_value = ($metro_ownocc_filtered[$year][$key]['ownocc_rate_all'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_PovRtChild_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_PovRtChild1_value = ($metro_PovRtChild_filtered[$year][$key]['percent_black_under18_below100poverty'] / 100);
				$metro_PovRtChild2_value = ($metro_PovRtChild_filtered[$year][$key]['percent_hisp_under18_below100poverty'] / 100);
				$metro_PovRtChild3_value = ($metro_PovRtChild_filtered[$year][$key]['percent_nonhispwhite_under18_below100poverty'] / 100);
				$metro_PovRtChild4_value = ($metro_PovRtChild_filtered[$year][$key]['percent_all_under18_below100poverty'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_commute_hours_delayed_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_commute_hours_delayed_value = $metro_commute_hours_delayed_filtered[$year][$key]['hours_delay_per_communter'];
			}
		}
		
		// find and pull value variable
		foreach($metro_MeansCarAloneRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_MeansCarAloneRt_value = ($metro_MeansCarAloneRt_filtered[$year][$key]['percent_workers_drive_alone'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_NoVehRt_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_NoVehRt_value = ($metro_NoVehRt_filtered[$year][$key]['percent_workers_no_vehicle'] / 100);
			}
		}
		
		// find and pull value variable
		foreach($metro_TransitRidership_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_TransitRidership_value = $metro_TransitRidership_filtered[$year][$key]['bus_trips_thousands'];
			}
		}	
		
		// find and pull value variable
		foreach($metro_pubtransit_funding_filtered[$year] as $key => $data) {
			if ($geoid['geoid'] == $data['geoid']) {
				$metro_pubtransit_funding_value = $metro_pubtransit_funding_filtered[$year][$key]['transit_funding_per_1k'];
			}
		}
		
		$csv_row = array($id, $geoid['geoid'], $geoid['metroarea'], $geoid['region'], $geoid['lat'], $geoid['lon'], $year, $oned_index_value, $economy_index_value, $education_index_value, $equity_index_value, $quality_of_life_index_value, $transit_index_value);
		
		// write header to csv file
		fputcsv($handlecsv, $csv_row);

		$csv_row2 = array(
			$id, 
			$geoid['geoid'], 
			$geoid['metroarea'], 
			$geoid['region'], 
			$geoid['lat'], 
			$geoid['lon'], 
			$year, 
			$oned_index_value, 
			$economy_index_value, 
			$education_index_value, 
			$equity_index_value, 
			$quality_of_life_index_value, 
			$transit_index_value, 
			$metro_exports_value, 
			$metro_GMPpercap_value, 
			$metro_HighTech_value, 
			$metro_KNemp_value, 
			$metro_pcpi_value, 
			$metro_TechPatentsRt_value, 
			$metro_BizTaxIndex_value, 
			$metro_RandD_share_GDP_value, 
			$metro_attain25to34bachplus_value, 
			$metro_bachplus_value, 
			$metro_edu_enrollment_value, 
			$metro_highschool_and_higher_adults_value, 
			$metro_teens_unemployed_noHS_value, 
			$metro_edu_appropriations_value, 
			$metro_edu_expendperpupil_value, 
			$metro_AQI_value, 
			$metro_PopChgRt_value, 
			$metro_UninsRt_value, 
			$metro_VCrimeRt_value, 
			$metro_VolunteerRt_value, 
			$metro_WellnessIndicators_Obesity_value, 
			$metro_ForBornRt_value, 
			$metro_giniindex_value, 
			$metro_IncomeShare1_value, 
			$metro_IncomeShare2_value, 
			$metro_IncomeShare3_value, 
			$metro_IncomeShare4_value, 
			$metro_IncomeShare5_value, 
			$metro_IncomeSharetop_value, 
			$metro_MedHHInc1_value, 
			$metro_MedHHInc2_value, 
			$metro_MedHHInc3_value, 
			$metro_MedHHInc4_value, 
			$metro_PovRtChild1_value, 
			$metro_PovRtChild2_value, 
			$metro_PovRtChild3_value, 
			$metro_PovRtChild4_value, 
			$metro_ownocc1_value, 
			$metro_ownocc2_value, 
			$metro_ownocc3_value, 
			$metro_ownocc4_value, 
			$metro_commute_hours_delayed_value, 
			$metro_MeansCarAloneRt_value, 
			$metro_NoVehRt_value, 
			$metro_TransitRidership_value, 
			$metro_pubtransit_funding_value
		);
				
		// write header to csv file
		fputcsv($handle2csv, $csv_row2);

		// clear csv row
		$csv_row = array();
		$csv_row2 = array();
		
		// increment ID
		$id++;
	}
}

// close csv files
fclose($handlecsv);
fclose($handle2csv);

/* close connection */
$mysqli->close();


// geoid lookup function
function lookupGeoId($array, $geoid) {
    foreach($array as $index => $data) {
        if($data['geoid'] == $geoid) 
		return $index;
    }
    return FALSE;
}

?>
