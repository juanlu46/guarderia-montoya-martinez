    window.addEventListener('load',inicio,false);
    var oXML;
    function inicio() {
        document.getElementById("alumnos").addEventListener("click",mostrarFormsAlumnos,false);
        document.getElementById("profesores").addEventListener("click",mostrarFormsProf,false);
        document.getElementById("actividades").addEventListener("click",mostrarFormsAct,false);
        document.getElementById("comedor").addEventListener("click",mostrarFormsComed,false);
        document.getElementById("expediente").addEventListener("click",mostrarFormsExp,false);

        //eventos para los listados
        document.getElementById("listadoAlumnos").addEventListener("click",listadoAlumnos,false);
        oXML=loadXMLDoc("xml/datosGuarderia.xml");
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
            case 'comedor':
                mostrarFormsComed();
                break;
            default:
                mostrarFormsExp();
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

    function añadirExpediente(oExpediente){
        var sRes="Alta de expediente satisfactoria";
        if(buscarExpediente(oExpediente.getAttribute("id"))==null) {
            var oExpedientes = oXML.querySelector("expediente");
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
    function borrarComedor(sDni){
        var sRes="Baja de Bono Comedor satisfactoria";
        var oBono=buscarBono(sDni);
        if(oBono!=null){
            oXML.querySelector("bonos").removeChild(oBono);
        }
        else{
            sRes="El Bono Comedor que intenta borrar no existe con ese Dni";
        }
        return sRes;
    }
    function borrarExpediente(sDni){
        var sRes="Baja de Expediente satisfactoria";
        var oExpediente=buscarExpediente(sDni);
        if(oExpediente!=null){
            oXML.querySelector("expedientes").removeChild(oExpediente);
        }
        else{
            sRes="El Expediente que intenta borrar no existe con ese Dni";
        }
        return sRes;
    }

    //Metodos de modificar
    function modificarXMLProfesor(oProfesor)
    {
        var oProfAnterior = buscarProfesor(oProfesor.querySelector("dni").nodeValue);
        oXML.replaceChild(oProfesor,oProfAnterior);
    }
    function modificarXMLAlumno(oAlumno)
    {
        var oAlumnoAnterior = buscarAlumno(oAlumno.getAttribute("dni"));
        oXML.replaceChild(oAlumno,oAlumnoAnterior);
    }

    function modificarXMLActividad(oActividad)
    {
        var oActividadAnterior = buscarActividad(oActividad.getAttribute("id"));
        oXML.replaceChild(oActividad,oActividadAnterior);
    }

    function modificarXMLComedor(oBono)
    {
        var oComedorAnterior = buscarBono(oBono.getAttribute("id"));
        oXML.replaceChild(oBono,oComedorAnterior);
    }

    function modificarXMLExpediente(oExpediente)
    {
        var oExpedienteAnterior = buscarExpediente(oExpediente.getAttribute("id"));
        oXML.replaceChild(oExpediente,oExpedienteAnterior);
    }

    function mostrarFormsAlumnos(){
        ocultar("menuProf");
        ocultar("menuAct");
        ocultar("menuComed");
        ocultar("menuExp");
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
        ocultar("menuExp");
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
        ocultar("menuExp");
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
        ocultar("menuExp");
        $("form").hide("normal");
        document.getElementById("menuComed").classList.remove("oculto");
        document.getElementById("mostrarFormAltaComed").addEventListener("click", mostrarFormAltaComed, false);
        document.getElementById("mostrarFormModComed").addEventListener("click", mostrarFormModComed, false);
        document.getElementById("mostrarFormBajComed").addEventListener("click", mostrarFormBajComed, false);
    }
    function mostrarFormsExp(){
        ocultar("menuProf");
        ocultar("menuAlum");
        ocultar("menuAct");
        ocultar("menuComed");
        $("form").hide("normal");
        document.getElementById("menuExp").classList.remove("oculto");
        document.getElementById("mostrarFormAltaExp").addEventListener("click", mostrarFormAltaExp, false);
        document.getElementById("mostrarFormModExp").addEventListener("click", mostrarFormModExp, false);
        document.getElementById("mostrarFormBajExp").addEventListener("click", mostrarFormBajExp, false);


    }

    function ocultar(elemento){
    document.getElementById(elemento).classList.add("oculto");
}

    function validarFormAltaAlum(){
        var sMensajeError="";
        var todoOk=true;
        var oAlumno=null;

       if(!/^[a-z\d_]{2,15}$/i.test(form_altaAlum.text_nombre.value)){
           sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
           todoOk=false;
       }
        if(!/^[a-z\d_]{4,15}$/i.test(form_altaAlum.text_apellido.value)){
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
        if(!/^[a-z\d_]{1}$/i.test(form_altaAlum.text_grupo.value) ){
            sMensajeError+="Grupo incorrecto\n";
            todoOk=false;
        }
        if(!/^[9|6|7][0-9]{8}$/.test(form_altaAlum.text_tlfn.value)){
            sMensajeError+="Teléfono incorrecto\n";
            todoOk=false;
        }
        if(form_altaAlum.text_direccion.value==""){
            sMensajeError+="Dirección incorrecto\n";
            todoOk=false;
        }


        if(todoOk==false){
            alert(sMensajeError);
            limpiarCampos();
        }
        else {
            oAlumno=newAlumno(form_altaAlum.text_nombre.value,form_altaAlum.text_apellido.value,form_altaAlum.text_dni.value,form_altaAlum.text_edad.value,form_altaAlum.text_tlfn.value,form_altaAlum.text_direccion.value,form_altaAlum.text_grupo.value);
                alert(añadirAlumno(oAlumno));
            limpiarCampos();
        }
    }

    function validarFormModAlum(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^[a-z\d_]{2,15}$/i.test(form_modAlum.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/i.test(form_modAlum.text_apellido.value)){
            sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
            todoOk=false;
        }
        if(form_modAlum.text_edad.value<1 || form_modAlum.text_edad.value>=99 ){
            sMensajeError+="Edad incorrecto\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{1}$/i.test(form_modAlum.text_grupo.value) ){
            sMensajeError+="Grupo incorrecto\n";
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
        var oProfesor=null;

        if(!/^[a-z\d_]{2,15}$/i.test(form_altaProf.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/i.test(form_altaProf.text_apellido.value)){
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
            alert(añadirProfesor(oProfesor));
        }
}

    function validarFormModProf(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^[a-z\d_]{2,15}$/i.test(form_modProf.text_nombre.value)){
            sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }
        if(!/^[a-z\d_]{4,15}$/i.test(form_modProf.text_apellido.value)){
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
        else{
            var oProfesor=newProfesor(form_modProf.text_nombre.value,form_modProf.text_apellido.value,form_modProf.text_dni.value,
            form_modProf.text_tlfn.value,getGruposFormProf("modificar"));
            alert(modificarXMLProfesor(oProfesor))
        }
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
        if(!/^[a-z\d_]{2,15}$/i.test(form_modAct.text_nombre.value)){
            sMensajeError+="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
            todoOk=false;
        }

        if(todoOk==false){
            alert(sMensajeError);
        }
        else {
            actividadActual=newActividadExtra(form_modAct.text_id.value,form_modAct.text_nombre.value,
            getAlumnosFormAct("modificar"));
            alert(modificarXMLActividad(actividadActual));
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
            alert(borrarActividad(form_bajaAct.text_id.value));
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
                getAlimentosFormBono("alta"));
                alert(añadirBono(oBonoActual));
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
               getAlimentosFormBono("modificar"));
                alert(modificarXMLComedor(oBonoActual));
                limpiarCampos();
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
            alert(borrarComedor(form_bajaBono.text_alumno.value));
            form_bajaAct.text_alumno.value="";
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
                oExpedienteActual = newExpediente(form_altaExp.text_AlumnoExp.value,form_altaExp.text_nota.value,form_altaExp.text_observaciones.value);
                alert(añadirExpediente(oExpedienteActual));
               limpiarCampos();
            }
            else {
                alert("Este alumno no existe");
                limpiarCampos();
            }
        }
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

    function validarBajaExp(){
        var sMensajeError="";
        var todoOk=true;

        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_bajaExp.text_dni.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else {
            alert(borrarExpediente(form_bajaExp.text_dni.value));
            limpiarCampos();
        }
    }

    // Metodos de mostrar formularios
    function mostrarFormAltaProf(){
        $("form").hide("normal");
        $("#form_altaProf").show("normal");
        cargarSelectProfesores("sel_profesor_profesores_mod");
        document.getElementById("btnAltaProf").addEventListener("click", validarFormProf, false);
        document.getElementById("btnCancelar").addEventListener("click", cancelar, false);
        document.getElementById("btnanadirCurso").addEventListener("click",anadirCursoProf,false);
    }
    function anadirCursoProf(){
        var curso=form_altaProf.cursoProf.value;
        if(curso==""){
            alert("No puedes agregar un curso vacio");
        }
        else{
            var opt=document.createElement("option");
            var texto=document.createTextNode(curso);
            opt.value=form_altaProf.cursoProf.value;
            opt.appendChild(texto);
            form_altaProf.select_gruposProf.appendChild(opt);

        }
    }

    function cancelar(){
        $("form").hide("normal");
        limpiarCampos();
    }
    function mostrarFormModProf(){
        $("form").hide("normal");
        $("#form_modProf").show("normal");
        document.getElementById("sel_profesor_profesores_mod").addEventListener("change",mostrarRestoFormModProf,false);
    }

    function mostrarRestoFormModProf(){
        document.getElementById("restoFormProf").classList.remove("oculto");
        document.getElementById("btnModProf").addEventListener("click",validarFormModProf,false);
        document.getElementById("btnCancelarModProf").addEventListener("click", cancelar, false);
        document.getElementById("anadirGrupoModProf").addEventListener("click",anadirCursoModProf,false);
    }
    function anadirCursoModProf(){
        var curso=form_modProf.grupoNuevo.value;
        if(curso==""){
            alert("No puedes agregar un curso vacio");
        }
        else{
            var opt=document.createElement("option");
            var texto=document.createTextNode(curso);
            opt.value=form_modProf.grupoNuevo.value;
            opt.appendChild(texto);
            form_modProf.select_gruposProf.appendChild(opt);

        }
    }

    function anadirAlumnosAltaAct(){
        if(sel_alumno_act_alta.selectedIndex==0)
            alert('No hay opción seleccionada');
        else{
            var opt=document.createElement("option");
            var texto=document.createTextNode(sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value);
            opt.value=sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value;
            opt.appendChild(texto);
            form_altaAct.select_alumnos_act.appendChild(opt);
        }
    }

    function mostrarFormBajProf(){
        $("form").hide("normal");
        $("#form_bajaProf").show("normal");
        document.getElementById("btnBajaProf").addEventListener("click",validarFormBajaProf,false);
        document.getElementById("btnCancelarBajaProf").addEventListener("click", cancelar, false);
    }

    function mostrarFormAltaAlum(){
        $("form").hide("normal");
        $("#form_altaAlum").show("normal");
        document.getElementById("btnAltaAlum").addEventListener("click",validarFormAltaAlum,false);
        document.getElementById("btnCancelarAltaAlum").addEventListener("click", cancelar, false);
    }

    function mostrarFormModAlum(){
        $("form").hide("normal");
        $("#form_modAlum").show("normal");
        document.getElementById("sel_alumno_alumnos_mod").addEventListener("change",mostrarRestoFormModAlum,false);
        if(document.getElementById("sel_alumno_alumnos_mod").length==1)
        cargarSelectAlumnos("sel_alumno_alumnos_mod");
    }

    function mostrarRestoFormModAlum(){
        document.getElementById("restoFormulario").classList.remove("oculto");
        document.getElementById("btnModAlum").addEventListener("click",validarFormModAlum,false);
        document.getElementById("btnCancelarModAlum").addEventListener("click", cancelar, false);
    }

    function mostrarFormBajAlum(){
        $("form").hide("normal");
        $("#form_bajaAlum").show("normal");
        document.getElementById("btnBajaAlum").addEventListener("click",validarBajaAlum,false);
        document.getElementById("btnCancelarBajaAlum").addEventListener("click", cancelar, false);
}

    function mostrarFormAltaAct(){
        $("form").hide("normal");
        $("#form_altaAct").show("normal");
        document.getElementById("btnAltaAct").addEventListener("click",validarAltaAct,false);
        if(document.getElementById("sel_alumno_act_alta").length==1)
        cargarSelectAlumnos("sel_alumno_act_alta");
        document.getElementById("btnCancelarAltaAct").addEventListener("click", cancelar, false);
        document.getElementById("anadirAlumnosAct").addEventListener("click", anadirAlumnosAltaAct, false);

    }
    function mostrarFormModAct(){
        $("form").hide("normal");
        $("#form_modAct").show("normal");
        document.getElementById("sel_alumnos_actividad_mod").addEventListener("change",mostrarRestoFormModActi,false);

        cargarSelectActividades("sel_actividades_act_mod");
    }

    function mostrarRestoFormModActi(){
        document.getElementById("restoFormAct").classList.remove("oculto");
        document.getElementById("btnModAct").addEventListener("click",validarModAct,false);
        document.getElementById("btnCancelarModAct").addEventListener("click", cancelar, false);
    }


    function mostrarFormBajAct(){
        $("form").hide("normal");
        $("#form_bajaAct").show("normal");
        document.getElementById("btnBajaAct").addEventListener("click",validarBajaAct,false);
        document.getElementById("btnCancelarBajaAct").addEventListener("click", cancelar, false);
    }

    function mostrarFormAltaComed(){
        $("form").hide("normal");
        $("#form_altaBono").show("normal");
        document.getElementById("btnAltaBono").addEventListener("click",validarAltaBono,false);
        document.getElementById("btnCancelarAltaBono").addEventListener("click", cancelar, false);
    }
    function mostrarFormModComed(){
        $("form").hide("normal");
        $("#form_modBono").show("normal");
        document.getElementById("sel_alimentos_comedor_mod").addEventListener("change",mostrarRestoFormModComedor,false);
    }

    function mostrarRestoFormModComedor(){
        document.getElementById("restoFormComedor").classList.remove("oculto");
        document.getElementById("btnModBono").addEventListener("click",validarModBono,false);
        document.getElementById("btnCancelarModBono").addEventListener("click", cancelar, false);
    }
    function mostrarFormBajComed(){
        $("form").hide("normal");
        $("#form_bajaBono").show("normal");
        document.getElementById("btnBajaBono").addEventListener("click",validarBajaBono,false);
        document.getElementById("btnCancelarBajaBono").addEventListener("click", cancelar, false);
    }


    function mostrarFormAltaExp(){
        $("form").hide("normal");
        $("#form_altaExp").show("normal");
        document.getElementById("btnAltaExp").addEventListener("click",validarFormAltaExp,false);
        document.getElementById("btnCancelarAltaExp").addEventListener("click", cancelar, false);
    }
    function mostrarFormModExp(){
        $("form").hide("normal");
        $("#form_modExp").show("normal");
        document.getElementById("sel_alumnos_expediente_mod").addEventListener("change",mostrarRestoFormModExp,false);
        //Si no lo carga varias veces y tienes alumnos repetidos
        if(document.getElementById("sel_alumnos_expediente_mod").length==1)
        cargarSelectAlumnos("sel_alumnos_expediente_mod");
    }
    function mostrarRestoFormModExp(){
        document.getElementById("restoFormExp").classList.remove("oculto");
        document.getElementById("btnModExp").addEventListener("click",validarFormModExp,false);
        document.getElementById("btnCancelarModExp").addEventListener("click", cancelar, false);
    }
    function mostrarFormBajExp(){
        $("form").hide("normal");
        $("#form_bajaExp").show("normal");
        document.getElementById("btnBajaExp").addEventListener("click",validarBajaExp,false);
        document.getElementById("btnCancelarBajaExp").addEventListener("click", cancelar, false);
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
        oTextArea.nodeValue="";
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
    function getAlimentosFormBono(sForm){
        var oForm;
        switch(sForm){
            case "alta":
                oForm=document.getElementById("form_altaBono");
                break;
            default:
                oForm=document.getElementById("form_modBono");
        }
        var oSelect=oForm.getElementById("select_alimentos");
        return oSelect.querySelectorAll("option");
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
        lugar.appendChild(opt);
    }
    function cargarSelectProfesores(sIDSelect){
        var lugar=document.getElementById(sIDSelect);
        var oProfesores=oXML.querySelectorAll("profesor");
        for(var i=0;i<oProfesores.length;i++){
            var opt=document.createElement("option");
            opt.value=oProfesores[i].getAttribute("dni");
            addContenido(opt,oProfesores[i].getAttribute("dni"));
            lugar.appendChild(opt);
        }
        lugar.appendChild(opt);
    }
    function cargarSelectActividades(sIDSelect){
        var oLugar=document.getElementById(sIDSelect);
        var oActividades = oXML.querySelectorAll("actividad");
        for(var i=0;i<oActividades.length;i++){
            var opt=document.createElement("option");
            opt.value=oActividades[i].getAttribute("id");
            addContenido(opt,oActividades[i].getAttribute("id"));
            oLugar.appendChild(opt);
        }
        oLugar.appendChild(opt);


    }

    //Metodos rellena campos
    function rellenaCamposAlumno(sDni){
        var oAlumno=buscarAlumno(sDni);
        form_modAlum.text_dni.value=sDni;
        form_modAlum.text_nombre.value=oAlumno.querySelector("nombre").nodeValue;
        form_modAlum.text_apellido.value=oAlumno.querySelector("apellidos").nodeValue;
        form_modAlum.text_edad.value=oAlumno.querySelector("edad").nodeValue;
        form_modAlum.text_grupo.value=oAlumno.querySelector("grupo").nodeValue;
        form_modAlum.text_tlfn.value=oAlumno.querySelector("contacto").nodeValue;
        form_modAlum.text_direccion.value=oAlumno.querySelector("direccion").nodeValue;
    }
    function rellenaCamposProfesor(sDni){
        var oProfesor=buscarProfesor(sDni);
        form_modProf.text_dni.value=sDni;
        form_modProf.text_nombre.value=oProfesor.querySelector("nombre").nodeValue;
        form_modProf.text_apellido.value=oProfesor.querySelector("apellido").nodeValue;
        form_modProf.text_tlfn.value=oProfesor.querySelector("telefono").nodeValue;
        var oGrupos=oProfesor.querySelectorAll("grupo");
        var oSelect=form_modProf.select_gruposProf;
        for(var i=0;i<oGrupos.length;i++){
            var oOption=document.createElement("option");
            var sValor=oGrupos[i].getAttribute("id");
            oOption.value=sValor;
            oOption.nodeValue=sValor;
            oSelect.appendChild(oOption);
        }
    }
    function rellenaCamposActividad(sId){
        var oActividad=buscarActividad(sId);
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

function listadoAlumnos(){
    var alumnos=oXML.querySelectorAll("alumno");
    var tabla=document.createElement("table");
    var titulo=document.createElement("caption");
    titulo.appendChild(document.createTextNode("Listado de Alumnos"));
    tabla.appendChild(titulo);



}