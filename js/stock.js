class Producto{
    constructor(id, nombre, tipo, desc, precio, cantidad, img){ 
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.desc = desc;
        this.precio = precio;
        this.cantidad = cantidad;
        this.img = img;
    }
}

const inventarioProductos = []
let contIdProductos=0

//PRODUCTOS
function cargarProductos(){ //Cargar articulos en el inventario
    agregarProducto("Spiner Bait", "senuelo", "Señuelo diseñado para pesca de peces cazadores en rios", 450, 4,'../imagenes_prod/senuelos/spinner_bait.png');
    agregarProducto("Articulado", "senuelo", "Un señuelo que imita un pez real con su cuerpo articulado", 440, 3,'../imagenes_prod/senuelos/articulado.png');
    agregarProducto("Paseante", "senuelo", "Senuelo pensado para pescar peces cazadores", 500, 1,'../imagenes_prod/senuelos/paseante.png');
    agregarProducto("Popper", "senuelo", "Señuelo diseñado para generar vibraciones e irritar a los peces casadores", 490, 5,'../imagenes_prod/senuelos/Popper.png');
    agregarProducto("Señuelo Jigging", "señuelo", "Senuelo para pescar trabajandolo contra el piso en los rios", 600, 7,'../imagenes_prod/senuelos/jigging.png');
    agregarProducto("Abeja", "senuelo", "Señuelo imitacion de una abeja irresistible para los peces cazadores", 600, 7,'../imagenes_prod/senuelos/abeja.png');
    agregarProducto("Cuchara para mar", "senuelo", "Señuelo cuchara pensado principalmente para la pesca en mar", 600, 7,'../imagenes_prod/senuelos/cuchara_mar.png');
    agregarProducto("Saposilla", "senuelo", "Señuelo pensado para peces casadores de rios y lagunas", 600, 7,'../imagenes_prod/senuelos/sapozilla_naranjapng.png');
    agregarProducto("Spon media agua", "senuelo", "Señuelo pensado para pescar peces cazadores trabajandolo en media agua", 600, 7,'../imagenes_prod/senuelos/spoon-lure.png');
    agregarProducto("Abu Garcia spining 1.60m", "cania", "Cañia de dos tramos para pesca señuelos, accion ultra light", 2500, 2,'../imagenes_prod/canias/cania_globeride.png');
    agregarProducto("Abu garcia spining 2.10m", "cania", "Caña para la pesca con señuelos, buen lance y accion medium-hevy", 4400, 8,'../imagenes_prod/canias/caña_abugarcia.png');
    agregarProducto("Fly", "cania", "Caña para la pesca en modalidad Flay con pequeñas moscas", 5030, 15,'../imagenes_prod/canias/caña_pesca_flypng.png');
    agregarProducto("Caña combo niños", "cania", "Caña de pesca para niños que se estan iniciando", 4090, 7,'../imagenes_prod/canias/cania_recreacion_ninio.png');
    agregarProducto("Caña combo Black Max 3", "cania", "Caña abugarcia de baitcast, diseñada para la pesca con señuelos", 3000, 6,'../imagenes_prod/canias/cania_abu_casting.png');
    agregarProducto("Caña combo Black Max 3 Red", "cania", "Caña abugarcia de baitcast, diseñada para la pesca con señuelos", 3000, 6,'../imagenes_prod/canias/cania_abu_casting_red.png');
    agregarProducto("Marin Sports Spining", "cania", "Caña de spinning, diseñada para la pesca con señuelos teniendo un buen lance", 3000, 6,'../imagenes_prod/canias/caña_abu_spining.png');
    agregarProducto("Caña para Hielo", "cania", "Caña ideal para practicar la pesca en hielo sobre el rio", 3000, 6,'../imagenes_prod/canias/cania_hielo.png');
    agregarProducto("Marine Sports Cueva", "cania", "Caña marine para la pesca embarcado y de costa en rios", 3000, 6,'../imagenes_prod/canias/marine_sports_cueva.png');
}
cargarProductos()

function agregarProducto(nombreP, tipoP, desc, precioP, cantStock, img){ //Push del producto a agregar
    contIdProductos++;
    inventarioProductos.push(new Producto(contIdProductos, nombreP, tipoP, desc, precioP, cantStock, img));
}
