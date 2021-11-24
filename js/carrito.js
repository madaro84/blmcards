window.onload = function () {
         
          const productos = [
              {
                  id: 1,
                  nombre: 'Foto',
                  descripcion: 'Tu imagen favorita!',
                  precio: 1200,
                  imagen: src = 'img/001.jpg',              },
              {
                  id: 2,
                  nombre: 'Mini Pola',
                  descripcion: 'Diseño original con dedicatoria',
                  precio: 1500,
                  imagen: src = 'img/002.jpg'
              },
              {
                  id: 3,
                  nombre: 'Acuarela',
                  descripcion: 'Diseño original con dedicatoria',
                  precio: 1500,
                  imagen: src = 'img/003.jpg'
              },
              {
                  id: 4,
                  nombre: 'Insta',
                  descripcion: 'Diseño original con dedicatoria',
                  precio: 1500,
                  imagen: src = 'img/004.jpg'
              }

          ];

          let carrito = [];
          let total = 0;
          const items = document.querySelector('#items');
          const verCarrito = document.querySelector('#carrito');
          const totalCarrito = document.querySelector('#total');
          const botonVaciar = document.querySelector('#boton-vaciar');
          const milocalStorage = window.localStorage;

          
          function mostrarProductos() {
              productos.forEach((info) => {
                  
                  const productosCarrito = document.createElement('div');
                  productosCarrito.classList.add('designs');
                  
                  const design = document.createElement('designs');
                  design.classList.add('card-body');
                  
                  const nombreDesign = document.createElement('h4');
                  nombreDesign.classList.add('card-title');
                  nombreDesign.textContent = info.nombre;

                  const nombreDescripcion = document.createElement('h5');
                  nombreDescripcion.classList.add('card-text');
                  nombreDescripcion.textContent = info.descripcion;
                  
                  const imagenDesign = document.createElement('img');
                  imagenDesign.classList.add('img-fluid');
                  imagenDesign.setAttribute('src', info.imagen);
                  
                  const preciodesign = document.createElement('h5');
                  preciodesign.classList.add('card-text');
                  preciodesign.textContent = '$ ' + info.precio;
                  
                  const botonCarrito = document.createElement('button');
                  botonCarrito.classList.add('btn', 'btn-light');
                  botonCarrito.textContent = 'Quiero mi mazo!';
                  botonCarrito.setAttribute('marcador', info.id);
                  botonCarrito.addEventListener('click', agregarProducto );
                  
                  design.appendChild(imagenDesign);
                  design.appendChild(nombreDesign);
                  design.appendChild(nombreDescripcion);
                  design.appendChild(preciodesign);
                  design.appendChild(botonCarrito);
                  productosCarrito.appendChild(design);
                  items.appendChild(productosCarrito);
              });
          }

function agregarProducto (evento) {
          
carrito.push(evento.target.getAttribute('marcador'))
calcularTotal();
actualizarCarrito ();
carritoEnLS();
}

function actualizarCarrito() {
 verCarrito.textContent = '';
          
const carritoSinDuplicar = [...new Set(carrito)];
carritoSinDuplicar.forEach((item) => {
          
const itemDesign = productos.filter((itemDesignProductos) => {
     return itemDesignProductos.id === parseInt(item);
    });
          
const cantidadProducto = carrito.reduce((total, itemId) => {
return itemId === item ? total += 1 : total;
    }, 0);
          
const productosCarrito = document.createElement('li');
productosCarrito.classList.add('list-group-item', 'text-right', 'mx-2');
productosCarrito.textContent = `${cantidadProducto} x Diseño ${itemDesign[0].nombre} - $ ${itemDesign[0].precio}`;
          
const borrarProducto = document.createElement('button');
borrarProducto.classList.add('btn', 'btn-dark', 'mx-2');
borrarProducto.textContent = 'X';
borrarProducto.style.marginLeft = '1rem';
borrarProducto.dataset.item = item;
borrarProducto.addEventListener('click', borrarItemCarrito);
productosCarrito.appendChild(borrarProducto);
verCarrito.appendChild(productosCarrito);
    });
}

function borrarItemCarrito(evento) {
          
const id = evento.target.dataset.item;
carrito = carrito.filter((carritoId) => {
return carritoId !== id;
              });
actualizarCarrito();
calcularTotal();
carritoEnLS();
          }

function calcularTotal() {
    total = 0;
carrito.forEach((item) => {
const itemDesign = productos.filter((itemDesignProductos) => {
return itemDesignProductos.id === parseInt(item);
    });

total = total + itemDesign[0].precio;
    });
          
totalCarrito.textContent = total.toFixed(2);
          }

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    calcularTotal();
    localStorage.clear();
          }
function carritoEnLS () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoLS () {
    if (miLocalStorage.getItem('carrito') !== null) {
    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

botonVaciar.addEventListener('click', vaciarCarrito);

mostrarProductos();
cargarCarritoLS();
calcularTotal();
actualizarCarrito();


}


