let carrito = []
let carritoLocalStorage
carrito = JSON.parse(localStorage.getItem('carrito'))
let alerta = JSON.parse(localStorage.getItem('alerta'))
localStorage.setItem('alerta', JSON.stringify(false));

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const buscador = document.getElementById('search')
actualizarCarrito(carrito)
mostrarCarrito(carrito)

//Buscado

mostrarProductos(inventarioProductos)

//ALERTA
const alertarSuccess = (titulo, mensaje)=> {
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

const alertarError = (mensaje)=> {
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

//logica Ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML = ""
    array.forEach(el => {
    let div = document.createElement('div')
    div.classList.add('producto');
    div.innerHTML= `<div class="card">
                        <div class="card-image">
                            <div class="cont-image">    
                                <img class="zoom card-img-top" src="${el.img}">
                            </div>
                            <div class="card-t"> 
                                <a id="button${el.id}" class="btn-carrito halfway-fab waves-effect waves-light blue"><i class="icono material-icons">add_shopping_cart</i></a>
                                <span class="card-title">${el.nombre}</span>
                            </div> 
                        </div>
                        <div class="card-content">
                            <div class="tipo"><p class="tipo-texto">Tipo: ${el.tipo}</p></div>
                            <div class="precio"><p class="precio-texto"> $${el.precio}</p></div>
                            <div class="cantidad"><p class="cantidad-texto"> En stock: ${el.cantidad}</p></div>
                            <div class="desc"><p class="desc-texto">${el.desc}</p></div>
                        </div>
                    </div>`
    contenedorProductos.appendChild(div)
    
    let btnAgregar = document.getElementById(`button${el.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(el.id);
        alertarSuccess("Agregado!", "El producto se agregó al carrito")
    })
  })
}

function agregarAlCarrito(id) {
    let productoNew = inventarioProductos.find(prod=> prod.id === id)
    if(carrito = carrito || []){
        carrito.push(productoNew)
    }
    agregar(productoNew)
    actualizarCarrito(carrito)
}

function agregar(productoNew) { //Agregar un producto dentro del carrito
   let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML=`<p>${productoNew.nombre}</p>
                    <p>Precio: $${productoNew.precio}</p>
                    <button id="eliminar${productoNew.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)
    
    let btnEliminar = document.getElementById(`eliminar${productoNew.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carrito = carrito.filter(producto => producto.id !== productoNew.id)
        alertarSuccess("Eliminado!", "Producto eliminado correctamente!!")
        actualizarCarrito(carrito)
    })
}


function mostrarCarrito(carrito) { //Mostrar los productos dentro del carrito
    if(carrito != null){
        for(Producto of carrito){
            let div = document.createElement('div')
            div.setAttribute('class', 'productoEnCarrito')
            div.innerHTML=`<p>${Producto.nombre}</p>
                            <p>Precio: $${Producto.precio}</p>
                            <button id="eliminar${Producto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
            contenedorCarrito.appendChild(div)
        
            let btnEliminar = document.getElementById(`eliminar${Producto.id}`)
            btnEliminar.addEventListener('click',()=>{
                btnEliminar.parentElement.remove()
                carrito = carrito.filter(prod => prod.id !== Producto.id)
                actualizarCarrito(carrito)
            })
        }
    }
}

function  actualizarCarrito (carrito){
    if(carrito != null){
        contadorCarrito.innerText = carrito.length  //Contador productos del carrito
        precioTotal.innerText = carrito.reduce((acc,el)=> acc + el.precio, 0 )   //acumulador de precio 
    }else{   
        contadorCarrito.innerText = "0"
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
}