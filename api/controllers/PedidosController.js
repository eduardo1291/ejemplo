/**
 * PedidosController
 *
 * @description :: Server-side logic for managing pedidos
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
  viewRegistrarPedido:function(req,res){
    return res.view('Pedidos/registrarPedido',{layout:'layouts/dashboard'});
  },
  viewListarPedidos:function(req,res){
    return res.view('Pedidos/listar-Pedidos',{layout:'layouts/dashboard'});
  },
  viewHistoriPedidos:function(req,res){
    return res.view('Pedidos/historicoPedidos',{layout:'layouts/dashboard'});
  },
  /*
  ██      ██ ███████ ████████  █████  ██████
  ██      ██ ██         ██    ██   ██ ██   ██
  ██      ██ ███████    ██    ███████ ██████
  ██      ██      ██    ██    ██   ██ ██   ██
  ███████ ██ ███████    ██    ██   ██ ██   ██
  */

  listarPedidos: function(req, res) {
    var arraystatus=['Pendiente','Procesado'];

    Pedidos.find({sucursal:req.session.usuario.sucursal,status:arraystatus}).populate('sucursal').populate('cliente').exec(function(err,pedidos){
      if(err) return res.send(error);
      if(!pedidos){
        return res.json({
          error:true,
          message:"no tienes registro de Pedidos"
        });
      }else {
        sails.log.info('estas son los pedidos'+JSON.stringify(pedidos));
        return res.json(pedidos);
      }
    });
  },
  listHistoricoP:function(req,res){
    Pedidos.find({
        sucursal: req.session.usuario.sucursal,status:"Entregado"
    }).populate('sucursal').populate('cliente').exec(function(err, pedidos) {
        if (err) return res.send(error);
        if (!pedidos) {
            return res.json({
              error: true,
              message: "nno hay pedidos registrados "
            });
        } else {
            sails.log.info('estas son los pedidos' + JSON.stringify(pedidos));
            return res.json(pedidos);
        }
    });
  },
  /*
   ██████ ██████  ███████  █████  ██████      ██████  ███████ ██████  ██ ██████   ██████
  ██      ██   ██ ██      ██   ██ ██   ██     ██   ██ ██      ██   ██ ██ ██   ██ ██    ██
  ██      ██████  █████   ███████ ██████      ██████  █████   ██   ██ ██ ██   ██ ██    ██
  ██      ██   ██ ██      ██   ██ ██   ██     ██      ██      ██   ██ ██ ██   ██ ██    ██
   ██████ ██   ██ ███████ ██   ██ ██   ██     ██      ███████ ██████  ██ ██████   ██████
  */

    PedidoC: function(req, res) {
        sails .log.info('esto estoy recibiendo de tu pedido.------',req.body);
        var clientenombre = req.body.clienten;
        var telefonoCliente = req.body.telefonoC;
        var arrayPedidos = req.body.pedido;
        var dia=req.body.dia;
        var mes= req.body.mes;
        var año= req.body.año;
          var importe = req.body.importe;
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
            sails.log('cliente encontrado mi estimado',cliente);
            Pedidos.count().exec(function(err, total) {
                Pedidos.create({
                    folio:total+1,
                    cliente: cliente.id,
                    pedidos: arrayPedidos,
                    sucursal:req.session.usuario.sucursal,
                    usuario:req.session.usuario.id,
                    importe:importe,
                    dia:dia,
                    mes:mes,
                    año:año
                }).exec(function(err, creado) {
                    if (err) {
                      return res.json({
                        error: true,
                        message: 'error al crear el pedido'
                      });
                    }else{
                         var reporte = {
                            folio:creado.folio,
                            cliente: cliente,
                            equipos: creado.pedidos,
                            importe: creado.importe,

                        };
                      return res.json({
                        error: false,
                        message: 'pedido registrado :)',
                        servicio:reporte

                      });
                    }
                });
            });
        });
    },

    updatePedido: function (req,res){
        sails.log.info('==============>UPDATE/updatePedido==================>');
        sails.log('esto trae el pedido a actualizar',req.body);
        var estado=req.body.estado;
        var newStatus={
            status:estado
        };
        Pedidos.update({
            id: req.body.id
         },newStatus)
         .then(function(updatedUser) {
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
