/**
 * ReparacionesController
 *
 * @description :: Server-side logic for managing reparaciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /*
    ██    ██ ██ ███████ ████████  █████  ███████
    ██    ██ ██ ██         ██    ██   ██ ██
    ██    ██ ██ ███████    ██    ███████ ███████
     ██  ██  ██      ██    ██    ██   ██      ██
      ████   ██ ███████    ██    ██   ██ ███████
    */
    viewRegistrarReparacion: function(req, res) {
        return res.view('Servicios/registrarReparacion', {
            layout: 'layouts/dashboard'
        });
    },

    viewListarReparacion: function(req, res) {
        return res.view('Servicios/listarReparaciones', {
            layout: 'layouts/dashboard'
        });
    },
    viewListarEntregados:function(req,res) {
      return res.view('Servicios/listarEntregados', {
          layout: 'layouts/dashboard'
      });
    },

    /*
    ██      ██ ███████ ████████  █████  ██████
    ██      ██ ██         ██    ██   ██ ██   ██
    ██      ██ ███████    ██    ███████ ██████
    ██      ██      ██    ██    ██   ██ ██   ██
    ███████ ██ ███████    ██    ██   ██ ██   ██
    */

    listaReparaciones: function(req, res) {
      var arraystatus=['Pendiente','Reparado'];
        Reparaciones.find({
            sucursal: req.session.usuario.sucursal,status:arraystatus
        }).populate('sucursal').populate('cliente').exec(function(err, reparaciones) {
            if (err) return res.send(error);
            if (!reparaciones) {
                return res.json({
                    error: true,
                    message: "nno hay reparacioens registradas "
                });
            } else {
                sails.log.info('estas son las reparaciones' + JSON.stringify(reparaciones));
                return res.json(reparaciones);
            }
        });
    },
    listEntregados:function(req,res){
        Reparaciones.find({
            sucursal: req.session.usuario.sucursal,status:"Entregado"
        }).populate('sucursal').populate('cliente').exec(function(err, reparaciones) {
            if (err) return res.send(error);
            if (!reparaciones) {
                return res.json({
                  error: true,
                  message: "nno hay reparacioens registradas "
                });
            } else {
                sails.log.info('estas son las reparaciones' + JSON.stringify(reparaciones));
                return res.json(reparaciones);
            }
        });
    },
    /*
     ██████ ██████  ███████  █████  ██████
    ██      ██   ██ ██      ██   ██ ██   ██
    ██      ██████  █████   ███████ ██████
    ██      ██   ██ ██      ██   ██ ██   ██
     ██████ ██   ██ ███████ ██   ██ ██   ██
    */
    ReparacionCrear: function(req, res) {
        sails.log.info('esto estoy recibiendo de tu pedido.------', req.body);
        var clientenombre = req.body.clienten;
        var telefonoCliente = req.body.telefonoC;
        var arrayEquipos = req.body.equipos;
        var dia = req.body.dia;
        var mes = req.body.mes;
        var año = req.body.año;
        var importe = req.body.importe;
        var observaciones = req.body.observaciones;
        var accesorios = req.body.accesorios;
        Clientes.findOne({
            nombre: clientenombre,
            telefono: telefonoCliente
        }).exec(function(err, cliente) {
            if (err) return res.json({
                erro: true,
                message: 'erro al buscar el cliente'
            });
            if (!cliente) {
                return res.json({
                    encontrado: false,
                    message: 'cliente no encontrado'
                });
            }
            sails.log.info('vamos a meter el importe' + req.body.importe);
            Reparaciones.count().exec(function(err, total) {
                Reparaciones.create({
                    folio: total + 1,
                    cliente: cliente.id,
                    equipos: arrayEquipos,
                    sucursal: req.session.usuario.sucursal,
                    usuario: req.session.usuario.id,
                    importe: importe,
                    accesorios: accesorios,
                    observaciones: observaciones,
                    progress: 0,
                    reparados:0,
                    dia: dia,
                    mes: mes,
                    año: año
                }).exec(function(err, creado) {
                    if (err) {
                        return res.json({
                            error: true,
                            message: 'error al crear el registro del Mantenimiento'
                        });
                    } else {
                        sails.log.info(' se creo el servicio de reparacion', creado);
                        // GENERAMOS UN OBJETO REPORTE PARA ENVIARLSELO ALA FUNCION QUE GENERARA EL PDF
                        var reporte = {
                            folio:creado.folio,
                            cliente: cliente,
                            equipos: arrayEquipos,
                            id: creado.id,
                            importe: importe,
                            accesorios:creado.accesorios,
                            observaciones:creado.observaciones
                        };
                        return res.json({
                            error: false,
                            message: 'Mantenimiento registrado :)',
                            servicio:reporte
                        });
                    }
                });
            });
        });
    },

    /*
    ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████      ██████  ███████ ██████   █████  ██████   █████   ██████ ██  ██████  ███    ██
    ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██   ██ ██      ██   ██ ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ████   ██
    █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ██████  █████   ██████  ███████ ██████  ███████ ██      ██ ██    ██ ██ ██  ██
    ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██   ██ ██      ██      ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ██  ██ ██
    ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██     ██   ██ ███████ ██      ██   ██ ██   ██ ██   ██  ██████ ██  ██████  ██   ████
    */

    eliminarReparacion: function(req, res) {
        sails.log.info('**********estas en eliminar la reparacion estas seguro??????');
        var servicio = req.body.id;
        sails.log.info('voy a eliminar a este servicio', servicio);
        Reparaciones.findOne({
            id: req.body.id
        }).populate('cliente').populate('sucursal').exec(function(err, encontrado) {
            if (err) {
              sails.log('error de servidor', err);
              return res.json({
                "error": true,
                "message": err
              });
            }
            if (!encontrado) {
              sails.log('establecimiento no encontrado');
              return res.json({
                "error": true,
                "message": "Esatablecimiento no encontrado"
              });
            } else {
                Reparaciones.destroy({
                  id: encontrado.id
                }).exec(function(err, eliminado) {
                    if (err) {
                      sails.log("No se pudo eliminar el establecimiento");
                      return res.json({
                        "error": true,
                        "message": err
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

      edoReparacion: function(req, res) {
        var equipoup;
        sails.log('vamos actualizar el estado de un equipo en reparacion' + JSON.stringify(req.body));
        Reparaciones.findOne({
          folio: req.body.folio
        }).exec(function(err, servicio) {
              if (err) {
                  return res.json({
                    "error": true,
                    "message": "ERROR INESPERADO"

                  });
              }
            sails.log('encontramos el servicio al que se modificara el equipo' + JSON.stringify(servicio));
            for (var i = 0; i <= servicio.equipos.length - 1; i++) {
                if (servicio.equipos[i].index === req.body.index) {
                    sails.log(servicio.equipos[i].status);
                    servicio.equipos[i].status = req.body.estado;
                    sails.log(servicio.equipos[i].status);
                }
            }
            if (req.body.estado === "Reparado") {
              var totales = servicio.equipos.length;
                servicio.reparados+=1;
                sails.log('total reparados' +servicio.reparados);
                servicio.progress=(servicio.reparados*100)/totales;
                sails.log('llevas esto de progreso'+servicio.progress);
            }
            servicio.save(function(err) {
                if (err) {
                    return res.json({
                        "error": true,
                        "message": "ERROR INESPERADO"
                    });
                }
                return res.json({
                    "error": false,
                    "message": "EQUIPO ACTUALIZADO"
                });
            });
        });
      },
    upEdoServices:function(req,res){
      sails.log.info('==============>UPDATE/updateStadoServices==================>');
     sails.log('esto trae el servicio a actualizar',req.body.folio);
     var estado=req.body.estado;
     var newStatus={
       status:estado
     };
     if(req.body.estado !== 'undefined'){

       Reparaciones.update({
         folio: req.body.folio
       },newStatus)
       .then(function(updatedUser) {
         return res.json({
           "error": false,
           "message": 'Servicio actualizado'
         });
         
       }).catch(function(err) {
         return res.json({
           "error": true,
           "message": 'No pudimos actualizar el estado'
         });
       });
     }else {
       return res.json({
         "error": true,
         "message": 'No pudimos actualizar el estado'
       });
     }
    }

};
