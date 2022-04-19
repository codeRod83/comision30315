// VARIABLES, ARRAY & OBJETOS


let usuarios = [];
let idUser = '';
let rank = '.';

// LLAMADA USUARIOS DESDE JSON POR MEDIO DE FETCH

const pedirJson = async () => {
	const URL = '../data/usuarios.json';
	const response = await fetch(URL);
	usuarios = await response.json();
	
	llamarLocalStorage();
}
pedirJson();

const llamarLocalStorage = () => {
	const usuarioStore = localStorage.getItem('usuariosls');
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
	idUser = usuarios.length;
	mostrarUsuarios();
	agregarUsuario();
	
}

// FUNCIONES

const mostrarUsuarios = () => {
	const contenedor = document.getElementById('tabUser');
	contenedor.innerHTML = '';
	const template = document.getElementById('template-tablaUsuarios').content;
	const fragment = document.createDocumentFragment();
	
	usuarios.forEach(usuario => {
		template.querySelector('th').textContent = usuario.id;
		template.querySelectorAll('td')[0].textContent = usuario.rank;
		template.querySelectorAll('td')[1].textContent = usuario.user;
		template.querySelectorAll('td')[2].textContent = usuario.pass;

		const clone = template.cloneNode(true);
		fragment.appendChild(clone);
	});
	contenedor.appendChild(fragment);
	
}

const agregarUsuario = () => {
	let btnAddUser = document.getElementById('btn__addUser');
	btnAddUser.addEventListener('click', () => {
		const inputUs = document.getElementById('inputU');
		const user = inputUs.value;
		const inputPa = document.getElementById('inputP');
		const pass = inputPa.value;
		const input1 = document.getElementById('flexRadioSup');
		const input2 = document.getElementById('flexRadioUser');

		if (input1.checked) {
			rank = input1.value;
		} else if (input2.checked) {
			rank = input2.value;
		} else {
			rank = '0';
		}
		if (user == usuarios[0].user || pass == usuarios[0].pass) {
			Toastify({
				text: 'Esta cuenta de usuario ya existe',
				duration: 2000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				className: 'toast__error',
				style: {
					background: 'linear-gradient(to right, #00b09b, #96c93d)',
				},
			}).showToast();
		} else if (user.trim() && pass.trim() && rank != '0') {
			function Users(id, rank, user, pass) {
				this.id = id;
				this.rank = rank;
				this.user = user;
				this.pass = pass;
			}
			idUser = idUser + 1;
			const usuario = new Users(idUser, rank, user, pass);
			usuarios.push(usuario);
			localStorage.setItem('usuariosls', JSON.stringify(usuarios));

			mostrarUsuarios();
		} else if (user == '' && pass == '' && rank == '0') {
			Toastify({
				text: 'No ingresaste ningun dato',
				duration: 2000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				className: 'toast__error',
				style: {
					borderradius: '50%',
					background: 'linear-gradient(to right, #df1616, #e72721a8',
				},
			}).showToast();
		} else if (user == '') {
			Toastify({
				text: 'No ingresaste un usuario',
				duration: 2000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				className: 'toast__error',
				style: {
					borderradius: '50%',
					background: 'linear-gradient(to right, #df1616, #e72721a8',
				},
			}).showToast();
		} else if (pass == '') {
			Toastify({
				text: 'No ingresaste un password',
				duration: 2000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				className: 'toast__error',
				style: {
					borderradius: '50%',
					background: 'linear-gradient(to right, #df1616, #e72721a8',
				},
			}).showToast();
		} else if (rank == '0') {
			Toastify({
				text: 'No ingresaste un rango de Usuario',
				duration: 2000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true,
				className: 'toast__error',
				style: {
					borderradius: '50%',
					background: 'linear-gradient(to right, #df1616, #e72721a8',
				},
			}).showToast();
		
		}
	})
}