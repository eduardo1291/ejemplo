/**
 * Clientes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{
      type:'string'
    },
    apellidos:{
      type:'json'
    },
    email:{
      type:'string',
    },

    direccion:{
      type:'string'
    },
    telefono: {
      type: 'string',
      unique:true,
      required:true,
      telefono:true
    },
    sucursal:{
      model:'Sucursales'
    }

  },
  types: {

    telefono:function(values){
        var expresionTelefono=/^[\d]{3}[-][\d]{3}[-][\d]{4}$/;
      // var expresionTelefono=/^[\d]{10}$/;
       return values.match(expresionTelefono);

    }
  },
};
