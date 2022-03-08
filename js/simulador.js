console.log('Simulador');

// VARIABLES
let proceso = 0
const inv = [] 
const miCarrito = []
let agregar = 's'
let ssd = 550
let hdd = 950
let mouse = 680
let monitor = 8700
let costprod = 0
let descuento
let desc = 0
let desc1 = .90
let desc2 = .80
let desc3 = .70
let subtotalf = costprod
let opcion
let lugar = ''

// FUNCIONES
function Producto( nombre, marca, costo, cantidad ) {
    this.nombre = nombre
    this.marca = marca
    this.costo = costo
    this.cantidad = cantidad
}
function agrega() {
    agregar = prompt(`Quieres agregar otro producto al ${lugar} (s)(n)`)
}
function add(prod, opcion) {
    costprod = costprod + prod
    console.log(`Agregaste un ${opcion} a tu carrito`)
    console.log('   Costo: ' + prod)
    miCarrito.push(opcion)
}
function alerta() {
    costprod = costprod * desc
    alert(`Agregaste un ${descuento}% de descuento`);
}
function discount(descuento) {
    if (parseInt(descuento) == 10) {
        desc = desc1;
        alerta()
    } else if (parseInt(descuento) == 20) {
        desc = desc2
        alerta()
    } else if (parseInt(descuento) == 30) {
        desc = desc3
        alerta()
    }
}

// CODIGO
while (parseInt(proceso) <= 3) {
     
    proceso = prompt('Que proceso quieres realizar:\n  1) Ingresar Producto\n  2) Eliminar Producto\n  3) Comprar producto')
    
    switch (parseInt(proceso)) {
        case 1:
            agregar = 's'
            while ( agregar != 'n' && agregar != 'N' ) {
                
                let dato1 = prompt('Que producto quieres agregar:')
                let dato2 = prompt('De que marca es el producto:')
                let dato3 = prompt('Que costo tendra el producto:')
                let dato4 = prompt('Cuantas unidades piensas agregar:')
                
                const product = new Producto( dato1.toUpperCase(), dato2.toUpperCase(), parseFloat(dato3), parseInt(dato4) )
                console.log(product)
                inv.push(product)
                lugar = 'Inventario'
                agrega()
            }
            break

        case 2:
            alert('En mantenimiento');
            //  ELIMINAR PRODUCTO
            //  Preguntar ID de Producto
            //  Preguntar cantidad a borrar
            //  Preguntar Si quieres Eliminar otro producto
            break;
    
        case 3:
            agregar = 's'
            console.log(`Productos a la venta:`)
            for (let i = 0; i < inv.length; i++) {
                let pr = i
                console.log(inv[pr])
            }
            
            while (agregar != 'n' && agregar != 'N') {
                let opcion = prompt('Que producto quieres agregar:\n1 SSD\n2 HDD\n3 Mouse\n4 Monitor ')
                if (opcion == 1) {
                    add(ssd, 'SSD');
                }
                else if (opcion == 2) {
                    add(hdd, 'HDD');
                } else if (opcion == 3) {
                    add(mouse, 'Mouse');
                } else if (opcion == 4) {
                    add(monitor, 'Monitor');
                }
                // miCarrito.push(`${opcion}`)
                console.log( miCarrito.join("\n") );
                lugar = 'Carrito de compras'
                agrega()
            }

            console.log("Los siguientes son los codigos de descuento:\n10 --> 10%\n20 --> 20%\n30 --> 30%");
            descuento = prompt('Si tienes algun codigo de descuento ingresalo aqui: ')
            switch (parseInt(descuento)) {
                case 10:
                    discount(10)
                    break
                case 20:
                    discount(20)
                    break
                case 30:
                    discount(30)
                    break
                default:
                    break;
            }
            
            sub = costprod * .84
            let iva = costprod - sub
            console.log('Aqui tienes tu cuenta Total: ');
            console.log('Subtotal: ' + sub)
            console.log('     IVA: ' + iva);
            console.log('   Total: ' + costprod)
            console.log(`Agregaste ${miCarrito.length} productos a tu carrito`);
            miCarrito.push('')
            console.log(`${miCarrito.join(" --> 1 pza\n")}`);
            break;
    }
}