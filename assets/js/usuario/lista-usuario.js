var Tabla = (function() {

  $(document).ready(function() {
    _crearTabla();
    _mostrarUsuarios();


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
  ███    ███  ██████  ███████ ████████ ██████   █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  ███████
  ████  ████ ██    ██ ██         ██    ██   ██ ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ ██
  ██ ████ ██ ██    ██ ███████    ██    ██████  ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ ███████
  ██  ██  ██ ██    ██      ██    ██    ██   ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██      ██
  ██      ██  ██████  ███████    ██    ██   ██ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  ███████
  */


  var _mostrarUsuarios = function() {
    console.log('estoy entrarn a mostrar los usuarios');
    var route = "/listUsers";

    var table = $('.datatable-generated').DataTable({
      ajax: route,
      sAjaxDataProp: "",
      aoColumns: [{
          "mDataProp": "nombre",
        },
        {
          "mDataProp": "apellidos",
          render: function(data, type, row) {
            return row.apellidos.apellidoP + " " + row.apellidos.apellidoM;
          }
        },
        {
          "mDataProp": "telefono",
        },
        {
          "mDataProp": "email",
        },
        {
          "mDataProp": "rol",
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
                "<i class=' fa fa-unlock-alt'>" +
                "</i>" +
                "</span></a></form-group>" :
                data == "espera" ? "<a><span id='active' class='label label-danger'>" +
                "<i class=' fa fa-check'>" +
                "</i>" +
                "</span></a></form-group>" : "");
          }
        },

      ],
      columnDefs: [{
        orderable: false,
        targets: [1, 2, 3, 5]
      }]
    });

    $('.datatable-generated tbody').on('click', '#edit ', function() {
      var data = table.row($(this).parents('tr')).data();
      _editarUsuario(data);
    });



    $('.datatable-generated tbody').on('click', '#delete ', function() {
      var data = table.row($(this).parents('tr')).data();
      _eliminarUsuario(data.id);
    });

    $('.datatable-generated tbody').on('click', '#block ', function() {
      var data = table.row($(this).parents('tr')).data();
      console.log(data);
      console.log("bloqueando");
      api.dataToModal(data);
    });
  };

  /*
  ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
  ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
  █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
  ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
  ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
  */

  var _eliminarUsuario = function(data) {

    console.log("delete");
    console.log(data);
    var user = {
      id: data
    };
    var url = "/deleteUser";

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
      function(isConfirm) {
        if (isConfirm) {
          console.log('voy a enviar los datos para su eliminacion');
          $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: user,
            async: false,
            success: function(data) {
              if (data.error) {
                console.log("Ocurrio un error");
                swal({
                  title: "Error!",
                  text: "Los registros se han eliminado.",
                  confirmButtonColor: "#66BB6A",
                  type: "error"
                });
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

  /*
   █████   ██████ ████████ ██    ██  █████  ██      ██ ███████  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
  ██   ██ ██         ██    ██    ██ ██   ██ ██      ██    ███  ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
  ███████ ██         ██    ██    ██ ███████ ██      ██   ███   ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
  ██   ██ ██         ██    ██    ██ ██   ██ ██      ██  ███    ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
  ██   ██  ██████    ██     ██████  ██   ██ ███████ ██ ███████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
  */

  var _editarUsuario = function(data) {
    console.log(JSON.stringify(data));
    nombre = data.nombre;
    apellidoP = data.apellidos.apellidoP;
    console.log('este es apelido p', apellidoP);
    apellidoM = data.apellidos.apellidoM;
    email = data.email;
    telefono = data.telefono;
    $('#nombreUp').val(nombre);
    $('#apellidoPUp').val(apellidoP);
    $('#apellidoMUp').val(apellidoM);
    $('#emailUp').val(email);
    $('#telefonoUp').val(telefono);
    $('#editarUsuario').modal({
      show: true
    });
    $('#btn-Actualizar-usuario').click(function(e) {
      e.preventDefault();
      if ($("#form-editar-usuario").valid()) {
        var user_actualizado = {
          id: data.id,
          email_anterior: data.email,
          telefono_anterior: data.telefono,
          nombre: $('#nombreUp').val(),
          apellidoP: $('#apellidoPUp').val(),
          apellidoM: $('#apellidoMUp').val(),
          telefono: $('#telefonoUp').val(),
          email: $('#emailUp').val()
        };
        console.log('se va actualizar este usuario', JSON.stringify(user_actualizado));
        var url = "/updateUser";
        console.log('vamos a actualizar el usuario');
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          data: user_actualizado,
          async: false,
          success: function(data) {
            console.log('esto regresa', JSON.stringify(data));
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
                title: "ACTUALIZADO!",
                text: data.message,
                confirmButtonColor: "#66BB6A",
                type: "success"
              });
              var validator = $("#form-editar-usuario").validate();
              // validator.resetForm();
              window.location.reload();
              // $('.datatable-generated').DataTable().ajax.reload();
              return false;
            }
          },
          error: function(err) {
            console.log("Entro en error");
          }
        });
      }
    });


  };



  return {

  };

})();
