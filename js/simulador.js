console.log('Desafio Simulador');

function Producto(nombre, marca, costo, cantidad) {
    this.nombre = nombre
    this.marca = marca
    this.costo = costo
    this.cantidad = cantidad
}

const unidadSSD = new Producto('SSD HP 240gb', 'HP', 550, 20);
const unidadHDD = new Producto('HDD Sata 1TB', 'SATA', 950, 15);
const mouse1 = new Producto('Mouse Logitech G600', 'LOGITECH', 680, 10);
const monitor1 = new Producto('Monitor Sceptre 200Hz','SCEPTRE', 8700, 3);

console.log(unidadSSD);
console.log(unidadHDD);
console.log(mouse1);
console.log(monitor1);

let ssd = 550
let hdd = 950
let mouse = 680
let monitor = 8700
let agregar
let costprod = 0
let desc1 = 10
let desc2 = 20
let desc3 = 30
let subtotalf = costprod

while (agregar != 'n') {
    
    let opcion = prompt('Que producto quieres agregar:\n1 SSD\n2 hdd\n3 mouse\n4 monitor ')
    if (opcion == 1) {
        costprod = costprod + ssd
        console.log('Agregaste un SSD a tu carrito');
        console.log('   Total: '+ costprod)    
    } else if (opcion == 2) {
        costprod = costprod + hdd
        console.log('Agregaste un HDD a tu carrito');
        console.log('   Total: '+ costprod)        
    } else if (opcion == 3) {
        costprod = costprod + mouse
        console.log('Agregaste un Mouse a tu carrito');
        console.log('   Total: '+ costprod)        
    } else if (opcion == 4) {
        costprod = costprod + monitor
        console.log('Agregaste un Monitor a tu carrito');
        console.log('   Total: '+ costprod)        
}

agregar = prompt('Quieres agregar comprar otro producto: (s)(n)')
}
let descuento = prompt('Si tienes algun codigo de descuento ingresalo aqui: ')
switch (parseInt(descuento)) {
    case 10:
        costprod = costprod * .90
        alert('Agregaste un 10% de descuento');
        break;

    case 20:
        costprod = costprod * .80
        alert('Agregaste un 20% de descuento');
        break;
    
    case 30:
        costprod = costprod * .70
        alert('Agregaste un 30% de descuento');
        break;
    default:

        break;
}
subtotali = costprod * .84
let iva = costprod * .16
console.log('Aqui tienes tu cuenta Total: ');
console.log('Subtotal: ' + subtotali)
console.log('     IVA: '+ iva);
console.log('   Total: '+ costprod)

// Preguntar que producto agregar
// Preguntar cantidad a agregar
// Mostrar subtotal y total
// Preguntar si quieres agregar otro
// Mostrar subtotal y total

