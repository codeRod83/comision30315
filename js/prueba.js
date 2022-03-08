// function numeroAlCuadrado(numero) {
//     let result = numero * numero
//     return result

// }

// let numero = parseInt(prompt('Ingresa el numero que quieres elevar al cuadrado: '))
// let result = numeroAlCuadrado(numero)
// console.log('Este es el numero al cuadrado: '+ result);


// function Producto (Nombre, Cantidad, Costo) {
//     this.Nombre = nombre;
//     this.Cantidad = cantidad;
//     this.Costo = costo;

// }
// let nombre = prompt('Dame el nombre del Producto: ')
// let cantidad = parseInt(prompt('Que cantidad quieres agregar: '))
// let costo = parseFloat(prompt('Cual es el costo del Producto: '))
// const persona1 = new Producto(nombre, cantidad, costo)

// function personas(numero) {


// }
// console.log(persona1)

// return numero => { return numero * multiplicador }

// (numero) {
//     return numero * multiplicador
// }


function Alumno(nombre, edad, pais) {
    this.name = nombre
    this.age = edad
    this.country = pais
}


let maximo = prompt('Cuantos alumnos quieres agregar')
let alumnon = 'alumno'
for (let a = 1; a < maximo; a++) {
    const alumno = alumnon + a;
    let nombre = prompt('Dame el nombre del alumno')
    let edad = prompt('Dame la edad del alumno')
    let pais = prompt('De que pais es el alumno')
    console.log(nombre);
    console.log(edad);
    console.log(pais);
    CrearObjeto(alumno)
}
function CrearObjeto(alumno) {
    alumno = new Alumno(nombre, edad, pais);
}
 



// console.log(alumno);

// let nombre = prompt('Dame el nombre del alumno')
// let edad = prompt('Dame la edad del alumno')
// let pais = prompt('De que pais es el alumno')
// function CrearObjeto(alumno) {
//     alumno = new Alumno(nombre, edad, pais);
// }

