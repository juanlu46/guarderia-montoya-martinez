var oFormAltaProfe=$("#form_altaProf");
cargaAltaProfe();
function cargaAltaProfe(){
    $("#btnAltaProf").on('click',validarFormAltaProf);
    $("#btnCancelarAltaProf").on('click',cancelar);
}

function validarFormAltaProf(){
    var sMensajeError="";
    var todoOk=true;

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
    if(!/^[9|6|7][0-9]{8}$/.test(oFormAltaProfe.find("#text_tlfn").val())){
        sMensajeError+="Teléfono incorrecto\n";
        todoOk=false;
    }
    if($('#select_gruposProf').selectedIndex==0){
        sMensajeError+="Elige un grupo\n";
        todoOk=false;
    }

    if(todoOk==false){
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    }
    else{
        var datos=oFormAltaProfe.serialize();
       llamadaGetAltaProf(datos);
    }
}

function llamadaGetAltaProf(data){
    $.get('php/tramites/altaProfesor.php',data,'script');

}


