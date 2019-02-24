/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
    view: 'login/login'
    },


    'GET /': {
        controller: 'AdminController',
        action: 'viewLogin'
    },

    'POST /login': 'AuthController.login',
    'GET /logout':'AuthController.logout',

    'GET /admin': {
        controller: 'AdminController',
        action: 'viewAdmin'
    },

    /*
    ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  ███████
    ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ ██
    ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ ███████
    ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██      ██
     ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  ███████
    */
  // ::::::::::::.VISTAS::::::::::::::::::::::::::::::::
    '/registrar-usuario': {
        controller: 'UsuariosController',
        action: 'viewRegistrarUsuarios'
    },
    '/lista-usuarios': {
        controller: 'UsuariosController',
        action: 'viewListarUsuarios'
    },
    // :::::::::::::CRUD::::::::::::::::::::::::::::::
    'POST /creatUser':{
      controller:'UsuariosController',
      action:'usuarioC'
    },
    'GET /listUsers':{
      controller:'UsuariosController',
      action:'listaUsuarios'
    },
    'POST /deleteUser':{
      controller:'UsuariosController',
      action:'deleteUser'
    },
    'POST /updateUser':{
      controller:'UsuariosController',
      action:'updateUser'
    },
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    /*
     ██████ ██      ██ ███████ ███    ██ ████████ ███████ ███████
    ██      ██      ██ ██      ████   ██    ██    ██      ██
    ██      ██      ██ █████   ██ ██  ██    ██    █████   ███████
    ██      ██      ██ ██      ██  ██ ██    ██    ██           ██
     ██████ ███████ ██ ███████ ██   ████    ██    ███████ ███████
    */
    // VIASTAS SSSSSSSSSSS::::::::::::::::
    '/registrarCliente': {
        controller: 'ClientesController',
        action: 'viewRegistrarCLiente'
    },
    '/listarClientes': {
      controller: 'ClientesController',
      action: 'viewListarCLientes'
    },
  // :::::::::::::::::::::::::CRUD:::::::::::::::::::::::::
    'POST /clienteC': {
        controller: 'ClientesController',
        action: 'clienteC'
    },
    'GET /VerClientes': {
        controller: 'ClientesController',
        action: 'listaClientes'
    },
    'POST /deleteClient':{
      controller:'ClientesController',
      action:'deleteClient'
    },
    '/updateCliente':{
      controller:'ClientesController',
      action:'clienteUP'
    },
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    '/findClient':{
      controller:'ClientesController',
      action:'BuscarCLiente'
    },
    /*
    ███████ ██    ██  ██████ ██    ██ ██████  ███████  █████  ██      ███████ ███████
    ██      ██    ██ ██      ██    ██ ██   ██ ██      ██   ██ ██      ██      ██
    ███████ ██    ██ ██      ██    ██ ██████  ███████ ███████ ██      █████   ███████
         ██ ██    ██ ██      ██    ██ ██   ██      ██ ██   ██ ██      ██           ██
    ███████  ██████   ██████  ██████  ██   ██ ███████ ██   ██ ███████ ███████ ███████
    */

    '/registrarSucursal': {
        controller: 'SucursalesController',
        action: 'viewRegistrarSucursal'
    },
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /*
    ██████  ███████ ██████   █████  ██████   █████   ██████ ██  ██████  ███    ██ ███████ ███████
    ██   ██ ██      ██   ██ ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ████   ██ ██      ██
    ██████  █████   ██████  ███████ ██████  ███████ ██      ██ ██    ██ ██ ██  ██ █████   ███████
    ██   ██ ██      ██      ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ██  ██ ██ ██           ██
    ██   ██ ███████ ██      ██   ██ ██   ██ ██   ██  ██████ ██  ██████  ██   ████ ███████ ███████
    */

  // ::::::::::::::::::VISTAS:::::::::::::::::::::::::
    'GET /registrarMantenimiento':{
        controller: 'ReparacionesController',
        action: 'viewRegistrarReparacion',
        skipAssets: true
    },


    '/listaReparaciones': {
        controller: 'ReparacionesController',
        action: 'viewListarReparacion'
    },
    '/viewEntregados': {
      controller: 'ReparacionesController',
      action: 'viewListarEntregados'
    },
// :::::::::::::::::::::::::::::CRUD REPARACIONES :::::::::::::::::::
    'POST /addMantenimiento':{
      controller:'ReparacionesController',
      action:'ReparacionCrear'
    },
    'GET /listMantenimiento':{
      controller:'ReparacionesController',
      action:'listaReparaciones'
    },
    'POST /deleteMantenimiento':{
      controller:'ReparacionesController',
      action:'eliminarReparacion'
    },
    'POST /edoReparacion':{
      controller:'ReparacionesController',
      action:'edoReparacion'
    },
    'POST /upStatusServices':{
      controller:'ReparacionesController',
      action:'upEdoServices'
    },
    'GET /listEntregados':{
      controller:'ReparacionesController',
      action:'listEntregados'
    },

    /*
    ██████  ███████ ██████  ██ ██████   ██████  ███████
    ██   ██ ██      ██   ██ ██ ██   ██ ██    ██ ██
    ██████  █████   ██   ██ ██ ██   ██ ██    ██ ███████
    ██      ██      ██   ██ ██ ██   ██ ██    ██      ██
    ██      ███████ ██████  ██ ██████   ██████  ███████
    */


    '/registrarPedido': {
        controller: 'PedidosController',
        action: 'viewRegistrarPedido'
    },
    '/listarPedidos': {
        controller: 'PedidosController',
        action: 'viewListarPedidos'

    },
    '/historicoP':{
      controller:'PedidosController',
      action:'viewHistoriPedidos'
    },
    'POST /actualizarPedido':{
      controller:'PedidosController',
      action:'updatePedido'
    },
    'POST /addPedido':{
      controller:'PedidosController',
      action:'PedidoC'
    },
    'GET /listPedidos':{
      controller:'PedidosController',
      action:'listarPedidos'
    },
    'GET /historicoPedidos': {
      controller:'PedidosController',
      action:'listHistoricoP'
    },
    /*
     ██████   █████  ██████   █████  ███    ██ ████████ ██  █████  ███████
    ██       ██   ██ ██   ██ ██   ██ ████   ██    ██    ██ ██   ██ ██
    ██   ███ ███████ ██████  ███████ ██ ██  ██    ██    ██ ███████ ███████
    ██    ██ ██   ██ ██   ██ ██   ██ ██  ██ ██    ██    ██ ██   ██      ██
     ██████  ██   ██ ██   ██ ██   ██ ██   ████    ██    ██ ██   ██ ███████
    */
    // :::::::::::::VIEW GARANTIAS:::::::::::::::::::::
    '/registrarGarantia': {
        controller: 'GarantiasController',
        action: 'viewRgarantias'
    },
     '/listarGarantia': {
         controller: 'GarantiasController',
         action: 'viewLgarantias'
     },
     '/listarHistorico': {
         controller: 'GarantiasController',
         action: 'viewHistorico'
     },
    'POST /addGarantia':{
      controller:'GarantiasController',
      action:'RegistrarG'
    },
    'POST /actualizarGarantia':{
      controller:'GarantiasController',
      action:'updateGarantia'
    },
    'GET /listGarantias':{
        controller:'GarantiasController',
        action:'listarGarantia'
    },
    'GET /historicoG':{
      controller:'GarantiasController',
      action:'listHistorico'
    },
    // :::::::::::::::..LISTAR GARANTIAS::::::::::::::
    // 'GET /listGarantias':{
    //
    // }
    /*





    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

};
