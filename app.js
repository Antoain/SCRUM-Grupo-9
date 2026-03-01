// 1. Creamos La lista
const productos = [];

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
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="abrirModal()">
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

function agregarProducto() {

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

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

    const nuevoProducto = {
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock)
    };

    productos.push(nuevoProducto);

    renderizarProductos();

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

function abrirModal(modo = "agregar") {

    document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";
}

renderizarProductos();