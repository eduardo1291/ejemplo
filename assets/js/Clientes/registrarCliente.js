$(document).ready(function() {
  $('.closes').click(function() {
    $('#error').hide();
  });
  // Telefono #
  $('.format-phone-number').formatter({
      pattern: '{{999}}-{{999}}-{{99}}{{99}}'
  });

  $('#btn-registrarCLiente').click(function(e) {
    e.preventDefault();

    var newUser = {
      nombre:$("#nombre-cliente").val(),
      apellidoP: $("#apaternoC").val(),
      apellidoM: $("#amaternoC").val(),
      email: $("#email-Cliente").val(),
      telefono: $("#telefono-Cliente").val(),
      direccion: $("#direccion-Cliente").val()
        };
    var route = "/clienteC";

    $.ajax({
      url: route,
      method: 'POST',
      dataType: 'json',
      data: newUser,
      async: false,
      beforeSend: function(jqXHR, settings) {
        console.log("beforeSend");
      },
      complete: function(jqXHR, textStatus) {
        console.log("completado");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("error");

      },
      success: function(data, textStatus, jqXHR) {
        console.log('se registro', data);
        if (data.error === false) {
          $("body").overhang({
             type: "success",
             message: data.message

          });
          $('#registroCliente').each (function(){
            var validator = $("#registroCliente").validate();
            validator.resetForm();
            this.reset();

            });
        }else{
          $("body").overhang({
            type: "warn",
            message:data.message,
            duration: 3
          });
        }
        if(data.message==='error'){
          $("body").overhang({
            type: "error",
            message: "OCURRIO UN ERROR AL REGISTRAR DATOS DEL CLIENTE"
          });
        }
      }
    });
  }); //fin create user
});
