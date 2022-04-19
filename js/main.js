// VARIABLES, OBJETOS & ARRAYS

let usuarios = [];

// LLAMADA USUARIOS DESDE JSON POR MEDIO DE FETCH

const pedirJson = async () => {
	const URL = 'data/usuarios.json';
	const response = await fetch(URL);
	usuarios = await response.json();
	llamarLocalStorage();
}
pedirJson();

// LLAMADA LOCAL STORAGE

const llamarLocalStorage = () => {
	const usuarioStore = localStorage.getItem('usuariosls');
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
	mostrarAdmon();
	botonInfo();
	botonInicioSesion();
}

// FUNCIONES

const mostrarAdmon = () => {
	const containerAdm = document.getElementById('tabUserIndex');
	const template = document.getElementById('template-adminUser').content
	const fragment = document.createDocumentFragment();
	
	template.querySelector('th').textContent = usuarios[0].id;
	template.querySelectorAll('td')[0].textContent = usuarios[0].rank;
	template.querySelectorAll('td')[1].textContent = usuarios[0].user;
	template.querySelectorAll('td')[2].textContent = usuarios[0].pass;

	const clone = template.cloneNode(true);
	fragment.appendChild(clone);
	containerAdm.appendChild(fragment);
}

const botonInfo = () => {
	let btnInfo = document.getElementById('btn__info');
	btnInfo.addEventListener('click', () => {
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
	})
}

const botonInicioSesion = () => {
	let btnLogin = document.getElementById('btn__log');
	btnLogin.addEventListener('click', () => {
		const inputUs = document.getElementById('inputUi');
		const user = inputUs.value;
		const inputPa = document.getElementById('inputPi');
		const pass = inputPa.value;

		if (user === usuarios[0].user && pass === usuarios[0].pass) {
			navBarAdministrador();
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
	})
}

const navBarAdministrador = () => {
	const menuAdmon = document.getElementById('admMenu');
	const linkTienda = document.getElementById('tienda');

	const template = document.getElementById('template-adminMenu').content
	const fragment = document.createDocumentFragment();

	const clone = template.cloneNode(true);
	fragment.appendChild(clone);
	menuAdmon.appendChild(fragment);

	const tienda = `
     <a class="header__link nav-link" href="./usuario/tienda.html">Tienda</a>
 	 `;
	linkTienda.innerHTML = tienda;
	Swal.fire({
		position: 'top',
		icon: 'success',
		title: 'Iniciaste correctamente como Administrador',
		showConfirmButton: false,
		timer: 1200,
	});
}