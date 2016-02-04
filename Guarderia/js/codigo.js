    window.onload=function(){inicio()};
    var guarderia;
    function inicio() {
        document.getElementById("alumnos").addEventListener("click",mostrarFormsAlumnos,false);
        document.getElementById("profesores").addEventListener("click",mostrarFormsProf,false);
        document.getElementById("actividades").addEventListener("click",mostrarFormsAct,false);
        document.getElementById("comedor").addEventListener("click",mostrarFormsComed,false);
         guarderia=new Guarderia();
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
        var alumnoActual=null;

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
    // Metodo para coger parametros GET para cargar incialmente el formulario correspondiente.
    function getGet(){
        var url = document.location.href;
        var getString = url.split('?')[1];
        var tmp = getString.split('=')[1];
        return unescape(decodeURI(tmp));
    }
