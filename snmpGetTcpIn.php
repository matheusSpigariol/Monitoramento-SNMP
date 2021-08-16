<?php
$host = $_POST['host'];

$resultIn = snmp2_get($host,"public","1.3.6.1.2.1.6.10.0");
$resultIn2 = explode(" ", $resultIn);
$resultOut = snmp2_get($host,"public","1.3.6.1.2.1.6.11.0");
$resultOut2 = explode(" ", $resultOut);

echo $resultIn2[1]."|".$resultOut2[1];

?>