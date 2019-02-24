var Tabla = (function() {

    $(document).ready(function() {

        _crearTabla();
        _mostrarClientes();
        _editarCliente();
        // _Reparacion();

        // Telefono #
        $('.format-phone-number').formatter({
            pattern: '{{999}}-{{999}}-{{99}}{{99}}'
        });
        //nombre
        $('.maxlength-options').maxlength({
            alwaysShow: true,
            threshold: 10,
            warningClass: "label label-success",
            limitReachedClass: "label label-danger",
            separator: ' de ',
            preText: 'Tienes ',
            postText: ' caracteres permitidos.',
            validate: true
        });
    });
    /*
     ██████ ██████  ███████  █████  ██████      ████████  █████  ██████  ██       █████
    ██      ██   ██ ██      ██   ██ ██   ██        ██    ██   ██ ██   ██ ██      ██   ██
    ██      ██████  █████   ███████ ██████         ██    ███████ ██████  ██      ███████
    ██      ██   ██ ██      ██   ██ ██   ██        ██    ██   ██ ██   ██ ██      ██   ██
     ██████ ██   ██ ███████ ██   ██ ██   ██        ██    ██   ██ ██████  ███████ ██   ██
    */

    var _crearTabla = function() {
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            columnDefs: [{
                orderable: false,
                width: '100px',
                targets: [5]
            }],
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            language: {
                search: '<span>Buscar:</span> _INPUT_',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'previous': '&larr;'
                }
            },
            drawCallback: function() {
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
            },
            preDrawCallback: function() {
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
            }
        });
    };
    /*
    ██    ██ ██ ███████ ██     ██      ██████ ██      ██ ███████ ███    ██ ████████ ███████ ███████
    ██    ██ ██ ██      ██     ██     ██      ██      ██ ██      ████   ██    ██    ██      ██
    ██    ██ ██ █████   ██  █  ██     ██      ██      ██ █████   ██ ██  ██    ██    █████   ███████
     ██  ██  ██ ██      ██ ███ ██     ██      ██      ██ ██      ██  ██ ██    ██    ██           ██
      ████   ██ ███████  ███ ███       ██████ ███████ ██ ███████ ██   ████    ██    ███████ ███████
    */

    var _mostrarClientes = function() {
        console.log('estoy entrarn a mostrar los clientes');
        var route = "/VerClientes";
        var table = $('.datatable-generated').DataTable({
            ajax: route,
            sAjaxDataProp: "",
            aoColumns: [{
                    "mDataProp": "nombre",
                },
                {
                    "mDataProp": "apellidos",
                    render: function(data, type, row) {
                        return row.apellidos.apellidoPaterno + " " + row.apellidos.apellidoMaterno;
                    }
                },
                {
                    "mDataProp": "telefono",
                },
                {
                    "mDataProp": "email",
                },
                {
                    "mDataProp": "sucursal",
                    render: function(data, type, row) {
                        return row.sucursal.sucursal;
                    }
                },
                  {
                    render: function(data, type, row) {
                        return "<form-group>" +
                            "<a><span id='services' class='label label-danger'>"+
                            "<i class='fa fa-wrench '>" +
                            "</i>" +
                            "</span></a>" +
                            "<a><span id='store' class='label label-info'>" +
                            "<i class='fa fa-cart-plus '>" +
                            "</i>" +
                            "</span></a>"+
                            "</form-group>";
                    }
                },
                {
                    render: function(data, type, row) {
                        return "<form-group>" +
                            "<a><span id='edit' class='label label-info'>" +
                            "<i class=' fa fa-pencil'>" +
                            "</i>" +
                            "</span></a>" +
                            "<a><span id='delete' class='label label-warning'>" +
                            "<i class='fa fa-trash-o'>" +
                            "</i>" +
                            "</span></a>"+
                            "</form-group>";
                    }
                }

            ],
            columnDefs: [{
                orderable: false,
                targets: [1, 2, 3, 5]
            }]
        });

        $('.datatable-generated tbody').on('click', '#services ', function() {
            var data = table.row($(this).parents('tr')).data();
            _Reparacion(data);
        });
        $('.datatable-generated tbody').on('click', '#store ', function() {
            var data = table.row($(this).parents('tr')).data();
            _Pedido(data);
        });
    };

    /*
    ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    var _eliminarCliente = function(data) {
        var client = {
            id: data
        };
        console.log("delete");
        console.log(data);
        var url = "/deleteClient";

        swal({
                title: "Eliminar cliente?",
                text: "Si eliminas un cliente se eliminaran todos los datos relacionados!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EF5350",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    console.log('voy a enviar los datos para su eliminacion');
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: client,
                        async: false,
                        success: function(data) {
                            if (data.error === true) {
                                console.log("Ocurrio un error");
                                swal({
                                    title: "Error!",
                                    text: data.message,
                                    confirmButtonColor: "#66BB6A",
                                    type: "error"
                                });
                            } else {
                                console.log("Eliminado");
                                swal({
                                    title: "Eliminado!",
                                    text: data.message,
                                    confirmButtonColor: "#66BB6A",
                                    type: "success"
                                });
                                $('.datatable-generated').DataTable().ajax.reload();
                            }
                        },
                        error: function(err) {
                            console.log("Entro en error");
                        }
                    });


                } else {
                    swal({
                        title: "Cancelado",
                        text: "No se eliminaron datos :)",
                        confirmButtonColor: "#2196F3",
                        type: "error"
                    });
                }
            });
    };

    /*
    ███████ ██████  ██ ████████  █████  ██████       ██████ ██      ██ ███████ ███    ██ ████████ ███████
    ██      ██   ██ ██    ██    ██   ██ ██   ██     ██      ██      ██ ██      ████   ██    ██    ██
    █████   ██   ██ ██    ██    ███████ ██████      ██      ██      ██ █████   ██ ██  ██    ██    █████
    ██      ██   ██ ██    ██    ██   ██ ██   ██     ██      ██      ██ ██      ██  ██ ██    ██    ██
    ███████ ██████  ██    ██    ██   ██ ██   ██      ██████ ███████ ██ ███████ ██   ████    ██    ███████
    */

    var _editarCliente = function() {
        $('.datatable-generated tbody').on('click', '#edit ', function() {
            var data = $('.datatable-generated').DataTable().row($(this).parents('tr')).data();
            // $('#error').hide();
            $('#nombreup').val(data.nombre);
            $('#apellidoPup').val(data.apellidos.apellidoPaterno);
            $('#apellidoMup').val(data.apellidos.apellidoMaterno);
            $('#emailup').val(data.email);
            $('#telefonoup').val(data.telefono);
            $('#direccionup').val(data.direccion);
            $('#editarCliente').modal({
                show: true
            });
            var contador = 0;
            $('#btn-Actualizar-cliente').click(function(e) {
                contador++;
                alert('voy a enviar datos para actualizar' + contador);
            });
        });



    };
    /*
    ██████  ███████ ██████   █████  ██████   █████   ██████ ██  ██████  ███    ██
    ██   ██ ██      ██   ██ ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ████   ██
    ██████  █████   ██████  ███████ ██████  ███████ ██      ██ ██    ██ ██ ██  ██
    ██   ██ ██      ██      ██   ██ ██   ██ ██   ██ ██      ██ ██    ██ ██  ██ ██
    ██   ██ ███████ ██      ██   ██ ██   ██ ██   ██  ██████ ██  ██████  ██   ████
    */

    var _Reparacion=function(data){

      window.location='/registrarMantenimiento';
      localStorage.setItem('cliente',data.nombre);
      localStorage.setItem('telefono',data.telefono);

    };


    var _Pedido=function(data)
    {
      window.location='/registrarPedido';
      localStorage.setItem('cliente',data.nombre);
      localStorage.setItem('telefono',data.telefono);
    };



    return {

    };

})();
