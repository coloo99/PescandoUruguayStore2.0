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