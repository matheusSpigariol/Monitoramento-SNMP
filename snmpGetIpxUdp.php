<?php

$host = $_POST['host'];

$resultIpOut = snmp2_get($host,"public","1.3.6.1.2.1.4.10.0");
$resultIpOut2 = explode(" ", $resultIpOut);

$resultIpIn = snmp2_get($host,"public","1.3.6.1.2.1.4.9.0");
$resultIpIn2 = explode(" ", $resultIpIn);

$resultIpErr = snmp2_get($host,"public","1.3.6.1.2.1.4.8.0");
$resultIpErr2 = explode(" ", $resultIpErr);

$resultUdpOut = snmp2_get($host,"public","1.3.6.1.2.1.7.1.0");
$resultUdpOut2 = explode(" ", $resultUdpOut);

$resultUdpIn = snmp2_get($host,"public","1.3.6.1.2.1.7.4.0");
$resultUdpIn2 = explode(" ", $resultUdpIn);

$resultIpErr = snmp2_get($host,"public","1.3.6.1.2.1.7.3.0");
$resultIpErr2 = explode(" ", $resultIpErr);



echo $resultIpOut2[1]."|".$resultIpIn2[1]."|".$resultIpErr2[1]."|".$resultUdpOut2[1]."|".$resultUdpIn2[1]."|".$resultIpErr2[1];

?>