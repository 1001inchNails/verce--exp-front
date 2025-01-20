$(document).ready(function(){

    function mensaje(texto){     // funcion mensaje aviso   
        $('#contenedorMensaje').fadeIn();
        $('#mensaje').text(texto);
        
    }
    $('#todos').click(async function(){ // funcionalidad ver todos los usuarios
        await $.ajax({
            url: 'https://vercel-exp-back2.vercel.app/api/users',
            type: "GET",
            crossDomain: true,
            success: function(data){
                console.log(data);
                $('main').empty();  // vaciar contenedor antes de visionado

                for(let unidad of data){
                    $('main').append(`<div class="carta">
                        <img src="profPic.png">
                        <p><i>Nombre:</i> ${unidad.nombre}</p>
                        <p><i>Apellidos:</i> ${unidad.apellidos}</p>
                        <p><i>Telefono:</i> ${unidad.telefono}</p>
                        <p><i>Email:</i> ${unidad.email}</p>
                        <p><i>Id:</i> ${unidad.id}</p>
                        </div>`)
                }
            }
        }); 
    });

    $('#busc').click(function(){    // apertura menu de busqueda
        $('main').empty();
        $('#contenedorFormBusq').fadeIn();
        $('#nombreBusq').val('');
    });
    $('#cancelBusq').click(function(e){ // cierre menu de busqueda
        e.preventDefault();
        $('#contenedorFormBusq').fadeOut();
        $('#nombreBusq').val('');
    });

    $(document).on('click', '#contenedorFormBusq', function(e) {    // https://stackoverflow.com/questions/1423671/jquery-click-off-element-event
        if (!$(e.target).closest('#formularioBusq').length) {   // target es el elemento clickado, closest busca el ancestro inmediato y length da el numero de elementos encontrados
            $('#contenedorFormBusq').fadeOut();                 // quiere decir que si no hay ancestro para el objetivo en referencia al formulario, cierra. 
            $('#nombreBusq').val('');
        }
    });

    $(document).on('click', '#contenedorFormNue', function(e) {
        if (!$(e.target).closest('#formularioNue').length) {
            $('#contenedorFormNue').fadeOut();
        }
    });
    
    

    $('#formularioBusq').submit(async function(e) { // funcionalidad busqueda de usuarios
        e.preventDefault();
        let busqueda=$('#nombreBusq').val();    // se coje el valor del input
        await $.ajax({
            url: `https://vercel-exp-back2.vercel.app/api/users/${busqueda}`, // se mete la busqueda en la llamada al endpoint
            type: "GET",
            crossDomain: true,  // para la movida del CORS
            success: function(data){
                console.log(data);
                //console.log(typeof(data),"///////",Array.isArray(data));

                if(!Array.isArray(data)){   // si no es un array, no hay coincidencias
                    mensaje(data.mensaje);  // mostramos menu mensaje con el texto que manda el endpoint
                }else{
                    for(let unidad of data){
                    $('main').append(`<div class="carta">
                        <img src="profPic.png">
                        <p><i>Nombre:</i> ${unidad.nombre}</p>
                        <p><i>Apellidos:</i> ${unidad.apellidos}</p>
                        <p><i>Telefono:</i> ${unidad.telefono}</p>
                        <p><i>Email:</i> ${unidad.email}</p>
                        <p><i>Id:</i> ${unidad.id}</p>
                        </div>`);
                    }
                }
                
                $('#contenedorFormBusq').fadeOut();
                $('#nombreBusq').val('');                      
            }
        }); 
    });
    
    $('#nue').click(function(){ // apertura menu nuevo usuario
        $('main').empty();
        $('#contenedorFormNue').fadeIn();
        $('#nombreNue').val('');
        $('#apellidosNue').val('');
        $('#telefonoNue').val('');
        $('#emailNue').val('');
    });
    $('#cancelNue').click(function(e){  // cierre menu nuevo usuario
        e.preventDefault();
        $('#contenedorFormNue').fadeOut();
        $('#nombreNue').val('');
        $('#apellidosNue').val('');
        $('#telefonoNue').val('');
        $('#emailNue').val('');
    });


    $('#contMens').click(function(e){   // cierre menu mensaje
        e.preventDefault();
        $('#contenedorMensaje').fadeOut();
        $('#mensaje').val('');
    });

    $('#formularioNue').submit(async function (e) { // funcionalidad nuevo usuario
        e.preventDefault();
        let nom=$('#nombreNue').val();
        let ape=$('#apellidosNue').val();
        let tele=$('#telefonoNue').val();
        let email=$('#emailNue').val();

        let datos={
            "nombre":nom,
            "apellidos":ape,
            "telefono":tele,
            "email":email
          };

          await $.ajax({
            url: 'https://vercel-exp-back2.vercel.app/api/datos',
            type: "POST",
            contentType: 'application/json',    // sin esta linea no se puede acceder al req.body
            dataType: "json",
            data: JSON.stringify(datos),
            crossDomain: true,
            success: function(response){  // sin response, no resuelve y no se ejecuta el codigo de success aunque si envie correctamente la informacion, a pesar de que tecnicamente no necesitamos el response en este caso
              
                $('#contenedorFormNue').fadeOut();
                $('#nombreNue').val('');
                $('#apellidosNue').val('');
                $('#telefonoNue').val('');
                $('#emailNue').val('');

                mensaje(response.mensaje);
            }
        }); 
    });
});