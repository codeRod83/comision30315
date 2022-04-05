// VARIABLES, ARRAY & OBJETOS

let btnAddUser = document.getElementById('btn__addUser');
const usuarioStore = localStorage.getItem('usuariosls');
let usuarios = [];
let idUser = '';
let rank = '';

// Llamar desde JSON

const URL = '../data/usuarios.json';
fetch(URL)
	.then((res) => res.json())
	.then((userData) => {});

const response = await fetch(URL);
usuarios = await response.json();
// console.log(usuarios);

// LLAMADO DE FUNCIONES

userLocalStor();
window.addEventListener('load', mostrarUsers);
btnAddUser.addEventListener('click', addUser);
// usuarios.push(defUser);

// FUNCIONES

function userLocalStor() {
	if (usuarioStore) {
		usuarios = JSON.parse(usuarioStore);
	}
	mostrarUsers();
	// console.log(usuarios.length);
	idUser = usuarios.length;
}

function mostrarUsers() {
	const contenedor = document.getElementById('tabUser');

	contenedor.innerHTML = '';
	for (const datUser of usuarios) {
		const userCont = document.createElement('tr');
		userCont.className = 'table-dark';

		const userNum = document.createElement('th');
		userNum.scope = 'row';
		userNum.className = 'text-center';
		userNum.textContent = datUser.id;
		userCont.appendChild(userNum);
		const userRank = document.createElement('td');
		userRank.className = 'text-center';
		userRank.textContent = datUser.rank;
		userCont.appendChild(userRank);
		const userName = document.createElement('td');
		userName.className = 'text-center';
		userName.textContent = datUser.user;
		userCont.appendChild(userName);
		const userPass = document.createElement('td');
		userPass.className = 'text-center';
		userPass.textContent = datUser.pass;
		userCont.appendChild(userPass);

		contenedor.appendChild(userCont);
	}
}

function addUser() {
	const inputUs = document.getElementById('inputU');
	const user = inputUs.value;
	const inputPa = document.getElementById('inputP');
	const pass = inputPa.value;
	const input1 = document.getElementById('flexRadioSup');
	const input2 = document.getElementById('flexRadioUser');

	if (input1.checked) {
		rank = input1.value;
		cargaUser();
	} else if (input2.checked) {
		rank = input2.value;
		cargaUser();
	}

	// Verificar que reciba tipo de Cuenta
	// console.log(rank);

	function cargaUser() {
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
		} else if (user.trim() && pass.trim()) {
			function Users(id, rank, user, pass) {
				this.id = id;
				this.rank = rank;
				this.user = user;
				this.pass = pass;
			}
			idUser = idUser + 1;
			const usuario = new Users(idUser, rank, user, pass);
			usuarios.push(usuario);
			console.log(usuarios);
			inputUs.value = '';
			inputPa.value = '';

			mostrarUsers();
			localStorage.setItem('usuariosls', JSON.stringify(usuarios));
		} else {
			Toastify({
				text: 'Ingresa usuario y contraseña',
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
	}
}
