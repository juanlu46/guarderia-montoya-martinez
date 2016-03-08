<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sql="INSERT INTO profesor VALUES('".$_REQUEST['dni']."','".
    $_REQUEST['nombre']."','".$_REQUEST['apellidos']."',".$_REQUEST['telefono'].
    ",'".$_REQUEST['grupo']."')";
$mensaje="$(\"<div title='Alta Profesor'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha dado de alta con éxito al profesor ".$_REQUEST['nombre']." ".
        $_REQUEST['apellidos']."</div>\").dialog();limpiarCampos();";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";


echo $mensaje;