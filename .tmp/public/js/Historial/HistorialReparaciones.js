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
        console.log('estoy entrarn a mostrar los usuarios');
        var route = "/historicServices";

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
                }, {
                    "mDataProp": "usuario",
                    render: function(data, type, row) {

                        return row.usuario.nombre;
                    }
                },

            ],
            "order": [
                [1, 'desc']
            ],
            columnDefs: [{
                orderable: true,
                targets: [1, 2, 3, ]
            }]
        });


        function format(d) {
            var Equipos = $('<div class="form-group equipos-li"></div>');
            var numero = 0;
            $(Equipos).append('<div id="cabezera-list-eq">' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Cant.</label>' +
                '<label class=" col-md-6 centrarDiv indiceEquipo-li">Descripcion</label>' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Marca</label>' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Modelo</label>' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Anticipo</label>' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Precio</label>' +
                '<label class=" col-md-1 centrarDiv indiceEquipo-li">Estado</label>' +
                '</div>');
                // SE REALIZAN UN DOBLE FOR YA QUE LOS EQUIPOS AL MOMENTO DE ELIMINARSE VIENE EN UN DOBLE ARREGLO
            for (var i = 0; i < d.equipos.length; i++) {

                    // alert('esto esta regresando el historico' +JSON.stringify(d.equipos[i][z]));
                    console.log('estoy recibiendo estos datos' + JSON.stringify(d.equipos[i]));

                    console.log('entre al for para mostrar todos los equpos');
                    numero = parseInt(i) + 1;
                    $(Equipos).append('<div class="form-group equipoDescripcion">' +
                        '<form-group>' +
                        '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].cantidad + '</label>' +
                        '<label class=" col-md-6  contenido-equipo">' + d.equipos[i].descripcion + '</label>' +
                        '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].marca + '</label>' +
                        '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].modelo + '</label>' +
                        '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].anticipo + '</label>' +
                        '<label class=" col-md-1  contenido-equipo">' + d.equipos[i].precio + '</label>' +
                        '<label class="col-md-1  contenido-equipo">' + d.equipos[i].status + '</label>' +
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
        });





        return {

        };
    };
})();
