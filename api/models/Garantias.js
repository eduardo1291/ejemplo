/**
 * Garantias.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    folio:{
      type:'integer'
    },
    cliente:{
      type:'json'
    },

    usuario:{
      model:'Usuarios'
    },
    equipo:{
      type:'json'
    },

    falla:{
      type:'String'
    },
    sucursal:{
      model:'Sucursales'
    },
    accesorios:{
      type:'String'
    },
    entre:{
      type:'datetime'
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
     enum: ['Pendiente','Procesado','Reparado','Entregado']
   }


 }


  };
