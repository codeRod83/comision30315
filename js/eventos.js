console.log('DOM');

// VARIABLES
let dato0 = 4
let proceso = 101
const miCarrito = []
let agregar = 's'
const ssd = { id: 1, nombre: 'SSD', marca: 'ADATA', costo: 550, cantidad: 10}
const hdd = { id: 2, nombre: 'HDD', marca: 'WD', costo: 950, cantidad: 5}
const mouse = { id: 3, nombre: 'Mouse', marca: 'Logitech', costo: 680, cantidad: 30}
const monitor = { id: 4, nombre: 'Monitor', marca: 'Dell', costo: 8700, cantidad: 3}
const inv = [ssd, hdd, mouse, monitor]
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
function Productos( id, nombre, marca, costo, cantidad ) {
    this.id = id
    this.nombre = nombre
    this.marca = marca
    this.costo = costo
    this.cantidad = cantidad
}
function agrega() {
    agregar = prompt(`Quieres agregar otro producto al ${lugar} (s)(n)`)
}
function add(cost, opcion) {
    costprod = costprod + cost
    console.log(`Agregaste un ${opcion} a tu carrito`)
    console.log(`   Costo: $${cost}`)
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

const boton1 = document.getElementById("btnIng")
const boton2 = document.getElementById("btnMInv")
const boton3 = document.getElementById("btnElim")
const boton4 = document.getElementById("btnTienda")

boton1.onclick = () => {
    agregar = 's'
            while ( agregar != 'n' && agregar != 'N' ) {
                
                dato0 = dato0 + 1
                let dato1 = prompt('Que producto quieres agregar:')
                let dato2 = prompt('De que marca es el producto:')
                let dato3 = prompt('Que costo tendra el producto:')
                let dato4 = prompt('Cuantas unidades piensas agregar:')
                
                const product = new Productos( parseInt(dato0), dato1.toUpperCase(), dato2.toUpperCase(), parseFloat(dato3), parseInt(dato4) )
                console.log(product)
                inv.push(product)
                lugar = 'Inventario'
                agrega()
            }
    
}
boton2.onclick = () => {
    let cont = document.createElement("div")
            cont.innerHTML = `<h2>Inventario disponible</h2>`
            document.body.appendChild(cont)
            for (const producto of inv) {
                let container = document.createElement("div")
                container.innerHTML = `<h3>Producto ID: ${producto.id}</h3>
                                       <p>Nombre:       ${producto.nombre}</p>
                                       <p>Marca:        ${producto.marca}</p>
                                       <b>Costo:        $ ${producto.costo}</b>
                                       <p>Disponibles:  ${producto.cantidad}</p>`
                document.body.appendChild(container)
            }
}
boton3.onclick = () => {
    alert('Eliminar productos\nSe encuentra mantenimiento');
}
boton4.onclick = () => {
    agregar = 's'
    prodn = inv.length
    console.log(prodn);
            
    while (agregar != 'n' && agregar != 'N') {
        let opcion = prompt(`Que producto quieres agregar:\n1 ${inv[0].nombre} \n2 ${inv[1].nombre}\n3 ${inv[2].nombre}\n4 ${inv[3].nombre} `)
        if (opcion == 1) {
            add(inv[0].costo, inv[0].nombre);
        }
        else if (opcion == 2) {
            add(inv[1].costo, inv[1].nombre);
        } else if (opcion == 3) {
            add(inv[2].costo, inv[2].nombre);
        } else if (opcion == 4) {
            add(inv[3].costo, inv[3].nombre);
        }
        // miCarrito.push(`${opcion}`)
        console.log(miCarrito.join("\n"));
        lugar = 'Carrito de compras'
        agrega()
    }

    alert("Los siguientes son los codigos de descuento:\n10 --> 10%\n20 --> 20%\n30 --> 30%");
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
    alert('Aqui tienes tu cuenta Total: ');
    alert(`Subtotal: $ ${sub}\n        IVA: $ ${iva}\n      Total: $ ${costprod}`)
    miCarrito.push('')
    let prodcar = miCarrito.length - 1
    alert(`Agregaste ${prodcar} productos a tu carrito\n${miCarrito.join(" --> 1 pza\n")}`)
}