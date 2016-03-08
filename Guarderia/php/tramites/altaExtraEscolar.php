<?php
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$sExtraescolar=$_REQUEST['datos'];
$oExtraescolar=json_decode($sExtraescolar);
$sql="INSERT INTO extraescolares VALUES(".$oExtraescolar->id.",'".$oExtraescolar->descripcion."',".
    $oExtraescolar->fecha.")";
$mensaje="$(\"<div title='Alta Extraescolar'>";
if($mySQLi->query($sql)) {
    $oAlumnos = $oExtraescolar->alumnos;
    $id = $oExtraescolar->id;
    $sql2 = "INSERT INTO alum_extra VALUES('" . $oAlumnos[0] . "',".$id.")";
    for($i=1;$i<sizeof($oAlumnos);$i++){
        $sql2.=",('" . $oAlumnos[$i] . "',".$id.")";
    }
    if($mySQLi->query($sql2))
        $mensaje.= "Se ha dado de alta con éxito la actividad extraescolar"."</div>\").dialog();limpiarCampos('altaAct');";
    else
        $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";
}
else
    $mensaje.="Se ha producido un error: ".$mySQLi->errno."-".$mySQLi->error."</div>\").dialog();";


echo $mensaje;