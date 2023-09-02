let articulosCarrito = [];

const menu = document.querySelector('.menu');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const finalizarCompra = document.querySelector('#finalizar-compra');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');



document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
    }
    carritoHTML();

    finalizarCompra.addEventListener('click', function(evt) {
        evt.preventDefault();
        const carritoJSON = JSON.stringify(articulosCarrito);
        localStorage.setItem('carrito', carritoJSON);
        location.href = './compra.html';
    });

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

    let sumaTotal = 0;

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

        const subTotal = parseFloat(producto.precio) * producto.cantidad; sumaTotal += subTotal;
    });
    const sumaTotalElement = document.getElementById('suma-total');
    sumaTotalElement.textContent = `Total a pagar: $ ${sumaTotal}`;

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
        document.getElementById("nombre").focus();
    }else{
        if (apellido=="") {
        document.getElementById("apellido").focus();
    }else{
        if (correo=="") {
        document.getElementById("correo").focus();
    }else{
        if (telefono=="") {
        document.getElementById("telefono").focus();
    }
    else{
        if (comentario=="") {
        document.getElementById("comentario").focus();
    }else{
        document.getElementById("nombre").value="";
        document.getElementById("apellido").value="";
        document.getElementById("correo").value="";
        document.getElementById("telefono").value="";
        document.getElementById("comentario").value="";
        document.getElementById("nombre").focus();
    }
    Swal.fire({
        title:'¡Mensaje enviado!',
        text: nombre + ', ¡Gracias por tu preferencia!',
        icon: 'success',
        width: 450,
        color: '#033d3d',
        background: 'url(../img/PLAYA1.jpg)',
      })
}   } } } }


