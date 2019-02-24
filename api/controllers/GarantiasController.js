/**
 * GarantiasController
 *
 * @description :: Server-side logic for managing garantias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var dateFormat = require('dateformat');
module.exports = {
    viewRgarantias: function(req, res) {
        return res.view('Garantias/registrarGrantia', {
            layout: 'layouts/dashboard'
        });
    },
    viewHistorico:function(req, res){
      return res.view('Garantias/historicoGarantia',{
            layout:'layouts/dashboard'
      });
    },
    viewLgarantias:function(req,res){
      sails.log('voy a listar las garantias.');
      return res.view('Garantias/listarGarantia',{
        layout:'layouts/dashboard'
      });
    },
    listarGarantia:function(req,res){
      sails.log.info('get garantias.........');
     var arraystatus=['Pendiente','Procesado','Reparado'];
        Garantias.find({
        sucursal: req.session.usuario.sucursal,status:arraystatus
        }).exec(function(err,garantias){
            if(err) return res.serverError('Error interno');
            return res.json(garantias);
        });
    },
    listHistorico:function(req,res){
      sails.log.info('voy a mostrar el historico de las garantias');
      Garantias.find({sucursal:req.session.usuario.sucursal,status:"Entregado"}).exec(function(err, historico){
        if(err) return res.serverError('Error interno');
        return res.json(historico);
      });
    },
    RegistrarG: function(req, res) {
        sails.log.info('estoy llegando a registrar la garantia y traigo esto', req.body);
        Garantias.count().exec(function(err, total) {
            if (err) {
                sails.log('ocurrio un error al contar el folio');
                return res.json({
                    error: true,
                    message: 'No pudimos obtener el folio, contacte al administrador'
                });
            } else {
                var folio=total+1;

                var garantia = {
                    folio:folio,
                    cliente: {
                        nombre: req.body.cliente,
                        apellido:req.body.apellido,
                        telefono: req.body.telefono
                    },
                    usuario: req.session.usuario,
                    equipo: {
                        equipo: req.body.equipo,
                        marca: req.body.marca,
                        modelo: req.body.modelo,
                        numeroSerie: req.body.numSerie
                    },
                    falla: req.body.falla,
                    entrega:dateFormat(req.body.entrega,"dd/mm/yyyy"),
                    sucursal: req.session.usuario.sucursal,
                    accesorios: req.body.accesorios,
                    observaciones: req.body.observaciones,
                    dia: req.body.dia,
                    mes: req.body.mes,
                    año: req.body.año

                };
                Garantias.create(garantia).exec(function(err, creada) {
                    if (err) {
                        return res.json({
                            error: true,
                            message: 'error al crear la garantia consulte al administrador'
                        });
                    } else {
                    sails.log('garantia registrada');
                        return res.json({
                            error: false,
                            message: 'Garantia registrada',
                            garantia:creada
                        });
                    }

                });
            }
        });


    },
    updateGarantia: function (req,res){
        sails.log.info('==============>UPDATE/updateGarantia==================>');
        sails.log('esto trae el pedido a actualizar',req.body);
        var estado=req.body.estado;
        var newStatus={
            status:estado
        };
        Garantias.update({
            id: req.body.id
         },newStatus)
         .then(function(updateGarantia) {
             return res.json({
                "error": false,
                "message": 'Pedido actualizado'
             });
         }).catch(function(err) {
             return res.json({
                "error": true,
                "message": 'No pudimos actualizar el estado'
             });
         });
    }


};
