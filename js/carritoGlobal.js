class Envio{
    constructor(nombre, apellido, email, telefono, direccion, localidad, precioT){ 
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.localidad = localidad;
        this.precioTotal = precioT;
    }
}

let envio = []
let carritoLocalStorage
carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))

/*///////FORMULARIO DE COMPRA///////*/
const datosPedido = document.getElementById('datos-pedido');

/*///////CARRITO///////*/
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
actualizarCarrito(carritoLocalStorage)

mostrarCarrito(carritoLocalStorage)
function mostrarCarrito(carritoLocalStorage) {
    for(Producto of carritoLocalStorage){
        let div = document.createElement('div')
        div.setAttribute('class', 'productoEnCarrito')
        div.innerHTML=`<p>${Producto.nombre}</p>
                        <p>Precio: $${Producto.precio}</p>
                        <button id="eliminar${Producto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div)
    
        let btnEliminar = document.getElementById(`eliminar${Producto.id}`)
        btnEliminar.addEventListener('click',()=>{
            btnEliminar.parentElement.remove()
            carritoLocalStorage = carritoLocalStorage.filter(prod => prod.id !== Producto.id)
            actualizarCarrito(carritoLocalStorage)
        })
    }
}
 
function actualizarCarrito(carritoLocalStorage){
    contadorCarrito.innerText = carritoLocalStorage.length  //Contador productos del carrito
    precioTotal.innerText = carritoLocalStorage.reduce((acc,el)=> acc + el.precio, 0 )   //Acumulador de precio
    localStorage.setItem("carrito", JSON.stringify(carritoLocalStorage))
}

/*Agregar precio en ventana de compra*/
function pagar(){
    if(datosPedido != null || undefined){
        let precioT = 0;
        for (let i = 0; i < carritoLocalStorage.length; i++) {
            precioT += carritoLocalStorage[i].precio;
        }
        if(precioT != 0){
            datosPedido.innerHTML += `<p class="datos-compra">El total a pagar es de </p><p class="ptotal">$${precioT}</p>`
        }else{
            localStorage.setItem('alerta', JSON.stringify(true));
            window.location.replace("../pages/productos.html");
        }
    }
}
pagar();


/*Alerta para seleccionar datos de compra*/
const alertarEnvio = (tit, datos)=> {
    Swal.fire({
        title: tit,
        html: datos,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        confirmButtonColor: '#3085d6', 
        cancelButtonColor: '#d33'
    }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title:'Compra realizada!',
                            text: 'Tu compra se enviara al destino seleccionado, gracias por preferirnos :)',
                            icon:'success',
                            confirmButtonText: 'Continuar comprando',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.setItem("carrito", JSON.stringify(null))
                                window.location.replace("../pages/productos.html");
                            }
                        })
                    } 
    })
}


let enviado = false
const btnPagar = document.getElementById('pagar')
btnPagar.addEventListener('click', ()=> {
    if(env == true){
        enviado = false
        localStorage.setItem('enviado', JSON.stringify(enviado));
    }
})

/*Evento al boton que envia los datos del pedido*/ 
const enviarPedido = document.getElementById('enviar-pedido');

enviarPedido.addEventListener('click', ()=> {
    if(enviarPedido != null || undefined){
        envio.push(new Envio(document.getElementById("nombre").value, document.getElementById("apellido").value, document.getElementById("email").value, document.getElementById("telefono").value, document.getElementById("direccion").value, document.getElementById("localidad").value));
        localStorage.setItem('envio', JSON.stringify(envio));
        let env = true;
        enviado = true;
        localStorage.setItem('env', JSON.stringify(env));
        localStorage.setItem('enviado', JSON.stringify(enviado));
    }
})

let datosEnvio = JSON.parse(localStorage.getItem('envio'))
enviado = JSON.parse(localStorage.getItem('enviado'))
env = JSON.parse(localStorage.getItem('env'))
if(datosEnvio[0].nombre != undefined && datosEnvio[0].localidad != undefined && datosEnvio[0].direccion != undefined && !enviado){
    alertarEnvio("Quieres usar los mismos datos de envio?", `<p>Nombre: ${datosEnvio[0].nombre} ${datosEnvio[0].apellido}</p><p>Direccion: ${datosEnvio[0].direccion}</p><p>Localidad: ${datosEnvio[0].localidad}</p><p>Celular: ${datosEnvio[0].telefono}</p>`)
}else if(datosEnvio[0].nombre != undefined && datosEnvio[0].localidad != undefined && datosEnvio[0].direccion != undefined && env){
    alertarEnvio("Revisa los datos y confirma la compra", `Estimado ${datosEnvio[0].nombre} ${datosEnvio[0].apellido} el envio sera realiado a <p>Localidad: ${datosEnvio[0].localidad}</p><p>Direccion: ${datosEnvio[0].direccion}</p>`)
    env = false;
    localStorage.setItem('env', JSON.stringify(env));
    enviado = false;
    localStorage.setItem('enviado', JSON.stringify(enviado));
}




