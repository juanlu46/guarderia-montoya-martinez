var oFormBajaAlum=$("#form_bajaAlum");
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
        alert(sMensajeError);
    else
        alert(borrarAlumno(oFormBajaAlum.find("#text_dni").val()));
}