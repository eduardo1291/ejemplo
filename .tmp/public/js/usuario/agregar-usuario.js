$(document).ready(function() {

  // Telefono #
  $('.format-phone-number').formatter({
      pattern: '{{999}}-{{999}}-{{99}}{{99}}'
  });




    $('.closes').click(function() {
        $('#error').hide();
    });






    $('#btn-registarUser').click(function(e) {


        var newUser = {
            nombre: $("#nombre-user").val(),
            apellidoP: $("#apaterno").val(),
            apellidoM: $("#amaterno").val(),
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            password: $("#password").val(),
            sucursal: $("#sucursal").val()

        };
        e.preventDefault();
        var route = "/creatUser";

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
                    $('#registroUsuario').each(function() {

                        this.reset();
                        var validator = $( "#registroUsuario" ).validate();
                        validator.resetForm();
                    });
                } else {
                    $("body").overhang({
                        type: "warn",
                        message: data.message,
                        duration: 3
                    });
                }
                if (data.message === 'error') {
                    $("body").overhang({
                        type: "error",
                        message: "DATOS NO PERMITIDOS VERIFIQUE LA INFORMACION"
                    });
                }


            }
        });



        // $.ajax({
        //   url: route,
        // 	type: 'POST',
        // 	dataType: 'json',
        // 	data:newUser,
        //   async:false,
        //   success: function(data){
        //     if(data.error){
        //       $('#textoError').text(data.message.raw);
        //       $('#error').show();
        //     }else {
        //       uploadImage();
        //        //$( "#form-image" ).submit();
        //       // var form=$('#form-user');
        //       //     form.trigger("reset");
        //       //     form.validate().resetForm();
        //       // $('#error').hide();
        //       // $("#agregarUsuario").modal('toggle');
        //       // api.getUsers();
        //     }
        //   },error:function(err){
        //     $('#error').show();
        //     $('#textoError').text('Server Error');
        //   }
        // });



        //fin if

    }); //fin create user
});

// function changeDate(strDate){
//   var newDate=strDate.split('-');
//   return newDate[2]+"-"+newDate[1]+"-"+newDate[0];
// }
//
//
// }); //find ready
//
//
//
//
// var apiUser = function() {
// 	// this.numWheels    = 4;
// 	// this.manufacturer = 'Tesla';
// 	// this.make         = 'Model S';
// };
//
// apiUser.prototype = function() {
//
//
//
// 	var getUsers = function() {
// 		var route = "https://back-paladar.herokuapp.com/user";
// 		//$("#datos tbody").empty();
//
// 		// $.get(route, function(res) { // el metodo ger recivira una respuesta
// 		// 	$(res).each(function(key, value) { //esa respuesta tiene un key y un valor,y lo iteramos con each
// 		// 		$("#datos tbody").append(
// 		// 			"<tr>" +
// 		// 			"<td>" + value.nombre + "</td>" +
// 		// 			"<td>" + value.email + "</td>" +
// 		// 			"<td><span class='label label-danger'>" + value.status + "</span></td>" +
// 		// 			"<td>" + value.telefono + "</td>" +
// 		// 			"<td >" + value.establecimientosRegistrados + "</td>" +
// 		// 			"<td class='text-center'><ul class='icons-list'><li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'><i class='icon-menu9'></i></a><ul class='dropdown-menu dropdown-menu-right'><li><a href='#'><i class='fa fa-pencil'></i>Actualizar</a></li><li><a href='#'><i class='fa fa-ban'></i>Bloquear</a></li><li><a href='#'><i class='fa fa-trash-o'></i>Eliminar</a></li></ul></li></ul></td></tr>" +
// 		// 			"</tr>"
// 		// 		);
// 		// 	});
// 		// });
//
//
//     // Generate content for a column
//     var table = $('.datatable-generated').DataTable({
//         ajax: 'https://back-paladar.herokuapp.com/user',
//         sAjaxDataProp: "",
//         aoColumns: [
//         { "mDataProp": "nombre",
//           render:function(data,type,row){
//             return row.nombre+" "+row.apellidoP+" "+row.apellidoM;
//           }
//         },
//         { "mDataProp": "email" },
//         {
//            "mDataProp": "status",
//            render: function(data, type, row) {
//                 return (data == "espera" ? '<td><span class="label label-warning">'+data+'  </span></td>' :
//                         data =="activo" ? '<td><span class="label label-success">'+data+'  </span></td>'  :
//                         data == "bloqueado" ? '<td><span class="label label-danger">'+data+'  </span></td>' : "edwin" );
//             },
//         },
//         { "mDataProp": "telefono" },
//         { "mDataProp": "establecimientosRegistrados" },
//         {
//           render:function(data,type,row){
//             return "<td class='text-center'><ul class='icons-list'><li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'><i class='icon-menu9'></i></a><ul class='dropdown-menu dropdown-menu-right'><li><a href='#'><i class='fa fa-pencil'></i>Actualizar</a></li><li><a href='#'><i class='fa fa-ban'></i>Bloquear</a></li><li><a href='#'><i class='fa fa-trash-o'></i>Eliminar</a></li></ul></li></ul></td>";
//           }
//         },
//
//     ],
//         columnDefs: [{
//             targets: 2,
//             data: null,
//             defaultContent: "<button class='label label-default'>Show</button>"
//         },
//         {
//             orderable: false,
//             targets: [1, 2,3,5]
//         }]
//     });
//
//     $('.datatable-generated tbody').on('click', 'button', function () {
//         var data = table.row($(this).parents('tr')).data();
//         alert(data[0] +"'s location is: "+ data[ 2 ]);
//     });
//
//
//
// 	};
//
// 	return {
// 		getUsers: getUsers
// 	};


// var api = new apiUser();
// api.getUsers();
