var Tabla = (function(){

  $(document).ready(function(){
    _crearTabla();
    _mostrarEstablecimientos();
    $('#servicioDomicilioSi').click(function(){
      $('#horaServicioD').show();
      $('#horaInicio').val("6:00 PM");
      $('#horaFinal').val("6:00 PM");
    });

    $('#servicioDomicilioNo').click(function(){
      $('#horaServicioD').hide();
      $('#horaInicio').val(0);
      $('#horaFinal').val(0);
    });
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

var _crearTabla = function(){
  $.extend( $.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
          orderable: false,
          width: '100px',
          targets: [ 5 ]
      }],
      dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
      language: {
          search: '<span>Buscar:</span> _INPUT_',
          lengthMenu: '<span>Show:</span> _MENU_',
          paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
      },
      drawCallback: function () {
          $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
      },
      preDrawCallback: function() {
          $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
      }
  });
};

  var _mostrarEstablecimientos = function() {
		var route = "http://localhost:1337/usuarios";

    var table = $('.datatable-generated').DataTable({
        ajax: route,
        sAjaxDataProp: "",
        aoColumns: [
        { "mDataProp": "nombre",
        render:function(data,type,row){
        return row.nombre;
        }
        },
        {"mDataProp": "direccion",
          render: function(data,type,row){
            return "Calle "+row.direccion.calle+ "#" + row.direccion.numero + " Col. " + row.direccion.colonia;
          }
        },
        { "mDataProp": "descripcion" },
        {
           "mDataProp": "estado",
           render: function(data, type, row) {
                return (data == "espera" ? '<td><span class="label label-warning">'+data+'  </span></td>' :
                        data =="activo" ? '<td><span class="label label-success">'+data+'  </span></td>'  :
                        data == "bloqueado" ? '<td><span class="label label-danger">'+data+'  </span></td>' : "edwin" );
            },
        },
        { "mDataProp": "usuario",
          render:function(data,type,row){
          return row.nombre;
          }
          },
        {
          render:function(data,type,row){
            return "<form-group>"+
              "<a><span id='edit' class='label label-info'>"+
                "<i class=' fa fa-pencil fa-2x'>"+
                "</i>"+
               "</span></a>"+
               "<a><span id='delete' class='label label-warning'>"+
                 "<i class='fa fa-trash-o fa-2x'>"+
                 "</i>"+
                "</span></a>"+
                "<a><span id='block' class='label label-danger'>"+
                  "<i class=' fa fa-ban fa-2x'>"+
                  "</i>"+
                 "</span></a>"+
            "</form-group>";
            // return "<td class='text-center'><ul class='icons-list'><li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'><i class='icon-menu9'></i></a><ul class='dropdown-menu dropdown-menu-right'><li><a id='btnEditar' ><i class='fa fa-pencil'></i>Actualizar</a></li><li><a href='#'><i class='fa fa-ban'></i>Bloquear</a></li><li><a href='#'><i class='fa fa-trash-o'></i>Eliminar</a></li></ul></li></ul></td>";
          }
        },

    ],
        columnDefs: [
        {
            orderable: false,
            targets: [1, 2,3,5]
        }]
    });

  $('.datatable-generated tbody').on( 'click', '#edit ', function () {
    var data = table.row( $(this).parents('tr') ).data();
    _editarEstablecimiento(data);
  });



   $('.datatable-generated tbody').on( 'click', '#delete ', function () {
       var data = table.row( $(this).parents('tr') ).data();
       _eliminarEstablecimiento(data.id);
  });

  $('.datatable-generated tbody').on( 'click', '#block ', function () {
      var data = table.row( $(this).parents('tr') ).data();
      console.log(data);
      console.log("bloqueando");
    //  api.dataToModal(data);
 });
};


  var _eliminarEstablecimiento = function(data){

    console.log("delete");
    console.log(data);
    var url = "http://localhost:1338/establecimiento/delete";

    swal({
        title: "Eliminar un usuario?",
        text: "Si eliminas un usuario se eliminaran todos los datos relacionados!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
        if (isConfirm) {

          Peticiones.delete(url,{id:data});

          }

        else {
            swal({
                title: "Cancelado",
                text: "No se eliminaron datos :)",
                confirmButtonColor: "#2196F3",
                type: "error"
            });
        }
    });
  };


  var _editarEstablecimiento= function(data){

     console.log(data);

      nombre= data.nombre;
      calle= data.direccion.calle;
      numero= data.direccion.numero;
      colonia = data.direccion.colonia;
      descripcion= data.descripcion;
      telefonos= data.telefonos.telefono;
      horaApertura= data.horaAtencion.apertura;
      horaCierre= data.horaAtencion.cierre;
      servicioDomicilio= data.servicioDomicilio;
      horaInicio= data.horaServicioDomicilio.inicio;
      horaFinal= data.horaServicioDomicilio.final;
      compraMinima= data.compraMinima;
      costoEnvio= data.costoEnvio;

      if(servicioDomicilio===true){
        console.log("Es true");
        $('#horaServicioD').show();
          $('#servicioDomicilioSi').prop('checked',true);
      }else{
        console.log("Es false");
        $('#horaServicioD').hide();
        $('#servicioDomicilioNo').prop('checked',true);
      }

    $('#nombre').val(nombre);
    $('#calle').val(calle);
    $('#numero').val(numero);
    $('#colonia').val(colonia);
    $('#telefono').val(telefonos);
    $('#horaApertura').val(horaApertura);
    $('#horaCierre').val(horaCierre);
    $('#horaInicio').val(horaInicio);
    $('#horaFinal').val(horaFinal);
    $('#compraMinima').val(compraMinima);
    $('#costoEnvio').val(costoEnvio);
    $('#descripcion').val(descripcion);

    $('#editarEstablecimiento').modal({show:true});

    $('#btnActualizar-establecimiento').click(function(e){

      console.log("editando");
        if($("#form-editar-establecimiento").valid()){

          var establecimiento_actualizado = {
            id: data.id,
            nombre:$('#nombre').val(),
            direccion: {
              calle:$('#calle').val(),
              numero:$('#numero').val(),
              colonia: $('#colonia').val()
            },
            telefonos:{
              telefono:$('#telefono').val()
            },
            horaAtencion:{
              apertura:$('#horaApertura').val(),
              cierre: $('#horaCierre').val()
            },
            horaServicioDomicilio:{
              inicio: $('#horaInicio').val(),
              final: $('#horaFinal').val()
            },
            compraMinima:   $('#compraMinima').val(),
            costoEnvio: $('#costoEnvio').val(),
            descripcion: $('#descripcion').val()
          };

            var url = " http://localhost:1338/establecimiento/update";
          Peticiones.post(url, establecimiento_actualizado);


      	}

    });


  };


  var _bloquearEstablecimiento = function(){
    //APENAS LO VOY A IMPLEMENTAR
  };

return{

};

})();



//OMITE ESTE CODIGO, ES EL DE GUARDAR ESTABLECIMIENTO
/*


  $('.closes').click(function() {
     $('#error').hide();
  });

  $('#agregarEstablecimiento').ready(function(){

    $('#servicioDomicilioSi').click(function(){
      $('#horaServicioD').show();
      $('#horaInicio').val("6:00 PM");
      $('#horaFinal').val("6:00 PM");
    });

    $('#servicioDomicilioNo').click(function(){
      $('#horaServicioD').hide();
      $('#horaInicio').val(0);
      $('#horaFinal').val(0);
    });

    $('#btnGuardar-establecimiento').click(function(){

      if($('#form-establecimiento').valid()){

        var newEstablecimiento = {
          nombre: $('#nombre').val(),
          direccion: {
            calle:$('#calle').val(),
            numero:$('#numero').val(),
            colonia:$('#colonia').val()
          },
          descripcion:$('#descripcion').val(),
          telefonos:{
            telefono: $('#telefono').val()
          },
          horaAtencion: {
            apertura: $('#horaApertura').val(),
            cierre: $('#horaCierre').val()
          },
          horaServicioDomicilio:{
            inicio: $('#horaInicio').val(),
            final: $('#horaFinal').val()
          },
          servicioDomicilio: $('input:radio[name=radioservicioD]:checked').val(),
          compraMinima: $('#compraMinima').val(),
          costoEnvio: $('#costoEnvio').val(),
          usuario: "57ce4a9549984855730538ae"
        };

      console.log(newEstablecimiento);

      var route = "http://localhost:1338/establecimiento/create";
      $.ajax({
      type: "POST",
      url: route,
      data: newEstablecimiento,
      dataType: 'json',
      success: function(data){
        console.log("Exito al crear");
        $('#error').hide();
       $("#agregarEstablecimiento").modal('toggle');
        api.getEstablecimientos();
      },
      error: function(err){
        $('#error').show();
        console.log(err);
      }
      });
      }

    });


  });


*/
