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
    
    }

    if (isNaN(precio) || Number(precio) <= 0) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese un precio válido mayor a 0.'
        });
        
    }

    if (isNaN(stock) || Number(stock) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese una cantidad válida mayor a 0.'
        });
      
    }

    const datosProducto = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: imagen,
        estado: estado
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
        })
    }

    renderizarProductos();
    localStorage.setItem("productos", JSON.stringify(productos));

    limpiarFormulario();
    cerrarModal();
}



// NUEVA FUNCIÓN: Se ejecuta al presionar "Eliminar" en la tabla
function prepararEliminacion(index) {
    // Usamos confirm para evitar accidentes
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        // Pasamos el index directamente para no depender de variables globales
        eliminarProducto(index);
    }
}

function eliminarProducto(index) {
    // Eliminamos del array usando el índice
    productos.splice(index, 1);
    
    // Guardamos y actualizamos la vista
    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos();
    
 
        renderizarProductos();
        
        //Cerramos la ventana emergente
        cerrarModal(); 
        
        console.log("Producto eliminado y modal cerrado");
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
    document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";
}

renderizarProductos();