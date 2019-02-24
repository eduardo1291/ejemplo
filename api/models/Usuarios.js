/**
 * Usuarios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    nombre:{
      type:'string',
      required:true
    },
    apellidos:{
      type:'json'
    },
    email:{
      type:'string',
      required:true,
      unique:true,
      email:true
    },
    password:{
      type:'string',
      required:true
    },
    rol: {
      type: 'string',
      defaultsTo: 'admin'
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

    password: function(value) {
      var expresionPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,15}[^'\s]/;
      return  value.match(expresionPass) ;
    },
    email: function(value) {
      var expresionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      return value.match(expresionEmail);
    },

    telefono:function(values){
        var expresionTelefono=/^[\d]{3}[-][\d]{3}[-][\d]{4}$/;
      // var expresionTelefono=/^[\d]{10}$/;
       return values.match(expresionTelefono);

    }
  },

    // checar antes de crear
    beforeCreate: function(values, cb) {
      // Hash password
        bcrypt.hash(values.password, 10, function(err, hash) {
          sails.log.info('primero voy a encriptar el password');
          if (err) return cb(err);
          values.password = hash;
          cb();
        });

  }

};
