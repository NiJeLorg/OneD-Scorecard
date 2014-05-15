<?
// Establishes a database connection to the One D Scorecard database.

// require the global variables
require('global.php');

// make our connection
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// let us know if the connection fails
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	exit;
}
?>