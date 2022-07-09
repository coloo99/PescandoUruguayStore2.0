let contenidoJSON = []
let inventarioProductos = []
const URLproductos = `https://62c6008da361f72512934c0e.mockapi.io/Productos`  /*Url de mi api con los productos*/

const obtenerContenido = (URLproductos)=> {
    contenedorProductos.innerHTML = `<div class="loading show">
                                        <div class="spin"></div>
                                    </div>` /*Muestra el spin de cargando hasta que se obtienen y cargan los productos*/
    fetch(URLproductos)
    .then(response => response.json())
    .then(data => {
        inventarioProductos = data
    })
    .finally(()=> mostrarProductos(inventarioProductos))    /*Al terminar de obtener los los productos de la api los muestra en la pagina*/
    .catch(()=> contenedorProductos.innerHTML = `<div class="loading show">
                                                    <div class="error"><p>No se encontraron productos</p></div>
                                                    <div class="cont-spin"><div class="spin"></div></div>
                                                </div>`)    /*Si hay un error accediendo a los datos se muestra el <p> con un spin en la pagina*/    
}