var oFormAltaAlum=$("#form_altaAlum");
function cargaAltaAlumno(){
    $("#btnAltaAlum").on('click',validarFormAltaAlum);
    $("#btnCancelarAltaAlum").on('click',cancelar)
}

function validarFormAltaAlum(){
    var sMensajeError="";
    var todoOk=true;
    var oAlumno=null;

    if(!/^[a-z\d_]{2,15}$/i.test(oFormAltaAlum.find("#text_nombre").val())){
        sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{4,15}$/i.test(oFormAltaAlum.find("#text_apellido").val())){
        sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(oFormAltaAlum.find("#text_dni").val())){
        sMensajeError+="Dni incorrecto\n";
        todoOk=false;
    }
    if(oFormAltaAlum.find("#text_edad").val()<1 || oFormAltaAlum.find("#text_edad").val()>=99 ){
        sMensajeError+="Edad incorrecto\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{1}$/i.test(oFormAltaAlum.find("#text_grupo").val()) ){
        sMensajeError+="Grupo incorrecto\n";
        todoOk=false;
    }
    if(!/^[9|6|7][0-9]{8}$/.test(oFormAltaAlum.find("#text_tlfn").val())){
        sMensajeError+="Teléfono incorrecto\n";
        todoOk=false;
    }
    if(oFormAltaAlum.find("#text_direccion").val()==""){
        sMensajeError+="Dirección incorrecto\n";
        todoOk=false;
    }


    if(todoOk==false){
        alert(sMensajeError);
    }
    else {
        oAlumno=newAlumno(form_altaAlum.text_nombre.val(),form_altaAlum.text_apellido.value,form_altaAlum.text_dni.value,form_altaAlum.text_edad.value,form_altaAlum.text_tlfn.value,form_altaAlum.text_direccion.value,form_altaAlum.text_grupo.value);
        alert(añadirAlumno(oAlumno));
        limpiarCampos();
    }
}