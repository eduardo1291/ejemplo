/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Tabla = (function() {

    $(document).ready(function() {
        _crearTabla();
        _mostrarGarantias();
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

    var _mostrarGarantias = function() {

        // Array to track the ids of the details displayed rows
        var detailRows = [];
        console.log('estoy entrarn a mostrar las garantias. ...............');
        var route = "/listGarantias";

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
                      return "<a><span id='procesado' class='label bg-warning'>"+row.status+"</span></a>";
                    }
                    if (row.status == "Reparado") {
                      return "<a><span id='reparado' class='label bg-blue'>"+row.status+"</span></a>";
                    }
                    if (row.status == "Entregado") {
                      return "<a><span id='entregado' class='label bg-success'>"+row.status+"</span></a>";
                    }
                  }
                },{
                    "mDataProp":"folio",
                    render:function(data,type,row){
                        var folio=row.folio;
                        if (folio < 10) {
                            folio = '00000' + folio;
                        }
                        if (folio >= 10 && folio <= 99) {
                            folio = '0000' + folio;
                        }
                        if (folio >= 100 && folio <= 999) {
                            folio = '000' + folio;
                        }
                        if (folio >= 1000 && folio <= 9999) {
                            folio = '00' + folio;
                        }
                         return "<a><span  class='label bg-success'>"+folio+"</span></a>";
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

       
        $('.datatable-generated tbody').on('dblclick', '#pendiente ', function() {
          var data = table.row($(this).parents('tr')).data();
            _cambiarEstado(data);
        });
        $('.datatable-generated tbody').on('dblclick', '#reparado', function() {
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

        function format(data) {
          var Garantia = $('<div class="equipos-li"></div>');
          var numero=0;
          $(Garantia).append('<div id="cabezera-list-eq">'                   +
          '<label class=" col-md-2  indiceEquipo-li">Equipo</label>'         +
          '<label class=" col-md-1  indiceEquipo-li">Marca</label>'   +
          '<label class=" col-md-1  indiceEquipo-li">Modelo</label>'        +
          '<label class=" col-md-1  indiceEquipo-li">Num.Serie</label>'        +
          '<label class=" col-md-4  indiceEquipo-li">Falla</label>'        +
          '<label class=" col-md-3  indiceEquipo-li">Accesorios</label>'        +
   
          '</div>');
          console.log('estoy recibiendo estos datos'+JSON.stringify(data));
            $(Garantia).append('<div class="GarantiaDescripcion">'+
              '<label class=" col-md-2  contenido-equipo">' +data.equipo.equipo         +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +data.equipo.marca          +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +data.equipo.modelo         +'</label>'+
              '<label class=" col-md-1  contenido-equipo">' +data.equipo.numeroSerie    +'</label>'+
              '<label class=" col-md-4  contenido-equipo">' +data.falla    +'</label>'+
              '<label class=" col-md-3 contenido-equipo" >' +data.accesorios       +'</label>'+
              '</div>'
            );
    
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
            return Garantia;
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
               //row.data().show();
                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
            return false;
        });
};

        var _cambiarEstado = function(data){
          var url = "/actualizarGarantia";
          console.log(data);
          var status;
          if (data.status == 'Pendiente') {
            swal({
                 title: "Cambiar Status a Procesado",
                 text: "Esta seguro que la garantia ya fue enviada a revision!",
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
                 title: "Cambiar Status a Reparado",
                 text: "Esta seguro que la Garantia ya se encuentra reparada!",
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
                     estado:'Reparado'
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
       
         if (data.status == 'Reparado') {
            swal({
                 title: "Cambiar Status a Entregado",
                 text: "Esta seguro el equipo se Entregará!",
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