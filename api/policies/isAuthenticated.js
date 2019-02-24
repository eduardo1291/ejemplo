module.exports = function(req, res, next) {
  sails.log.info('entre ala politica para validar el login');
  if (req.isAuthenticated()) {
    sails.log.info('adelante usuario validado');
      return next();
  }
  else{
      return res.redirect('/');
  }
};
