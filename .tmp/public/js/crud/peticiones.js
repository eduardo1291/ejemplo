
var Peticiones = (function(){


/*AQUI VAMOS A METER TODOS METODOS DE PETICIONES PARA REUTILIZARLOS EN LAS DEMAS VISTAS,
SI SE NECESITA UN NUEVO METODO SE AGREGA AQUI IGUAL
*/
var _delete = function(url, data){
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: data,
    async:false,
    success: function(data){
      if(data.error){
        console.log("Ocurrio un error");
      }else {
        console.log("Eliminado");
        swal({
            title: "Eliminado!",
            text: "Los registros se han eliminado.",
            confirmButtonColor: "#66BB6A",
            type: "success"
        });
        $('.datatable-generated').DataTable().ajax.reload();
      }
    },error:function(err){
      console.log("Entro en error");
    }
  });

};


    var _post = function(url, data){

      console.log("entre al posttt");
      $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        async:false,
        success: function(data){
          if(data.error){
            $('#textoError').text(data.message.raw);
            $('#error').show();
          }else {
            console.log("no hubo error");
            $('#error').hide();
            $(".editar").modal('toggle');
            $('.datatable-generated').DataTable().ajax.reload();
          }
        },error:function(err){
          $('#error').show();
          $('#textoError').text('Server Error');
        }
      });

    };


return{
delete: _delete,
post: _post
};

})();
