// Declaración de arreglo para los productos en el carrito de compras
let articulosCarrito = [];

const menu = document.querySelector('.menu');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const finalizarCompra = document.querySelector('#finalizar-compra');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
    // Evento de clic en el botón de finalizar compra
    finalizarCompra.addEventListener('click', (evt) => {
        evt.preventDefault();
        const carritoJSON = JSON.stringify(articulosCarrito);
        localStorage.setItem('carrito', carritoJSON);
        location.href = './compra.html';
    });
});


menu.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto)
// Agregar  productos al carrito
function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
        leerDatosProducto(producto)
    }
}
// Eliminación de productos del carrito
function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}
// lectura de los datos de los productos, para agregarlos al carrito
function leerDatosProducto(item) {
    const imagen = item.querySelector('.comida').src;
    const titulo = item.querySelector('.nombre').textContent;
    const precio = item.querySelector('.precio').textContent;
    const id = item.querySelector('a').getAttribute('data-id');
    const cantidad = 1;

    const infoProducto = { imagen, titulo, precio, id, cantidad };
   
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
            <td><img src="${producto.imagen}" width="45" height="45"/></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">×</a>
            </td>
            </br>
        `;
        contenedorCarrito.appendChild(fila)

        const subTotal = parseFloat(producto.precio) * producto.cantidad; sumaTotal += subTotal;
    });
// Actualizar el total a pagar en la interfaz
    const sumaTotalElement = document.getElementById('suma-total');
    sumaTotalElement.textContent = `Total a pagar: $ ${sumaTotal}`;
// Sincronizar el carrito con el almacenamiento local
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

// Captura de los datos del formulario
function captura() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value; // Declarar como let en lugar de const
    const comentario = document.getElementById("comentario").value;

// Remover cualquier caracter no numérico de la variable telefono
    telefono = telefono.replace(/\D/g, '');

    const inputs = [
        { campo: "nombre", valor: nombre },
        { campo: "apellido", valor: apellido },
        { campo: "correo", valor: correo },
        { campo: "telefono", valor: telefono }, 
        { campo: "comentario", valor: comentario }
    ];

    const campoVacio = inputs.find(input => input.valor === "");

    if (campoVacio) {
        document.getElementById(campoVacio.campo).focus();
    } else {
// Limpiar los campos del formulario
        inputs.forEach(input => {
            document.getElementById(input.campo).value = "";
        });

        document.getElementById("nombre").focus();
// Muestra notificación utilizando la librería
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: `${nombre}, ¡Gracias por tu preferencia!`,
            icon: 'success',
            width: 450,
            color: '#033d3d',
            background: 'url(../img/PLAYA1.jpg)',
        });
    }
    console.log(inputs);
}




