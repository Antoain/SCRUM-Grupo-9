// 1. Creamos La lista (esta asi por que falta el de agregar producto)
const productos = [
    
];

// Referencia al elemento del DOM
const listaUL = document.getElementById("listaProductos");

function renderizarProductos() {
    // Limpiamos el contenido previo
    listaUL.innerHTML = "";

    //Si el array no tiene productos, mostrar mensaje
    if (productos.length === 0) {
        listaUL.innerHTML = "<li>⚠️ No hay productos disponibles en el inventario.</li>";
        return;
    }

    // No poner manualmente en HTML (Generación dinámica)
    productos.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaUL.appendChild(li);
    });
}


renderizarProductos();