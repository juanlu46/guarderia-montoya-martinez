<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sProfesor=$_REQUEST['datos'];
$oProfesor=json_decode($sProfesor);
$sql="DELETE FROM profesor WHERE DNI='".$oProfesor->dni."'";
$mensaje="$(\"<div title='Baja profesor'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de baja con éxito al profesor ";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.="</div>\").dialog();";

echo $mensaje;