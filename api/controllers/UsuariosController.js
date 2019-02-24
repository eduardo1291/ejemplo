 /**
  * UsuariosController
  *
  * @description :: Server-side logic for managing usuarios
  * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
  */
 var bcrypt = require('bcrypt');
 var passport = require('passport');
 module.exports = {
     /*
     ██    ██ ██ ███████ ████████  █████      ██      ██ ███████ ████████  █████  ██████      ██    ██ ███████ ███████ ██████
     ██    ██ ██ ██         ██    ██   ██     ██      ██ ██         ██    ██   ██ ██   ██     ██    ██ ██      ██      ██   ██
     ██    ██ ██ ███████    ██    ███████     ██      ██ ███████    ██    ███████ ██████      ██    ██ ███████ █████   ██████
      ██  ██  ██      ██    ██    ██   ██     ██      ██      ██    ██    ██   ██ ██   ██     ██    ██      ██ ██      ██   ██
       ████   ██ ███████    ██    ██   ██     ███████ ██ ███████    ██    ██   ██ ██   ██      ██████  ███████ ███████ ██   ██
     */

     viewListarUsuarios: function(req, res) {
         return res.view('usuario/lista-usuarios', { layout: 'layouts/dashboard' });
     },

     viewRegistrarUsuarios: function(req, res) {
         return res.view('usuario/registrar', { layout: 'layouts/dashboard' });
     },
     /*'
     ██      ██ ███████ ████████  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  ███████
     ██      ██ ██         ██    ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ ██
     ██      ██ ███████    ██    ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ ███████
     ██      ██      ██    ██    ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██      ██
     ███████ ██ ███████    ██    ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  ███████
     */

     listaUsuarios: function(req, res) {
         Usuarios.find().populate('sucursal').exec(function(err, usuarios) {
             if (err) return res.send(error);
             if (!usuarios) {
                 return res.json({
                     error: true,
                     message: "no hay usuarios registrados "
                 });

             } else {
                 return res.json(usuarios);
             }

         });
     },

     /*prueba
      ██████ ██████  ███████  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
     ██      ██   ██ ██      ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
     ██      ██████  █████   ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
     ██      ██   ██ ██      ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
      ██████ ██   ██ ███████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
     */
     usuarioC: function(req, res) {
         sails.log.info('estoy recibiendo esto para crear el usuario', req.body);

         var object1 = [{
                 email: req.body.email
             },

             {
                 telefono: req.body.telefono
             }
         ];
         Usuarios.findOne(
             object1
         ).exec(function(err, encontrado) {
             if (err) return res.send('error');
             if (encontrado) {
                 return res.send({
                     "error": true,
                     "message": "lo sentimos correo o telefono ya se han registrados por otro usuario"
                 });
                 // sails.log.info('ya existe un usuario con esos datos');
             } else {
                 Sucursales.findOne({
                     sucursal: req.body.sucursal
                 }).exec(function(err, encontrado) {
                     if (err) return sails.serverError();
                     if (encontrado) {
                         sails.log.info('encontre tu sucursal', encontrado);
                         Usuarios.create({
                             nombre: req.body.nombre,
                             apellidos: {
                                 apellidoP: req.body.apellidoP,

                                 apellidoM: req.body.apellidoM,
                             },
                             email: req.body.email,
                             rol: req.body.rol,
                             foto: req.body.foto,
                             password: req.body.password,
                             telefono: req.body.telefono,
                             sucursal: encontrado.id
                         }).exec(function(err, user) {
                             if (err) {
                                 sails.log.info('error al crear el usuario', err);
                                 //res.end('error al crear el usuario');
                                 return res.json({

                                     "message": "error"
                                 });
                             }
                             sails.log('usuario agregado', user);
                             //res.send({error:false,message:"Usuario Agregado"});
                             return res.json({
                                 error: false,
                                 message: "Usuario Agregado"
                             });
                         });
                     } else {
                         return res.json({
                             message: 'No existe sucursal'
                         });
                         // sails.log.info('no encontre la sucursal a la que se registro este usuario');
                     }
                 });
             }
         });
     },
     /*
     ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
     ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
     █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
     ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
     ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
     */

     deleteUser: function(req, res) {
         sails.log.info('==============>Delete/usuarioeDelete==================>');
         Usuarios.findOne({
             id: req.body.id
         }).populate('sucursal').exec(function(err, encontrado) {
             if (err) {
                 return res.json({
                     "error": true,
                     "message": "error en el servidor "
                 });
             }
             if (!encontrado) {
                 sails.log('usuario no encontrado');
                 return res.json({
                     "error": true,
                     "message": "Usuario no encontrado"
                 });
             } else {
                 Usuarios.destroy({
                     id: encontrado.id
                 }).exec(function(err, eliminado) {
                     if (err) {
                         sails.log("No se pudo eliminar el usuario");
                         return res.json({
                             "error": true,
                             "message": "no se puede elimnar el usuario contacte al administrador"
                         });
                     } else {
                         sails.log("Eliminado", eliminado);
                         return res.json({
                             "error": false,
                             "message": "Establecimiento eliminado"
                         });
                     }
                 });
             }
         });
     },
     /*
      █████   ██████ ████████ ██    ██  █████  ██      ██ ███████  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
     ██   ██ ██         ██    ██    ██ ██   ██ ██      ██    ███  ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
     ███████ ██         ██    ██    ██ ███████ ██      ██   ███   ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
     ██   ██ ██         ██    ██    ██ ██   ██ ██      ██  ███    ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
     ██   ██  ██████    ██     ██████  ██   ██ ███████ ██ ███████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
     */


     updateUser: function(req, res) {
         sails.log('<<<<<<<<<<<<<<UPDATE /usuario/usuarioUpdate>>>>>>>>>>>>>>>>>>><', req.body);

         userUpdate = {
             nombre: req.param('nombre'),
             apellidos: {
                 apellidoP: req.param('apellidoP'),
                 apellidoM: req.param('apellidoM'),
             },
             email: req.param('email'),
             telefono: req.param('telefono'),
         };
         Usuarios.update({
                 id: req.param('id')
             }, userUpdate)
             .then(function(updatedUser) {

                 return res.json({
                     "error": false,
                     "message": 'Usuario actualizado'
                 });
             }).catch(function(err) {
                 return res.json({
                     "error": true,
                     "message": 'verifique campos'
                 });
             });
     },



 };