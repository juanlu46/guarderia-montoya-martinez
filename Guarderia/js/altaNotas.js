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
        alert(sMensajeError);
    else{
        //GUARDAMOS LA NOTA
    }

}