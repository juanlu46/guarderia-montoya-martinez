window.onload=function(){inicio()};
var guarderia;
function inicio() {
   /* document.getElementById("mostrarFormAltaProf").addEventListener("click", mostrarFormAltaProf, false);
    document.getElementById("mostrarFormModProf").addEventListener("click", mostrarFormModProf, false);
    document.getElementById("mostrarFormBajProf").addEventListener("click", mostrarFormBajProf, false);
    document.getElementById("mostrarFormAltaAlum").addEventListener("click",mostrarFormAltaAlum,false);
    document.getElementById("mostrarFormModAlum").addEventListener("click",mostrarFormModAlum,false);
    document.getElementById("mostrarFormBajAlum").addEventListener("click",mostrarFormBajAlum,false);*/
    document.getElementById("btnAltaProf").addEventListener("click", validarFormProf, false);
    document.getElementById("btnModProf").addEventListener("click",validarFormModProf,false);
    document.getElementById("btnBajaProf").addEventListener("click",validarFormBajaProf,false);/*
    document.getElementById("btnAltaAlum").addEventListener("click",validarFormAltaAlum,false);
    document.getElementById("btnModAlum").addEventListener("click",validarFormModAlum,false);
    document.getElementById("btnBajaAlum").addEventListener("click",validarBajaAlum,false);
    document.getElementById("btnAltaAct").addEventListener("click",validarAltaAct,false);
    document.getElementById("btnModAct").addEventListener("click",validarModAct,false);
    document.getElementById("btnBajaAct").addEventListener("click",validarBajaAct,false);*/

     guarderia=new Guarderia();
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
        if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(form_modAlum.text_dni.value)){
            sMensajeError="Dni incorrecto\n";
            todoOk=false;
        }
        if(todoOk==false)
            alert(sMensajeError);
        else
        guarderia.bajaAlumno(form_altaAlum.text_dni.value);
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
        var actividad=guarderia.buscarActividadExtra(form_bajaAct.text_id.value);
        if(actividad==null){
            alert("Actividad no registrada");
        }
        else{
            alert(guarderia.bajaActividadExtra(actividad));
            form_bajaAct.text_id.value="";
        }
    }
}



    function mostrarFormAltaProf(){
        document.getElementById("form_altaProf").classList.remove("oculto");
        document.getElementById("form_modProf").classList.add("oculto");
        document.getElementById("form_bajaProf").classList.add("oculto");
    }
    function mostrarFormModProf(){
        document.getElementById("form_modProf").classList.remove("oculto");
        document.getElementById("form_altaProf").classList.add("oculto");
        document.getElementById("form_bajaProf").classList.add("oculto");
    }
    function mostrarFormBajProf(){
        document.getElementById("form_bajaProf").classList.remove("oculto");
        document.getElementById("form_altaProf").classList.add("oculto");
        document.getElementById("form_modProf").classList.add("oculto");
    }
    function mostrarFormAltaAlum(){
        document.getElementById("form_altaAlum").classList.remove("oculto");
        document.getElementById("form_modAlum").classList.add("oculto");
        document.getElementById("form_bajaAlum").classList.add("oculto");
    }
    function mostrarFormModAlum(){
        document.getElementById("form_modAlum").classList.remove("oculto");
        document.getElementById("form_altaAlum").classList.add("oculto");
        document.getElementById("form_bajaAlum").classList.add("oculto");
    }
    function mostrarFormBajAlum(){
    document.getElementById("form_bajaAlum").classList.remove("oculto");
    document.getElementById("form_altaAlum").classList.add("oculto");
    document.getElementById("form_modAlum").classList.add("oculto");
}