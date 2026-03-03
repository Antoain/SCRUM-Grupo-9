// 1. Creamos La lista
const productos = JSON.parse(localStorage.getItem("productos")) || [];
let indexEdicion = null; // NUEVO: Variable para saber si estamos editando

// Referencias DOM
const cuerpoTabla = document.getElementById("cuerpoTabla");

function renderizarProductos() {

    cuerpoTabla.innerHTML = "";

    if (productos.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="6" class="mensaje">
                    No hay productos disponibles en el inventario.
                </td>
            </tr>
        `;
        return;
    }

    productos.forEach((producto, index) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td><img src="${producto.imagen}" width="60"></td>
            <td class="acciones">
                <button class="btn-editar" onclick="prepararEdicion(${index})">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

// NUEVA FUNCIÓN: Se ejecuta al presionar "Editar" en la tabla
function prepararEdicion(index) {
    const producto = productos[index];
    
    // Llenamos el formulario con los datos actuales
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;

    // Guardamos el índice para que agregarProducto sepa que estamos editando
    indexEdicion = index;
    
    document.getElementById("tituloModal").textContent = "Editar Producto";
    document.getElementById("btnGuardar").textContent = "Guardar Cambios";
    // Abrimos el modal
    document.getElementById("modalProducto").style.display = "flex";
}

function agregarProducto() {

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const imagen = document.getElementById("imagen").value;

    if (!nombre || !descripcion || !categoria || !precio || !stock) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (isNaN(precio) || Number(precio) <= 0) {
        alert("Por favor, ingrese un precio válido mayor a 0.");
        return;
    }

    if (isNaN(stock) || Number(stock) <= 0) {
        alert("Por favor, ingrese una cantidad válida mayor a 0.");
        return;
    }

    const datosProducto = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: imagen 
    };

    // CAMBIO AQUÍ: La lógica inteligente
    if (indexEdicion !== null) {
        // MODO EDICIÓN: Reemplazamos el producto en la posición guardada
        productos[indexEdicion] = datosProducto;
        indexEdicion = null; // Reseteamos la variable para la próxima vez
    } else {
        // MODO NUEVO: Lo agregamos al final de la lista
        productos.push(datosProducto);
    }

    renderizarProductos();
    localStorage.setItem("productos", JSON.stringify(productos));

    limpiarFormulario();
    cerrarModal();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
}

function abrirModal() {
    // CAMBIO AQUÍ: Si abres el modal desde el botón principal, nos aseguramos de que esté limpio
    indexEdicion = null;
    limpiarFormulario();

    document.getElementById("tituloModal").textContent = "Agregar Producto";
    document.getElementById("btnGuardar").textContent = "Guardar";
    document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("tituloModal").textContent = "Agregar Producto";
    document.getElementById("btnGuardar").textContent = "Guardar";
    document.getElementById("modalProducto").style.display = "none";
}

renderizarProductos();