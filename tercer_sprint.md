
===================================
           Qué se hizo?
===================================

Durante este sprint se desarrollaron nuevas funcionalidades para mejorar la gestión de productos dentro del sistema.

Se implementó:

 * Funcionalidad para eliminar productos desde la lista.
 * Confirmación visual al eliminar productos.
 * Estructura de categorías para clasificar cada producto.
 * Campo de estado para definir si un producto está activo o inactivo.
 * Visualización de la categoría correspondiente en la lista de productos.
 * Integración de alertas visuales con SweetAlert2 para acciones importantes.
 * Flujo de trabajo colaborativo mediante ramas feature/eliminar-producto* y consolidación en develop.

La funcionalidad ahora permite administrar mejor los productos, ya que se pueden clasificar por categoría, controlar su disponibilidad mediante estados y mostrar alertas visuales al realizar operaciones importantes como agregar, actualizar o eliminar productos.
===================================
          Quién hizo qué
===================================

"Antony Eleazar Tobías Beltrán":

 * Seguimiento general del avance técnico del sprint.
 * Apoyo en la integración de cambios en el proyecto.


"Jesus Rodrigo Landaverde Alvarado":
 * Asegurarse de que las tareas estuvieran claras.
 * Confirmar los criterios de aceptación de cada tarjeta.
 * Dar seguimiento al trabajo del equipo como Scrum Master.
 * Apoyar en dudas sobre GitHub, ramas y revisión de avances.


"Kevin Francisco Menjivar Calderon":
 * Implementación de la funcionalidad para eliminar productos.
 * Validación del flujo para que la lista se actualice al eliminar.


"Mauricio Imanol Garcia Romero":
 * Desarrollo de la estructura o entidad de categorías.
 * Apoyo en la selección y asociación de categoría a cada producto.


"Franklin Geovany Gomez Valle":
 * Implementación del campo estado para los productos.
 * Manejo de los valores Activo / Inactivo dentro de la lógica del sistema.


"Andrea Alexandra Nuñez Moran":
 * Integración de alertas visuales con SweetAlert2.
 * Configuración de alertas para acciones importantes como agregar, eliminar y mostrar errores.


===================================
        Problemas encontrados
===================================

 * Hubo que verificar que cada nueva funcionalidad cumpliera exactamente con los criterios de aceptación definidos en Trello.
 * Se presentaron dudas al momento de revisar si los cambios realmente ya estaban aplicados en GitHub.
 * Fue necesario validar que las funcionalidades nuevas no afectaran el renderizado dinámico de la lista de productos.
 * Se revisó el uso correcto de botones, acciones y alertas para evitar llamadas incompletas o errores en la interfaz.
 * Desorganización en el código  en JavaScript
* Problemas de visualización en la tabla de productos
* Falta de validación para valores negativos
* Tamaño insuficiente del contenedor de la tabla

Todos los problemas fueron resueltos mediante revisión del código, comprobación de commits, validación en ejecución del sistema y coordinación del equipo durante el sprint.
```
