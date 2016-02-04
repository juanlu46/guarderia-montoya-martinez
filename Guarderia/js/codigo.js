    window.addEventListener('load',inicio,false);
    var oXML;
    function inicio() {
        document.getElementById("alumnos").addEventListener("click",mostrarFormsAlumnos,false);
        document.getElementById("profesores").addEventListener("click",mostrarFormsProf,false);
        document.getElementById("actividades").addEventListener("click",mostrarFormsAct,false);
        document.getElementById("comedor").addEventListener("click",mostrarFormsComed,false);
        oXML.loadXML("../xml/datosGuarderia.xml");
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
    //Metodos Añadir
    function añadirProfesor(oProfesor){
        var sRes="Alta de profesor satisfactoria";
        if(buscarProfesor(oProfesor.querySelector("dni").nodeValue)==null) {
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
        if(buscarAlumno(oAlumno.querySelector("dni").nodeValue)==null) {
            var oAlumnos = oXML.querySelector("alumnos");
            oAlumnos.appendChild(oAlumno);
        }
        else
        {
            sRes="Alumno ya registrado";
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
            var oAsignaturas=oXML.querySelectorAll("asignatura");
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
            sRes="El profesor que inteta borrar, no existe por ese DNI";
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
    //Metodos buscar
    function buscarProfesor(sDni){
        var oProfesor=null;
        var bEncontrado=false;
        var oProfesores=oXML.querySelectorAll("profesor");
        for(var i=0;i<oProfesores.length && !bEncontrado;i++){
            var oDni=oProfesores[i].querySelector("dni");
            if(oDni.value==sDni){
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
            var oDni=oAlumnos[i].querySelector("dni");
            if(oDni.value==sDni){
                oAlumno =  oAlumnos[i];
                bEncontrado=true;
            }
        }
        return oAlumno;
    }

    function validarFormAltaAlum(){
        var sMensajeError="";
        var todoOk=true;
        var oAlumno=document.createElement("alumno");

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
            alumnoActual=new Alumno(form_altaAlum.text_nombre.value,form_altaAlum.text_apellido.value,form_altaAlum.text_dni.value,form_altaAlum.text_edad.value,form_altaAlum.text_tlfn.value,form_altaAlum.text_direccion.value);
                alert(guarderia.altaAlumno(alumnoActual));
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
        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_modAlum.text_dni.value)){
            sMensajeError+="Dni incorrecto\n";
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
        if(todoOk==false){
            alert(sMensajeError);
        }
    //FALTA MODIFICAR ALUMNO
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
        guarderia.bajaAlumno(form_bajaAlum.text_dni.value);
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
            profesorActual=new Profesor(form_altaProf.text_nombre.value,form_altaProf.text_apellido.value,form_altaProf.text_dni.value,form_altaProf.text_tlfn.value);
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
        guarderia.bajaProfesor(form_bajaProf.text_dni.value);
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
            actividadActual=new ActividadExtra(form_altaAct.text_id.value,form_altaAct.text_nombre.value);
            alert(guarderia.altaActividadExtra(actividadActual));
            form_altaAct.text_id.value="";
            form_altaAct.text_nombre.value="";
        }


    }

    function validarModAct(){
        var sMensajeError="";
        var todoOk=true;

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
            //FALTA MODIFICAR ACTIVIDAD
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
            alert(guarderia.bajaActividadExtra(form_bajaAct.text_id.value));
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
       /* LO DEJAMOS SIN VALIDAR PARA QUE PUEDA DEJARLO EN BLANCO SI NO TIENE?*/
        if(form_altaBono.text_alimentos.value==""){
            sMensajeError+="Introduzca los alimentos a los que es alérgico. Si no tiene alergías introduzca ninguno \n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else {
            var oAlumno=guarderia.buscarAlumno(form_altaBono.text_alumno.value);
            if(oAlumno!=null) {
                oBonoActual = new BonoComedor(oAlumno, form_altaBono.text_horario.value);
                alert(guarderia.altaBonoComedor(oBonoActual));
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
            var oAlumno=guarderia.buscarAlumno(form_modBono.text_alumno.value);
            if(oAlumno!=null) {
               //FALTAAAA MODIFICAR BONO
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
            alert(guarderia.bajaBonoComedor(form_bajaBono.text_alumno.value));
            form_bajaAct.text_alumno.value="";
        }
    }

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
    }
    function mostrarFormModAct(){
        $("form").hide("normal");
        $("#form_modAct").show("normal");
        document.getElementById("btnModAct").addEventListener("click",validarModAct,false);
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
        var oTags=["nombre","apellidos","dni","edad","contacto","direccion","grupo"];
        var oNodos=[];
        var oAlumno=document.createElement("alumno");
        for(var i=0;i<oTags.length;i++)
            oNodos.push(document.createTextNode(oTags[i]));
        var oTagsValues=[sNombre,sApellidos,sDni,iEdad,iContacto,sDireccion,sGrupo];
        for(var i=0;i<oTags.length;i++) {
            addContenido(oNodos[i], oTagsValues[i]);
            oAlumno.appendChild(oNodos[i]);
        }
        return oAlumno;
    }
    //Constructor de objeto XML, profesor.
    function newProfesor(sNombre,sApellidos,sDni,iTelefono,sGrupo){
        var oTags=["nombre","apellidos","dni","telefono","grupo"];
        var oNodos=[];
        var oProfesor=document.createElement("profesor");
        for(var i=0;i<oTags.length;i++)
            oNodos.push(document.createTextNode(oTags[i]));
        var oTagsValues=[sNombre,sApellidos,sDni,iTelefono,sGrupo];
        for(var i=0;i<oTags.length;i++) {
            addContenido(oNodos[i], oTagsValues[i]);
            oProfesor.appendChild(oNodos[i]);
        }
        return oProfesor;
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

