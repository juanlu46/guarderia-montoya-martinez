<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$oAlumno=json_decode($_REQUEST['datos']);
$sql="INSERT INTO notas VALUES('".$_REQUEST['dni']."','".$_REQUEST['evaluacion']."','".$_REQUEST['curso']."','".
    $_REQUEST['materia1']."','".$_REQUEST['nota1']."','".$_REQUEST['materia2']."','".$_REQUEST['nota2']."','".
    $_REQUEST['materia3']."','".$_REQUEST['nota3']."')";
$mensaje="$(\"<div title='Introducir notas'>";
if($mySQLi->query($sql))
    $mensaje.="Se han introducido con éxito las notas"."</div>\").dialog();limpiarCampos();";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";


echo $mensaje;