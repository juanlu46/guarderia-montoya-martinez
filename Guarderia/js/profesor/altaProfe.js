var oFormAltaProfe=$("#form_altaProf");
function cargaAltaProfe(){
    $("#btnAltaProf").on('click',validarFormAltaProf);
}

function validarFormAltaProf(){
    var sMensajeError="";
    var todoOk=true;
    var oProfesor=null;

    if(!/^[a-z\d_]{2,15}$/i.test(oFormAltaProfe.find("#text_nombre").val())){
        sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{4,15}$/i.test(oFormAltaProfe.find("#text_apellido").val())){
        sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(oFormAltaProfe.find("#text_dni").val())){
        sMensajeError+="Dni incorrecto\n";
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


