<?php
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM profesores");
$xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
while($array=$select->fetch_assoc()){
    $xml.="<profesor dni='".$array['dni']."'><nombre>".$array['nombre']."</nombre>";
    $xml.="<apellidos>".$array['apellidos']."</apellidos><telefono>".$array['telefono']."</telefono>";
    $xml.="<grupo>".$array['grupo']."</grupo></profesor>";
}
echo $xml;