var oFormModProfe=$("#form_modProf");
cargaModProfe();
function cargaModProfe(){
    $('#sel_profesor_profesores_mod').selectedIndex="0";
    var oSelectProfesor=$("#sel_profesor_profesores_mod");
    if(oSelectProfesor.length==0){
        $("<option>Seleccione un profesor</option>").appendTo(oSelectProfesor);
        cargarSelectProfesores();
    }
    oSelectProfesor.on("change",mostrarRestoFormModProf);
    $("#restoFormProf").addClass("oculto");
}

function validarFormModProf(){
    var sMensajeError="";
    var todoOk=true;

    if(!/^[a-z\d_]{2,15}$/i.test(oFormModProfe.find("#text_nombre").val())){
        sMensajeError="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{4,15}$/i.test(oFormModProfe.find("#text_apellido").val())){
        sMensajeError+="Apellido incorrecto, el apellido debe tener entre 4 y 15 caracteres\n";
        todoOk=false;
    }
    if(!/^(([A-Z]\d{8})|(\d{8}[A-Z])|(\d{8}[a-z]))$/.test(oFormModProfe.find("#text_dni").val())){
        sMensajeError+="Dni incorrecto\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{1}$/i.test(oFormModProfe.find("#text_grupo").val()) ){
        sMensajeError+="Grupo incorrecto\n";
        todoOk=false;
    }

    if(!/^[9|6|7][0-9]{8}$/.test(oFormModProfe.find("#text_tlfn").val())){
        sMensajeError+="Teléfono incorrecto\n";
        todoOk=false;
    }

    if(todoOk==false){
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    }
    else{
        var oProfesor=newProfesor(form_modProf.text_nombre.value,form_modProf.text_apellido.value,form_modProf.text_dni.value,
            form_modProf.text_tlfn.value,getGruposFormProf("modificar"));
        alert(modificarXMLProfesor(oProfesor))
    }
}

function mostrarRestoFormModProf(){
    rellenaCamposProfesor(this.options[this.selectedIndex].value);
    $("#restoFormProf").removeClass("oculto");
    $("#btnModProf").on("click",validarFormModProf);
    $("#btnCancelarModProf").on("click", cancelar);
}

function cargarSelectProfesores(){
    var lugar=$("#sel_profesor_profesores_mod");
    var oProfesores=oXML.querySelectorAll("profesor");
    for(var i=0;i<oProfesores.length;i++){
        var opt=document.createElement("option");
        opt.value=oProfesores[i].getAttribute("dni");
        addContenido(opt,oProfesores[i].getAttribute("dni"));
        lugar.appendChild(opt);
    }
}

function rellenaCamposProfesor(sDni){
    var oProfesor=buscarProfesor(sDni);
    oFormModProfe.find("#text_dni").val(sDni);
    oFormModProfe.find("#text_nombre").val(oProfesor.querySelector("nombre").textContent);
    oFormModProfe.find("#text_apellido").val(oProfesor.querySelector("apellidos").textContent);
    oFormModProfe.find("#text_tlfn").val(oProfesor.querySelector("telefono").textContent);
    var oGrupos=oProfesor.querySelectorAll("grupo");
    var oSelect=oFormModProfe.find("#select_gruposProf");
    for(var i=0;i<oGrupos.length;i++){
        var oOption=document.createElement("option");
        var sValor=oGrupos[i].getAttribute("id");
        oOption.value=sValor;
        oOption.textContent=sValor;
        oSelect.appendChild(oOption);
    }
}
