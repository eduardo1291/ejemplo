/**
 * EnviosController
 *
 * @description :: Server-side logic for managing envios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	enviosC: function(req, res) {


		Envios.create({
			año:req.body.año,
			mes:req.body.mes,
			dia:req.body.dia,
			productos:{


					cantidad:req.body.cantidad,
					descripcion:req.body.descripcion,
					modeo:req.body.modelo,
					clave:req.body.clave,
					precio:req.body.precio

			}
		}).exec(function(err, user) {
			if (err) {
				sails.log.info('error al crear el usuario', err);
				//res.end('error al crear el usuario');
				return res.json({"error":true,"message":err});
			}
			sails.log('usuario agregado', user);
			//res.send({error:false,message:"Usuario Agregado"});
			return res.json({error:false,message:"Usuario Agregado"});
		});

	}
};
