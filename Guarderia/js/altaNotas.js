var oFormAltaNotas=$("form_modExp");
cargaAltaNotas();
function cargaAltaNotas(){
    $('#sel_alumnos_expediente_mod').change(mostrarRestoFormAltaNotas)
}
function rellenaCamposExpediente(sDni){
    var oExpediente=buscarExpediente(sDni);
    form_modExp.text_AlumnoExp.value=sDni;
    form_modExp.text_observaciones.value=oExpediente.querySelector("observaciones").textContent;
    var oNotas=oExpediente.querySelectorAll("notaAsig");
    var oSelect=form_modExp.select_expediente;
    for(var i=0;i<oNotas.length;i++){
        var oOption=document.createElement("option");
        var sAsig=oNotas[i].getAttribute("id");
        var sNota=oNotas[i].textContent;
        oOption.value=sAsig+"-"+sNota;
        oOption.textContent="ID: "+sAsig+" - Nota: "+sNota;
        oSelect.appendChild(oOption);
    }
}
function mostrarRestoFormAltaNotas(){
    $('#restoFormExp').removeClass('oculto');
    $('#btnModExp').click(validarAltaNota);
    $('#btnCancelarModExp').click(cancelar);
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
        var arrayJson="{'materia1':"+oFormAltaNotas.find('#text_mat1').val()+","+
            "'nota1':"+oFormAltaNotas.find('#text_nota1').val()+","+
            "'materia2':"+oFormAltaNotas.find('#text_mat2').val()+","+
            "'nota2':"+oFormAltaNotas.find('#text_nota2').val()+","+
            "'materia3':"+oFormAltaNotas.find('#text_mat3').val()+","+
            "'nota3':"+oFormAltaNotas.find('#text_nota3').val()+"}";
        $.ajax({url:'php/tramites/altaNota.php',data:arrayJson,dataType:'script',method:'GET'});
    }

}