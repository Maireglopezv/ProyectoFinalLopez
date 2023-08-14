let articulosCarrito = [];

const menu = document.querySelector('.menu');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
    }
    carritoHTML();
})

menu.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto)

function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
        leerDatosProducto(producto)
    }
}

function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('.comida').src,
        titulo: item.querySelector('.nombre').textContent,
        precio: item.querySelector('.precio').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
   console.log(infoProducto)
   
    if(articulosCarrito.some( item => item.id === infoProducto.id)){ 
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto;
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice();
    }else {
        articulosCarrito.push(infoProducto)
    }
    carritoHTML()
}

function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50" height="50"/></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(fila)
    })

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}

function captura(){
    var nombre=document.getElementById("nombre").value;
    var apellido=document.getElementById("apellido").value;
    var correo=document.getElementById("correo").value;
    var telefono=document.getElementById("telefono").value;
    var comentario=document.getElementById("comentario").value;
    if (nombre=="") {
        alert("El campo NOMBRE es obligatorio!")
        document.getElementById("nombre").focus();
    }else{
        if (apellido=="") {
        alert("El campo APELLIDO es obligatorio! 😉");
        document.getElementById("apellido").focus();
    }else{
        if (correo=="") {
        alert("El campo CORREO es obligatorio! 😉");
        document.getElementById("correo").focus();
    }else{
        if (telefono=="") {
        alert("El campo TELEFONO es obligatorio! 😉");
        document.getElementById("telefono").focus();
    }
    else{
        if (comentario=="") {
        alert("No nos has dejado tus felicitaciones, reclamos o sugerencias! 🤔");
        document.getElementById("comentario").focus();
    }else{
        console.log("Nombre: " + nombre + " *" +" " + "Apellido: " + apellido + " *" +" " +"Correo: " + correo + " *" +" " +"Telefono: " + telefono + " *" +" " +"Comentario: " + comentario);
        document.getElementById("nombre").value="";
        document.getElementById("apellido").value="";
        document.getElementById("correo").value="";
        document.getElementById("telefono").value="";
        document.getElementById("comentario").value="";
        document.getElementById("nombre").focus();
    }
}   
}
}
}
}


