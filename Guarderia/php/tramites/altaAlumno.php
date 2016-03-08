<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sAlumno=$_REQUEST['datos'];
$oAlumno=json_decode($sAlumno);
$sql="INSERT INTO alumnos VALUES('".$oAlumno->dni."','".
    $oAlumno->nombre."','".$oAlumno->apellido."',".$oAlumno->edad.
    ",".$oAlumno->telefono.",'".$oAlumno->direccion."','".$oAlumno->grupo."')";
$mensaje="$(\"<div title='Alta Profesor'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de alta con éxito al alumno ".$oAlumno->nombre." ".
        $oAlumno->apellido."</div>\").dialog();limpiarCampos();";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";

echo $mensaje;
