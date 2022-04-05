// VARIABLES, ARRAY & OBJETOS

let btnAddProd = document.getElementById('btn__addProd');
const prodStore = localStorage.getItem('productosls');
let inv = [];
let dato0 = 0;

// Llamada desde JSON con async, await & fetch

const pedirJson = async () => {
	const URL = '../data/productos.json';
	const response = await fetch(URL);
	inv = await response.json();
	prodLocalStor();
};
pedirJson();

// EVENTOS

btnAddProd.addEventListener('click', addProd);

// FUNCIONES

function prodLocalStor() {
	if (prodStore) {
		inv = JSON.parse(prodStore);
	}
	muestraInventario();
	dato0 = inv.length;
}

function muestraInventario() {
	const contenedorInv = document.getElementById('tabProd');
	contenedorInv.innerHTML = '';

	for (const datProd of inv) {
		const prodCont = document.createElement('tr');
		prodCont.className = 'table-info border-2 border-primary';

		const prodNum = document.createElement('th');
		prodNum.scope = 'row';
		prodNum.className = 'border__list text-center';
		prodNum.textContent = datProd.id;
		prodCont.appendChild(prodNum);
		const prodName = document.createElement('td');
		prodName.className = 'table-info border__list';
		prodName.textContent = datProd.nombre;
		prodCont.appendChild(prodName);
		const prodMarca = document.createElement('td');
		prodMarca.className = 'table-info border__list text-center';
		prodMarca.textContent = datProd.marca;
		prodCont.appendChild(prodMarca);
		const prodCosto = document.createElement('td');
		prodCosto.className = 'table-info border__list text-center';
		prodCosto.textContent = datProd.costo;
		prodCont.appendChild(prodCosto);
		const prodStock = document.createElement('td');
		prodStock.className = 'table-info text-center';
		prodStock.textContent = datProd.cantidad;
		prodCont.appendChild(prodStock);

		contenedorInv.appendChild(prodCont);
	}
}

function addProd() {
	const ingProd = document.getElementById('ingProducto');
	const prod = ingProd.value;
	const ingMarc = document.getElementById('ingMarca');
	const marca = ingMarc.value;
	const ingCost = document.getElementById('ingCosto');
	const cost = ingCost.value;
	const ingCanti = document.getElementById('ingCantidad');
	const canti = ingCanti.value;

	// Condición si todos los datos fueron ingresados
	if (prod.trim() && marca.trim() && cost.trim() && canti.trim()) {
		dato0 = inv.length + 1;
		let imgNum = dato0*10
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
			prod,
			marca.toUpperCase(),
			cost,
			canti,
			imagen,
		);
		inv.push(product);
		muestraInventario();
		localStorage.setItem('productosls', JSON.stringify(inv));
	} else {
		console.log('Faltan Datos');
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
				y: 500, // vertical axis - can be a number or a string indicating unity. eg: '2em'
			},
		}).showToast();
	}
}

// function eliminaProductos() {
// 	alert('Eliminar productos\nSe encuentra mantenimiento');
// }

// inv.push(ssd, hdd, mouse, monitor);
// let cont = document.createElement('div');
// cont.innerHTML = `<h2>Inventario disponible</h2>`;
// document.body.appendChild(cont);
// for (const producto of inv) {
// 	container = document.createElement('div');
// 	container.innerHTML = `<h3>Producto ID: ${producto.id}</h3>
//                                    <p>Nombre:       ${producto.nombre}</p>
//                                    <p>Marca:        ${producto.marca}</p>
//                                    <b>Costo:        $ ${producto.costo}</b>
//                                    <p>Disponibles:  ${producto.cantidad}</p>`;
// 	document.body.appendChild(container);
// }
