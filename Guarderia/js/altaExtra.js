var oFormAltaExtra=$("#form_altaAct");
cargaAltaExtra();
function cargaAltaExtra(){
    var oSelectAlumnos=$("#sel_alumno_act_alta");
    $("#btnAltaAct").on('click',validarAltaAct);
    $("#btnCancelarAltaAct").on('click',cancelar);
    if(oSelectAlumnos.length==1) {
        cargarSelectAlumnos("sel_alumno_act_alta");
    }
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
    var actividadActual=null;

    if(isNaN(oFormAltaExtra.find("#text_id").val()) || oFormAltaExtra.find("#text_id").val()==""){
        sMensajeError+="ID incorrecto\n";
        todoOk=false;
    }
    if(!/^[a-z\d_]{2,15}$/i.test(oFormAltaExtra.find("#text_nombre").val())){
        sMensajeError+="Nombre incorrecto, el nombre debe tener entre 2 y 15 caracteres\n";
        todoOk=false;
    }

    if(todoOk==false){
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    }
    else{
       var oAlumnos=[];
        var oOptions=$("#select_alumnos_act").find("option");
        var x;
        for(i=0;i<$(oOptions).size();i++){
            oAlumnos.push($(oOptions[i]).val());
        }
       var  arrayJson='{"id":'+oFormAltaExtra.find("#text_id").val()+','+
            '"nombre":"'+oFormAltaExtra.find("#text_nombre").val()+'","alumnos":'+
           JSON.stringify(oAlumnos)+'}';
        $.ajax({url:"php/tramites/altaExtraEscolar.php",data:arrayJson,dataType:'script',method:'POST'});

        getAlumnosFormAct("alta");

        limpiarCampos();
    }
}

function anadirAlumnosAltaAct(){
    var oSelect=$("#sel_alumno_act_alta");
    if(oSelect[0].selectedIndex==0)
        alert('No hay opción seleccionada');
    else if(buscarRepeSelect(form_altaAct.select_alumnos_act.options,
            sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value)) {
        alert("No puede introducir alumnos repetidos");
    }
    else{
        var opt=document.createElement("option");
        var texto=document.createTextNode(sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value);
        opt.value=sel_alumno_act_alta.options[sel_alumno_act_alta.selectedIndex].value;
        opt.appendChild(texto);
        form_altaAct.select_alumnos_act.appendChild(opt);
    }
}

function eliminarAlumnoActAlta(){
    var oSelect=$("#select_alumnos_act");
    var oOptionSel=getSelecteditems(oSelect[0]);
    for(var i=0;i<oOptionSel.length;i++)
        oSelect.removeChild(oOptionSel[i]);
}