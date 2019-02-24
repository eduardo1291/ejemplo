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

    var _mostrarPedidos = function() {

        // Array to track the ids of the details displayed rows
        var detailRows = [];
        console.log('estoy entrarn a mostrar los pedidos ...............');
        var route = "/listPedidos";

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
                  "mDataProp":"Status",
                  render:function(data, type, row) {
                    if(row.status == "Pendiente"){
                      return "<a><span id='pendiente' class='label bg-danger'>"+row.status+"</span></a>";
                    }
                    if (row.status == "Procesado") {
                      return "<a><span id='procesado' class='label bg-blue'>"+row.status+"</span></a>";
                    }
                    if (row.status == "Entregado") {
                      return "<a><span id='entregado' class='label bg-success'>"+row.status+"</span></a>";
                    }
                  }
                },{
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
                            (data == "activo" ? "<a><span id='block' class='label label-danger'>" +
                                "<i class='fa fa-ban fa-2x'>" +
                                "</i>" +
                                "</span></a>" :
                                data == "bloqueado" ? "<a><span id='unblock' class='label label-danger'>" +
                                "<i class=' fa fa-unlock-alt fa-2x'>" +
                                "</i>" +
                                "</span></a></form-group>" :
                                data == "espera" ? "<a><span id='active' class='label label-danger'>" +
                                "<i class=' fa fa-check fa-2x'>" +
                                "</i>" +
                                "</span></a></form-group>" : "");
                    }
                },

            ],

            "order": [
                [3,'desc'],[2,'desc'],[1,'desc']
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
        $('.datatable-generated tbody').on('dblclick', '#pendiente ', function() {
          var data = table.row($(this).parents('tr')).data();
            _cambiarEstado(data);
        });
        $('.datatable-generated tbody').on('dblclick', '#procesado', function() {
          var data = table.row($(this).parents('tr')).data();
            _cambiarEstado(data);
        });


        $('.datatable-generated tbody').on('click', '#delete ', function() {
            var data = table.row($(this).parents('tr')).data();
            _eliminarEstablecimiento(data.id);
        });

        function format(d) {
          var Equipos = $('<div class="equipos-li"></div>');
          var numero=0;
          $(Equipos).append('<div id="cabezera-list-eq">'                   +
          '<label class=" col-md-1  indiceEquipo-li">Cant.</label>'         +
          '<label class=" col-md-5  indiceEquipo-li">Descripcion</label>'   +
          '<label class=" col-md-2  indiceEquipo-li">Modelo</label>'        +

          '<label class=" col-md-1  indiceEquipo-li">Precio</label>'        +
          '<label class=" col-md-1  indiceEquipo-li">Anticipo</label>'      +
          '<label class=" col-md-1  indiceEquipo-li">Importe</label>'       +
          '<label class=" col-md-1  indiceEquipo-li">Total</label>'             +
          '</div>');
          console.log('estoy recibiendo estos datos'+JSON.stringify(d.pedidos));
          for ( var i=0;i<d.pedidos.length;i++){
            console.log('entre al for para mostrar todos los equpos');
             numero=parseInt(i)+1;
            $(Equipos).append('<div class="equipoDescripcion">'+
              '<label class=" col-md-1  contenido-equipo">' +d.pedidos[i].cantidad      +'</label>'+
              '<label class=" col-md-5  contenido-equipo">' +d.pedidos[i].descripcion   +'</label>'+
              '<label class=" col-md-2  contenido-equipo">' +d.pedidos[i].modelo        +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +d.pedidos[i].precio        +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +d.pedidos[i].anticipo      +'</label>'+
              '<label class=" col-md-1 contenido-equipo" >' +d.pedidos[i].importe       +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +d.pedidos[i].restante      +'</label>'+
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
};

        var _cambiarEstado = function(data){
          var url = "/actualizarPedido";
          console.log(data);
          var status;
          if (data.status == 'Pendiente') {
            swal({
                 title: "Cambiar Status a Procesado",
                 text: "Esta seguro que el pedido ya fue entregado!",
                 type: "info",
                 showCancelButton: true,
                 confirmButtonColor: "#2196F3",
                 confirmButtonText: "Si, Actualizar!",
                 cancelButtonText: "No, cancelar!",
                 closeOnConfirm: false,
                 closeOnCancel: false
             },
             function(isConfirm){
                 if (isConfirm) {
                   status={
                     id:data.id,
                     estado:'Procesado'
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
                           }
                       },
                       error: function(err) {
                           console.log("Entro en error");
                       }
                   });
                   }
                 else {
                     swal({
                         title: "Cancelado",
                         text: "No se actualizara el Status",
                         confirmButtonColor: "#2196F3",
                         type: "error"
                     });
                 }
             });
          }
          if (data.status == 'Procesado') {
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
             function(isConfirm){
                 if (isConfirm) {
                   status={
                     id:data.id,
                     estado:'Entregado'
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
                           }
                       },
                       error: function(err) {
                           console.log("Entro en error");
                       }
                   });
                   }
                 else {
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
        

        return {

        };
    
})();
