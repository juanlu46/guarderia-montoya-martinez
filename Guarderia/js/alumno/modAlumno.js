var oFormModAlum=$("#form_modAlum");
cargaModALumno();
function cargaModALumno(){
    $("#restoFormModAlumularioModAlum").addClass("oculto");
    var oSelectAlumnos=$("#sel_alumno_alumnos_mod");
    $('#sel_alumno_alumnos_mod').selectedIndex='0';
    oSelectAlumnos.on("change",mostrarRestoFormModAlumModAlum);
    if(oSelectAlumnos.length==0){
        $("<option>Seleccione un alumno</option>").appendTo(oSelectAlumnos);
    }
    $.get("./php/obtenerAlumnos.php",function(data){
        rellenarSelectAlumnosMod(data);
    })
}

function mostrarRestoFormModAlumModAlum(){
    rellenaCamposAlumno($(this).find("option:selected").val());
    $("#restoFormularioModAlum").removeClass("oculto");
    $("#btnModAlum").on("click",validarFormModAlum);
    $("#btnCancelarModAlum").on("click", cancelar);
}

function rellenaCamposAlumno(sDni){
    var oAjax=new XMLHttpRequest();
    oAjax.open("GET","./php/obtenerAlumnos.php",false);
    oAjax.send(null);
    var oAlumno=$(oAjax.responseXML).find("alumno[dni='"+sDni+"']");
    oFormModAlum.find("#text_dni").val(sDni);
    oFormModAlum.find("#text_nombre").val(oAlumno.find("nombre").text());
    oFormModAlum.find("#text_apellido").val(oAlumno.find("apellidos").text());
    oFormModAlum.find("#text_edad").val(oAlumno.find("edad").text());
    oFormModAlum.find("#text_grupo").val(oAlumno.find("grupo").text());
    oFormModAlum.find("#text_tlfn").val(oAlumno.find("contacto").text());
    oFormModAlum.find("#text_direccion").val(oAlumno.find("direccion").text());
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
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    }
    else{
        var sJson='{'+
            '"nombre":"'+oFormModAlum.find("#text_nombre").val()+'",'+
            '"apellidos":"'+oFormModAlum.find("#text_apellido").val()+'",'+
            '"dni":"'+oFormModAlum.find("#text_dni").val()+'",'+
            '"edad":'+oFormModAlum.find("#text_edad").val()+','+
            '"grupo":"'+oFormModAlum.find("#text_grupo").val()+'",'+
            '"contacto":'+oFormModAlum.find("#text_tlfn").val()+','+
            '"direccion":"'+oFormModAlum.find("#text_direccion").val()+'"'+
            '}';
        var sParametros="datos="+sJson;
        $.post('php/tramites/modAlumno.php',sParametros);
    }
}



