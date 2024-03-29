const contenedorSenuelos = document.getElementById('contenedor-senuelos')
const contenedorCanias = document.getElementById('contenedor-canias')
const botonTerminar = document.getElementById('terminar')
const buscador = document.getElementById('search')

//Se obtienen los productos desde la API
obtenerContenido(URLproductos)

//Mostrar productos en seccion productos
function mostrarProductos(inventarioProductos){
    contenedorSenuelos.innerHTML = ""
    contenedorCanias.innerHTML = ""
    inventarioProductos.forEach(producto => {
    let div = document.createElement('div')
    div.classList.add('producto');
    div.innerHTML= `<div class="card">
                        <div class="card-image">
                            <div class="cont-image">    
                                <img class="zoom card-img-top" src="${producto.img}">
                            </div>
                            <div class="card-t"> 
                                <a id="button${producto.id}" class="btn-carrito halfway-fab waves-effect waves-light blue"><i class="icono material-icons">add_shopping_cart</i></a>
                                <span class="card-title">${producto.nombre}</span>
                            </div> 
                        </div>
                        <div class="card-content">
                            <div class="tipo"><p class="tipo-texto">Tipo: ${producto.tipo}</p></div>
                            <div class="precio"><p class="precio-texto"> $${producto.precio}</p></div>
                            <div class="cantidad"><p class="cantidad-texto"> En stock: ${producto.cantidad}</p></div>
                            <div class="desc"><p class="desc-texto">${producto.desc}</p></div>
                        </div>
                    </div>`
                    if(producto.tipo === "senuelo"){
                        contenedorSenuelos.appendChild(div)
                    }else{
                        contenedorCanias.appendChild(div)
                    }
    
    let btnAgregar = document.getElementById(`button${producto.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(producto.id);
        alertarSuccess("Agregado!", "El producto se agregó al carrito")
    })
  })
}

function errorAlCargarProductos(){ /*Se muestran sping con el error si no se llega a los productos*/
    contenedorSenuelos.innerHTML = `<div class="loading show">
                                        <div class="error"><p>No se encontraron productos</p></div>
                                        <div class="cont-spin"><div class="spin"></div></div>
                                    </div>`    /*Si hay un error accediendo a los datos se muestra el <p> con un spin en la pagina*/   
    contenedorCanias.innerHTML = `<div class="loading show">
                                    <div class="error"><p>No se encontraron productos</p></div>
                                    <div class="cont-spin"><div class="spin"></div></div>
                                </div>`    /*Si hay un error accediendo a los datos se muestra el <p> con un spin en la pagina*/ 
}