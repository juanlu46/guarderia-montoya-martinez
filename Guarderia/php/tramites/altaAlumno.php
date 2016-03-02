<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$oAlumno=json_decode($_REQUEST['datos']);
$sql="INSERT INTO alumnos VALUES('".$oAlumno->dni."','".
    $oAlumno->nombre."','".$oAlumno->apellidos."',".$oAlumno->edad.
    ",".$oAlumno->contacto.",'".$oAlumno->direccion."','".$oAlumno->grupo."')";
$mensaje="$('<div title=\"Alta alumno\">";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de alta con éxito al alumno ".$oAlumno->nombre." ".
        $oAlumno->apellidos;
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.=").dialog();";

echo $mensaje;