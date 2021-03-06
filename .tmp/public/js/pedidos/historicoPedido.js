var Tabla = (function() {

    $(document).ready(function() {
        _crearTabla();
        _mostrarPedidos();
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
    var _mostrarPedidos = function() {
        // Array to track the ids of the details displayed rows
        var detailRows = [];
        console.log('estoy entrarn a mostrar los pedidos...............................');
        var route = "/historicoPedidos";
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
                    "mDataProp": "status",
                    render: function(data, type, row) {
                      return "<a><span id='entregado' class='label bg-success'>"+row.status+"</span></a>";
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
        function format(d) {
            var Equipos = $('<div class="form-group"></div>');
            var numero = 0;
            $(Equipos).append('<div id="cabezera-list-eq" class="form-group">' +
                '<label class=" col-md-1  indiceEquipo-li">Cant.</label>' +
                '<label class=" col-md-5  indiceEquipo-li">Descripcion</label>' +
                '<label class=" col-md-2  indiceEquipo-li">Modelo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Precio</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Anticipo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Adeudo</label>' +
                '<label class=" col-md-1  indiceEquipo-li">Estado</label>' +
                '</div>');
                console.log('estoy recibiendo estos datos' + JSON.stringify(d.pedidos));
            for (var i = 0; i <= d.pedidos.length-1; i++) {
                console.log('entre al for para mostrar todos los equpos');
                numero = parseInt(i) + 1;
                var estatus = '';
                if (d.status == "Pendiente") {
                    estatus = "<a><span id='pendiente'  status='" + d.status + "' dato='" + d.folio + "' index='" + d.pedidos[i].index + "'class='label bg-danger'>" + d.status + "</span></a>";
                }
                if (d.status == "Reparado") {
                    estatus = "<a><span id='reparado'  status='" + d.status + "' dato='" + d.folio + "' index='" + d.pedidos[i].index + "'class='label bg-blue'>" + d.status + "</span></a>";
                }
                if (d.status == "Entregado") {
                    estatus = "<a><span id='entregado' status='" + d.status + "' dato='" + d.folio + "' index='" + d.pedidos[i].index + "'class='label bg-success'>" + d.status + "</span></a>";
                }
                $(Equipos).append('<div class="form-group  equipoDescripcion ">' +
                    '<form-group>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.pedidos[i].cantidad + '</label>' +
                    '<label class=" col-md-5  contenido-equipo">' + d.pedidos[i].descripcion + '</label>' +
                    '<label class=" col-md-2  contenido-equipo">' + d.pedidos[i].modelo + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.pedidos[i].anticipo + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.pedidos[i].precio + '</label>' +
                    '<label class=" col-md-1  contenido-equipo">' + d.pedidos[i].restante + '</label>' +
                    '<label class="col-md-1  contenido-equipo">' + estatus + '</label>' +

                    '</form-group>' +
                    '</div>'
                );
            }

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
    return {
    };

})();
