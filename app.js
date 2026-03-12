// 1. Creamos La lista
const productos = JSON.parse(localStorage.getItem("productos")) || [];
let indexEdicion = null; // Variable para saber si estamos editando

// Referencias DOM
const cuerpoTabla = document.getElementById("cuerpoTabla");

function renderizarProductos() {

    cuerpoTabla.innerHTML = "";

    if (productos.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="9" class="mensaje">
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
        <td>
            <img src="${producto.imagen}" width="60">
        </td>
        <td>${producto.estado}</td>
        <td class="acciones">
            <button class="btn-editar" onclick="prepararEdicion(${index})">
                <i class="fa-solid fa-pen"></i> Editar
            </button>

            <button class="btn-eliminar" onclick="prepararEliminacion(${index})">
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
    document.getElementById("imagen").value = producto.imagen;
    document.getElementById("estado").value = producto.estado;

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
    const estado = document.getElementById("estado").value;

    if (!nombre || !descripcion || !categoria || !precio || !stock) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.'
        });
        return;

    }

    if (isNaN(precio) || Number(precio) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese un precio válido mayor a 0.'
        });
        return;
    }

    if (isNaN(stock) || Number(stock) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese una cantidad válida mayor a 0.'
        });
        return;
    }

    const datosProducto = {
        id: indexEdicion!== null ? productos[indexEdicion].id : Date.now(),
        nombre,
        descripcion,
        categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen,
        estado
    };


    // CAMBIO AQUÍ: La lógica inteligente
    if (indexEdicion !== null) {
        // MODO EDICIÓN: Reemplazamos el producto en la posición guardada
        productos[indexEdicion] = datosProducto;
        indexEdicion = null; // Reseteamos la variable para la próxima vez
        
        Swal.fire({
            icon: 'success',
            title: 'Producto Actualizado',
            text: 'El producto se actualizó correctamente'
        });
        
    } else {
        // MODO NUEVO: Lo agregamos al final de la lista
        productos.push(datosProducto);
        Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            text: 'El producto ha sido agregado exitosamente.',
        });
    }

    localStorage.setItem("productos", JSON.stringify(productos));

    renderizarProductos();

    limpiarFormulario();
    cerrarModal();
}


// NUEVA FUNCIÓN: Se ejecuta al presionar "Eliminar" en la tabla
function prepararEliminacion(index) {
    Swal.fire({
        title: '¿Eliminar producto?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1bc726',
        cancelButtonColor: '#d43f6c',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            eliminarProducto(index);
        }

    });
}

function eliminarProducto(index) {
    // Eliminamos del array usando el índice
    productos.splice(index, 1);

    // Guardamos y actualizamos la vista
    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos();


    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto fue eliminado correctamente'
    });

}


function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("estado").value = "Activo";
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
    document.getElementById("modalProducto").style.display = "none";
}


// Función para filtrar y ordenar por ABC
function filtrarProductos() {
    const textoBusqueda = document.getElementById("inputBusqueda").value.toLowerCase();
    const categoriaSeleccionada = document.getElementById("selectFiltroCategoria").value;

    // 1. Filtramos la lista
    let productosFiltrados = productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCat = categoriaSeleccionada === "" || p.categoria === categoriaSeleccionada;
        return coincideNombre && coincideCat;
    });

    // 2. Si el usuario está buscando por nombre, ordenamos de A a Z
    if (textoBusqueda !== "") {
        productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    // 3. Dibujamos la tabla con los resultados
    renderizarTabla(productosFiltrados);
}

// Función auxiliar para redibujar la tabla con cualquier lista (original o filtrada)
function renderizarTabla(lista) {
    cuerpoTabla.innerHTML = "";

    if (lista.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:20px;">No se encontraron productos.</td></tr>`;
        return;
    }

    lista.forEach((producto) => {
        // Buscamos el índice original para que los botones de editar/borrar no fallen
        const indexOriginal = productos.findIndex(p => p.id === producto.id);
        
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.estado}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="prepararEdicion(${indexOriginal})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-eliminar" onclick="prepararEliminacion(${indexOriginal})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Escuchadores de eventos (esto conecta el HTML con el JS)
document.getElementById("inputBusqueda").addEventListener("input", filtrarProductos);
document.getElementById("selectFiltroCategoria").addEventListener("change", filtrarProductos);


renderizarProductos();