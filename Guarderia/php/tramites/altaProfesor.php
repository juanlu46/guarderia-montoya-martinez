<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$oProfesor=json_decode($_REQUEST['datos']);
$sql="INSERT INTO profesor VALUES('".$oProfesor->dni."','".
    $oProfesor->nombre."','".$oProfesor->apellidos."',".$oProfesor->telefono.",'".$oProfesor->direccion."','".$oProfesor->grupo."')";
$mensaje="$('<div title=\"Alta Profesor\">";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de alta con éxito al profesor ".$oProfesor->nombre." ".
        $oProfesor->apellidos;
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.=").dialog();";

echo $mensaje;