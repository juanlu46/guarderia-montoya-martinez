<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sAlumno=$_REQUEST['datos'];
$oAlumno=json_decode($sAlumno);
$sql="DELETE FROM alumnos WHERE DNI='".$oAlumno->dni."'";
$mensaje="$(\"<div title='Baja alumno'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de baja con éxito al alumno";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.="</div>\").dialog();";

echo $mensaje;