/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  viewAdmin:function(req,res){
    return res.view('Clientes/listarClientes',{layout:'layouts/dashboard'});
  },
  viewLogin:function(req,res){
    //return "true";
    return res.view('login/login',{layout:'layouts/login'});
  },



};
