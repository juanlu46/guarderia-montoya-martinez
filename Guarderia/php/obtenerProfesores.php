<?php
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM profesor");
$xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?><profesores>";
while($array=$select->fetch_assoc()){
    $xml.="<profesor dni='".$array['DNI']."'><nombre>".$array['NOMBRE']."</nombre>";
    $xml.="<apellidos>".$array['APELLIDOS']."</apellidos><telefono>".$array['TELEFONO']."</telefono>";
    $xml.="<grupo>".$array['GRUPO']."</grupo></profesor>";
}
echo $xml."</profesores>";