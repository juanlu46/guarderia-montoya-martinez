    window.addEventListener('load',inicio,false);
    var oXML;
    function inicio() {
        document.getElementById("btnAlumnos").addEventListener("click",mostrarMenuAlumnos,false);
        document.getElementById("btnProfesores").addEventListener("click",mostrarMenuProf,false);
        document.getElementById("btnActividades").addEventListener("click",mostrarFormAltaAct,false);
        $('#btnListarAlum').click(mostrarFormlistadoAlumnos);
        $('#btnListarProf').click(mostrarFormListadoProfesores);
        $('#btnNotas').click(mostrarFormAltaNotas);
        $('#btnListarAsig').click(mostrarFormListadoExtra);

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
            $("<div>").appendTo('.form_altaProf').load("formularios/profesor/formAltaProf.html", function(){$("#form_altaProf").show("normal"); $.getScript("js/profesor/altaProfe.js");});
        $.ajax({url:'php/obtenerGrupos.php',success:rellenarSelectGruposAltaProf});
        $("#form_altaProf").show("normal");
    }
    function mostrarFormModProf(){
        $("form").hide("normal");
        if($('#form_modProf').size() == 0 )
            $("<div>").appendTo('.form_modProf').load("formularios/profesor/formModProf.html", function(){$("#form_modProf").show("normal"); $.getScript("js/profesor/modProfe.js");});
        $("#form_modProf").show("normal");
    }

    function mostrarFormBajProf(){
        $("form").hide("normal");
        if($('#form_bajaProf').size() == 0 )
            $("<div>").appendTo('.form_bajaProf').load("formularios/profesor/formBajaProf.html", function(){$("#form_bajaProf").show("normal"); $.getScript("js/profesor/bajaProfe.js");});
        $("#form_bajaProf").show("normal");
    }

    function mostrarFormAltaAlum(){
        $("form").hide("normal");
        if($('#form_altaAlum').size() == 0 )
            $("<div>").appendTo('.form_altaAlum').load("formularios/alumno/formAltaAlum.html", function(){$("#form_altaAlum").show("normal"); $.getScript("js/alumno/altaAlumno.js");});
        $("#form_altaAlum").show("normal");
    }
    function mostrarFormModAlum(){
        $("form").hide("normal");
        if($('#form_modAlum').size() == 0 )
            $("<div>").appendTo('.form_modAlum').load("formularios/alumno/formModAlum.html", function(){$("#form_modAlum").show("normal"); $.getScript("js/alumno/modAlumno.js");});
        $("#form_modAlum").show("normal");
    }
    function mostrarFormBajAlum(){
        $("form").hide("normal");
        if($('#form_bajaAlum').size() == 0 )
            $("<div>").appendTo('.form_bajaAlum').load("formularios/alumno/formBajaAlum.html", function(){$("#form_bajaAlum").show("normal"); $.getScript("js/alumno/bajaAlumno.js");});
        $("#form_bajaAlum").show("normal");
}

    function mostrarFormAltaAct(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_altaAct').size() == 0 )
            $("<div>").appendTo('.form_altaAct').load("formularios/formAltaAct.html", function(){$("#form_altaAct").show("normal"); $.getScript("js/altaExtra.js");
                $( "#text_fecha" ).datepicker({
                    dateFormat: "yy-mm-dd"
                });});
         $("#form_altaAct").show("normal");
        $.ajax({url:'php/obtenerAlumnos.php',success:rellenarSelectAlumnosAct});
    }
    function mostrarFormAltaNotas(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_modExp').size() == 0 )
            $("<div>").appendTo('.formModExp').load("formularios/formAltaNota.html", function(){$("#form_modExp").show("normal"); $.getScript("js/altaNotas.js");});
        $("#form_modExp").show("normal");
    }
    function mostrarFormlistadoAlumnos(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_listarAlummnos').size() == 0 ) {
            $("<div>").appendTo('.listadoAlum').load("formularios/listadoAlumnos.html",function(){$("#form_listarAlummnos").show("normal");});
            $.get({url: 'php/obtenerGrupos.php', success: tratarRespuestaGrupos});
        }
    }
    function mostrarFormListadoProfesores(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_listarProfesores').size() == 0 ) {
            $("<div>").appendTo('.listadoProf').load("formularios/listadoProfesores.html",function(){$("#form_listarProfesores").show("normal");});
            $.get({url: 'php/obtenerGrupos.php', success: tratarRespuestaGruposProf});
        }

    }
    function mostrarFormListadoExtra(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_listarExtra').size() == 0 ) {
            $("<div>").appendTo('.listadoExtra').load("formularios/listadoActExtra.html",function(){$("#form_listarExtra").show("normal");
                $( "#fechaInicio" ).datepicker({dateFormat: "yy-mm-dd"});
                $( "#fechaFin" ).datepicker({dateFormat: "yy-mm-dd"});});
        }
        $("#form_listarExtra").show("normal");
        $('#btnMListarExtra').click(mostrarActExtra);
        $('#btnCancelarListarExtra').click(cancelar);
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


function listadoAlumnos(edad,grupo,oXml){
    var listado="<div id='listarAlum'><table class='table table-hover'><caption>Listado de Alumnos</caption><thead><tr><th>Nombre</th>";
    listado+="<th>Apellidos</th><th>Dni</th><th>Edad</th><th>Teléfono</th><th>Dirección</th><th>Grupo</th></tr><tbody>";
    var alumnos=$(oXml).find('alumno');
    for(var i=0;i<alumnos.length;i++) {
        listado+="<tr>";
            if(($(alumnos[i]).find("edad").text() == edad || edad=="") && ($(alumnos[i]).find("grupo").text()==grupo || grupo=="" )) {
                listado+="<td>"+$(alumnos[i]).find("nombre").text()+"</td>";
                listado+="<td>"+$(alumnos[i]).find("apellidos").text()+"</td>";
                listado+="<td>"+$(alumnos[i]).attr("dni")+"</td>";
                listado+="<td>"+$(alumnos[i]).find("edad").text()+"</td>";
                listado+="<td>"+$(alumnos[i]).find("contacto").text()+"</td>";
                listado+="<td>"+$(alumnos[i]).find("direccion").text()+"</td>";
                listado+="<td>"+$(alumnos[i]).find("grupo").text()+"</td>";
            }
        listado+="</tr>";
    }
    listado+="</tbody></table></div>";
    $('.listadoAlum').append(listado);
    crearDialogo('listarAlum','Listado Alumnos');
}
    function listadoProfesores(grupo,ordenarNombre,ordenarApellidos,oXml){
        var listado="<div id='listarProf'><table class='table table-hover'><caption>Listado de Profesores</caption><thead><tr><th>Nombre</th>";
        listado+="<th>Apellidos</th><th>Dni</th><th>Teléfono</th><th>Grupo</th></tr><tbody>";
        var profesores=$(oXml).find('profesor');
        for(var i=0;i<profesores.length;i++) {
            listado+="<tr>";
            if($(profesores[i]).find("grupo").text()==grupo || grupo=="") {
                listado += "<td>" + $(profesores[i]).find("nombre").text() + "</td>";
                listado += "<td>" + $(profesores[i]).find("apellidos").text() + "</td>";
                listado += "<td>" + $(profesores[i]).attr("dni") + "</td>";
                listado += "<td>" + $(profesores[i]).find("telefono").text() + "</td>";
                listado += "<td>" + $(profesores[i]).find("grupo").text() + "</td>";
            }
            listado+="</tr>";
        }
        listado+="</tbody></table></div>";
        $('.listadoProf').append(listado);
        crearDialogo('listarProf','Listado Profesores');
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
        $('#btnCancelarListarAlum').click(cancelar);
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

    function crearDialogo(id,titulo){
        $( "#"+id ).dialog({
            autoOpen: true,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                }
            },title:titulo,
            width:800
        });

    }
    function tratarRespuestaGruposProf(datos){
        var select=$('#sel_lista_profesores_grupo');
        var grupos=$(datos).find('grupo');
        for(var i=0;i<grupos.size();i++) {
            var opt=document.createElement('option');
            opt.id=$(grupos[i]).attr("id");
            opt.appendChild( document.createTextNode($(grupos[i]).attr("id")));
            select.append(opt);

        }
        $('#btnMListarProf').click(mostrarProfesores);

    }
    function mostrarProfesores(){
        var ordenarNombre = $('#nombre').prop('checked');
        var ordenarApellidos=$('#apellidos').prop('checked');
        oAjaxListarProfesores=new XMLHttpRequest();
        if(ordenarNombre==true)
             oAjaxListarProfesores.open('GET','php/obtenerProfesores?order=nombre.php');
        else if(ordenarApellidos==true)
            oAjaxListarProfesores.open('GET','php/obtenerProfesores?order=apellidos.php');
        else
            oAjaxListarProfesores.open('GET','php/obtenerProfesores.php');
        oAjaxListarProfesores.addEventListener('readystatechange',tratarRespuestaListaProfesores);
        oAjaxListarProfesores.send();
    }
    function tratarRespuestaListaProfesores(){
        if(this.readyState == 4 && this.status ==200)	{
            var ordenarNombre = $('#nombre').prop('checked');
            var ordenarApellidos=$('#apellidos').prop('checked');
            var grupo = $('#sel_lista_profesores_grupo').val();
            var oXml=this.responseXML;
            listadoProfesores(grupo,ordenarNombre,ordenarApellidos,oXml);
        }
    }
    function mostrarActExtra(){
        oAjaxListarActExtra=new XMLHttpRequest();
        oAjaxListarActExtra.open('POST','php/obtenerExraescolares.php');
        oAjaxListarActExtra.addEventListener('readystatechange',tratarRespuestaListaActExtra);
        oAjaxListarActExtra.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjaxListarActExtra.send();
    }
    function tratarRespuestaListaActExtra(){
        if(this.readyState==4 && this.status==200){
            var resultado=this.responseText();
            crearDialogo('listadoExtra','Listado de Actividades Extraescolares');
        }
    }
    function rellenarSelectGruposAltaProf(datos){
        var select=$('#select_gruposProf');
        var grupos=$(datos).find('grupo');
        for(var i=0;i<grupos.size();i++) {
            var opt=document.createElement('option');
            opt.id=$(grupos[i]).attr("id");
            opt.appendChild( document.createTextNode($(grupos[i]).attr("id")));
            select.append(opt);
        }
    }
    function rellenarSelectAlumnosAct(datos){
        var select=$('#sel_alumno_act_alta');
        var alumnos=$(datos).find('alumno');
        for(var i=0;i<alumnos.size();i++) {
            var opt=document.createElement('option');
            opt.id=$(alumnos[i]).attr("dni");
            opt.appendChild( document.createTextNode($(alumnos[i]).find("nombre").text()+" "+$(alumnos[i]).find("apellidos").text()));
            select.append(opt);
        }


    }