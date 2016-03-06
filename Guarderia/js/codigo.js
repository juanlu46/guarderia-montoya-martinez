    window.addEventListener('load',inicio,false);
    var oXML;
    function inicio() {
        document.getElementById("btnAlumnos").addEventListener("click",mostrarMenuAlumnos,false);
        document.getElementById("btnProfesores").addEventListener("click",mostrarMenuProf,false);
        document.getElementById("btnActividades").addEventListener("click",mostrarFormAltaAct,false);
        $('#btnListarAlum').click(mostrarFormlistadoAlumnos);
        $('#btnNotas').click(mostrarFormAltaNotas);
           oXML=loadXMLDoc("xml/datosGuarderia.xml");
    }

    //Metodos buscar
    function buscarProfesor(sDni){
        var oProfesor=null;
        var bEncontrado=false;
        var oProfesores=oXML.querySelectorAll("profesor");
        for(var i=0;i<oProfesores.length && !bEncontrado;i++){
            var sDniProf=oProfesores[i].getAttribute("dni");
            if(sDniProf==sDni){
                oProfesor =  oProfesores[i];
                bEncontrado=true;
            }
        }
        return oProfesor;
    }
    function buscarAlumno(sDni){
        var oAlumno=null;
        var bEncontrado=false;
        var oAlumnos=oXML.querySelectorAll("alumno");
        for(var i=0;i<oAlumnos.length && !bEncontrado;i++){
            var sDniAlum=oAlumnos[i].getAttribute("dni");
            if(sDniAlum==sDni){
                oAlumno =  oAlumnos[i];
                bEncontrado=true;
            }
        }
        return oAlumno;
    }

    function buscarActividad(sId){
        var oActividad=null;
        var bEncontrado=false;
        var oActividades=oXML.querySelectorAll("actividad");
        for(var i=0;i<oActividades.length && !bEncontrado;i++){
            var sIdAct=oActividades[i].getAttribute("id");
            if(sIdAct==sId){
                oActividad =  oActividades[i];
                bEncontrado=true;
            }
        }
        return oActividad;
    }

    function buscarExpediente(sDni){
        var oExpediente=null;
        var bEncontrado=false;
        var oExpeditentes=oXML.querySelectorAll("expediente");
        for(var i=0;i<oExpeditentes.length && !bEncontrado;i++){
            if(oExpeditentes[i].getAttribute("id")==sDni){
                oExpediente =  oExpeditentes[i];
                bEncontrado=true;
            }
        }
        return oExpediente;
    }

    //Metodos Añadir al XML
    function añadirProfesor(oProfesor){
        var sRes="Alta de profesor satisfactoria";
        if(buscarProfesor(oProfesor.getAttribute("dni"))==null) {
            var oProfesores = oXML.querySelector("profesores");
            oProfesores.appendChild(oProfesor);
        }
        else
        {
            sRes="Profesor ya registrado";
        }
        return sRes;
    }
    function añadirAlumno(oAlumno){
        var sRes="Alta de alumno satisfactoria";
        if(buscarAlumno(oAlumno.getAttribute("dni"))==null) {
            var oAlumnos = oXML.querySelector("alumnos");
            oAlumnos.appendChild(oAlumno);
        }
        else
        {
            sRes="Alumno ya registrado";
        }
        return sRes;
    }
    function añadirActividad(oActividad){
        var sRes="Alta de actividad satisfactoria";
        if(buscarActividad(oActividad.getAttribute("id"))==null) {
            var oActividades = oXML.querySelector("actividades");
            oActividades.appendChild(oActividad);
        }
        else
        {
            sRes="Actividad ya registrado";
        }
        return sRes;
    }


    function añadirExpediente(oExpediente){
        var sRes="Alta de expediente satisfactoria";
        if(buscarExpediente(oExpediente.getAttribute("id"))==null) {
            var oExpedientes = oXML.querySelector("expedientes");
            oExpedientes.appendChild(oExpediente);
        }
        else
        {
            sRes="Expediente ya registrado";
        }
        return sRes;
    }



    //Metodos borrar
    function borrarProfesor(sDni){
        var sRes="Baja de profesor satisfactoria";
        var oProfesor=buscarProfesor(sDni);
        if(oProfesor!=null){
            //Borro el objeto
            oXML.querySelector("profesores").removeChild(oProfesor);
            //Buscamos dependencias del objeto borrado, las eliminamos y notificamos si existen
            var oAsignaturas=oXML.querySelectorAll("asignaturas");
            var bEncontrado=false;
            var oAsigAfectada;
            for(var i=0;i<oAsignaturas.length && !bEncontrado;i++){
                //Cogemos el profesor de la asignatura
                var oProfesorAsig=oAsignaturas[i].querySelector("profesorAsig");
                if(oProfesorAsig.textContent==sDni) { //Si el valor de la etiqueta es igual al dni que pasamos por parametro
                    //Modificamos el valor, dicienod que no hay ninguno asignado
                    oProfesorAsig.textContent = "No asignado";
                    //Guardamos el id de la asignatura, para notificar que no tiene profesor asignado
                    oAsigAfectada=oAsignaturas.getAttribute("id");
                    //salimos del bucle
                    bEncontrado = true;
                }
            }
            if(bEncontrado)
                sRes+="\n-La asignatura con id "+oAsigAfectada+", no tiene profesor asignado"+
                    ", debido a que dicho profesor se ha dado de baja";
        }
        else{
            sRes="El profesor que intenta borrar, no existe por ese DNI";
        }
        return sRes;
    }
    function borrarAlumno(sDni){
        var sRes="Baja de alumno satisfactoria";
        var oAlumno=buscarAlumno(sDni);
        if(oAlumno!=null){
            //Borro el objeto
            oXML.querySelector("alumnos").removeChild(oAlumno);
            //Buscamos dependencias del objeto borrado, las eliminamos y notificamos si existen
            var oAsignaturas=oXML.querySelectorAll("asignatura");
            var bEncontrado=false;
            for(var i=0;i<oAsignaturas.length && !bEncontrado;i++){
                //Cogemos el alumno de la asignatura
                var oAlumnosAsignatura=oAsignaturas[i].querySelectorAll("alumnoAsig");
                for(var j=0;j<oAlumnosAsignatura.length;j++){
                    if(oAlumnosAsignatura[j].getAttribute("dni")==sDni) {
                       //borramos el alumno de la lista de alumnos que hay en la asigatura
                        oAsignaturas[i].querySelector("alumnosAsig").removeChild(oAlumnosAsignatura[j]);
                        bEncontrado = true;
                    }
                }
            }
            var oExpediente=buscarExpediente(sDni);
            if(oExpediente!=null)
                oXML.querySelector("expedientes").removeChild(oExpediente);
            //Busco si esta en una actividad
            var oActividades=oXML.querySelectorAll("actividad");
            var bActividadEncontrada=false;
            for(var i=0;i<oActividades.length && !bActividadEncontrada;i++) {
                var oAlumnos=oActividades[i].querySelectorAll("alumnoAct");
                for(var j=0;j<oAlumnos.length;j++) {
                    if (oAlumnos[j].getAttribute("dni") == sDni) {
                        oActividades[i].removeChild(oAlumnos[i]);
                        bActividadEncontrada = true;
                    }
                }
            }

            //busco si tiene algun bono
            var oBonoAlumno=buscarBono(sDni);
            if(oBonoAlumno!=null)
                oXML.querySelector("bonos").removeChild(oBonoAlumno);
        }
        else{
            sRes="El alumno que intenta borrar, no existe por ese DNI";
        }
        return sRes;
    }

    function borrarActividad(sId){
        var sRes="Baja de actividad satisfactoria";
        var oActividad=buscarActividad(sId);
        if(oActividad!=null){
            oXML.querySelector("actividades").removeChild(oActividad);
        }
        else{
            sRes="La actividad que intenta borrar no existe con ese Id";
        }
        return sRes;
    }

    function borrarExpediente(sDni){
        var sRes="Baja de Expediente satisfactoria";
        var oExpediente=buscarExpediente(sDni);
        if(oExpediente!=null){
            var expedientes=oXML.querySelector("expedientes");
            expedientes.removeChild(oExpediente);
        }
        else{
            sRes="El Expediente que intenta borrar no existe con ese Dni";
        }
        return sRes;
    }


// METODOS MOSTRAR MENUS
    function mostrarMenuAlumnos(){
        ocultar("menuProf");
        ocultar("menuAct");
        $("form").hide("normal");
        $("#menuAlum").removeClass("oculto");
        document.getElementById("mostrarFormAltaAlum").addEventListener("click",mostrarFormAltaAlum,false);
        document.getElementById("mostrarFormModAlum").addEventListener("click",mostrarFormModAlum,false);
        document.getElementById("mostrarFormBajAlum").addEventListener("click",mostrarFormBajAlum,false);
    }

    function mostrarMenuProf(){
        ocultar("menuAlum");
        ocultar("menuAct");
        $("form").hide("normal");
        $("#menuProf").removeClass("oculto");
        document.getElementById("mostrarFormAltaProf").addEventListener("click", mostrarFormAltaProf, false);
        document.getElementById("mostrarFormModProf").addEventListener("click", mostrarFormModProf, false);
        document.getElementById("mostrarFormBajProf").addEventListener("click", mostrarFormBajProf, false);
    }

    function ocultar(elemento){
    $('#'+elemento).addClass("oculto");
}

    function buscarRepeSelect(oOptions,sValor){
        var bEncontrado=false;
        for(var i=0; i<oOptions.length && !bEncontrado;i++){
            if(oOptions[i].textContent.localeCompare(sValor)==0)
                bEncontrado=true;
        }
        return bEncontrado;
    }

    function cancelar(){
        $("form").hide("normal");
        limpiarCampos();
    }

    // Metodos de mostrar formularios
    function mostrarFormAltaProf(){
        $("form").hide("normal");
        if($('#form_altaProf').size() == 0 )
            $("<div>").appendTo('.form_altaProf').load("formularios/profesor/formAltaProf.html", function(){ $.getScript("js/profesor/altaProfe.js");});
        $("#form_altaProf").show("normal");
    }
    function mostrarFormModProf(){
        $("form").hide("normal");
        if($('#form_modProf').size() == 0 )
            $("<div>").appendTo('.form_modProf').load("formularios/profesor/formModProf.html", function(){ $.getScript("js/profesor/modProfe.js");});
        $("#form_modProf").show("normal");
    }

    function mostrarFormBajProf(){
        $("form").hide("normal");
        if($('#form_bajaProf').size() == 0 )
            $("<div>").appendTo('.form_bajaProf').load("formularios/profesor/formBajaProf.html", function(){ $.getScript("js/profesor/bajaProfe.js");});
        $("#form_bajaProf").show("normal");
    }

    function mostrarFormAltaAlum(){
        $("form").hide("normal");
        if($('#form_altaAlum').size() == 0 ){
            $("<div>").appendTo('.form_altaAlum').load("formularios/alumno/formAltaAlum.html", function(){ $.getScript("js/alumno/altaAlumno.js");});
        }
        $("#form_altaAlum").show("normal");
    }
    function mostrarFormModAlum(){
        $("form").hide("normal");
        if($('#form_modAlum').size() == 0 )
            $("<div>").appendTo('.form_modAlum').load("formularios/alumno/formModAlum.html", function(){ $.getScript("js/alumno/modAlumno.js");});
        $("#form_modAlum").show("normal");
    }
    function mostrarFormBajAlum(){
        $("form").hide("normal");
        if($('#form_bajaAlum').size() == 0 )
            $("<div>").appendTo('.form_bajaAlum').load("formularios/alumno/formBajaAlum.html", function(){ $.getScript("js/alumno/bajaAlumno.js");});
        $("#form_bajaAlum").show("normal");
}

    function mostrarFormAltaAct(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_altaAct').size() == 0 )
            $("<div>").appendTo('.form_altaAct').load("formularios/formAltaAct.html", function(){ $.getScript("js/altaExtra.js");});
         $("#form_altaAct").show("normal");
    }
    function mostrarFormAltaNotas(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_modExp').size() == 0 )
            $("<div>").appendTo('.formModExp').load("formularios/formAltaNota.html", function(){ $.getScript("js/altaNotas.js");});
        $("#form_modExp").show("normal");
    }
    function mostrarFormlistadoAlumnos(){
        $("form").hide("normal");
        if($('#form_listarAlummnos').size() == 0 ) {
            $("<div>").appendTo('.listados').load("formularios/listadoAlumnos.html",function(){$("#form_listarAlummnos").show("normal");});
            $.get({url: 'php/obtenerGrupos.php', success: tratarRespuestaGrupos});
        }


    }

    //Funciones limpiar campos
    function limpiarCampos(){
        var oInputs=document.querySelectorAll("input[type='text']");
        var oSelects=document.querySelectorAll("select");
        var oTextArea=document.querySelector("textarea");
        for(var i=0;i<oInputs.length;i++)
            oInputs[i].value="";
        for(var i=0;i<oSelects.length;i++){
            var oOptions=oSelects[i].querySelectorAll("option");
            for(var j=0;j<oOptions.length;j++)
                oSelects[i].removeChild(oOptions[j]);
        }
        oTextArea.textContent="";
    }
    /* METODOS AUXILIARES*/
    //Devuelve los objetos seleccionados de un select multiple
    function getSelecteditems(oSelect){
        var oOptions=[];
        for(var i=0;i<oSelect.options.length;i++){
            if(oSelect.options[i].selected)
                oOptions.push(oSelect.options[i]);
        }
        return oOptions;
    }

    //Metodo para cargar un archivo XML
    function loadXMLDoc(filename)
    {
        if (window.XMLHttpRequest)
        {
            xhttp=new XMLHttpRequest();
        }
        else // code for IE5 and IE6
        {
            xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET",filename,false);

        xhttp.send();

        return xhttp.responseXML;
    }

function listadoAlumnos(edad,grupo,oXml){
    var pestana = open("","","");
    pestana.document.title="Listado Alumnos";

    var tabla=document.createElement("table");

    var titulo=document.createElement("caption");
    titulo.appendChild(document.createTextNode("Listado de Alumnos"));
    tabla.appendChild(titulo);
    var cabecera=document.createElement("thead");

    var datosCabecera=new Array(7);
    datosCabecera[0] = "Nombre";
    datosCabecera[1]= "Apellidos";
    datosCabecera[2]= "Dni";
    datosCabecera[3]= "Edad";
    datosCabecera[4]= "Teléfono";
    datosCabecera[5]= "Dirección";
    datosCabecera[6]= "Grupo";


    cabecera.appendChild(crearCabeceraTabla(datosCabecera));
    tabla.appendChild(cabecera);
    var nombre="";
    var alumnos=$(oXml).find('alumno');
    var datos=new Array(7);
    var bodyTabla=document.createElement("tbody");
    for(var i=0;i<alumnos.length;i++) {
            if(alumnos[i].getElementsByTagName("edad")[0].textContent == edad && alumnos[i].getElementsByTagName("grupo")[0].textContent==grupo ) {
                datos[0] = $(alumnos[i]).find("nombre").text();
                datos[1] = $(alumnos[i]).find("apellidos").text();
                datos[2] = $(alumnos[i]).attr("dni");
                datos[3] = $(alumnos[i]).find("edad").text();
                datos[4] = $(alumnos[i]).find("contacto").text();
                datos[5] = $(alumnos[i]).find("direccion").text();
                datos[6] = $(alumnos[i]).find("grupo").text();

                bodyTabla.appendChild(crearFilaTabla(datos));
            }
    }

    tabla.appendChild(bodyTabla);

    pestana.document.body.appendChild(tabla);

}
    function listadoProfesores(){
        var pestana = open("","","");
        pestana.document.title="Listado Profesores";

        var tabla=document.createElement("table");
        var titulo=document.createElement("caption");
        titulo.appendChild(document.createTextNode("Listado de Profesores"));
        tabla.appendChild(titulo);
        var cabecera=document.createElement("thead");

        var datosCabecera=new Array(5);
        datosCabecera[0] = "Nombre";
        datosCabecera[1]= "Apellidos";
        datosCabecera[2]= "Dni";
        datosCabecera[3]= "Teléfono";
        datosCabecera[4]= "Grupos";
        cabecera.appendChild(crearCabeceraTabla(datosCabecera));
        tabla.appendChild(cabecera);

        var oProfesores=oXML.querySelectorAll("profesor");
        var datos=new Array(5);
        var bodyTabla=document.createElement("tbody");
        for(var i=0;i<oProfesores.length;i++) {
            datos[0] = oProfesores[i].getElementsByTagName("nombre")[0].textContent;
            datos[1]= oProfesores[i].getElementsByTagName("apellidos")[0].textContent;
            datos[2]= oProfesores[i].getAttribute("dni");
            datos[3]= oProfesores[i].getElementsByTagName("telefono")[0].textContent;
            datos[4]="";
            var gruposProfesorActual=oProfesores[i].getElementsByTagName("grupo");

            for(var j=0;j<gruposProfesorActual.length;j++){
                datos[4]+=gruposProfesorActual[j].getAttribute("id")+" ";
            }
            bodyTabla.appendChild(crearFilaTabla(datos));
        }
        tabla.appendChild(bodyTabla);
        pestana.document.body.appendChild(tabla);
    }
    function crearFilaTabla(datos){
        var tr=document.createElement("tr");

        for(var i=0;i<datos.length;i++){
            var td=document.createElement("td");
            td.appendChild(document.createTextNode(datos[i]));
            tr.appendChild(td);
        }
        return tr;
    }

    function crearCabeceraTabla(datos){
        var tr=document.createElement("tr");

        for(var i=0;i<datos.length;i++){
            var td=document.createElement("th");
            td.appendChild(document.createTextNode(datos[i]));
            tr.appendChild(td);
        }
        return tr;
    }
    function tratarRespuestaGrupos(datos){
        var select=document.getElementById('sel_lista_alumnos_grupo');
        var grupos=$(datos).find('grupo');
        for(var i=0;i<grupos.size();i++) {
            var opt=document.createElement('option');
            opt.id=$(grupos[i]).attr("id");
            opt.appendChild( document.createTextNode($(grupos[i]).attr("id")));
            select.appendChild(opt);
        }
        $('#btnMListarAlum').click(mostrarAlumnos);
    }

    function mostrarAlumnos(){
        oAjaxListarAlumnos=new XMLHttpRequest();
        oAjaxListarAlumnos.open('POST','php/obtenerAlumnos.php');
        oAjaxListarAlumnos.addEventListener('readystatechange',tratarRespuestaListaAlumnos);
        oAjaxListarAlumnos.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjaxListarAlumnos.send();
    }
    function tratarRespuestaListaAlumnos(){
        if(this.readyState==4 && this.status==200){

            var edad = $('#sel_lista_alumnos_edad').val();
            var grupo = $('#sel_lista_alumnos_grupo').val();
            var oXml=this.responseXML;
            listadoAlumnos(edad,grupo,oXml);
        }
    }