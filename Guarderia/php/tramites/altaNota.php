<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sql="INSERT INTO notas VALUES('".$_REQUEST['sel_alumnos_expediente_mod']."','".$_REQUEST['text_evaluacion']."','".
    $_REQUEST['select_curso']."','".$_REQUEST['text_mat1']."','".$_REQUEST['text_nota1']."','".
    $_REQUEST['text_mat2']."','".$_REQUEST['text_nota2']."','".$_REQUEST['text_mat3']."','".$_REQUEST['text_nota3']."')";
$mensaje="$(\"<div title='Introducir notas'>";
if($mySQLi->query($sql))
    $mensaje.="Se han introducido con éxito las notas"."</div>\").dialog();limpiarCampos('altaNotas');";
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";


echo $mensaje;