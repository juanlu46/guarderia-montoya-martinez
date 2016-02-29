var oFormBajaProfe=$("#form_bajaProf");
function cargaBajaProfe(){
    $("#btnBajaProf").on('click',validarFormBajaProf);
    $("#btnCancelarBajaProf").on('click',cancelar);
}

function validarFormBajaProf(){
    var todoOk=true;
    var sMensajeError="";
    if(!/^((\d{8}[A-Z])|(\d{8}[a-z]))$/.test(oFormBajaProfe.find("#text_dni").val())){
        sMensajeError="Dni incorrecto\n";
        todoOk=false;
    }
    if(todoOk==false)
        alert(sMensajeError);
    else
        alert(borrarProfesor(oFormBajaProfe.find("#text_dni").val()));
}