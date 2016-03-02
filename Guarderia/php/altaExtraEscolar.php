<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$oExtraescolar=json_decode($_REQUEST['datos']);
$sql="INSERT INTO extraescolares VALUES(".$oExtraescolar->id.",'".$oExtraescolar->descripcion."',".
    $oExtraescolar->fecha.")";
$mensaje="$('<div title=\"Alta Extraescolar\">";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de alta con éxito la actividad extraescolar";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.=").dialog();";

echo $mensaje;