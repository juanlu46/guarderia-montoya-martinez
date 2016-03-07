var oFormModProfe=$("#form_modProf");
cargaModProfe();
function cargaModProfe(){
    $('#sel_profesor_profesores_mod').selectedIndex="0";
    var oSelectProfesor=$("#sel_profesor_profesores_mod");
    if(oSelectProfesor.length==0){
        $("<option>Seleccione un profesor</option>").appendTo(oSelectProfesor);
    }
    $.get("./php/obtenerProfesores.php",function(data){
        rellenarSelectProfesoresMod(data);
    });
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
        var sJson='{'+
            '"nombre":"'+oFormModProfe.find("#text_nombre").val()+'",'+
            '"apellido":"'+oFormModProfe.find("#text_apellido").val()+'",'+
            '"dni":"'+oFormModProfe.find("#text_dni").val()+'",'+
            '"grupo":"'+oFormModProfe.find("#text_grupo")()+'",'+
            '"telefono":'+oFormModProfe.find("#text_tlfn")()+','+
            '}';
        var sParametros="datos="+sJson;
        $.ajax('php/tramites/modProfesor.php',sParametros,'POST');
    }
}

function mostrarRestoFormModProf(){
    rellenaCamposProfesor(this.options[this.selectedIndex].value);
    $("#restoFormProf").removeClass("oculto");
    $("#btnModProf").on("click",validarFormModProf);
    $("#btnCancelarModProf").on("click", cancelar);
}

function rellenarSelectProfesoresMod(datos){
    var select=$('#sel_profesor_profesores_mod');
    var profesor=$(datos).find('profesor');
    for(var i=0;i<profesor.size();i++) {
        $("<option value='"+$(profesor[i]).attr("dni")+"'>"+
            $(profesor[i]).find("nombre").text()+" "+$(profesor[i]).find("apellidos").text()+
            "</option>").appendTo(select);
    }
}

function rellenaCamposProfesor(sDni){
    var oAjax=new XMLHttpRequest();
    oAjax.open("GET","./php/obtenerProfesores.php",false);
    oAjax.send(null);
    var oProfesor=$(oAjax.responseXML).find("profesor[dni='"+sDni+"']");
    oFormModProfe.find("#text_dni").val(sDni);
    oFormModProfe.find("#text_nombre").val(oProfesor.find("nombre").text());
    oFormModProfe.find("#text_apellido").val(oProfesor.find("apellidos").text());
    oFormModProfe.find("#text_tlfn").val(oProfesor.find("telefono").text());
    oFormModProfe.find("#text_grupo").val(oProfesor.find("grupo").text());
}
