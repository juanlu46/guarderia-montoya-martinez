function mostrarAlumnos(){
    oAjaxListarAlumnos=new XMLHttpRequest();
    oAjaxListarAlumnos.open('POST','php/obtenerAlumnos.php');
    oAjaxListarAlumnos.addEventListener('readystatechange',tratarRespuestaListaAlumnos);
    oAjaxListarAlumnos.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjaxListarAlumnos.send();
}

function tratarRespuestaListaAlumnos(){
    if(this.readyState==4 && this.status==200){
        var oXml=this.responseXML;
        var nombre="";
        var alumnos=$(oXml).find('alumno');
        for(var i=0;i<alumnos.size();i++) {
            nombre+= $(alumnos[i]).attr("dni");
        }
        alert(nombre);

    }
}
function tratarRespuestaGrupos(){
    if(this.readyState==4 && this.status==200){
        var oXml=this.responseXML;
        var select=document.getElementById('sel_lista_alumnos_grupo');
        var grupos=$(oXml).find('grupo');
        for(var i=0;i<grupos.size();i++) {
            var opt=document.createElement('option');
            opt.id=$(grupos[i]).attr("id");
            opt.appendChild( document.createTextNode($(grupos[i]).find('descripcion').text()));
            select.appendChild(opt);
        }


    }




}