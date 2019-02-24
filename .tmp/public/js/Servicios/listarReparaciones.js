var Tabla = (function() {

    $(document).ready(function() {
        _crearTabla();
        _mostrarServicios();


        // Telefono #
        $('.format-phone-number').formatter({
            pattern: '({{999}}){{999}}-{{999}}-{{99}}{{99}}'
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
                    'last': 'Last',
                    'next': '&rarr;',
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
    ███    ███  ██████  ███████ ████████ ██████   █████  ██████      ███████ ███████ ██████  ██    ██ ██  ██████ ██  ██████  ███████
    ████  ████ ██    ██ ██         ██    ██   ██ ██   ██ ██   ██     ██      ██      ██   ██ ██    ██ ██ ██      ██ ██    ██ ██
    ██ ████ ██ ██    ██ ███████    ██    ██████  ███████ ██████      ███████ █████   ██████  ██    ██ ██ ██      ██ ██    ██ ███████
    ██  ██  ██ ██    ██      ██    ██    ██   ██ ██   ██ ██   ██          ██ ██      ██   ██  ██  ██  ██ ██      ██ ██    ██      ██
    ██      ██  ██████  ███████    ██    ██   ██ ██   ██ ██   ██     ███████ ███████ ██   ██   ████   ██  ██████ ██  ██████  ███████
    */

    var _mostrarServicios = function() {

        // Array to track the ids of the details displayed rows
        var detailRows = [];
        console.log('estoy entrarn a mostrar las reparaciones ...............................');
        var route = "/listMantenimiento";


        var table = $('.datatable-generated').DataTable({
            ajax: route,
            sAjaxDataProp: "",
            aoColumns: [{

                    "class": "details-control",
                    "orderable": false,
                    "data": null,
                    "defaultContent": ""
                }, {
                    "mDataProp": "dia",
                }, {
                    "mDataProp": "mes",
                }, {
                    "mDataProp": "año",
                }, {
                    "mDataProp": "cliente-nombre",
                    render: function(data, type, row) {
                        return row.cliente.nombre;
                    }
                },

                {
                    "mDataProp": "telefono",
                    render: function(data, type, row) {
                        return row.cliente.telefono;
                    }
                },{
                    "mDataProp": "progress",
                    render: function(data, type, row) {
                        return "<a id='edoServices'><div class = 'progress' >"+
                            "<div class = 'progress-bar'"+
                        "role = 'progressbar'"+
                        "style = 'width: "+data+'%'+";'"+
                        "aria - valuenow = '25'"+
                        "aria - valuemin = '0'"+
                        "aria - valuemax = '100' > "+data+'%'+"</div> </div></a>";

                    }
                }, {
                    render: function(data, type, row) {
                        return "<form-group>" +
                            "<a><span id='edit' class='label label-info'>" +
                            "<i class=' fa fa-pencil '>" +
                            "</i>" +
                            "</span></a>" +
                            "<a><span id='delete' class='label label-warning'>" +
                            "<i class='fa fa-trash-o '>" +
                            "</i>" +
                            "</span></a>" +
                            "</form-group>";
                    }
                },

            ],
            "order": [
                [3, 'desc'],
                [2, 'asc'],
                [1, 'desc']
            ],
            columnDefs: [{
                orderable: true,
                targets: [2]
            }]
        });

        $('.datatable-generated tbody').on('click', '#edit ', function() {
            var data = table.row($(this).parents('tr')).data();
            _editarEstablecimiento(data);
        });
        $('.datatable-generated tbody').on('dblclick', '#edoServices', function() {
            var data = table.row($(this).parents('tr')).data();
            _upEdoServices(data.folio);
        });



        $('.datatable-generated tbody').on('click', '#delete ', function() {
            var data = table.row($(this).parents('tr')).data();
            _eliminarServicio(data.id);
        });

        function format(d) {
            var Equipos = $('<div class="form-group"></div>');
            var numero = 0;
            $(Equipos).append('<div id="cabezera-list-eq" class="form-group">' +
                '<label class=" col-md-1  indiceEquipo-li">Cant.</label>' +
                '<label class=" col-md-5  indiceEquipo-li">Descripcion</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Marca</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Modelo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Precio</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Anticipo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Adeudo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Estado</label>' +
                '</div>');
            for (var i = 0; i < d.equipos.length; i++) {
                console.log('estoy recibiendo estos datos' + JSON.stringify(d.equipos));
                console.log('entre al for para mostrar todos los equpos');
                numero = parseInt(i) + 1;
                var status = '';
                if (d.equipos[i].status == "Pendiente") {
                    status = "<a><span id='pendiente'  status='" + d.equipos[i].status + "' dato='" + d.folio + "' index='" + d.equipos[i].index + "'class='label bg-danger'>" + d.equipos[i].status + "</span></a>";
                }
                if (d.equipos[i].status == "Reparado") {
                    status = "<a><span id='reparado'  status='" + d.equipos[i].status + "' dato='" + d.folio + "' index='" + d.equipos[i].index + "'class='label bg-blue'>" + d.equipos[i].status + "</span></a>";

                }
                if (d.equipos[i].status == "Entregado") {
                    status = "<a><span id='entregado' status='" + d.equipos[i].status + "' dato='" + d.folio + "' index='" + d.equipos[i].index + "'class='label bg-success'>" + d.equipos[i].status + "</span></a>";
                }
                $(Equipos).append('<div class="form-group  equipoDescripcion ">' +
                    '<form-group>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].cantidad + '</label>' +
                    '<label class=" col-md-5  contenido-equipo">' + d.equipos[i].descripcion + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].marca + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].modelo + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].precio + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].anticipo + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].restante + '</label>' +
                    '<label class="col-md-1  contenido-equipo">' + status + '</label>' +

                    '</form-group>' +
                    '</div>'
                );
            }
            if (d.accesorios && d.observaciones) {

                $(Equipos).append('<div class="form-group  equipoDescripcion ">' +
                    '<label class=" col-md-6  contenido-equipo">' + d.accesorios + '</label>' +
                    '<label class=" col-md-6  contenido-equipo">' + d.observaciones + '</label>' +

                    '</div>');
            }


            $('.datatable-generated tbody').on('dblclick', '#pendiente ', function() {
                var data = {
                    status: $(this).attr('status'),
                    index: $(this).attr('index'),
                    dato: $(this).attr('dato')
                };
                _cambiarEstado(data);
            });
            $('.datatable-generated tbody').on('dblclick', '#reparado', function() {
                var data = {
                    status: $(this).attr('status'),
                    index: $(this).attr('index'),
                    dato: $(this).attr('dato')
                };
                _cambiarEstado(data);
            });
            return Equipos;

        }
        $('.datatable-generated tbody').on('click', '.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
                tr.removeClass('details');
                row.child.hide();
                $('#cabecera-Equipos').hide();
                // Remove from the 'open' array
                detailRows.splice(idx, 1);
            } else {
                tr.addClass('details');
                row.child(format(row.data())).show();

                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
            return false;
        });
    };

    /*
    ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████      ███████ ███████ ██████  ██    ██ ██  ██████ ██  ██████
    ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██      ██      ██   ██ ██    ██ ██ ██      ██ ██    ██
    █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ███████ █████   ██████  ██    ██ ██ ██      ██ ██    ██
    ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██          ██ ██      ██   ██  ██  ██  ██ ██      ██ ██    ██
    ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██     ███████ ███████ ██   ██   ████   ██  ██████ ██  ██████
    */


    var _eliminarServicio = function(data) {

        console.log("delete");
        console.log(data);
        var url = "/deleteMantenimiento";
        var servicio = {
            id: data
        };
        swal({
                title: "Eliminar el Servicio de Reparacion?",
                text: "Si eliminas el servcio se eliminaran todos los datos relacionados!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#66BB6A",
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
                        data: servicio,
                        async: false,
                        success: function(data) {
                            if (data.error) {
                                console.log("Ocurrio un error");
                            } else {
                                console.log("Eliminado");
                                swal({
                                    title: "Eliminado!",
                                    text: "Los registros se han eliminado.",
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
    var _cambiarEstado = function(data) {
        // alert('modificar este equipo' + JSON.stringify(data));
        var url = "/edoReparacion";
        console.log(data);
        var status;
        if (data.status == 'Pendiente') {
            swal({
                    title: "Cambiar Status a Reparado",
                    text: "Esta seguro que el pedido ya fue entregado!",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#2196F3",
                    confirmButtonText: "Si, Actualizar!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        status = {
                            folio: data.dato,
                            estado: 'Reparado',
                            index: data.index
                        };
                        $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'json',
                            data: status,
                            async: false,
                            success: function(data) {
                                if (data.error) {
                                    console.log("Ocurrio un error");
                                } else {
                                    console.log("Eliminado");
                                    swal({
                                        title: "Actualizado!",
                                        text: "El pedido a cambiado de estado.",
                                        confirmButtonColor: "#66BB6A",
                                        type: "success"
                                    });
                                    $('.datatable-generated').DataTable().ajax.reload();
                                    //  die();
                                }
                            },
                            error: function(err) {
                                console.log("Entro en error");
                            }
                        });
                    } else {
                        swal({
                            title: "Cancelado",
                            text: "No se actualizara el Status",
                            confirmButtonColor: "#2196F3",
                            type: "error"
                        });
                    }
                });
        }
        if (data.status == 'Reparado') {
            swal({
                    title: "Cambiar Status a Entregado",
                    text: "Esta seguro que el pedido ya se encuentra procesado!",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#2196F3",
                    confirmButtonText: "Si, Actualizar!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        status = {
                            folio: data.dato,
                            estado: 'Entregado',
                            index: data.index
                        };
                        $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'json',
                            data: status,
                            async: false,
                            success: function(data) {
                                if (data.error) {
                                    console.log("Ocurrio un error");
                                } else {
                                    console.log("Eliminado");
                                    swal({
                                        title: "Actualizado!",
                                        text: "Los registros se han eliminado.",
                                        confirmButtonColor: "#66BB6A",
                                        type: "success"
                                    });
                                    $('.datatable-generated').DataTable().ajax.reload();
                                    //  die();
                                }
                            },
                            error: function(err) {
                                console.log("Entro en error");
                            }
                        });
                    } else {
                        swal({
                            title: "Cancelado",
                            text: "No se actualizara el Status",
                            confirmButtonColor: "#2196F3",
                            type: "error"
                        });
                    }
                });
        }

    };
    var _upEdoServices =function(data){
      var url="/upStatusServices";
        swal({
                title: "Cambiar Servicio a Entregado",
                text: "Esta seguro que todo el servicio ya fue Reparado!",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#2196F3",
                confirmButtonText: "Si, Actualizar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    var status = {
                        folio:data,
                        estado:"Entregado",
                    };
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: status,
                        async: false,
                        success: function(data) {
                            if (data.error) {
                                console.log("Ocurrio un error");
                            } else {
                                console.log("Eliminado");
                                swal({
                                    title: "Actualizado!",
                                    text: "El pedido a cambiado de estado.",
                                    confirmButtonColor: "#66BB6A",
                                    type: "success"
                                });
                                $('.datatable-generated').DataTable().ajax.reload();
                                //  die();
                            }
                        },
                        error: function(err) {
                            console.log("Entro en error");
                        }
                    });
                } else {
                    swal({
                        title: "Cancelado",
                        text: "No se actualizara el Status",
                        confirmButtonColor: "#2196F3",
                        type: "error"
                    });
                }
            });
    };



    return {

    };

})();
