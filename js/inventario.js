// VARIABLES, ARRAY & OBJETOS

let inv = [];
let dato0 = 0;

// Llamada desde JSON con async, await & fetch

const pedirJson = async () => {
	const URL = '../data/productos.json';
	const response = await fetch(URL);
	inv = await response.json();
	llamarLocalStorage();
};
pedirJson();

const llamarLocalStorage = () => {
	const prodStore = localStorage.getItem('productosls');
	if (prodStore) {
		inv = JSON.parse(prodStore);
	}
	dato0 = inv.length;
	muestraInventario();
	agregarProducto();
}

// FUNCIONES

const muestraInventario = () => {
	const items = document.getElementById('tabProd')
	items.innerHTML = '';
	const template = document.getElementById('template-inventario').content
	const fragment = document.createDocumentFragment()
	inv.forEach(producto => {
		template.querySelector('th').textContent = producto.id
		template.querySelectorAll('td')[0].textContent = producto.nombre
		template.querySelectorAll('td')[1].textContent = producto.marca
		template.querySelector('span').textContent = `$ ${(new Intl.NumberFormat(['es-MX'])).format(producto.costo)}.00`
		template.querySelectorAll('td')[3].textContent = producto.cantidad
		template.querySelector('.btn-success').dataset.id = producto.id
		template.querySelector('.btn-danger').dataset.id = producto.id
		
		const clone = template.cloneNode(true);
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)
	botonesInventario()
}

const agregarProducto = () => {
	let btnAddProd = document.getElementById('btn__addProd');
	btnAddProd.addEventListener('click', () => {
		const ingProd = document.getElementById('ingProducto');
		const prod = ingProd.value;
		const ingMarc = document.getElementById('ingMarca');
		const marca = ingMarc.value;
		const ingCost = document.getElementById('ingCosto');
		const cost = ingCost.value;
		const ingCanti = document.getElementById('ingCantidad');
		const canti = ingCanti.value;

		if (prod.trim() && marca.trim() && cost.trim() && canti.trim()) {
			dato0 = inv.length + 1;
			let imgNum = dato0 * 10
			let imagen = `https://picsum.photos/id/${imgNum}/600`

			function Productos(id, nombre, marca, costo, cantidad, thumbnailUrl) {
				this.id = id;
				this.nombre = nombre;
				this.marca = marca;
				this.costo = costo;
				this.cantidad = cantidad;
				this.thumbnailUrl = thumbnailUrl;
			}
			const product = new Productos(
				parseInt(dato0),
				prod.toUpperCase(),
				marca.toUpperCase(),
				cost,
				parseInt(canti),
				imagen,
			);
			inv.push(product);
			muestraInventario();
			Swal.fire({
				position: 'top',
				icon: 'success',
				title: 'Se agrego el producto al Inventario',
				showConfirmButton: false,
				timer: 1200,
			});
			localStorage.setItem('productosls', JSON.stringify(inv));
		} else {
			Toastify({
				text: 'Ingresa todos los datos para poder agregar un producto',
				duration: 3000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				style: {
					background: 'linear-gradient(to right,  #df1616, #e72721a8)',
				},
				offset: {
					// x: 100, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
					y: 300, // vertical axis - can be a number or a string indicating unity. eg: '2em'
				},
			}).showToast();
		}
	})
}

const botonesInventario = () => {
	const botonAgregar = document.querySelectorAll('#tabProd .btn-success')
	const botonEliminar = document.querySelectorAll('#tabProd .btn-danger')

	botonAgregar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = inv[btn.dataset.id-1]
			producto.cantidad = producto.cantidad + 1
			inv[btn.dataset.id-1] = { ...producto }
			muestraInventario()
		})
	})
	botonEliminar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = inv[btn.dataset.id-1]
			if (producto.cantidad == 0) {
				producto.cantidad = 0
			} else {
				producto.cantidad = producto.cantidad - 1
				inv[btn.dataset.id-1] = { ...producto }
			}
			muestraInventario()
		})
	})
}