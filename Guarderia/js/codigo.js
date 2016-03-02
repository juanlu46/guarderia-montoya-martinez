    window.addEventListener('load',inicio,false);
    var oXML;
    function inicio() {
        document.getElementById("btnAlumnos").addEventListener("click",mostrarMenuAlumnos,false);
        document.getElementById("btnProfesores").addEventListener("click",mostrarMenuProf,false);
        document.getElementById("btnActividades").addEventListener("click",mostrarFormAltaAct,false);
        $('#btnNotas').click(mostrarFormAltaNotas);
        //eventos para los listados
       // document.getElementById("btnListarAlum").addEventListener("click",listadoAlumnos,false);
       // document.getElementById("btnListarProf").addEventListener("click",listadoProfesores,false);
        oXML=loadXMLDoc("xml/datosGuarderia.xml");

        switch(getGet()){
            case "alumno":
                mostrarMenuAlumnos();
                break;
            case "profesor":
                mostrarMenuProf();
                break;
            case "actividades":
                mostrarFormAltaAct();
                break;
            case 'listadoAlumnos':
                listadoAlumnos();
                break;
            case 'listadoProfesores':
                listadoProfesores();
                break;

        }
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

    //Metodos de modificar
    function modificarXMLProfesor(oProfesor)
    {
        var oProfAnterior = buscarProfesor(oProfesor.getAttribute("dni"));
        oXML.querySelector("profesores").replaceChild(oProfesor,oProfAnterior);
    }
    function modificarXMLAlumno(oAlumno)
    {
        var oAlumnoAnterior = buscarAlumno(oAlumno.getAttribute("dni"));
        oXML.querySelector("alumnos").replaceChild(oAlumno,oAlumnoAnterior);
    }

    function modificarXMLActividad(oActividad)
    {
        var oActividadAnterior = buscarActividad(oActividad.getAttribute("id"));
        oXML.querySelector("actividades").replaceChild(oActividad,oActividadAnterior);
    }

    function modificarXMLExpediente(oExpediente)
    {
        var oExpedienteAnterior = buscarExpediente(oExpediente.getAttribute("id"));
        oXML.querySelector("expedientes").replaceChild(oExpediente,oExpedienteAnterior);
    }

    function validarAltaAct(){
        var sMensajeError="";
        var todoOk=true;
        var actividadActual=null;

        if(isNaN(form_altaAct.text_id.value) || form_altaAct.text_id.value==""){
            sMensajeError+="ID incorrecto\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{2,15}$/i.test(form_altaAct.text_nombre.value)){
            sMensajeError+="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }

        if(todoOk==false){
            alert(sMensajeError);
        }
        else{
            actividadActual=newActividadExtra(form_altaAct.text_id.value,form_altaAct.text_nombre.value,
            getAlumnosFormAct("alta"));
            alert(añadirActividad(actividadActual));
            limpiarCampos();
        }


    }




    function validarFormAltaExp(){
        var sMensajeError="";
        var todoOk=true;
        var oExpedienteActual=null;

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_altaExp.text_AlumnoExp.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(form_altaExp.text_observaciones.value==""){
            sMensajeError+="Introduzca alguna observación\n";
            todoOk=false;
        }
        if(!/^\d{1,2}(\.\d{1,2})?$/.test(form_altaExp.text_nota.value)){
            sMensajeError+="Nota incorrecta\n";
            todoOk=false;
        }

        if(todoOk==false)
            alert(sMensajeError);
        else {
            var oAlumno=buscarAlumno(form_altaExp.text_AlumnoExp.value);
            if(oAlumno!=null) {
                var oNotas=[];
                for(var i=0;i<form_altaExp.select_expediente.options.length;i++)
                    oNotas.push(form_altaExp.select_expediente.options[i].value);
                oExpedienteActual = newExpediente(form_altaExp.text_AlumnoExp.value,oNotas,form_altaExp.text_observaciones.value);
                alert(añadirExpediente(oExpedienteActual));
               limpiarCampos();
            }
            else {
                alert("Este alumno no existe");
                limpiarCampos();
            }
        }
    }

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

    function validarFormModExp(){

        var sMensajeError="";
        var todoOk=true;
        var oExpedienteActual=null;

        if(form_modExp.text_observaciones.value==""){
            sMensajeError+="Introduzca alguna observación\n";
            todoOk=false;
        }
        if(!/^\d{1,2}(\.\d{1,2})?$/.test(form_modExp.text_nota.value)){
            sMensajeError+="Nota incorrecta\n";
            todoOk=false;
        }


        if(todoOk==false)
            alert(sMensajeError);
        else {
            var oAlumno=buscarAlumno(form_modExp.text_AlumnoExp.value);
            if(oAlumno!=null) {


                oExpedienteActual = newExpediente(form_modExp.text_AlumnoExp.value,form_modExp.text_nota.value,form_modExp.text_observaciones.value);
                alert(modificarXMLExpediente(oExpedienteActual));
                limpiarCampos();
            }
            else
                alert("Este alumno no existe");
        }
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


    // Metodos añadir select multiple

    function añadirNotaMod(){
        if(form_modExp.text_nota.value==""){
            alert("No puede dejar la nota vacia");
        }
        else if(!(/([0-9]{1,2})|([0-9]{1,2}\.[0-9]{1,2})/.test(form_modExp.text_nota.value))){
            alert("La nota debe de tener 2 enteros y 2 decimales como mucho, separados por un punto");
        }
        else{
            var opt=document.createElement("option");
            addContenido(opt,
                "ID: "+form_modExp.sel_asig_exp_mod.options[form_modExp.sel_asig_exp_mod.selectedIndex].value+
                " - Nota: "+form_modExp.text_nota.value);
            opt.value=form_modExp.sel_asig_exp_mod.options[form_modExp.sel_asig_exp_mod.selectedIndex].value+
                "-"+form_modExp.text_nota.value;
            form_modExp.select_expediente.appendChild(opt);
        }
    }

    // Metodos de mostrar formularios
    function mostrarFormAltaProf(){
        $("form").hide("normal");
        if($('#form_altaProf').size() == 0 )
            $("<div>").appendTo('.form_altaProf').load("formularios/profesor/formAltaProf.html", function(){ $.getScript("js/profesor/altaProfe.js");});
        else
            $("#form_altaProf").show("normal");
        $("#btnCancelarAltaProf").on('click',cancelar);
    }
    function mostrarFormModProf(){
        $("form").hide("normal");
        if($('#form_modProf').size() == 0 )
            $("<div>").appendTo('.form_modProf').load("formularios/profesor/formModProf.html", function(){ $.getScript("js/profesor/modProfe.js");});
        else
            $("#form_modProf").show("normal");
        $('#sel_profesor_profesores_mod').selectedIndex="0";
        $('#sel_profesor_profesores_mod').change(mostrarRestoFormModProf);
    }
    function mostrarRestoFormModProf(){
        $('#restoFormProf').css('display','block');
        $('#btnModProf').click(validarFormModProf);
        $('#btnCancelarModProf').click(cancelar);
    }
    function mostrarFormBajProf(){
        $("form").hide("normal");
        if($('#form_bajaProf').size() == 0 )
            $("<div>").appendTo('.form_bajaProf').load("formularios/profesor/formBajaProf.html", function(){ $.getScript("js/profesor/bajaProfe.js");});
        else
            $("#form_bajaProf").show("normal");
        $('#btnBajaProf').click(validarFormBajaProf);
        $('#btnCancelarBajaProf').click(cancelar);
    }

    function mostrarFormAltaAlum(){
        $("form").hide("normal");
        if($('#form_altaAlum').size() == 0 ){
            $("<div>").appendTo('.form_altaAlum').load("formularios/alumno/formAltaAlum.html", function(){ $.getScript("js/alumno/altaAlumno.js");});
        }
        else{
            $("#form_altaAlum").show("normal");
        }
        $('#btnAltaAlum').click(validarFormAltaAlum);
        $('#btnCancelarAltaAlum').click(cancelar);
    }
    function mostrarFormModAlum(){
        $("form").hide("normal");
        if($('#form_modAlum').size() == 0 )
            $("<div>").appendTo('.form_modAlum').load("formularios/alumno/formModAlum.html", function(){ $.getScript("js/alumno/modAlumno.js");});
        else
            $("#form_modAlum").show("normal");
        $('#sel_alumno_alumnos_mod').selectedIndex='0';
        $('#sel_alumno_alumnos_mod').change(mostrarRestoFormModAlum);
    }
    function mostrarRestoFormModAlum(){
        $('#restoFormularioModAlum').css('display','block');
        $('#btnModAlum').click(validarFormModAlum);
        $('#btnCancelarModAlum').click(cancelar);
    }
    function mostrarFormBajAlum(){
        $("form").hide("normal");
        if($('#form_bajaAlum').size() == 0 )
            $("<div>").appendTo('.form_bajaAlum').load("formularios/alumno/formBajaAlum.html", function(){ $.getScript("js/alumno/bajaAlumno.js");});
        else
            $("#form_bajaAlum").show("normal");

        $('#btnBajaAlum').click(validarBajaAlum);
        $('#btnCancelarBajaAlum').click(cancelar);
}

    function mostrarFormAltaAct(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_altaAct').size() == 0 )
            $("<div>").appendTo('.form_altaAct').load("formularios/formAltaAct.html", function(){ $.getScript("js/altaExtra.js");});
        else
            $("#form_altaAct").show("normal");
        $('#btnAltaAct').click(validarAltaAct);
        $('#btnCancelarAltaAct').click(cancelar);
    }
    function mostrarFormAltaNotas(){
        ocultar("menuProf");
        ocultar("menuAlum");
        $("form").hide("normal");
        if($('#form_modExp').size() == 0 )
            $("<div>").appendTo('.formModExp').load("formularios/formAltaNota.html", function(){ $.getScript("js/altaNotas.js");});
        else
            $("#form_modExp").show("normal");
        $('#sel_alumnos_expediente_mod').change(mostrarRestoFormAltaNotas);
    }
    function mostrarRestoFormAltaNotas(){
        $('#restoFormExp').removeClass('oculto');
        $('#btnModExp').click(validarAltaNota);
        $('#btnCancelarModExp').click(cancelar);
    }
    function mostrarFormModExp(){
        $("form").hide("normal");
        $("#form_modExp").show("normal");
        document.getElementById("sel_alumnos_expediente_mod").addEventListener("change",mostrarRestoFormModExp,false);
        cargarSelectAsignatura("sel_asig_exp_mod");
        if(document.getElementById("sel_alumnos_expediente_mod").length==0){
            var opt=document.createElement("option");
            opt.value="";
            addContenido(opt,"Seleccione un expediente");
            document.getElementById("sel_alumnos_expediente_mod").appendChild(opt);
        }
        if(document.getElementById("sel_alumnos_expediente_mod").length==1)
        cargarSelectExpediente("sel_alumnos_expediente_mod");
        document.getElementById("restoFormExp").classList.add("oculto");
    }
    function mostrarRestoFormModExp(){
        rellenaCamposExpediente(this.options[this.selectedIndex].value);
        document.getElementById("restoFormExp").classList.remove("oculto");
        document.getElementById("btnModExp").addEventListener("click",validarFormModExp,false);
        document.getElementById("btnCancelarModExp").addEventListener("click", cancelar, false);
        document.getElementById("añadirNota_mod").addEventListener("click", añadirNotaMod, false);
        document.getElementById("btnEliminarNota_mod").addEventListener("click", eliminarNotaMod, false);
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

    //  Metodos rellena Select
    function cargarSelectAlumnos(sIDSelect){
        var lugar=document.getElementById(sIDSelect);
        var oAlumnos=oXML.querySelectorAll("alumno");
        for(var i=0;i<oAlumnos.length;i++){
            var opt=document.createElement("option");
            opt.value=oAlumnos[i].getAttribute("dni");
            addContenido(opt,oAlumnos[i].getAttribute("dni"));
            lugar.appendChild(opt);
        }
    }

    function cargarSelectExpediente(sIDSelect){
        var lugar=document.getElementById(sIDSelect);
        var oExpedientes=oXML.querySelectorAll("expediente");
        for(var i=0;i<oExpedientes.length;i++){
            var opt=document.createElement("option");
            opt.value=oExpedientes[i].getAttribute("id");
            addContenido(opt,oExpedientes[i].getAttribute("id"));
            lugar.appendChild(opt);
        }
    }

    function rellenaCamposExpediente(sDni){
        var oExpediente=buscarExpediente(sDni);
        form_modExp.text_AlumnoExp.value=sDni;
        form_modExp.text_observaciones.value=oExpediente.querySelector("observaciones").textContent;
        var oNotas=oExpediente.querySelectorAll("notaAsig");
        var oSelect=form_modExp.select_expediente;
        for(var i=0;i<oNotas.length;i++){
            var oOption=document.createElement("option");
            var sAsig=oNotas[i].getAttribute("id");
            var sNota=oNotas[i].textContent;
            oOption.value=sAsig+"-"+sNota;
            oOption.textContent="ID: "+sAsig+" - Nota: "+sNota;
            oSelect.appendChild(oOption);
        }
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

    //Constructor de objeto XML, alumno
    function newAlumno(sNombre,sApellidos,sDni,iEdad,iContacto,sDireccion,sGrupo){
        var oTags=["nombre","apellidos","edad","contacto","direccion","grupo"];
        var oNodos=[];
        var oAlumno=document.createElement("alumno");
        for(var i=0;i<oTags.length;i++)
            oNodos.push(document.createElement(oTags[i]));
        var oTagsValues=[sNombre,sApellidos,iEdad,iContacto,sDireccion,sGrupo];
        oAlumno.setAttribute("dni",sDni);

        for(var i=0;i<oTags.length;i++) {
            addContenido(oNodos[i], oTagsValues[i]);
            oAlumno.appendChild(oNodos[i]);
        }
        oAlumno.setAttribute("dni",sDni);
        return oAlumno;
    }
    //Constructor de objeto XML, profesor.
    function newProfesor(sNombre,sApellidos,sDni,iTelefono,oGrupos){
        var oTags=["nombre","apellidos","telefono"];
        var oNodos=[];
        var oProfesor=document.createElement("profesor");
        for(var i=0;i<oTags.length;i++)
            oNodos.push(document.createElement(oTags[i]));
        var oTagsValues=[sNombre,sApellidos,iTelefono];
        oProfesor.setAttribute("dni",sDni);
        for(var i=0;i<oTagsValues.length;i++) {
            addContenido(oNodos[i], oTagsValues[i]);
            oProfesor.appendChild(oNodos[i]);
        }
        oProfesor.appendChild(document.createElement("grupos"));
        for(var i=0;i<oGrupos.length;i++) {
            var sGrupo=oGrupos[i].value;
            var oGrupoAux=document.createElement("grupo");
            oGrupoAux.setAttribute("id",sGrupo);
            addContenido(oGrupoAux,sGrupo);
            oProfesor.querySelector("grupos").appendChild(oGrupoAux);

        }
        return oProfesor;
    }
    //Constructor de objeto XML Actividad Extraescolar
    function newActividadExtra(sId,sNombre,oAlumnos){
        var oActividadExtra=document.createElement("actividad");
        oActividadExtra.setAttribute("id",sId);
        var oNombre=document.createElement("nombre");
        addContenido(oNombre,sNombre);
        oActividadExtra.appendChild(oNombre);
        oActividadExtra.appendChild(document.createElement("alumnosAct"));
        for(var i=0;i<oAlumnos.length;i++){
            var oAlumnoAux=document.createElement("alumnoAct");
            oAlumnoAux.setAttribute("dni",oAlumnos[i].value);
            oActividadExtra.querySelector("alumnosAct").appendChild(oAlumnoAux);
        }
        return oActividadExtra;
    }
    //Constructor de objeto XML Expediente
    function newExpediente(sDni,oNotas,sObservaciones){
        var oExpediente=document.createElement("expediente");
        oExpediente.setAttribute("id",sDni);
        var oObser=document.createElement("observaciones");
        addContenido(oObser,sObservaciones);
        oExpediente.appendChild(oObser);
        oExpediente.appendChild(document.createElement("notas"));
        for(var i=0;i<oNotas.length;i++){
            var oValores=oNotas[i].split("-");
            var oNota=document.createElement("notaAsig");
            oNota.setAttribute("id",oValores[0]);
            addContenido(oNota,oValores[1]);
            oExpediente.querySelector("notas").appendChild(oNota);
        }
        return oExpediente;
    }


    //Metodo para añadir nodos de textos
    function addContenido(oNodo,sTexto){
        var oTexto=document.createTextNode(sTexto);
        oNodo.appendChild(oTexto);
    }

    // Metodo para coger parametros GET para cargar incialmente el formulario correspondiente.
    function getGet(){
        var url = document.location.href;
        var getString = url.split('?')[1];
        var tmp = getString.split('=')[1];
        return unescape(decodeURI(tmp));
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

function listadoAlumnos(){
    var pestana = open("","","");
    pestana.document.title="Listado Alumnos";

    var tabla=document.createElement("table");
    var titulo=document.createElement("caption");
    titulo.appendChild(document.createTextNode("Listado de Alumnos"));
    tabla.appendChild(titulo);
    var cabecera=document.createElement("thead");

    var datosCabecera=new Array(8);
    datosCabecera[0] = "Nombre";
    datosCabecera[1]= "Apellidos";
    datosCabecera[2]= "Dni";
    datosCabecera[3]= "Edad";
    datosCabecera[4]= "Teléfono";
    datosCabecera[5]= "Dirección";
    datosCabecera[6]= "Grupo";
    datosCabecera[7]= "Bono Comedor";


    cabecera.appendChild(crearCabeceraTabla(datosCabecera));
    tabla.appendChild(cabecera);

    var alumnos=oXML.querySelectorAll("alumno");
    var datos=new Array(8);
    var bodyTabla=document.createElement("tbody");
    for(var i=0;i<alumnos.length;i++) {
            datos[0] = alumnos[i].getElementsByTagName("nombre")[0].textContent;
            datos[1]= alumnos[i].getElementsByTagName("apellidos")[0].textContent;
            datos[2]= alumnos[i].getAttribute("dni");
            datos[3]= alumnos[i].getElementsByTagName("edad")[0].textContent;
            datos[4]= alumnos[i].getElementsByTagName("contacto")[0].textContent;
            datos[5]= alumnos[i].getElementsByTagName("direccion")[0].textContent;
            datos[6]= alumnos[i].getElementsByTagName("grupo")[0].textContent;
        if(buscarBono(alumnos[i].getAttribute("dni")) == null)
           datos[7]="No";
        else
            datos[7]="Sí";


        bodyTabla.appendChild(crearFilaTabla(datos));
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