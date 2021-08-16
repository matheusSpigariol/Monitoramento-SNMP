<?php

$host = $_POST['host'];

$resultIpRcv = snmp2_get($host,"public","1.3.6.1.2.1.4.10.0");
$resultIpRcv2 = explode(" ", $resultIpRcv);

$resultIpDlv = snmp2_get($host,"public","1.3.6.1.2.1.4.9.0");
$resultIpDlv2 = explode(" ", $resultIpDlv);

$resultIpDcd = snmp2_get($host,"public","1.3.6.1.2.1.4.8.0");
$resultIpDcd2 = explode(" ", $resultIpDcd);



echo $resultIpRcv2[1]."|".$resultIpDlv2[1]."|".$resultIpDcd2[1];

?>