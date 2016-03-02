<?php
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM alumnos");
$xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
while($array=$select->fetch_assoc()){
    $xml.="<alumno dni='".$array['dni']."'><nombre>".$array['nombre']."</nombre>";
    $xml.="<apellidos>".$array['apellidos']."</apellidos><edad>".$array['edad']."</edad>";
    $xml.="<contacto>".$array['contacto']."</contacto><direccion>".$array['direccion']."</direccion>";;
    $xml.="<grupo>".$array['grupo']."</grupo></alumno>";
}
echo $xml;