console.log('Tienda tecnologia');

// ARRAYS Y OBJETOS
const defUser = { id: 1, user: 'rodrigo', pass: 'fbwe34f1w3' };
const ssd = { id: 1, nombre: 'SSD', marca: 'ADATA', costo: 550, cantidad: 10 };
const hdd = { id: 2, nombre: 'HDD', marca: 'WD', costo: 950, cantidad: 5 };
const mouse = { id: 3, nombre: 'Mouse', marca: 'Logitech', costo: 680, cantidad: 30 };
const monitor = { id: 4, nombre: 'Monitor', marca: 'Dell', costo: 8700, cantidad: 3 };
const inv = [ssd, hdd, mouse, monitor];
const miCarrito = [];
// const login = []

// VARIABLES
let idUser = 1;
let dato0 = 4;
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

// FUNCIONES
function logIn() {
	alert('  Incia sesión como Administrador para mas opciones  ');
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
function ingresaProductos() {
	agregar = 's';
	while (agregar != 'n' && agregar != 'N') {
		dato0 = dato0 + 1;
		let dato1 = prompt('Que producto quieres agregar:');
		let dato2 = prompt('De que marca es el producto:');
		let dato3 = prompt('Que costo tendra el producto:');
		let dato4 = prompt('Cuantas unidades piensas agregar:');

		const product = new Productos(
			parseInt(dato0),
			dato1.toUpperCase(),
			dato2.toUpperCase(),
			parseFloat(dato3),
			parseInt(dato4)
		);
		console.log(product);
		inv.push(product);
		lugar = 'Inventario';
		agrega();
	}
}

function eliminaProductos() {
	alert('Eliminar productos\nSe encuentra mantenimiento');
}

function muestraInventario() {
	let cont = document.createElement('div');
	cont.innerHTML = `<h2>Inventario disponible</h2>`;
	document.body.appendChild(cont);
	for (const producto of inv) {
		let container = document.createElement('div');
		container.innerHTML = `<h3>Producto ID: ${producto.id}</h3>
                                       <p>Nombre:       ${producto.nombre}</p>
                                       <p>Marca:        ${producto.marca}</p>
                                       <b>Costo:        $ ${producto.costo}</b>
                                       <p>Disponibles:  ${producto.cantidad}</p>`;
		document.body.appendChild(container);
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

const usuarioStore = localStorage.getItem('usuariosls');
let usuarios = [];
usuarios.push(defUser);

function cargarPaginaUsers() {
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
	mostrarUsuarios();
	console.log(usuarios.length);
	idUser = usuarios.length;
}
// console.log(usuarios);
// console.log(usuarios.length);
// console.log(idUser);
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
		alert('Ingresa usuario y contraseña');
	}
}

function cuentaAdmin() {
	const menuAdmon = document.getElementById('admMenu');
	const linkTienda = document.getElementById('tienda');
	const admin = `
    <a class="header__link nav-link dropdown-toggle" href="#" id="admonMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown id">
        <li><a class="header__link nav-link" href="./admon/inventario.html">Inventario</a></li>
        <li><a class="header__link nav-link" href="./admon/usuarios.html">Usuarios</a></li>
    </ul>
    `;
	const tienda = `
    <a class="header__link nav-link" href="./usuario/tienda.html">Tienda</a>
    `;
	menuAdmon.innerHTML = admin;
	linkTienda.innerHTML = tienda;

	// menuAdmon.append(admin);
	// console.log(invent);
}
