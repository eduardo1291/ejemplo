/**
 * ClientesController
 *
 * @description :: Server-side logic for managing clientes
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

    viewRegistrarCLiente: function(req, res) {
        sails.log('si llego ala vista de registrar cliente');
        return res.view('Clientes/registrarCliente', {
            layout: 'layouts/dashboard'
        });
    },
    // :::::::::::::::::::::::::::::::::
    viewListarCLientes: function(req, res) {
        return res.view('Clientes/listarClientes', {
            layout: 'layouts/dashboard'
        });
    },



    /*
    ██      ██ ███████ ████████  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██      ██ ██         ██    ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    ██      ██ ███████    ██    ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██      ██      ██    ██    ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ███████ ██ ███████    ██    ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    listaClientes: function(req, res) {
        sails.log.info('listar clientes ...........................');
        Clientes.find({
            sucursal: req.session.usuario.sucursal
        }).populate('sucursal').exec(function(err, clientes) {
            if (err) return res.send(error);
            if (!clientes) {
                sails.log.info('no hay clientes registrados');
                return res.json({
                    error: true,
                    message: "no hay usuarios registrados "
                });

            } else {
                // sails.log('encontre estos clientes', JSON.stringify(clientes));
                return res.json(clientes);
            }

        });
    },
    /*
    ██████  ██    ██ ███████  ██████  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██   ██ ██    ██ ██      ██      ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    ██████  ██    ██ ███████ ██      ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██   ██ ██    ██      ██ ██      ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ██████   ██████  ███████  ██████ ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    BuscarCliente: function(req, res) {
        var nombre = req.body.clienten;
        var telefonocl = req.body.telefonoC;
        sails.log.info('estoy recibiendo estos datosp para buscar el cliente', req.body);
        sails.log.info('este es el nombre del cliente', nombre);
        sails.log.info('este es el telefono del cliente', telefonocl);
        Clientes.findOne({
            nombre: nombre,
            telefono: telefonocl
        }).exec(function(err, cliente) {
            if (err) return res.send('error al buscar al cliente');
            if (!cliente) {
                sails.log.info('ningun cliente con esos datos');
                return res.json({
                    error: true,
                    message: "cliente no encontrado favor de registrarlo :)"
                });
            } else {
                sails.log.info('se encontro el cliente que buscas;', cliente);
                return res.json({
                    error: false,
                    message: "cliente registrado, registra tu pedido ;)"
                });
            }
        });

    },
    /*
     ██████ ██████  ███████  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██      ██   ██ ██      ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    ██      ██████  █████   ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██      ██   ██ ██      ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
     ██████ ██   ██ ███████ ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    clienteC: function(req, res) {
        var object1 = [{
            telefono: req.body.telefono
        }];
        Clientes.findOne(
            object1
        ).exec(function(err, encontrado) {
            if (err) return res.send('error al buscar coincidencias');
            if (encontrado) {
                return res.send({
                    "error": true,
                    "message": 'lo sentimos este numero telefonico ya se encuentra registrado'
                });
            } else {
                Clientes.create({
                    nombre: req.body.nombre,
                    apellidos: {
                        apellidoPaterno: req.body.apellidoP,
                        apellidoMaterno: req.body.apellidoM
                    },
                    email: req.body.email,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    sucursal: req.session.usuario.sucursal
                }).exec(function(err, cliente) {
                    if (err) {
                        sails.log.info('error al crear el cliente', err);
                        //res.end('error al crear el usuario');
                        return res.json({
                            "error": true,
                            "message": 'Inconsistencia de datos'
                        });
                    }
                    sails.log('cliente agregado', cliente);
                    //res.send({error:false,message:"Usuario Agregado"});
                    return res.json({
                        error: false,
                        message: "cliente Agregado"
                    });
                });
            }
        });
    },
    /*
    ██████   ██████  ██████  ██████   █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██   ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    ██████  ██    ██ ██████  ██████  ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██   ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ██████   ██████  ██   ██ ██   ██ ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    deleteClient: function(req, res) {
        sails.log.info('==============>Delete/clienteDelete==================>');
        Clientes.findOne({
            id: req.body.id
        }).exec(function(err, encontrado) {
            if (err) {
                return res.json({
                    error: true,
                    message: 'error al buscar el cliente'
                });
            }
            if (!encontrado) {
                sails.log('cliente no encontrado');
                return res.json({
                    error: true,
                    message: 'cliente no encontrado'
                });
            } else {
                Clientes.destroy({
                    id: encontrado.id
                }).exec(function(err, eliminado) {
                    if (err) {
                        return res.json({
                            error: true,
                            message: 'Error al eliminar el cliente'
                        });
                    } else {
                        return res.json({
                            error: false,
                            message: 'Cliente eliminado'
                        });
                    }

                });
            }
        });
    },

    /*
     █████   ██████ ████████ ██    ██  █████  ██      ██ ███████  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██   ██ ██         ██    ██    ██ ██   ██ ██      ██    ███  ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    ███████ ██         ██    ██    ██ ███████ ██      ██   ███   ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██   ██ ██         ██    ██    ██ ██   ██ ██      ██  ███    ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ██   ██  ██████    ██     ██████  ██   ██ ███████ ██ ███████ ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    clienteUP: function(req, res) {
        sails.log('>>>>>>>CLIENTES/CLIENTES UPDATE>>>>>>>>>>>>' + JSON.stringify(req.body));
        var clientUpdate;
        if (!req.body.email && !req.body.telefono) {
            // el cliente no modifico nada
            clientUpdate = {
                nombre: req.body.nombre,
                apellidos: {
                    apellidoPaterno: req.body.apellidoP,
                    apellidoMaterno: req.body.apellidoM
                },
                direccion: req.body.direccion
            };
            sails.log('CLIENTE SIN MODIFICACION DE IDENTIFICADORES', req.body.id);
            Clientes.update({
                id: req.body.id
            }, clientUpdate).exec(function afterwards(err, actualizado) {
                if (err) {
                    sails.log('error al actualizar', JSON.stringify(err));
                    return res.json({
                        error: true,
                        message: 'error en la consistencia de datos'
                    });
                } else {
                    sails.log('cliente actualizado');
                    return res.json({
                        error: false,
                        message: 'cliente actualizado'
                    });
                }
            });
        }
        if (req.body.email && !req.body.telefono) {
            sails.log('se modifico el email, buscando coincidencias');
            clientUpdate = {
                nombre: req.body.nombre,
                apellidos: {
                    apellidoPaterno: req.body.apellidoP,
                    apellidoMaterno: req.body.apellidoM
                },
                email: req.body.email,
                direccion: req.body.direccion
            };
            Clientes.findOne({
                email: req.body.email
            }).exec(function(err, encontrado) {
                if (err) {
                    sails.log('ERROR AL BUACAR COINCIDENCIAS');
                    return res.json({
                        error: true,
                        message: 'error al buscar el cliente'
                    });
                }
                if (!encontrado) {

                    Clientes.update({
                        id: req.body.id
                    }, clientUpdate).exec(function afterwards(err, actualizado) {
                        if (err) {
                          sails.log('error al actualizar el cliente con email ');
                            return res.json({
                                error: true,
                                message: 'error al actualizar el cliente'
                            });
                        } else {
                          sails.log('cliente actualizado');
                            return res.json({
                                error: false,
                                message: 'Cliente actualizado'
                            });
                        }
                    });
                } else {
                    sails.log('CIENTE CON LOS MISMOS DATOS'+JSON.stringify(encontrado));
                    return res.json({
                        error: true,
                        message: 'Ya hay un cliente registrado con ese email'
                    });
                }
            });
        }
        if (!req.body.email && req.body.telefono) {
            sails.log.info('se modifico el telefono, buscando coincidencias');
            clientUpdate = {
                nombre: req.body.nombre,
                apellidos: {
                    apellidoPaterno: req.body.apellidoP,
                    apellidoMaterno: req.body.apellidoM
                },
                telefono: req.body.telefono,
                direccion: req.body.direccion
            };
            Clientes.findOne({
                telefono: req.body.telefono
            }).exec(function(err, encontrado) {
                if (err) {
                    sails.log('error al buscar coincidencia');
                    return res.json({
                        error: true,
                        message: ''
                    });
                }
                if (!encontrado) {
                    Clientes.update({
                        id: req.body.id
                    }, clientUpdate).exec(function afterwards(err, actualizado) {
                        if (err) {
                            return res.json({
                                error: true,
                                message: 'error al actualizar el cliente'
                            });
                        }
                        sails.log('cliente actualizado ');
                        return res.json({
                            error: false,
                            message: 'Cliente actualizado'
                        });
                    });
                } else {
                  sails.log('ya hay un cliente con ese telefono',JSON.stringify(encontrado));
                    return res.json({
                        error: true,
                        message: 'Ya hay un cliente registrado con ese numero telefonico'
                    });
                }
            });
        }
        if (req.body.email && req.body.telefono) {
            sails.log.info(' se modificaron los identificadores, buscando coincidencias');
            var identificadores = [{
            email: req.param('email'),
            telefono: req.param('telefono'),
        }];
            clientUpdate = {
                nombre: req.body.nombre,
                apellidos: {
                    apellidoPaterno: req.body.apellidoP,
                    apellidoMaterno: req.body.apellidoM
                },
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion
            };
            Clientes.findOne(identificadores).exec(function(err, encontrado) {
                if (err) {
                    sails.log('error al buscar coincidencia de identificadores');
                    return res.json({
                        error: true,
                        message: 'error al buscar el cliente'
                    });
                }
                if (!encontrado) {

                    Clientes.update({
                        id: req.body.id
                    }, clientUpdate).exec(function afterwards(err, actualizado) {
                        if (err) {
                            return res.json({
                                error: true,
                                message: 'error al actualizar el cliente'
                            });
                        }
                        sails.log('cliente actualizado');
                        return res.json({
                            error: false,
                            message: 'Cliente actualizado'
                        });
                    });
                }else {
                    sails.log('CIENTE CON LOS MISMOS DATOS'+JSON.stringify(encontrado));
                    return res.json({
                        error: true,
                        message: 'Ya hay un cliente registrado con ese email o telefono'
                    });
                }
            });

        }
        // Se modifico uno de los identificadores email o telefono



    },
};
