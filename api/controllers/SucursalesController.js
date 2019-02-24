/**
 * SucursalesController
 *
 * @description :: Server-side logic for managing sucursales
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
viewRegistrarSucursal:function(req,res){
	return res.view('Sucursales/registrarSucursal',{layout:'layouts/dashboard'});
},

/*
 ██████ ██████  ███████  █████  ██████      ███████ ██    ██  ██████ ██    ██ ██████  ███████  █████  ██
██      ██   ██ ██      ██   ██ ██   ██     ██      ██    ██ ██      ██    ██ ██   ██ ██      ██   ██ ██
██      ██████  █████   ███████ ██████      ███████ ██    ██ ██      ██    ██ ██████  ███████ ███████ ██
██      ██   ██ ██      ██   ██ ██   ██          ██ ██    ██ ██      ██    ██ ██   ██      ██ ██   ██ ██
 ██████ ██   ██ ███████ ██   ██ ██   ██     ███████  ██████   ██████  ██████  ██   ██ ███████ ██   ██ ███████
*/

	sucursalC: function(req, res) {
		var object1 = [

			{
				telefono: req.body.telefono
			}
		];
		Sucursales.findOne(
			object1
		).exec(function(err, encontrado) {
			if (err) return res.send('error al buscar coincidencias');
			if (encontrado) {
				return res.send({
					"error": true,
					"message": {
						'raw': 'lo sentimos el nombre o telefono ya fue registrado en otra sucursal'
					}
				});
			} else {
				Sucursales.create({
					sucursal: req.body.sucursal,
					telefono: req.body.telefono,
					direccion: req.body.direccion,
					
				}).exec(function(err, sucursal) {
					if (err) {
						sails.log.info('error al cla sucursal', err);
						//res.end('error al crear el usuario');
						return res.json({
							"error": true,
							"message": err
						});
					}
					sails.log('sucursal agregada', sucursal);
					//res.send({error:false,message:"Usuario Agregado"});
					return res.json({
						error: false,
						message: "Sucursal Agregada"
					});
				});
			}
		});
	}

};
