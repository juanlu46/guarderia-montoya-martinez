var oFormBajaAlum=$("#form_bajaAlum");
cargaBajaAlumno();
function cargaBajaAlumno(){
    $("#btnBajaAlum").on('click',validarFormBajaAlum);
    $("#btnCancelarBajaAlum").on('click',cancelar);
}
function validarFormBajaAlum(){
    var todoOk=true;
    var sMensajeError="";

    if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(oFormBajaAlum.find("#text_dni").val())){
        sMensajeError="Dni incorrecto\n";
        todoOk=false;
    }
    if(todoOk==false)
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    else {
        borrarAlumno(oFormBajaAlum.find("#text_dni").val());
    }
}