<?php
if(isset($_REQUEST['xml'])){
    header('Content-Type: application/xml');
}
else {
    header('Content-Type: text/html');
}
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mySQLi=new mysqli("localhost","root","","guarderia");
$mySQLi->query("SET NAMES utf8");
$select=$mySQLi->query("SELECT * FROM extraescolares");
if(isset($_REQUEST['xml'])){
    $xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?><extraescolares>";
    while($array=$select->fetch_assoc()){
        $xml.="<extraescolar id='".$array['ID']."'/>";
    }
    echo $xml."</extraescolares>";
}
else {
    $html = "<div id='listadoExtra' title='Lista Actvidades Extraescolares'><table class='table table-hover'>";
    $html .= "<thead><tr><th>ID</th><th>Descripción</th><th>Fecha</th><th>Nº Alumnos</th></tr></thead>";
    while ($array = $select->fetch_assoc()) {
        $iAlumnos = $mySQLi->query("SELECT COUNT(DNI_ALUMNO) FROM alum_extra WHERE ID_EXTRAESCOLAR=" .
            $array["ID"])->fetch_array(MYSQL_NUM)[0];
        $html .= "<tr><td>" . $array["ID"] . "</td><td>" . $array["DESCRIPCION"] . "</td><td>" .
            $array["FECHA"] . "</td><td>" . $iAlumnos . "</td></tr>";
    }
    echo $html . "</table></div>";
}