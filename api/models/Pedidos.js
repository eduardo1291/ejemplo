/**
 * Pedidos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cliente:{
      model:'Clientes'
    },
    equipos:{
      type:'array'
    },
     usuario:{
      model:'Usuarios'
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
     enum: ['Pendiente','Procesado','Entregado']
   },
    importe:{
     type:'json'
   },
      folio:{
     type:'integer'
   },

  }
};
