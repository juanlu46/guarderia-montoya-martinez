    window.addEventListener('load',inicio,false);
    var oXML;
    //holaa
    function inicio() {
        document.getElementById("alumnos").addEventListener("click",mostrarFormsAlumnos,false);
        document.getElementById("profesores").addEventListener("click",mostrarFormsProf,false);
        document.getElementById("actividades").addEventListener("click",mostrarFormsAct,false);
        document.getElementById("comedor").addEventListener("click",mostrarFormsComed,false);
        oXML=loadXMLDoc("../xml/datosGuarderia.xml");
        switch(getGet()){
            case "alumno":
                mostrarFormsAlumnos();
                break;
            case "profesor":
                mostrarFormsProf();
                break;
            case "actividades":
                mostrarFormsAct();
                break;
            default:
                mostrarFormsComed();
                break;
        }
    }

    /* METODOS TRATAMEINTO XML */
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
            if(sDniAlum.nodeValue==sDni){
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

    function buscarBono(sDni){
        var oBono=null;
        var bEncontrado=false;
        var oBonos=oXML.querySelectorAll("bono");
        for(var i=0;i<oBonos.length && !bEncontrado;i++){
            var sAlumno=oBonos[i].getAttribute("id");
            if(sAlumno==sDni){
                oBono =  oBonos[i];
                bEncontrado=true;
            }
        }
        return oBono;
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

    function añadirBono(oBono){
        var sRes="Alta de bono comedor satisfactoria";
        if(buscarBono(oBono.getAttribute("id"))==null) {
            var oBonos = oXML.querySelector("bonos");
            oBonos.appendChild(oBono);
        }
        else
        {
            sRes="Bono comedor ya registrado";
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
                var oProfesorAsig=oAsignaturas[i].querySelector("profesor");
                if(oProfesorAsig.nodeValue==sDni) { //Si el valor de la etiqueta es igual al dni que pasamos por parametro
                    //Modificamos el valor, dicienod que no hay ninguno asignado
                    oProfesorAsig.nodeValue = "No asignado";
                    //Guardamos el id de la asignatura, para notificar que no tiene profesor asignado
                    oAsigAfectada=oAsignaturas.querySelector("id").nodeValue;
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
            var oActividades=XML.querySelectorAll("actividad");
            var bActividadEncontrada=false;
            for(var i=0;i<oActividades.length && !bActividadEncontrada;i++) {
                var oAlumnos=oActividades[i].querySelectorAll("alumnoAct");
                for(var j=0;j<oAlumnos.length;j++) {
                    if (oAlumnos.getAttribute("dni") == sDni) {
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

    //Metodos de modificar
    function modificarXMLProfesor(oProfesor)
    {
        var oProfAnterior = buscarProfesor(oProfesor.querySelector("dni").nodeValue);
        oXML.replaceChild(oProfesor,oProfAnterior);
    }


    function mostrarFormsAlumnos(){
        ocultar("menuProf");
        ocultar("menuAct");
        ocultar("menuComed");
        $("form").hide("normal");
        document.getElementById("menuAlum").classList.remove("oculto");
        document.getElementById("mostrarFormAltaAlum").addEventListener("click",mostrarFormAltaAlum,false);
        document.getElementById("mostrarFormModAlum").addEventListener("click",mostrarFormModAlum,false);
        document.getElementById("mostrarFormBajAlum").addEventListener("click",mostrarFormBajAlum,false);
    }

    function mostrarFormsProf(){
        ocultar("menuAlum");
        ocultar("menuAct");
        ocultar("menuComed");
        $("form").hide("normal");
        document.getElementById("menuProf").classList.remove("oculto");
        document.getElementById("mostrarFormAltaProf").addEventListener("click", mostrarFormAltaProf, false);
        document.getElementById("mostrarFormModProf").addEventListener("click", mostrarFormModProf, false);
        document.getElementById("mostrarFormBajProf").addEventListener("click", mostrarFormBajProf, false);
    }
    function mostrarFormsAct(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuComed");
        $("form").hide("normal");
        document.getElementById("menuAct").classList.remove("oculto");
        document.getElementById("mostrarFormAltaAct").addEventListener("click", mostrarFormAltaAct, false);
        document.getElementById("mostrarFormModAct").addEventListener("click", mostrarFormModAct, false);
        document.getElementById("mostrarFormBajAct").addEventListener("click", mostrarFormBajAct, false);
    }
    function mostrarFormsComed(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuAct");
        $("form").hide("normal");
        document.getElementById("menuComed").classList.remove("oculto");
        document.getElementById("mostrarFormAltaComed").addEventListener("click", mostrarFormAltaComed, false);
        document.getElementById("mostrarFormModComed").addEventListener("click", mostrarFormModComed, false);
        document.getElementById("mostrarFormBajComed").addEventListener("click", mostrarFormBajComed, false);
    }
    function ocultar(elemento){
    document.getElementById(elemento).classList.add("oculto");
}


    function validarFormAltaAlum(){
        var sMensajeError="";
        var todoOk=true;
        var oAlumno=null;

       if(!/^[a-z\d_]{2,15}$/.test(form_altaAlum.text_nombre.value)){
           sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
           todoOk=false;
       }
        if(!/^[a-z\d_]{4,15}$/.test(form_altaAlum.text_apellido.value)){
            sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_altaAlum.text_dni.value)){
            sMensajeError+="Dni incorrecto\n";
            todoOk=false;
        }
        if(form_altaAlum.text_edad.value<1 || form_altaAlum.text_edad.value>=99 ){
            sMensajeError+="Edad incorrecto\n";
            todoOk=false;
        }
        if(!/^[9|6|7][0-9]{8}$/.test(form_altaAlum.text_tlfn.value)){
            sMensajeError+="Teléfono incorrecto\n";
            todoOk=false;
        }
        if(form_altaAlum.text_direccion.value==""){
            sMensajeError+="Dirección incorrecto\n";
            todoOk=false;
            form_altaAlum.text_nombre.style.borderColor="red";
        }


        if(todoOk==false){
            alert(sMensajeError);
        }
        else {
            oAlumno=newAlumno(form_altaAlum.text_nombre.value,form_altaAlum.text_apellido.value,form_altaAlum.text_dni.value,form_altaAlum.text_edad.value,form_altaAlum.text_tlfn.value,form_altaAlum.text_direccion.value,form_altaAlum.text_grupo.value);
                alert(añadirAlumno(oAlumno));
                form_altaAlum.text_nombre.value="";
                form_altaAlum.text_apellido.value="";
                form_altaAlum.text_dni.value="";
                form_altaAlum.text_edad.value="";
                form_altaAlum.text_tlfn.value="";
                form_altaAlum.text_direccion.value="";
        }
    }

    function validarFormModAlum(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^[a-z\d_]{2,15}$/.test(form_modAlum.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/.test(form_modAlum.text_apellido.value)){
            sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
            todoOk=false;
        }
        if(form_modAlum.text_edad.value<1 || form_modAlum.text_edad.value>=99 ){
            sMensajeError+="Edad incorrecto\n";
            todoOk=false;
        }
        if(!/^[9|6|7][0-9]{8}$/.test(form_modAlum.text_tlfn.value)){
            sMensajeError+="Teléfono incorrecto\n";
            todoOk=false;
        }
        if(form_modAlum.text_direccion.value==""){
            sMensajeError+="Dirección incorrecto\n";
            todoOk=false;
        }
        //FALTA VALIDACION DEL CMAPO GRUPO (una sola letra)
        if(todoOk==false){
            alert(sMensajeError);
        }
        else{
            var oAlumnoMod=newAlumno(form_modAlum.txt_nombre.value,form_modAlum.txt_apellido.value,
            form_modAlum.text_dni.value,form_modAlum.txt_edad.value,form_modAlum.txt_tlfn.value,
            form_modAlum.txt_direccion.value,form_modAlum.txt_grupo.value);
            alert(modificarXMLAlumno(oAlumnoMod));
        }
    }

    function validarBajaAlum(){
        var todoOk=true;
        var sMensajeError="";

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_bajaAlum.text_dni.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else
            alert(borrarAlumno(form_bajaAlum.txt_dni.value));
    }


    function validarFormProf(){
        var sMensajeError="";
        var todoOk=true;
        var profesorActual=null;

        if(!/^[a-z\d_]{2,15}$/.test(form_altaProf.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/.test(form_altaProf.text_apellido.value)){
            sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_altaProf.text_dni.value)){
            sMensajeError+="Dni incorrecto\n";
            todoOk=false;
        }

        if(!/^[9|6|7][0-9]{8}$/.test(form_altaProf.text_tlfn.value)){
            sMensajeError+="Teléfono incorrecto\n";
            todoOk=false;
        }

        if(todoOk==false){
            alert(sMensajeError);
        }
        else{
            oProfesor=newProfesor(form_altaProf.text_nombre.value,form_altaProf.text_apellido.value,
                form_altaProf.text_dni.value,form_altaProf.text_tlfn.value,getGruposFormProf("alta"));
            alert(guarderia.altaProfesor(profesorActual));
            form_altaProf.text_nombre.value="";
            form_altaProf.text_apellido.value="";
            form_altaProf.text_dni.value="";
            form_altaProf.text_tlfn.value="";
        }
}

    function validarFormModProf(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^[a-z\d_]{2,15}$/.test(form_modProf.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/.test(form_modProf.text_apellido.value)){
            sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_modProf.text_dni.value)){
            sMensajeError+="Dni incorrecto\n";
            todoOk=false;
        }

        if(!/^[9|6|7][0-9]{8}$/.test(form_modProf.text_tlfn.value)){
            sMensajeError+="Teléfono incorrecto\n";
            todoOk=false;
        }

        if(todoOk==false){
            alert(sMensajeError);
        }
    //FALTA MODIFICAR PROFESOR
    }

    function validarFormBajaProf(){
        var todoOk=true;
        var sMensajeError="";
    if(!/^((\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_bajaProf.text_dni.value)){
        sMensajeError="Dni incorrecto\n";
        todoOk=false;
    }
    if(todoOk==false)
        alert(sMensajeError);
    else
        alert(borrarProfesor(form_bajaProf.text_dni.value));
}


    function validarAltaAct(){
        var sMensajeError="";
        var todoOk=true;
        var actividadActual=null;

        if(isNaN(form_altaAct.text_id.value) || form_altaAct.text_id.value==""){
            sMensajeError+="ID incorrecto\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{2,15}$/.test(form_altaAct.text_nombre.value)){
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
            form_altaAct.text_id.value="";
            form_altaAct.text_nombre.value="";
        }


    }

    function validarModAct(){
        var sMensajeError="";
        var todoOk=true;
        var actividadActual=null;

        if(isNaN(form_modAct.text_id.value) || form_modAct.text_id.value==""){
            sMensajeError+="ID incorrecto\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{2,15}$/.test(form_modAct.text_nombre.value)){
            sMensajeError+="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }

        if(todoOk==false){
            alert(sMensajeError);
        }
        else {
            actividadActual=newActividadExtra(form_modAct.text_id.value,form_modAct.text_nombre.value,
            getAlumnosFormAct("modificar"));
            alert(modificarXMLActividadExtra(actividadActual));
        }
}

    function validarBajaAct(){
        var sMensajeError="";
        var todoOk=true;

        if (isNaN(form_bajaAct.text_id.value) || form_bajaAct.text_id.value==""){
            sMensajeError+="ID incorrecto\n";
            todoOk=false;
        }
    if(todoOk==false)
        alert(sMensajeError);
    else {
            alert(borrarActividadExtra());
            form_bajaAct.text_id.value="";
        }
}

    function validarAltaBono(){
        var sMensajeError="";
        var todoOk=true;
        var oBonoActual=null;

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_altaBono.text_alumno.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(form_altaBono.text_horario.value==""){
            sMensajeError+="Introduzca el horario\n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else {
            var oAlumno=buscarAlumno(form_altaBono.text_alumno.value);
            if(oAlumno!=null) {
                oBonoActual = newBonoComedor(oAlumno, form_altaBono.text_horario.value,
                getAlumnosFormBono("alta"));
                alert(añadirBono(oBonoActual));
                form_altaBono.text_alumno.value = "";
                form_altaBono.txt_horario.value = "";
                form_altaBono.text_alimentos.value = "";
            }
            else
                alert("Este alumno no existe");
        }
    }

    function validarModBono(){
        var sMensajeError="";
        var todoOk=true;
        var oBonoActual=null;

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_modBono.text_alumno.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(form_modBono.text_horario.value==""){
            sMensajeError+="Introduzca el horario\n";
            todoOk=false;
        }
        /* LO DEJAMOS SIN VALIDAR PARA QUE PUEDA DEJARLO EN BLANCO SI NO TIENE?*/
        if(form_modBono.text_alimentos.value==""){
            sMensajeError+="Introduzca los alimentos a los que es alérgico. Si no tiene alergías introduzca ninguno \n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else {
            var oAlumno=buscarAlumno(form_modBono.text_alumno.value);
            if(oAlumno!=null) {
               oBonoActual=newBonoComedor(form_modBono.text_alumno.value,form_modBono.txt_horario.value,
               getAlumnosFormBono("modificar"));
                alert(modificarXMLBono(oBonoActual));
                form_altaBono.text_alumno.value = "";
                form_altaBono.txt_horario.value = "";
                form_altaBono.text_alimentos.value = "";
            }
            else
                alert("Este alumno no existe");
        }
    }

    function validarBajaBono(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_bajaBono.text_alumno.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else {
            alert(borrarBonoComedor(form_bajaBono.text_alumno.value));
            form_bajaAct.text_alumno.value="";
        }
    }
    // Metodos de mostrar formularios
    function mostrarFormAltaProf(){
        $("form").hide("normal");
        $("#form_altaProf").show("normal");
        document.getElementById("btnAltaProf").addEventListener("click", validarFormProf, false);
    }
    function mostrarFormModProf(){
        $("form").hide("normal");
        $("#form_modProf").show("normal");
        document.getElementById("btnModProf").addEventListener("click",validarFormModProf,false);
    }
    function mostrarFormBajProf(){
        $("form").hide("normal");
        $("#form_bajaProf").show("normal");
        document.getElementById("btnBajaProf").addEventListener("click",validarFormBajaProf,false);
    }

    function mostrarFormAltaAlum(){
        $("form").hide("normal");
        $("#form_altaAlum").show("normal");
        document.getElementById("btnAltaAlum").addEventListener("click",validarFormAltaAlum,false);
    }
    function mostrarFormModAlum(){
        $("form").hide("normal");
        $("#form_modAlum").show("normal");
        document.getElementById("btnModAlum").addEventListener("click",validarFormModAlum,false);
    }
    function mostrarFormBajAlum(){
        $("form").hide("normal");
        $("#form_bajaAlum").show("normal");
    document.getElementById("btnBajaAlum").addEventListener("click",validarBajaAlum,false);
}

    function mostrarFormAltaAct(){
        $("form").hide("normal");
        $("#form_altaAct").show("normal");
        document.getElementById("btnAltaAct").addEventListener("click",validarAltaAct,false);
        cargarSelectAlumnos();
    }
    //Funciones recogida de select
    function getGruposFormProf(sForm){
        var oForm;
        switch(sForm){
            case "alta":
                oForm=document.getElementById("form_altaProf");
                break;
            default:
                oForm=document.getElementById("form_modProf");
        }
        return oForm.querySelectorAll("option");
    }
    function getAlumnosFormAct(sForm){
        var oForm;
        switch(sForm){
            case "alta":
                oForm=document.getElementById("form_altaAct");
                break;
            default:
                oForm=document.getElementById("form_modAct");
        }
        var oSelect=oForm.getElementById("select_alumnos_act"); //Select Alumnos Seleccionado
        return oSelect.querySelectorAll("option");
    }
    function getAlumnosFormBono(sForm){
        var oForm;
        switch(sForm){
            case "alta":
                oForm=document.getElementById("form_altaBono");
                break;
            default:
                oForm=document.getElementById("form_modBono");
        }
        var oSelect=oForm.getElementById("select_alumnos_bono");
        return oSelect.querySelectorAll("option");
    }
    function cargarSelectAlumnos(){
        var lugar=document.getElementById("select_alumnos");
        var select=document.createElement("select");
        var oAlumnos=XML.querySelectorAll("alumnos");
        for(var i=0;i<oAlumnos.length;i++){
            var opt=document.createElement("option");
            opt.value=oAlumnos.dni;
            var texto=document.createTextNode(oAlumnos.nombre);
            opt.appendChild(texto);
            select.appendChild(opt);
        }
        lugar.appendChild(opt);

    }
    function mostrarFormModAct(){
        $("form").hide("normal");
        $("#form_modAct").show("normal");
        document.getElementById("btnModAct").addEventListener("click",validarModAct,false);
        cargarSelectAlumnos();
    }
    function mostrarFormBajAct(){
        $("form").hide("normal");
        $("#form_bajaAct").show("normal");
        document.getElementById("btnBajaAct").addEventListener("click",validarBajaAct,false);
    }

    function mostrarFormAltaComed(){
        $("form").hide("normal");
        $("#form_altaBono").show("normal");
        document.getElementById("btnAltaBono").addEventListener("click",validarAltaBono,false);
    }
    function mostrarFormModComed(){
        $("form").hide("normal");
        $("#form_modBono").show("normal");
        document.getElementById("btnModBono").addEventListener("click",validarModBono,false);
    }
    function mostrarFormBajComed(){
        $("form").hide("normal");
        $("#form_bajaBono").show("normal");
        document.getElementById("btnBajaBono").addEventListener("click",validarBajaBono,false);
    }

    /* METODOS AUXILIARES*/
    //Constructor de objeto XML, alumno
    function newAlumno(sNombre,sApellidos,sDni,iEdad,iContacto,sDireccion,sGrupo){
        var oTags=["nombre","apellidos","edad","contacto","direccion","grupo"];
        var oNodos=[];
        var oAlumno=document.createElement("alumno");
        for(var i=0;i<oTags.length;i++)
            oNodos.push(document.createElement(oTags[i]));
        var oTagsValues=[sNombre,sApellidos,sDni,iEdad,iContacto,sDireccion,sGrupo];
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
        var oTagsValues=[sNombre,sApellidos,sDni,iTelefono];
        for(var i=0;i<oTagsValues.length;i++) {
            addContenido(oNodos[i], oTagsValues[i]);
            oProfesor.appendChild(oNodos[i]);
        }
        oProfesor.appendChild(document.createElement("grupos"));
        for(var i=0;i<oGrupos.length;i++) {
            var sGrupo=oGrupos.value;
            var oGrupoAux=document.createElement("grupo");
            addContenido(oGrupoAux,sGrupo);
            oProfesor.querySelector("grupos").appendChild(oGrupoAux);
        }
        oProfesor.setAttribute("dni",sDni);
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
    //Constructor de objeto XML Bono comedor
    function newBonoComedor(sDni,sHorario,oAlimentosAlergico){
        var oBonoComedor=document.createElement("bono");
        oBonoComedor.setAttribute("id",sDni);
        var oHorario=document.createElement("horario");
        addContenido(oHorario,sHorario);
        oBonoComedor.appendChild(oHorario);
        oBonoComedor.appendChild(document.createElement("alimentosAlergico"));
        for(var i=0;i<oAlimentosAlergico.length;i++){
            var oAlimento=document.createElement("alimentoAlergico");
            addContenido(oAlimento,oAlimentosAlergico[i].value);
            oBonoComedor.querySelector("alimentosAlergico").appendChild(oAlimento);
        }
        return oBonoComedor;
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

