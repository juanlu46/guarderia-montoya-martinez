<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sql="UPDATE profesor SET DNI='".$_REQUEST['dni']."',NOMBRE='".$_REQUEST['nombre']."',".
    "APELLIDOS='".$_REQUEST['apellidos']."',TELEFONO=".$_REQUEST['telefono'].",GRUPO='".$_REQUEST['grupo'].
    "' WHERE DNI='".$_REQUEST['dni']."'";
$mensaje="$(\"<div title='Modificar profesor'>";
if($mySQLi->query($sql))
    $mensaje.="Se ha modificado con éxito al profesor ".$_REQUEST['nombre']." ".
        $_REQUEST['apellidos']."</div>\").dialog();limpiarCampos('modProfe');";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";

echo $mensaje;