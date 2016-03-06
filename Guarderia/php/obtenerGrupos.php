<?php
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM grupos");
$xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?><grupos>";
while($array=$select->fetch_assoc()){
    $xml.="<grupo id='".$array['ID']."'><descripcion>".$array['DESCRIPCION']."</descripcion>";
    $xml.="</grupo>";
}
echo $xml."</grupos>";