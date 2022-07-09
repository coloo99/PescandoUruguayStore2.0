let envio = []
let alerta = JSON.parse(localStorage.getItem('alerta'))
localStorage.setItem('alerta', JSON.stringify(false))

/*///////  FORMULARIO DE COMPRA  ///////*/
const datosPedido = document.getElementById('datos-pedido');

/*////////  ALERTAS  ////////*/
const alertarSuccess = (titulo, mensaje)=> { /*Alerta sastifactorio al agregar y quitar items del carrito*/
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

const alertarError = (mensaje)=> {  /*Alerta de eror al querer pagar sin ningun item dentro del carrito*/
    Swal.fire({
        title: mensaje,
        icon: 'error',
        confirmButtonText: 'Continuar',
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}
if(alerta == true){
    alertarError("Debe agregar un producto al carrito para poder continuar");
}

const alertarEnvio = (tit, datos)=> { /*Alerta para seleccionar datos de compra*/
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
                            confirmButtonColor: '#3085d6', 
                            cancelButtonColor: '#d33'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.setItem("carrito", JSON.stringify(null))
                                window.location.replace("../pages/productos.html");
                            }
                        })
                    } 
    })
}
/*////////// Fin Alertas /////////*/

/*//////////  CARRITO  //////////*/
let carrito = []
carrito = JSON.parse(localStorage.getItem('carrito'))
actualizarCarrito(carrito)
mostrarCarrito(carrito)

function agregarAlCarrito(id) { //Agregar un item al carrito segun su id
    let productoNew = inventarioProductos.find(prod=> prod.id === id)
    if(carrito = carrito || []){
        if(carrito.some(prod=> prod.producto.id === id) == false){
            carrito.push({producto: new Producto(productoNew.id, productoNew.nombre, productoNew.tipo, productoNew.desc, productoNew.precio, productoNew.cantidad, productoNew.img), cantidad: 1}) //Agrego producto en el carrito
            mostrarCarrito(carrito)
        }else{
            carrito.forEach(produc => {
                    if(produc.producto.id==id){ //Busco el item repetido por su id dentro del carrito y le sumo 1 a la cantidad
                        produc.cantidad+=1;
                    }
            });
            mostrarCarrito(carrito)
        }
    }
    actualizarCarrito(carrito) //Actualizo los numeros del carrito despues de agregar el item
}

 function mostrarCarrito(carrito) { //Inserta los productos dentro del carrito en el HTML
    contenedorCarrito.innerHTML = ""
    if(carrito != null){
        carrito.forEach(produc => {
            let div = document.createElement('div')
            div.setAttribute('class', 'productoEnCarrito')
            div.innerHTML=`<p>${produc.producto.nombre}</p>
                            <p>Precio: $${produc.producto.precio}</p>
                            <p>Cantidad: ${produc.cantidad}</p>
                            <button id="eliminar${produc.producto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
            contenedorCarrito.appendChild(div)
        
            let btnEliminar = document.getElementById(`eliminar${produc.producto.id}`)
            btnEliminar.addEventListener('click',()=>{
                btnEliminar.parentElement.remove()
                carrito = carrito.filter(prod => prod.producto.id !== produc.producto.id)
                alertarSuccess("Eliminado!", "El producto se eliminó del carrito!")
                localStorage.setItem("carrito", JSON.stringify(carrito))
                actualizarCarrito(carrito)
                pagar()
            })
        })
    }
}
 
/*Actualiza los numeros del carrito(Tanto el precio total como la cantidad de items dentro del carrito)*/
function  actualizarCarrito (carrito){
    if(carrito != null){
        contadorCarrito.innerText = carrito.length  //Contador productos del carrito
        precioTotal.innerText = carrito.reduce((acc,el)=> acc + el.producto.precio * el.cantidad, 0 )   //acumulador de precio 
    }else{   
        contadorCarrito.innerText = "0"
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

 /*Evento del boton pagar dentro del carrito*/
 let enviado = false
 const btnPagar = document.getElementById('pagar')
 btnPagar.addEventListener('click', ()=> {
     if(env == true){
         enviado = false
         localStorage.setItem('enviado', JSON.stringify(enviado));
     }
 })
/*///////// Fin Carrito ///////////*/

/*///////  FORMULARIO TERMINAR COMPRA  ///////*/
function pagar(){  /*Crear ticket de ventana en terminarCompra*/
    carrito = JSON.parse(localStorage.getItem('carrito'))
    if(datosPedido != null || undefined){
        datosPedido.innerHTML = `<tr class="altura-datos">
                                    <td class="titulos-tabla">Tipo</td>
                                    <td class="titulos-tabla">Producto</td>
                                    <td class="titulos-tabla ancho">Cantidad</td>
                                    <td class="titulos-tabla">Precio</td>
                                </tr>`
    }
    if(datosPedido != null || undefined){
        let precioT = 0;
        for (let i = 0; i < carrito.length; i++) {
            precioT += carrito[i].producto.precio * carrito[i].cantidad;
        }
        if(precioT != 0){
            carrito.forEach(produc => {
                let tipo
                if(produc.producto.tipo == "senuelo"){
                    tipo = "Señuelo"
                    datosPedido.innerHTML+=`<tr class="altura-datos">
                                                <td class="datos-tabla">${tipo}</td>
                                                <td class="datos-tabla">${produc.producto.nombre}</td>
                                                <td class="datos-tabla ancho">${produc.cantidad}</td>
                                                <td class="datos-tabla-precio">$${produc.producto.precio}</td>
                                            </tr>`
                }else if(produc.producto.tipo == "cania"){
                    tipo = "Caña"
                    datosPedido.innerHTML+=`<tr class="altura-datos">
                                                <td class="datos-tabla">${tipo}</td>
                                                <td class="datos-tabla">${produc.producto.nombre}</td>
                                                <td class="datos-tabla ancho">${produc.cantidad}</td>
                                                <td class="datos-tabla-precio">$${produc.producto.precio}</td>
                                            </tr>`
                }
            })
            datosPedido.innerHTML += `<tr class="altura-datos">
                                        <td class="datos-tabla-vacios"></td>
                                        <td class="datos-tabla-vacios"></td>
                                        <td class="titulos-tabla ancho">Total</td>
                                        <td class="datos-tabla-precioT">$${precioT}</td>
                                    </tr>`
        }else{
            localStorage.setItem('alerta', JSON.stringify(true));
            window.location.replace("../pages/productos.html");
        }
    }
}
pagar();

const acc = document.getElementById('accordion');
if(acc != null){  /*Desplegar ticket dentro del formulario de compra*/
    acc.onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}

const enviarPedido = document.getElementById('enviar-pedido');
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

/*Se obtiene envio desde el LocalStorage y se verifica si ya realizo un pedido(y muestra un SwAl con los datos usados anteriormente y la opcion de usar los mismos) o si es el primer pedido que realiza tiene que llenar los campos del form*/
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