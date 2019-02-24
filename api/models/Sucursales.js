/**
 * Sucursales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{
      type:'string',
      defaultsTo:'TICOMP'
    },
    sucursal:{
      type:'string'
    },
    direccion:{
      type:'string'
    },
    telefono:{
      type:'string',
    
    },
    usuarios: {
      collection: 'Usuarios',
      via :'sucursal'
    },
    clientes:{
      collection: 'Clientes',
      via :'sucursal'
    }


  }
};
