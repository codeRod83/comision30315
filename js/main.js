// VARIABLES, OBJETOS & ARRAYS

let btnInfo = document.getElementById('btn__info');
let btnLogin = document.getElementById('btn__log');
const usuarioStore = localStorage.getItem('usuariosls');
let usuarios = [];

// LLAMADA USUARIOS DESDE JSON POR MEDIO DE FETCH

const URL = 'data/usuarios.json';
fetch(URL)
	.then((res) => res.json())
	.then((userData) => {});

const response = await fetch(URL);
usuarios = await response.json();

// LLAMADA LOCAL STORAGE

window.addEventListener('load', mostrarAdmon());
btnInfo.addEventListener('click', infoLog);
cargaUsuarios();
btnLogin.addEventListener('click', sessionIni);
console.log(usuarios);
// FUNCIONES

function cargaUsuarios() {
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
}

function mostrarAdmon() {
	const containerAdm = document.getElementById('tabUserIndex');
	const userContent = document.createElement('tr');
	userContent.className = 'table-dark';

	const userNum = document.createElement('th');
	userNum.scope = 'row';
	userNum.className = 'text-center';
	userNum.textContent = usuarios[0].id;
	userContent.appendChild(userNum);

	const userRank = document.createElement('td');
	userRank.className = 'text-center';
	userRank.textContent = usuarios[0].rank;
	userContent.appendChild(userRank);

	const userName = document.createElement('td');
	userName.className = 'text-center';
	userName.textContent = usuarios[0].user;
	userContent.appendChild(userName);
	const userPass = document.createElement('td');
	userPass.className = 'text-center';
	userPass.textContent = usuarios[0].pass;
	userContent.appendChild(userPass);

	containerAdm.appendChild(userContent);
}

function infoLog() {
	Toastify({
		text: 'Incia sesión como Administrador para mas opciones',
		duration: 2000,
		destination: 'https://github.com/apvarun/toastify-js',
		newWindow: true,
		close: true,
		gravity: 'top',
		position: 'center',
		stopOnFocus: true,
		className: 'toast__info',
		style: {
			background: 'linear-gradient(to right, #00b09b, #96c93d)',
		},
	}).showToast();
}

function sessionIni() {
	const inputUs = document.getElementById('inputUi');
	const user = inputUs.value;
	const inputPa = document.getElementById('inputPi');
	const pass = inputPa.value;

	if (user === usuarios[0].user && pass === usuarios[0].pass) {
		cuentaAdmin();
	}
	// Falta agregar validacion de los demas usuarios dados de alta
	else if (user.trim() && pass.trim()) {
	} else {
		Toastify({
			text: 'Ingresa un usuario y contraseña valido',
			duration: 2000,
			destination: 'https://github.com/apvarun/toastify-js',
			newWindow: true,
			close: true,
			gravity: 'top',
			position: 'center',
			stopOnFocus: true,
			className: 'toast__error',
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

// FUNCION PENDIENTE

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
