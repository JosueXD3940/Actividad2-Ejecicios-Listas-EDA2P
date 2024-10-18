//Ejercicio 1//
class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

let productos = [];
let productosRetirados = 0;

// Lista de nombres de productos
const nombresProductos = [
    "Leche", "Pan", "Huevos", "Queso", "Carne", 
    "Verduras", "Frutas", "Arroz", "Pasta", "Azúcar"
];

document.getElementById('boton1').addEventListener('click', function() {
    const ejercicio1Div = document.getElementById('ProductosDisponiblesyRetirados');
    ejercicio1Div.innerHTML = `
        <h1>Productos Disponibles y Retirados</h1>
        <button id="agregarProducto">Agregar Producto</button>
        <h2>Retirar Producto</h2>
        <input type="text" id="productoARetirar" placeholder="Ingrese el nombre del producto a retirar">
        <button id="retirarProducto">Retirar Producto</button>
        <h2>Productos Disponibles</h2>
        <div id="productosDisponibles"></div>
        <h2>Productos Retirados</h2>
        <p id="productosRetirados"></p>
    `;

    document.getElementById('agregarProducto').addEventListener('click', agregarProducto);
    document.getElementById('retirarProducto').addEventListener('click', retirarProducto);
    
    mostrarProductosDisponibles();
});

// Agrega un nuevo producto
function agregarProducto() {
    const cantidad = Math.floor(Math.random() * 100) + 1; // Cantidad aleatoria entre 1 y 100
    const precio = (Math.random() * 100).toFixed(2); // Precio aleatorio entre 0 y 100

    // Selecciona un nombre de producto al azar
    const nombre = nombresProductos[Math.floor(Math.random() * nombresProductos.length)];
    
    const nuevoProducto = new Producto(nombre, cantidad, precio);
    productos.push(nuevoProducto);
    mostrarProductosDisponibles();
}

// Retira un producto
function retirarProducto() {
    const productoARetirar = document.getElementById('productoARetirar').value.trim();
    
    if (productoARetirar === '') {
        alert("Por favor, ingresa un nombre de producto.");
        return;
    }

    const indice = productos.findIndex(prod => prod.nombre === productoARetirar);

    if (indice !== -1) {
        productosRetirados += productos[indice].cantidad;
        productos.splice(indice, 1); // Elimina el producto de la lista
        mostrarProductosDisponibles();
        mostrarProductosRetirados();
        document.getElementById('productoARetirar').value = ''; // Limpiar el campo de texto
    } else {
        alert("Producto no encontrado.");
        document.getElementById('productoARetirar').value = ''; // Limpiar el campo de texto
    }
}

// Muestra los productos disponibles
function mostrarProductosDisponibles() {
    const productosDiv = document.getElementById('productosDisponibles');
    productosDiv.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(prod => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.textContent = `${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: $${prod.precio}`;
        productosDiv.appendChild(divProducto);
    });
}

// Muestra la cantidad de productos retirados
function mostrarProductosRetirados() {
    const productosRetiradosDiv = document.getElementById('productosRetirados');
    productosRetiradosDiv.textContent = `Total productos retirados: ${productosRetirados}`;
}

//EJERCICIO 2//


document.getElementById('boton2').addEventListener('click', function() {
    const ejercicio2Div = document.getElementById('PareseImpares');
    ejercicio2Div.innerHTML = `
        <h1>Números Pares e Impares</h1>
        <button id="generarNumeros">Generar Números</button>
        <h2>Números Pares</h2>
        <ul id="numerosPares"></ul>
        <h2>Números Impares</h2>
        <ul id="numerosImpares"></ul>
    `;

    document.getElementById('generarNumeros').addEventListener('click', generarNumeros);
});

// Genera una lista de números aleatorios y los clasifica en pares e impares
function generarNumeros() {
    const cantidad = 20; // Cantidad de números aleatorios a generar
    const numerosPares = [];
    const numerosImpares = [];
    
    for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
        if (numeroAleatorio % 2 === 0) {
            numerosPares.push(numeroAleatorio);
        } else {
            numerosImpares.push(numeroAleatorio);
        }
    }

    mostrarNumeros(numerosPares, numerosImpares);
}

// Muestra los números en las listas correspondientes
function mostrarNumeros(pares, impares) {
    const paresDiv = document.getElementById('numerosPares');
    const imparesDiv = document.getElementById('numerosImpares');

    // Limpiar listas anteriores
    paresDiv.innerHTML = '';
    imparesDiv.innerHTML = '';

    // Mostrar números pares
    pares.forEach(num => {
        const li = document.createElement('li');
        li.textContent = num;
        paresDiv.appendChild(li);
    });

    // Mostrar números impares
    impares.forEach(num => {
        const li = document.createElement('li');
        li.textContent = num;
        imparesDiv.appendChild(li);
    });
}




// EJERCICIO 3 //
document.getElementById('boton3').addEventListener('click', function() {
    const ejercicio3Div = document.getElementById('AprobadosyReprobados');
    ejercicio3Div.innerHTML = `
        <h1>Lista de Aprobados y Reprobados</h1>
        <form id="studentForm">
            <input type="text" id="nombre" placeholder="Nombre del alumno" required>
            <input type="number" id="calificacion" placeholder="Calificación" required>
            <button type="submit">Agregar Alumno</button>
        </form>
        <h2>Alumnos Aprobados</h2>
        <ul id="aprobadosList"></ul>
        <h2>Alumnos Reprobados</h2>
        <ul id="reprobadosList"></ul>
    `;

    document.getElementById('studentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const calificacion = parseFloat(document.getElementById('calificacion').value);

        let aprobados = [];
        let reprobados = [];

        if (calificacion >= 7) {
            aprobados.push({ nombre: nombre, calificacion: calificacion });
            agregarAlumnoALista('aprobadosList', nombre, calificacion);
        } else {
            reprobados.push({ nombre: nombre, calificacion: calificacion });
            agregarAlumnoALista('reprobadosList', nombre, calificacion);
        }

        document.getElementById('nombre').value = '';
        document.getElementById('calificacion').value = '';
    });

    function agregarAlumnoALista(listaId, nombre, calificacion) {
        const lista = document.getElementById(listaId);
        const listItem = document.createElement('li');
        listItem.textContent = `${nombre} - Calificación: ${calificacion}`;
        lista.appendChild(listItem);
    }
});

// JERCICIO 4 //
document.getElementById('boton4').addEventListener('click', function() {
    const ejercicio4Div = document.getElementById('EliminaryOrdenarproductos');
    ejercicio4Div.innerHTML = `
        <h1>Eliminar y Ordenar Productos</h1>
        <form id="productForm">
            <input type="text" id="nombreProducto" placeholder="Nombre del producto" required>
            <input type="number" id="precioProducto" placeholder="Precio del producto" required>
            <button type="submit">Agregar Producto</button>
        </form>

        <h2>Productos</h2>
        <ul id="productosList"></ul>
        
        <button id="mostrarOrdenados">Mostrar Productos Ordenados</button>
        <button id="calcularCosto">Calcular Costo Total</button>
        <button id="eliminarProducto">Eliminar Producto por Nombre</button>
        <p id="costoTotal"></p>
    `;

    let productos = [];

    // Función para agregar productos
    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombreProducto = document.getElementById('nombreProducto').value;
        const precioProducto = parseFloat(document.getElementById('precioProducto').value);

        productos.push({ nombre: nombreProducto, precio: precioProducto });

        mostrarProductos();
        document.getElementById('nombreProducto').value = '';
        document.getElementById('precioProducto').value = '';
    });

    // Función para mostrar los productos en la lista
    function mostrarProductos() {
        const productosList = document.getElementById('productosList');
        productosList.innerHTML = '';
        productos.forEach(producto => {
            const listItem = document.createElement('li');
            listItem.textContent = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;
            productosList.appendChild(listItem);
        });
    }

    // Ordenar productos por nombre y mostrarlos
    document.getElementById('mostrarOrdenados').addEventListener('click', function() {
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        mostrarProductos();
    });

    // Calcular costo total de los productos
    document.getElementById('calcularCosto').addEventListener('click', function() {
        const total = productos.reduce((sum, producto) => sum + producto.precio, 0);
        document.getElementById('costoTotal').textContent = `Costo Total: $${total.toFixed(2)}`;
    });

    // Eliminar producto por nombre
    document.getElementById('eliminarProducto').addEventListener('click', function() {
        const nombreEliminar = prompt('Introduce el nombre del producto a eliminar:');
        productos = productos.filter(producto => producto.nombre !== nombreEliminar);
        mostrarProductos();
    });
});

//EJERCICIO 5//
document.getElementById('boton5').addEventListener('click', function() {
    const ejercicio5Div = document.getElementById('ListadePalabras');
    ejercicio5Div.innerHTML = `
        <h1>Clasificar Palabras por Primera Letra</h1>
        <form id="wordForm">
            <input type="text" id="palabra" placeholder="Ingresa una palabra" required>
            <button type="submit">Agregar Palabra</button>
        </form>
        <h2>Listas de Palabras por Letra Inicial</h2>
        <div id="listasPalabras" class="listas-contenedor"></div>
    `;

    let listas = {};

    // Agrega palabras a las listas correspondientes
    document.getElementById('wordForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const palabra = document.getElementById('palabra').value;
        const primeraLetra = palabra[0].toUpperCase();

        // Crear una nueva lista si no existe para la primera letra
        if (!listas[primeraLetra]) {
            listas[primeraLetra] = [];
        }

        listas[primeraLetra].push(palabra);
        mostrarListas();
        document.getElementById('palabra').value = '';
    });

    // Muestra las listas de palabras
    function mostrarListas() {
        const listasPalabrasDiv = document.getElementById('listasPalabras');
        listasPalabrasDiv.innerHTML = ''; // Limpiar listas anteriores

        for (const letra in listas) {
            const lista = listas[letra];
            const listaDiv = document.createElement('div');
            listaDiv.classList.add('lista-palabras');
            listaDiv.innerHTML = `<h3>Lista ${letra}</h3>`;
            
            const ul = document.createElement('ul');
            lista.forEach(palabra => {
                const li = document.createElement('li');
                li.textContent = palabra;
                ul.appendChild(li);
            });

            listaDiv.appendChild(ul);
            listasPalabrasDiv.appendChild(listaDiv);
        }
    }
});
