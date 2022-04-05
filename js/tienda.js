// VARIABLES, ARRAY & OBJETOS

const prodStore = localStorage.getItem('productosls');
let inv = [];
const miCarrito = {};
let dato0 = 0;

// Llamada desde JSON con async, await & fetch

const pedirJson = async () => {
	const URL = '../data/productos.json';
	const response = await fetch(URL);
	inv = await response.json();
	llamaProductos();
};
pedirJson();

// FUNCIONES

function llamaProductos() {
	if (prodStore) {
		inv = JSON.parse(prodStore);
	}
	muestraCards(inv);
	muestraInventario();
}


function muestraInventario() {
	const contenedorInv = document.getElementById('tabProd');
	contenedorInv.innerHTML = '';

	// CAMBIAR A forEach
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
	
	// for (const datProd of inv) {
	// 	const prodCont = document.createElement('tr');
	// 	prodCont.className = 'table-info border-2 border-primary';

	// 	const prodNum = document.createElement('th');
	// 	prodNum.scope = 'row';
	// 	prodNum.className = 'border__list text-center';
	// 	prodNum.textContent = datProd.id;
	// 	prodCont.appendChild(prodNum);
	// 	const prodName = document.createElement('td');
	// 	prodName.className = 'table-info border__list';
	// 	prodName.textContent = datProd.nombre;
	// 	prodCont.appendChild(prodName);
	// 	const prodMarca = document.createElement('td');
	// 	prodMarca.className = 'table-info border__list text-center';
	// 	prodMarca.textContent = datProd.marca;
	// 	prodCont.appendChild(prodMarca);
	// 	const prodCosto = document.createElement('td');
	// 	prodCosto.className = 'table-info border__list text-center';
	// 	prodCosto.textContent = datProd.costo;
	// 	prodCont.appendChild(prodCosto);
	// 	const prodStock = document.createElement('td');
	// 	prodStock.className = 'table-info text-center';
	// 	prodStock.textContent = datProd.cantidad;
	// 	prodCont.appendChild(prodStock);

	// 	contenedorInv.appendChild(prodCont);
	// }
}

const contProductos = document.getElementById('contProductos');
const muestraCards = (inv) => {
	const template = document.getElementById('template-cards').content
	const fragment = document.createDocumentFragment();
	inv.forEach(producto => {
		template.querySelector('img').setAttribute('src', producto.thumbnailUrl);
		template.querySelector('h2').textContent = producto.nombre;
		template.querySelector('h3').textContent = producto.marca;
		template.querySelector('h4 span').textContent = producto.costo;
		template.querySelector('p span').textContent = producto.cantidad;

		const clone = template.cloneNode(true);
		fragment.appendChild(clone)
	});
	contProductos.appendChild(fragment)
};

// let agregar = '';
// let costprod = 0;
// let descuento;
// let desc = 0;
// let desc1 = 0.9;
// let desc2 = 0.8;
// let desc3 = 0.7;
// let subtotalf = costprod;
// let opcion;
// let lugar = '';

// function add(cost, opcion) {
// 	costprod = costprod + cost;
// 	console.log(`Agregaste un ${opcion} a tu carrito`);
// 	console.log(`   Costo: $${cost}`);
// 	miCarrito.push(opcion);
// }
// function alerta() {
// 	costprod = costprod * desc;
// 	alert(`Agregaste un ${descuento}% de descuento`);
// }
// function discount(descuento) {
// 	if (parseInt(descuento) == 10) {
// 		desc = desc1;
// 		alerta();
// 	} else if (parseInt(descuento) == 20) {
// 		desc = desc2;
// 		alerta();
// 	} else if (parseInt(descuento) == 30) {
// 		desc = desc3;
// 		alerta();
// 	}
// }

// function compraProductos() {
// 	agregar = 's';
// 	prodn = inv.length;
// 	console.log(prodn);

// 	while (agregar != 'n' && agregar != 'N') {
// 		let opcion = prompt(
// 			`Que producto quieres agregar:\n1 ${inv[0].nombre} \n2 ${inv[1].nombre}\n3 ${inv[2].nombre}\n4 ${inv[3].nombre} `
// 		);
// 		if (opcion == 1) {
// 			add(inv[0].costo, inv[0].nombre);
// 		} else if (opcion == 2) {
// 			add(inv[1].costo, inv[1].nombre);
// 		} else if (opcion == 3) {
// 			add(inv[2].costo, inv[2].nombre);
// 		} else if (opcion == 4) {
// 			add(inv[3].costo, inv[3].nombre);
// 		}
// 		// miCarrito.push(`${opcion}`)
// 		console.log(miCarrito.join('\n'));
// 		lugar = 'Carrito de compras';
// 		agrega();
// 	}

// 	alert(
// 		'Los siguientes son los codigos de descuento:\n10 --> 10%\n20 --> 20%\n30 --> 30%'
// 	);
// 	descuento = prompt('Si tienes algun codigo de descuento ingresalo aqui: ');
// 	switch (parseInt(descuento)) {
// 		case 10:
// 			discount(10);
// 			break;
// 		case 20:
// 			discount(20);
// 			break;
// 		case 30:
// 			discount(30);
// 			break;
// 		default:
// 			break;
// 	}

// 	sub = costprod * 0.84;
// 	let iva = costprod - sub;
// 	alert('Aqui tienes tu cuenta Total: ');
// 	alert(`Subtotal: $ ${sub}\n        IVA: $ ${iva}\n      Total: $ ${costprod}`);
// 	miCarrito.push('');
// 	let prodcar = miCarrito.length - 1;
// 	alert(`Agregaste ${prodcar} productos a tu carrito\n${miCarrito.join(' --> 1 pza\n')}`);
// }
