/**
 * Envios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sucursal: {
      model: 'sucursales'
    },
    año: {
      type: 'string'
    },
    mes: {
      type: 'string'
    },
    dia: {
      type: 'string'
    },
    productos:{
      type:'json'
    },
    precio:{
      type:'string'
    }
  }

};
