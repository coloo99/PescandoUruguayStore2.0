let consulta = []
let alerta = JSON.parse(localStorage.getItem('alerta'))
localStorage.setItem('alerta', JSON.stringify(false))

/*///////  FORMULARIO DE COMPRA  ///////*/
const datosPedido = document.getElementById('datos-pedido');

/*////////  ALERTAS ERROR Y SUCCESS  ////////*/
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
/*////////// Fin Alertas /////////*/

/*//////////  CARRITO  //////////*/
let carrito = []
carrito = JSON.parse(localStorage.getItem('carrito'))
let precioT = 0
if(carrito != null){
    for (let i = 0; i < carrito.length; i++) {
        precioT += carrito[i].producto.precio * carrito[i].cantidad;
    }
}
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
                                /*///// EMAIL JS /////*/
                                emailjs.send("service_mvoq7l7","template_ib5m2ri",{
                                    nombre: datosEnvio[0].nombre,
                                    apellido: datosEnvio[0].apellido,
                                    email: datosEnvio[0].email,
                                    telefono: datosEnvio[0].telefono,
                                    direccion: datosEnvio[0].direccion,
                                    localidad: datosEnvio[0].localidad,
                                    message: precioT,
                                });
                                /*///// FIN EMAIL JS /////*/
                            }
                            setTimeout(function(){
                                window.location.replace("../pages/productos.html");
                            }, 1500);
                        })
                    } 
    })
}

/*Obtengo los datos de la consulta, hago un push del objeto consulta y guardo la variable consulta en el local storage para obtenerla mas abajo*/
const enviarConsulta = document.getElementById('enviar-consulta');
if(enviarConsulta != null || undefined){
    enviarConsulta.addEventListener('click', ()=> {  /*Evento al boton que envia la consulta*/ 
        if(enviarConsulta != null || undefined){
            consulta.push(new Consulta(document.getElementById("nombrec").value, document.getElementById("apellidoc").value, document.getElementById("emailc").value, document.getElementById("telefonoc").value, document.getElementById("consulta").value));
            localStorage.setItem('consulta', JSON.stringify(consulta));
        }
        /* enviarEmailConsulta() */
    })
}

/*Se envia un mail sobre la consulta*/
let datosConsulta = []
datosConsulta = JSON.parse(localStorage.getItem('consulta'))
if(datosConsulta != null && datosConsulta.length != 0){
    emailjs.send("service_mvoq7l7","template_3uentfi",{
        namec: datosConsulta[0].nombre,
        apellidoc: datosConsulta[0].apellido,
        emailc: datosConsulta[0].email,
        telefonoc: datosConsulta[0].telefono,
        consulta: datosConsulta[0].consulta,
    });
    consulta = []
    localStorage.setItem('consulta', JSON.stringify(consulta));
    setTimeout(function(){
        window.location.replace("../index.html");
    }, 1500);
}
