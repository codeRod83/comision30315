console.log('Tienda tecnologia');

// ARRAYS Y OBJETOS
const defUser = { id: 1, user: 'rodrigo', pass: 'fbwe34f1w3' };
const ssd = { id: 1, nombre: 'SSD', marca: 'ADATA', costo: 550, cantidad: 10 };
const hdd = { id: 2, nombre: 'HDD', marca: 'WD', costo: 950, cantidad: 5 };
const mouse = { id: 3, nombre: 'Mouse', marca: 'Logitech', costo: 680, cantidad: 30 };
const monitor = { id: 4, nombre: 'Monitor', marca: 'Dell', costo: 8700, cantidad: 3 };
const miCarrito = [];

// VARIABLES
let idUser = 1;
let proceso = 101;
let agregar = '';
let costprod = 0;
let descuento;
let desc = 0;
let desc1 = 0.9;
let desc2 = 0.8;
let desc3 = 0.7;
let subtotalf = costprod;
let opcion;
let lugar = '';

// CODE

const prodStore = localStorage.getItem('productosls');
let inv = [];
inv.push(ssd, hdd, mouse, monitor);
if (prodStore) {
	inv = JSON.parse(prodStore);
}
let dato0 = inv.length;

const usuarioStore = localStorage.getItem('usuariosls');
let usuarios = [];
usuarios.push(defUser);

// FUNCIONES
function logIn() {
	Toastify({
		text: 'Incia sesión como Administrador para mas opciones',
		duration: 3000,
		destination: 'https://github.com/apvarun/toastify-js',
		newWindow: true,
		close: true,
		gravity: 'top',
		position: 'center',
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: 'linear-gradient(to right, #00b09b, #96c93d)',
		},
	}).showToast();
}
function Productos(id, nombre, marca, costo, cantidad) {
	this.id = id;
	this.nombre = nombre;
	this.marca = marca;
	this.costo = costo;
	this.cantidad = cantidad;
}
function agrega() {
	agregar = prompt(`Quieres agregar otro producto al ${lugar} (s)(n)`);
}
function add(cost, opcion) {
	costprod = costprod + cost;
	console.log(`Agregaste un ${opcion} a tu carrito`);
	console.log(`   Costo: $${cost}`);
	miCarrito.push(opcion);
}
function alerta() {
	costprod = costprod * desc;
	alert(`Agregaste un ${descuento}% de descuento`);
}
function discount(descuento) {
	if (parseInt(descuento) == 10) {
		desc = desc1;
		alerta();
	} else if (parseInt(descuento) == 20) {
		desc = desc2;
		alerta();
	} else if (parseInt(descuento) == 30) {
		desc = desc3;
		alerta();
	}
}

// // EVENTOS
function mostrarAdmon() {
	const containera = document.getElementById('tabUserIndex');
	const userConti = document.createElement('tr');
	userConti.className = 'table-dark';

	const userNum = document.createElement('th');
	userNum.scope = 'row';
	userNum.textContent = usuarios[0].id;
	userConti.appendChild(userNum);
	const userName = document.createElement('td');
	userName.className = 'table-dark';
	userName.textContent = usuarios[0].user;
	userConti.appendChild(userName);
	const userPass = document.createElement('td');
	userPass.className = 'table-dark';
	userPass.textContent = usuarios[0].pass;
	userConti.appendChild(userPass);

	containera.appendChild(userConti);
}

function sessionIni() {
	const inputUs = document.getElementById('inputUi');
	const user = inputUs.value;
	const inputPa = document.getElementById('inputPi');
	const pass = inputPa.value;

	if (user === usuarios[0].user && pass === usuarios[0].pass) {
		cuentaAdmin();
		user.value = '';
		pass.value = '';
	} else if (user.trim() && pass.trim()) {
		user.value = '';
		pass.value = '';
	} else {
		// alert('Ingresa usuario y contraseña');
		Toastify({
			text: 'Ingresa un usuario y contraseña valido',
			duration: 2000,
			destination: 'https://github.com/apvarun/toastify-js',
			newWindow: true,
			close: true,
			gravity: 'top',
			position: 'center',
			stopOnFocus: true,
			style: {
				background: 'linear-gradient(to right, #df1616, #e72721a8)',
			},
		}).showToast();
	}
}

function cuentaAdmin() {
	const menuAdmon = document.getElementById('admMenu');
	const linkTienda = document.getElementById('tienda');
	const admin = `
    <a class="header__link nav-link dropdown-toggle" href="#" id="admonMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
    <ul class="adm dropdown-menu" aria-labelledby="navbarDropdown id">
        <li><a class="header__link nav-link" href="./admon/inventario.html">Inventario</a></li>
        <li><a class="header__link nav-link" href="./admon/usuarios.html">Usuarios</a></li>
    </ul>
    `;
	const tienda = `
    <a class="header__link nav-link" href="./usuario/tienda.html">Tienda</a>
    `;
	menuAdmon.innerHTML = admin;
	linkTienda.innerHTML = tienda;
	Swal.fire({
		position: 'top',
		icon: 'success',
		title: 'Iniciaste correctamente como Administrador',
		showConfirmButton: false,
		timer: 1200,
	});
}
function cuentaUser() {
	const menuUser = document.getElementById('tienda');
	const tienda = `
    <a class="header__link nav-link" href="./usuario/tienda.html">Tienda</a>
    `;
	menuUser.innerHTML = tienda;
	Swal.fire({
		position: 'top',
		icon: 'success',
		title: 'Iniciaste correctamente con cuenta de Usuario',
		showConfirmButton: false,
		timer: 1200,
	});
}

function ingresaProductos() {
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
		const product = new Productos(
			parseInt(dato0),
			prod,
			marca.toUpperCase(),
			cost,
			canti
		);
		inv.push(product);
		// ingProd.value = '';
		// ingMarc.value = '';
		// ingCost.value = '';
		// ingCanti.value = '';
		muestraInventario();
		localStorage.setItem('productosls', JSON.stringify(inv));
	} else {
		Toastify({
			text: 'Ingresa todos los datos para poder agregar un producto',
			duration: 3000,
			destination: 'https://github.com/apvarun/toastify-js',
			newWindow: true,
			close: true,
			gravity: 'bottom',
			position: 'center',
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: 'linear-gradient(to right,  #df1616, #e72721a8)',
			},
		}).showToast();
	}
}

function muestraInventario() {
	const contenedorInv = document.getElementById('tabProd');

	contenedorInv.innerHTML = '';

	for (const datProd of inv) {
		const prodCont = document.createElement('tr');
		prodCont.className = 'table-info';

		const prodNum = document.createElement('th');
		prodNum.scope = 'row';
		prodNum.textContent = datProd.id;
		prodCont.appendChild(prodNum);
		const prodName = document.createElement('td');
		prodName.className = 'table-info';
		prodName.textContent = datProd.nombre;
		prodCont.appendChild(prodName);
		const prodMarca = document.createElement('td');
		prodMarca.className = 'table-info';
		prodMarca.textContent = datProd.marca;
		prodCont.appendChild(prodMarca);
		const prodCosto = document.createElement('td');
		prodCosto.className = 'table-info';
		prodCosto.textContent = datProd.costo;
		prodCont.appendChild(prodCosto);
		const prodStock = document.createElement('td');
		prodStock.className = 'table-info';
		prodStock.textContent = datProd.cantidad;
		prodCont.appendChild(prodStock);

		contenedorInv.appendChild(prodCont);
	}

	function eliminaProductos() {
		alert('Eliminar productos\nSe encuentra mantenimiento');
	}

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
}

function cargarPaginaUsers() {
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
	mostrarUsuarios();
	console.log(usuarios.length);
	idUser = usuarios.length;
}

function addUser() {
	const inputUs = document.getElementById('inputU');
	const user = inputUs.value;
	const inputPa = document.getElementById('inputP');
	const pass = inputPa.value;

	if (user === usuarios[0].user && pass === usuarios[0].pass) {
		cuentaAdmin();
		user.value = '';
		pass.value = '';
	} else if (user.trim() && pass.trim()) {
		function Users(id, user, pass) {
			this.id = id;
			this.user = user;
			this.pass = pass;
		}
		idUser = idUser + 1;
		const usuario = new Users(idUser, user, pass);
		usuarios.push(usuario);
		console.log(usuarios);
		inputUs.value = '';
		inputPa.value = '';

		mostrarUsuarios();
		localStorage.setItem('usuariosls', JSON.stringify(usuarios));
	} else {
		alert('Ingresa usuario y contraseña');
	}
}

function mostrarUsuarios() {
	const contenedor = document.getElementById('tabUser');

	contenedor.innerHTML = '';
	for (const datUser of usuarios) {
		const userCont = document.createElement('tr');
		userCont.className = 'table-dark';

		const userNum = document.createElement('th');
		userNum.scope = 'row';
		userNum.textContent = datUser.id;
		userCont.appendChild(userNum);
		const userName = document.createElement('td');
		userName.className = 'table-dark';
		userName.textContent = datUser.user;
		userCont.appendChild(userName);
		const userPass = document.createElement('td');
		userPass.className = 'table-dark';
		userPass.textContent = datUser.pass;
		userCont.appendChild(userPass);

		contenedor.appendChild(userCont);
	}
}

function compraProductos() {
	agregar = 's';
	prodn = inv.length;
	console.log(prodn);

	while (agregar != 'n' && agregar != 'N') {
		let opcion = prompt(
			`Que producto quieres agregar:\n1 ${inv[0].nombre} \n2 ${inv[1].nombre}\n3 ${inv[2].nombre}\n4 ${inv[3].nombre} `
		);
		if (opcion == 1) {
			add(inv[0].costo, inv[0].nombre);
		} else if (opcion == 2) {
			add(inv[1].costo, inv[1].nombre);
		} else if (opcion == 3) {
			add(inv[2].costo, inv[2].nombre);
		} else if (opcion == 4) {
			add(inv[3].costo, inv[3].nombre);
		}
		// miCarrito.push(`${opcion}`)
		console.log(miCarrito.join('\n'));
		lugar = 'Carrito de compras';
		agrega();
	}

	alert(
		'Los siguientes son los codigos de descuento:\n10 --> 10%\n20 --> 20%\n30 --> 30%'
	);
	descuento = prompt('Si tienes algun codigo de descuento ingresalo aqui: ');
	switch (parseInt(descuento)) {
		case 10:
			discount(10);
			break;
		case 20:
			discount(20);
			break;
		case 30:
			discount(30);
			break;
		default:
			break;
	}

	sub = costprod * 0.84;
	let iva = costprod - sub;
	alert('Aqui tienes tu cuenta Total: ');
	alert(`Subtotal: $ ${sub}\n        IVA: $ ${iva}\n      Total: $ ${costprod}`);
	miCarrito.push('');
	let prodcar = miCarrito.length - 1;
	alert(`Agregaste ${prodcar} productos a tu carrito\n${miCarrito.join(' --> 1 pza\n')}`);
}
