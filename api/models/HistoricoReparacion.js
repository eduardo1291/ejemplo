/**
 * HistoricoReparacion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        Equipos: {
            type: 'json'

        },
        importe:{
          type:'json'
        },
        dia: {
            type: 'string'
        },
        mes: {
            type: 'string'
        },
        año: {
            type: 'string'
        },
        sucursal:{
          model:'Sucursales'
        },
        usuario:{
          model:'Usuarios'
        },
        cliente:{
          model:'Clientes'
        }
    }
};
