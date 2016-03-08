var oFormAltaNotas=$("#form_modExp");
cargaAltaNotas();
function cargaAltaNotas(){
    $('#sel_alumnos_expediente_mod').change(mostrarRestoFormAltaNotas)
}
function rellenaCamposExpediente(sDni){
    oFormAltaNotas.find("#text_AlumnoExp").val(sDni);
}
function mostrarRestoFormAltaNotas(){
    if($("#text_evaluacion").find("option").size()==0)
        $("#text_evaluacion").append('<option value="1º">Primera</option><option value="2º">Segunda</option><option value="3º">Tercera</option>');
    if($("#select_curso").find("option").size()==0)
        $("#select_curso").append('<option value="2015/2016">2015/2016</option><option value="2014/2015">2014/2015</option>');
    $('#restoFormExp').removeClass('oculto');
    $('#btnModExp').click(validarAltaNota);
    $('#btnCancelarModExp').click(cancelar);
    rellenaCamposExpediente($("#sel_alumnos_expediente_mod").find("option:selected").val());
}
function validarAltaNota(){
    var todoOk=true;
    var sMensajeError="";
    if($('#text_mat1').value==""){
        todoOk=false
        sMensajeError='Escriba la materia 1';
    }
    if($('#text_nota1').value==""){
        todoOk=false
        sMensajeError+='La nota de la materia 1 no puede estar vacia';
    }
    if($('#text_mat2').value==""){
        todoOk=false
        sMensajeError+='Escriba la materia 2';
    }
    if($('#text_nota2').value==""){
        todoOk=false
        sMensajeError+='La nota de la materia 2 no puede estar vacia';
    }
    if($('#text_mat3').value==""){
        todoOk=false
        sMensajeError+='Escriba la materia 3';
    }
    if($('#text_nota3').value==""){
        todoOk=false
        sMensajeError+='La nota de la materia 3 no puede estar vacia';
    }
    if(todoOk==false)
        $("<div title='Error Validación'>"+sMensajeError+"</div>").dialog();
    else{
        $.ajax({url:'php/tramites/altaNota.php',data:oFormAltaNotas.serialize(),method:'GET'});
    }

}