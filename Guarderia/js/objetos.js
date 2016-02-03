function Guarderia(){
    this.profesores=[];
    this.alumnos=[];
    this.actividadesExtra=[];
    this.grupos=[];
    this.matriculas=[];
    this.expedientes=[];
    this.bonosComedor=[];
}
function Profesor(sNombre,sApellido,sDni,iTelefono){
    this.nombre=sNombre;
    this.apellido=sApellido;
    this.dni=sDni;
    this.telefono=iTelefono;
}

function Alumno(sNombre,sApellidos,sDni,iEdad,iContacto,sDireccion){
    this.nombre=sNombre;
    this.apellidos=sApellidos;
    this.dni=sDni;
    this.edad=iEdad;
    this.contacto=iContacto;
    this.direccion=sDireccion;
}

function ActividadExtra(iId,sNombre){
    this.id=iId;
    this.nombre=sNombre;
    this.alumnos=[];
}

function Asignatura(iId,sNombre,sProfesor){
    this.id=iId;
    this.nombre=sNombre;
    this.profesor=sProfesor;
    this.alumnos=[];
}

function Grupo(sNombre,sCurso,sProfesor){
    this.alumnos=[];
    this.nombre=sNombre;
    this.curso=sCurso;
    this.profesor=sProfesor;
}
function Matricula(sAlumno,iAnnio){
    this.alumno=sAlumno;
    this.annio=iAnnio;
}
function Expediente(sAlumno){
    this.alumno=sAlumno;
    this.notas=new Array([]);
    this.observaciones="";
}

function BonoComedor(sAlumno,sHorario){
    this.alumno=sAlumno;
    this.horario=sHorario;
    this.alimentosAlergico=[];
}

Guarderia.prototype.buscarProfesor= function (sDni) {
    var oProfesor=null;
    var bEncontrado=false;
    for(var i=0;i<this.profesores.length && !bEncontrado;i++){
        if(this.profesores[i].dni==sDni){
            oProfesor =  this.profesores[i];
            bEncontrado=true;
        }
    }
    return oProfesor;
};
Guarderia.prototype.buscarAlumno= function (sDni) {
    var oAlumno=null;
    var bEncontrado=false;
    for(var i=0;i<this.alumnos.length && !bEncontrado;i++){
        if(this.alumnos[i].dni==sDni){
            oAlumno =  this.alumnos[i];
            bEncontrado=true;
        }
    }
    return oAlumno;
};

Guarderia.prototype.buscarMatricula=function(sDniAlumno,iAnnio){
    var oMatricula=null;
    var bEncontrado=false;
    for(var i=0;i<this.matriculas.length && !bEncontrado;i++){
        if(this.matriculas[i].alumno==sDniAlumno && this.matriculas[i].annio==iAnnio){
            oMatricula=this.matriculas[i];
            bEncontrado=true;
        }
    }
    return oMatricula;
};

Guarderia.prototype.buscarExpediente=function(sDniAlumno){
    var oExpediente=null;
    var bEncontrado=false;
    for(var i=0;i<this.expedientes.length && !bEncontrado;i++){
        if(this.expedientes[i].alumno==sDniAlumno)
        {
            oExpediente=this.expedientes[i];
            bEncontrado=true;
        }
    }
    return oExpediente;
};

Guarderia.prototype.buscarBonoComedor=function(sDniAlumno){
    var oBonoComedor=null;
    var bencontrado=false;
    for(var i=0;i<this.bonosComedor.length && !bencontrado;i++){
        if(this.bonosComedor[i].alumno==sDniAlumno){
            oBonoComedor=this.bonosComedor[i];
            bencontrado=true;
        }
    }
    return oBonoComedor;
};

Guarderia.prototype.buscarActividadExtra=function(iID){
    var oActividadExtra=null;
    var bEncontrado=false;
    for(var i=0;i<this.actividadesExtra.length && !bEncontrado;i++){
        if(this.actividadesExtra[i].id==iID){
            oActividadExtra=this.actividadesExtra[i];
            bEncontrado=true;
        }
    }
    return oActividadExtra;
};

Guarderia.prototype.altaAlumno=function(oAlumno){
    var sRes = "Alta Alumno correctamente";
    if (this.buscarAlumno(oAlumno.dni) == null ){
        this.alumnos.push(oAlumno);
    }
    else{
        sRes = "Alumno ya registrado";
    }

    return sRes;
};

Guarderia.prototype.altaProfesor=function(oProfesor){
    var sRes = "Alta Profesor correctamente";
    if (this.buscarProfesor(oProfesor.dni) == null ){
        this.profesores.push(oProfesor);
    }
    else{
        sRes = "Profesor ya registrado";
    }

    return sRes;
};
Guarderia.prototype.altaMatricula=function(sDniAlumno,iAnnio){
    var sRes="Matriculación correctamente";
    if(this.buscarAlumno(sDniAlumno)==null){
        sRes="El alumno no existe";
    }
    else if(this.buscarMatricula(sDniAlumno,iAnnio)!=null){
        sRes="El alumno ya esta matriculado en ese año";
    }
    else{
        this.matriculas.push(new Matricula(sDniAlumno,iAnnio));
    }
    return sRes;
};
Guarderia.prototype.altaExpediente=function(sDniAlumno){
    var sRes="Alta de expediente correcta";
    if(this.buscarExpediente(sDniAlumno)==null){
        this.expedientes.push(new Expediente(sDniAlumno));
    }
    else{
        sRes="El alumno ya tiene expediente";
    }
    return sRes;
};
Guarderia.prototype.altaBonoComedor=function(oBonoComedor){
    var sRes="Alta de bono correcta";
    if(this.buscarBonoComedor(oBonoComedor.alumno)==null){
        this.bonosComedor.push(oBonoComedor);
    }
    else{
        sRes="El alumno ya tiene bono comedor";
    }
    return sRes;
};

Guarderia.prototype.altaActividadExtra=function(oActividadExtra){
    var sRes="Alta de Actividad Extraescolar correcta";
    if(this.buscarActividadExtra(oActividadExtra.id)!=null){
         sRes="Esta actividad ya existe";
    }
    else{
        this.actividadesExtra.push(oActividadExtra);
    }
    return sRes;
};

Guarderia.prototype.bajaActividadExtra= function (id) {
    var sRes = "Actividad eliminada correctamente";
    var oActividad=this.buscarActividadExtra(id);
    if ( oActividad != null ){
        this.actividadesExtra.remove(oActividad);
    }
    else{
        sRes = "Actividad no registrada";
    }

    return sRes;
};

Guarderia.prototype.bajaProfesor= function (dni) {
    var sRes = "Profesor eliminado correctamente";
    var oProfesor=this.buscarProfesor(dni);
    if ( oProfesor != null ){
        this.profesores.remove(oProfesor);
    }
    else{
        sRes = "Profesor no registrado";
    }

    return sRes;
};
Guarderia.prototype.bajaAlumno= function (dni) {
    var sRes = "Alumno eliminado correctamente";
    var oAlumno= this.buscarAlumno(dni);
    if ( oAlumno != null ){
        this.alumnos.remove(oAlumno); //NO FUNCIONA EL .REMOVE
    }
    else{
        sRes = "Alumno no registrado";
    }

    return sRes;
};
Guarderia.prototype.bajaMatricula=function(sDniAlumno,iAnnio){
    var sRes="Matricula dada de baja";
    var oMatricula=this.buscarMatricula(sDniAlumno,iAnnio);
    if(oMatricula!=null){
        this.matriculas.remove(oMatricula);
    }
    else{
        sRes="La matricula no existe";
    }
    return sRes;
};
Guarderia.prototype.bajaExpediente=function(sDniAlumno){
    var sRes="Baja de expediente correcta";
    var oExpediente=this.buscarExpediente(sDniAlumno);
    if(oExpediente!=null)
    {
        this.expedientes.remove(oExpediente);
    }
    else{
        sRes="El expediente no existe";
    }
};
Guarderia.prototype.bajaBonoComedor=function(dni){
    var sRes="Baja de bono correcta";
    var oBonoComedor=this.buscarBonoComedor(dni);
    if(oBonoComedor !=null){
        this.bonosComedor.remove(oBonocomedor);
    }
    else{
        sRes="El bono no existe";
    }
    return sRes;
};











