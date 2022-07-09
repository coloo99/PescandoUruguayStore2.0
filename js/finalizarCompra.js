let envio = []

const enviarPedido = document.getElementById('enviar-pedido');
if(enviarPedido != null || undefined){
    enviarPedido.addEventListener('click', ()=> {  /*Evento al boton que envia los datos del pedido*/ 
        if(enviarPedido != null || undefined){
            envio.push(new Envio(document.getElementById("nombre").value, document.getElementById("apellido").value, document.getElementById("email").value, document.getElementById("telefono").value, document.getElementById("direccion").value, document.getElementById("localidad").value));
            localStorage.setItem('envio', JSON.stringify(envio));
            let env = true;
            enviado = true;
            localStorage.setItem('env', JSON.stringify(env));
            localStorage.setItem('enviado', JSON.stringify(enviado));
        }
    })
}

let datosEnvio = []
datosEnvio = JSON.parse(localStorage.getItem('envio'))
enviado = JSON.parse(localStorage.getItem('enviado'))
env = JSON.parse(localStorage.getItem('env'))
if(datosEnvio != null && datosEnvio.length != 0 && !enviado){
    alertarEnvio("Quieres usar los mismos datos de envio?", `<p>Nombre: ${datosEnvio[0].nombre} ${datosEnvio[0].apellido}</p><p>Direccion: ${datosEnvio[0].direccion}</p><p>Localidad: ${datosEnvio[0].localidad}</p><p>Celular: ${datosEnvio[0].telefono}</p>`)
}else if(datosEnvio != null && datosEnvio.length != 0 && env){
    alertarEnvio("Revisa los datos y confirma la compra", `</p>Estimado ${datosEnvio[0].nombre} ${datosEnvio[0].apellido} el envio se realizara con los siguientes datos:</p> <p>Direccion: ${datosEnvio[0].direccion}</p><p>Localidad: ${datosEnvio[0].localidad}</p></p><p>Celular: ${datosEnvio[0].telefono}</p>`)
    env = false;
    localStorage.setItem('env', JSON.stringify(env));
    enviado = false;
    localStorage.setItem('enviado', JSON.stringify(enviado));
}