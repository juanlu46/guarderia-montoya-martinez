<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sAlumno=$_REQUEST['datos'];
$oAlumno=json_decode($sAlumno);
$sql="UPDATE alumnos SET DNI='".$oAlumno->dni."',NOMBRE='".$oAlumno->nombre."',".
    "APELLIDOS='".$oAlumno->apellidos."',EDAD=".$oAlumno->edad.",CONTACTO=".$oAlumno->contacto.
    ",DIRECCION='".$oAlumno->direccion."',GRUPO='".$oAlumno->grupo."' WHERE DNI='".$oAlumno->dni.
    "'";
$mensaje="$(\"<div title='Modificar alumno'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha modificado con éxito al alumno ".$oAlumno->nombre." ".
        $oAlumno->apellidos;
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error;
$mensaje.="</div>\").dialog();";

echo $mensaje;