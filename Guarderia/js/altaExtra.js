var oFormAltaExtra=$("#form_altaAct");
cargaAltaExtra();
function cargaAltaExtra(){
    var oSelectAlumnos=$("#sel_alumno_act_alta");
    $("#btnAltaAct").on('click',validarAltaAct);
    $("#btnCancelarAltaAct").on('click',cancelar);
    $("#anadirAlumnosAct").on('click',anadirAlumnosAltaAct);
    $("#btnEliminarAlumno_act").on('click',eliminarAlumnoActAlta);
}

function getAlumnosFormAct(){
    var oSelect=oFormAltaExtra.find("#select_alumnos_act"); //Select Alumnos Seleccionado
    return oSelect.find("option");
}

function validarAltaAct(){
    var sMensajeError="";
    var todoOk=true;

    if(isNaN(oFormAltaExtra.find("#text_id").val()) || oFormAltaExtra.find("#text_id").val()==""){
        sMensajeError+="ID incorrecto\n";
        todoOk=false;
    }
    if(!/^[a-zA-Z\d_\/\s\/ ]{2,50}$/i.test(oFormAltaExtra.find("#text_nombre").val())){
        sMensajeError+="Descipcion incorrecta, el nombre debe tener entre 2 y 50 caracteres\n";
        todoOk=false;
    }

    if(todoOk==false){
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    }
    else{
       var oAlumnos=[];
        var oOptions=getAlumnosFormAct();
        for(i=0;i<$(oOptions).size();i++){
            oAlumnos.push($(oOptions[i]).val());
        }
       var  arrayJson='{"id":'+oFormAltaExtra.find("#text_id").val()+','+
            '"descripcion":"'+oFormAltaExtra.find("#text_nombre").val()+'","alumnos":'+
           JSON.stringify(oAlumnos)+',"fecha":"'+oFormAltaExtra.find("#text_fecha").val()+'"}';
        $.ajax({url:"php/tramites/altaExtraEscolar.php",data:"datos="+arrayJson,method:'POST'});
    }
}

function anadirAlumnosAltaAct(){
    var oSelect=$("#sel_alumno_act_alta");
     if(buscarRepeSelect(form_altaAct.select_alumnos_act.options,
            sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value)) {
        $("<div title='Error'>No puede introducir alumnos repetidos</div>").dialog();
    }
    else{
         var sDni=oSelect.find("option:selected").val();
         $("<option value='"+sDni+"'>"+sDni+"</option>").appendTo("#select_alumnos_act");
    }
}

function eliminarAlumnoActAlta() {
    $("#select_alumnos_act").find("option:selected").remove();
}
