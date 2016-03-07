    window.addEventListener('load',inicio,false);

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
        var bEncontrado=false;
        var oAjax=new XMLHttpRequest();
        oAjax.open("GET","./php/obtenerProfesores.php",false);
        oAjax.send(null);
        if($(oAjax.responseXML).find("profesor[dni='"+sDni+"']").size()>0) {
            bEncontrado = true;
        }
        return bEncontrado;
    }
    function buscarAlumno(sDni){
        var bEncontrado=false;
        var oAjax=new XMLHttpRequest();
        oAjax.open("GET","./php/obtenerAlumnos.php",false);
        oAjax.send(null);
        if($(oAjax.responseXML).find("alumno[dni='"+sDni+"']").size()>0) {
            bEncontrado = true;
        }
        return bEncontrado;
    }

    function buscarActividad(sId){
        var bEncontrado=false;
        var oAjax=new XMLHttpRequest();
        oAjax.open("GET","./php/obtenerExraescolares.php?"+encodeURI("xml=true"),false);
        oAjax.send(null);
        if($(oAjax.responseXML).find("extraescolar[id='"+sId+"']").size()>0) {
            bEncontrado = true;
        }
        return bEncontrado;
    }

    //Metodos borrar
    function borrarProfesor(sDni){
        if(buscarProfesor(sDni))
        {
            var sParametro='datos={"dni":"'+sDni+'"}';
            $.ajax({url:"./php/tramites/bajaProfe.php?"+sParametro,method:"GET"
            });
        }
        else{
            $("<div title='Error'>El profesor con dni '"+sDni+"', no existe</div>").dialog();
        }
    }
    function borrarAlumno(sDni){
        if(buscarAlumno(sDni))
        {
            var sParametro='datos={"dni":"'+sDni+'"}';
            $.ajax({url:"./php/tramites/bajaAlumno.php?"+sParametro,method:"GET",
                dataType:'script'})
        }
        else{
            $("<div title='Error'>El alumno con dni '"+sDni+"', no existe</div>").dialog();
        }
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
        $.get({url:'php/obtenerAlumnos.php',success:rellenarSelectAlumnosExtra});


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
            $("<div>").appendTo('#listadoExtra').load("formularios/listadoActExtra.html", function () {
                $("#form_listarExtra").show("normal");
                $("#fechaInicio").datepicker({dateFormat: "yy-mm-dd"});
                $("#fechaFin").datepicker({dateFormat: "yy-mm-dd"});
                $('#btnMListarExtra').click(mostrarActExtra);
                $('#btnCancelarListarExtra').click(cancelar);
            });
        }
        $("#form_listarExtra").show("normal");
    }

    //Funciones limpiar campos
    function limpiarCampos(){
        var oInputs=$("input[type='text']");
        var oSelects=$("select");
        var oTextArea=$("textarea");
        for(var i=0;i<$(oInputs).size();i++)
            oInputs[i].value="";
        for(var i=0;i<$(oSelects).size();i++){
            var oOptions=$(oSelects[i]).find("option");
            for(var j=0;j<$(oOptions).size();j++)
                $(oSelects[i]).remove(oOptions[j]);
        }
        $(oTextArea).text("");
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
    function listadoProfesores(grupo,oXml){
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
            listadoProfesores(grupo,oXml);
        }
    }
    function mostrarActExtra(){
        var sMensajeError="";
        var fechaIni=$('#fechaInicio').val();
        var fechaFin=$('#fechaFin').val();
        var fFechaIni =  new Date(fechaIni);
        var fFechaFin = new Date(fechaFin);

        if(fFechaFin<fFechaIni){
            sMensajeError='La fecha de Inicio no puede ser mayor a la de fin';
        }
        else  if(fechaIni=="" || fechaFin==""){
            sMensajeError+='Debe rellenar las dos fechas';
        }

        if(sMensajeError=="") {
            oAjaxListarActExtra = new XMLHttpRequest();
            if (fechaIni == "" && fechaFin == "")
                oAjaxListarActExtra.open('GET', 'php/obtenerExraescolares.php');
            else
                oAjaxListarActExtra.open('GET', 'php/obtenerExraescolares.php?fechaInicio='+fechaIni+'&fechaFin='+fechaFin);
            oAjaxListarActExtra.addEventListener('readystatechange', tratarRespuestaListaActExtra);
            oAjaxListarActExtra.send();
        }
        else{
            $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog({
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
                },modal:true,
                width:800
            });

        }
    }
    function tratarRespuestaListaActExtra(){
        if(this.readyState==4 && this.status==200){
           $(this.responseText).dialog({
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
               },
               width:800
           });
        }
    }
    function rellenarSelectGruposAltaProf(datos){
        $('select option').remove();
        var select=$('#select_gruposProf');
        var grupos=$(datos).find('grupo');
        for(var i=0;i<grupos.size();i++) {
            $("<option value='"+$(grupos[i]).attr("id")+"'>"+$(grupos[i]).attr("id")+"</option>").appendTo(select);
        }
    }
    function rellenarSelectAlumnosAct(datos){
        $('select option').remove();
        var select=$('#sel_alumno_act_alta');
        var alumnos=$(datos).find('alumno');
        for(var i=0;i<alumnos.size();i++) {
            $("<option value='"+$(alumnos[i]).attr("dni")+"'>"+$(alumnos[i]).find("nombre").text()+" "
                +$(alumnos[i]).find("apellidos").text()+"</option>").appendTo(select);
        }
    }

    function rellenarSelectAlumnosMod(datos){
        $('select option').remove();
        var select=$('#sel_alumno_alumnos_mod');
        var alumnos=$(datos).find('alumno');
        for(var i=0;i<alumnos.size();i++) {
            $("<option value='"+$(alumnos[i]).attr("dni")+"'>"+
                $(alumnos).find("nombre")+" "+$(alumnos[i]).find("apellidos")+
                "</option>").appendTo(select);
        }
    }
    function rellenarSelectAlumnosExtra(datos){
        $('#sel_alumnos_expediente_mod option').remove();
        var select=$('#sel_alumnos_expediente_mod');
        var alumnos=$(datos).find('alumno');
        for(var i=0;i<alumnos.size();i++) {
            $("<option value='"+$(alumnos[i]).attr("dni")+"'>"+
                $(alumnos[i]).find("nombre").text()+" "+$(alumnos[i]).find("apellidos").text()+
                "</option>").appendTo(select);
        }


    }