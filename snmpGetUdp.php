<?php

$host = $_POST['host'];

$resultUdpOut = snmp2_get($host,"public","1.3.6.1.2.1.7.1.0");
$resultUdpOut2 = explode(" ", $resultUdpOut);

$resultUdpIn = snmp2_get($host,"public","1.3.6.1.2.1.7.4.0");
$resultUdpIn2 = explode(" ", $resultUdpIn);

$resultIpErr = snmp2_get($host,"public","1.3.6.1.2.1.7.3.0");
$resultIpErr2 = explode(" ", $resultIpErr);



echo $resultUdpOut2[1]."|".$resultUdpIn2[1]."|".$resultIpErr2[1];

?>