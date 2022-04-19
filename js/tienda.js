// VARIABLES, ARRAY & OBJETOS

let inv = [];
let carritoInv = [];
let miCarrito = {};

// Llamada desde JSON con async, await & fetch

const pedirJson = async () => {
	const URL = '../data/productos.json';
	const response = await fetch(URL);
	inv = await response.json();
	llamarLocalStorage();
}
pedirJson()

const llamarLocalStorage = () => {
	const prodStore = localStorage.getItem('productosls');
	if (prodStore) {
		inv = JSON.parse(prodStore);
	}
	carritoInv = inv.slice();
	muestraProductos();
}

// FUNCIONES

const muestraProductos = () => {
	const contProductos = document.getElementById('contProductos');
	contProductos.innerHTML = '';
	const template = document.getElementById('template-cards').content
	const fragment = document.createDocumentFragment();
	carritoInv.forEach(producto => {
		template.querySelector('img').setAttribute('src', producto.thumbnailUrl);
		template.querySelector('h2').textContent = producto.nombre;
		template.querySelector('h3').textContent = producto.marca;
		template.querySelector('h4 span').textContent = `$ ${(new Intl.NumberFormat(['es-MX'])).format(producto.costo)}`;
		template.querySelector('p span').textContent = producto.cantidad;
		template.querySelector('button').dataset.id = producto.id;
		const clone = template.cloneNode(true);
		fragment.appendChild(clone)
	});
	contProductos.appendChild(fragment)
	agregarACarrito();
};


const agregarACarrito = () => {
	const botones = document.querySelectorAll('.card button')
	
	botones.forEach(btn => {
		btn.addEventListener('click', () => {
			
			const producto = carritoInv.find(item => item.id === parseInt(btn.dataset.id))
			producto.cantidad = 1
			
			if (miCarrito.hasOwnProperty(producto.id)) {
				producto.cantidad = miCarrito[producto.id].cantidad + 1
			}
			miCarrito[producto.id] = { ...producto }
			
			cargarCarrito();
		})
	});
}


const cargarCarrito = () => {
	const items = document.getElementById('items')
	items.innerHTML = '';
	const template = document.getElementById('template-carrito').content
	const fragment = document.createDocumentFragment()
	Object.values(miCarrito).forEach(producto => {
		template.querySelector('th').textContent = producto.id
		template.querySelectorAll('td')[0].textContent = producto.nombre
		template.querySelectorAll('td')[1].textContent = producto.cantidad
		template.querySelector('span').textContent = `$ ${(new Intl.NumberFormat(['es-MX'])).format(producto.costo * producto.cantidad)}.00`
		template.querySelector('.btn-success').dataset.id = producto.id
		template.querySelector('.btn-danger').dataset.id = producto.id
		
		const clone = template.cloneNode(true);
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)
	cargarTotales()
	accionBotones()
}


const cargarTotales = () => {
	const carritoTotal = document.getElementById('base-carrito')
	carritoTotal.innerHTML = '';

	if (Object.values(miCarrito).length < 1) {
		carritoTotal.innerHTML = `<th scope="row" colspan="5">No hay productos en el carrito</th>`
		return
	}

	const template = document.getElementById('template-footer').content
	const fragment = document.createDocumentFragment()
	const totalCant = Object.values(miCarrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
	const totalCosto = Object.values(miCarrito).reduce((acc, {costo, cantidad}) => acc + (costo * cantidad), 0);
	template.querySelectorAll('td')[1].textContent = totalCant;
	template.querySelector('span').textContent = `$ ${(new Intl.NumberFormat(['es-MX'])).format(totalCosto)}.00`;
	template.querySelector('th').textContent = 'Totales Carrito';
	const clone = template.cloneNode(true);
	fragment.appendChild(clone)
	carritoTotal.appendChild(fragment)

	const boton = document.getElementById('vaciar-carrito')
	boton.addEventListener('click', () => {
		miCarrito = {}
		cargarCarrito()
	})
}

const accionBotones = () => {
	const botonAgregar = document.querySelectorAll('#items .btn-success')
	const botonEliminar = document.querySelectorAll('#items .btn-danger')

	botonAgregar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = miCarrito[btn.dataset.id]
			producto.cantidad = producto.cantidad + 1
			miCarrito[btn.dataset.id] = { ...producto }
			cargarCarrito()
		})
	})
	botonEliminar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = miCarrito[btn.dataset.id]
			producto.cantidad = producto.cantidad - 1
			if (producto.cantidad === 0) {
				delete miCarrito[btn.dataset.id]
			}else {
				miCarrito[btn.dataset.id] = { ...producto }
			}
			cargarCarrito()
		})
	})
}
