
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Usuarios.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    Usuarios.findOne({ email: email }, function (err, user) {

      if (err) {
        sails.log.info('ocurrio un error al buscar al usuario');
         return done(err);
      }
      if (!user) {
        sails.log.info('usuario no encontrado');
        return done(null, false, { message: 'email incorrecto.' });
      }
      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'password INCORRECTOS'
            });


          var returnUser = {
            email: user.email,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, user, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));
