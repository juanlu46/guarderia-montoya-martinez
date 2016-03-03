<?php
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM alumnos");
$xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
while($array=$select->fetch_assoc()){
    $xml.="<alumno dni='".$array['DNI']."'><nombre>".$array['NOMBRE']."</nombre>";
    $xml.="<apellidos>".$array['APELLIDOS']."</apellidos><edad>".$array['EDAD']."</edad>";
    $xml.="<contacto>".$array['CONTACTO']."</contacto><direccion>".$array['DIRECCION']."</direccion>";;
    $xml.="<grupo>".$array['GRUPO']."</grupo></alumno>";
}
echo $xml;