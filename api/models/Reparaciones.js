/**
 * Reparaciones.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cliente:{
      model:'Clientes'
    },
    usuario:{
      model:'Usuarios'
    },
    equipos:{
      type:'array'
    },
    sucursal:{
      model:'Sucursales'
    },
    dia:{
      type:'String'
    },
    mes:{
      type:'String'
    },
    año:{
      type:'String'
    },
    status:{
     type:"String",
     defaultsTo:"Pendiente",
     enum: ['Pendiente','Reparado','Entregado']
   },
   importe:{
     type:'json'
   },
   folio:{
     type:'integer'
   },
   observaciones:{
     type:'string'
   },
   accesorios:{
     type:'string'
   },
   progress:{
     type:'integer'
   },
   reparados:{
     type:'integer'
   }



 },
 afterDestroy: function(registro, cb) {
 		sails.log.info("----------------------voy a aguardar en hisotrico el servicio eliminado que es :",registro);

 		//agregar el servicio de reparacion a historico
    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAY0', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var indicemes = parseInt(mm);
    var mesnombre = meses[indicemes - 1];
    if (dd < 10) {
        dd = '0' + dd;
    }

    var suc = _.pluck(registro, 'sucursal');
    var user=_.pluck(registro,'usuario');
    var client=_.pluck(registro,'cliente');
    var equiposd=_.pluck(registro,'equipos');
    var importes=_.pluck(registro,'importe');
    sails.log('---------------------------------------este son los datos de los equipos ',equiposd);
    for(var i=0;i<= equiposd.length-1;i++) {
      for(var z=0;z<=equiposd[i].length-1;z++){
        equiposd[i][z].status='Entregado';
        sails.log('°°°°°°°°°°°°°°°°°°|vamos a checar si ya puedo entrar a los datos de cada equipo',equiposd[i][z]);
        if(z>=equiposd[i].length){
          sails.log('objeto resultante',equiposd);

        }
      }

}
    sails.log('voy a mostrar si viene los datos  sucursal',suc.toString());
    sails.log('voy a mostrar si viene los datos  usuario',user.toString());
      servicioHistorico={
      equipos:equiposd[0],
      importe:importes,
      dia:dd,
      mes:mesnombre,
      año:yyyy,
      sucursal:suc.toString(),
      usuario:user.toString(),
      cliente:client.toString()
    };
 		HistoricoReparacion.create(servicioHistorico).exec(function(err,reparacion) {
 			if (err) {
 				sails.log('error al guardar el servicio', err);
 				return  cb('Error al guardar',user);
 			}
 			sails.log("reparacion guardado en historico",JSON.stringify(reparacion));
 		});

 		cb();
 	},


};
