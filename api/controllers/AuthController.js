/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
var passport = require('passport');
module.exports = {
    /*
    ██       ██████   ██████  ██ ███    ██
    ██      ██    ██ ██       ██ ████   ██
    ██      ██    ██ ██   ███ ██ ██ ██  ██
    ██      ██    ██ ██    ██ ██ ██  ██ ██
    ███████  ██████   ██████  ██ ██   ████
    */



    _config: {
        actions: false,
        shortcuts: false,
        rest: false,
        failureFlash: true
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, usuario, info) {
            if ((err) || (!usuario)) {

                sails.log(usuario);
                req.addFlash('error', 'Usuario o contraseña incorrectas.');
                return res.redirect('/');
                // return res.send({
                //     message: info.message,
                //     user: usuario
                // });
            }
            req.logIn(usuario, function(err) {
                if (err) res.send(err);
                req.session.usuario = usuario;
                sails.log.info('usuario autentificado');
                req.addFlash('success', 'Bienvenido');
                return res.redirect('/admin');
            });
        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }

};