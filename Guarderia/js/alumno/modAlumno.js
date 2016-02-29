var oFormModAlum=$("#form_modAlum");
function cargaModALumno(){
    $("#restoFormModAlumularioModAlum").addClass("oculto");
    var oSelectAlumnos=$("#sel_alumno_alumnos_mod");
    oSelectAlumnos.on("change",mostrarRestoFormModAlumModAlum);
    if(oSelectAlumnos.length==0){
        $("<option>Seleccione un alumno</option>").appendTo(oSelectAlumnos);
    }
    else{
        cargarSelectAlumnos();
    }
}

function mostrarRestoFormModAlumModAlum(){
    rellenaCamposAlumno(this.options[this.selectedIndex].value);
    $("#restoFormModAlumulario").removeClass("oculto");
    $("#btnModAlum").on("click",validarFormModAlum);
    $("#btnCancelarModAlum").on("click", cancelar);
}

function rellenaCamposAlumno(sDni){
    var oAlumno=buscarAlumno(sDni);
    oFormModAlum.find("#text_dni").val(sDni);
    oFormModAlum.find("#text_nombre").val(oAlumno.querySelector("nombre").textContent);
    oFormModAlum.find("#text_apellido").val(oAlumno.querySelector("apellidos").textContent);
    oFormModAlum.find("#text_edad").val(oAlumno.querySelector("edad").textContent);
    oFormModAlum.find("#text_grupo").val(oAlumno.querySelector("grupo").textContent);
    oFormModAlum.find("#text_tlfn").val(oAlumno.querySelector("contacto").textContent);
    oFormModAlum.find("#text_direccion").val(oAlumno.querySelector("direccion").textContent);
}

function validarFormModAlum(){
    var sMensajeError="";
    var todoOk=true;

    if(!/^[a-z\d_]{2,15}$/i.test(oFormModAlum.find("#text_nombre").val())){
        sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{4,15}$/i.test(oFormModAlum.find("#text_apellido").val())){
        sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
        todoOk=false;
    }
    if(oFormModAlum.find("#text_edad").val()<1 || oFormModAlum.find("#text_edad").val()>=99 ){
        sMensajeError+="Edad incorrecto\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{1}$/i.test(oFormModAlum.find("#text_grupo").val()) ){
        sMensajeError+="Grupo incorrecto\n";
        todoOk=false;
    }
    if(!/^[9|6|7][0-9]{8}$/.test(oFormModAlum.find("#text_tlfn").val())){
        sMensajeError+="Teléfono incorrecto\n";
        todoOk=false;
    }
    if(oFormModAlum.find("#text_direccion").val()==""){
        sMensajeError+="Dirección incorrecto\n";
        todoOk=false;
    }
    //FALTA VALIDACION DEL CMAPO GRUPO (una sola letra)
    if(todoOk==false){
        alert(sMensajeError);
    }
    else{
        var oAlumnoMod=newAlumno(oFormModAlum.find("#txt_nombre").val(),oFormModAlum.find("#txt_apellido").val(),
            oFormModAlum.find("#text_dni").val(),oFormModAlum.find("#txt_edad").val(),oFormModAlum.find("#txt_tlfn").val(),
            oFormModAlum.find("#txt_direccion").val(),oFormModAlum.find("#txt_grupo").val());
        alert(modificarXMLAlumno(oAlumnoMod));
    }
}