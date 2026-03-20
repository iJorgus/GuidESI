// Como siempre, esperamos a que el HTML esté completamente cargado antes de intentar manipularlo.
// Si no lo hacemos, intentaríamos buscar elementos que el navegador aún no ha pintado y nos daría 'null'.
document.addEventListener('DOMContentLoaded', () => {
    
    // Guardamos las referencias a los elementos del DOM en constantes.
    // Esto mejora el rendimiento porque el navegador solo tiene que buscar estos elementos una vez en toda la sesión.
    const sidebar = document.getElementById('sidebar-noticias');
    const overlay = document.getElementById('overlay-noticias');
    const btnCerrar = document.getElementById('btn-cerrar-noticias');

    // Función específica para cerrar el menú lateral.
    // Como vamos a necesitar cerrar el menú desde dos sitios distintos (pulsando la "X" o pulsando el fondo oscuro),
    // creamos esta función para no escribir el mismo código dos veces (principio DRY: Don't Repeat Yourself).
    const cerrarMenu = () => {
        // Un 'if' de seguridad: comprobamos que el sidebar y el overlay existen realmente en esta página.
        // Evita errores fatales en consola si cargamos este script en una página que no tiene panel de noticias.
        if (sidebar && overlay) {
            // Al quitar la clase 'activa', el CSS detecta el cambio y ejecuta la transición inversa para ocultarlos suavemente.
            sidebar.classList.remove('activa');
            overlay.classList.remove('activa');
        }
    };

    // Delegación de eventos: En lugar de buscar el botón de abrir y escuchar sus clics, escuchamos clics en TODO el documento.
    // ¿Por qué? Porque si el menú de navegación (donde está el botón) lo estás inyectando con 'importar.js', 
    // el botón no existirá cuando este script arranque. La delegación soluciona ese problema.
    document.addEventListener('click', (e) => {
        
        // e.target es el elemento exacto que recibió el clic. 
        // Usamos .closest() porque si el botón tiene un icono dentro y hacemos clic en el icono, e.target será el icono, no el botón.
        // .closest() busca hacia arriba en el árbol HTML hasta encontrar el contenedor con el ID correcto.
        const botonAbrir = e.target.closest('#btn-abrir-noticias');
        
        // Si el clic se hizo efectivamente sobre el botón (o algo dentro de él)...
        if (botonAbrir) {
            // Si el botón es un enlace (ej: <a href="#">), esto evita que el navegador haga su comportamiento por defecto,
            // que suele ser recargar la página o pegar un salto brusco hacia arriba.
            e.preventDefault(); 
            
            // Añadimos la clase 'activa' para que el CSS mueva el panel lateral hacia la pantalla y muestre el fondo oscuro.
            sidebar.classList.add('activa');
            overlay.classList.add('activa');
        }
    });

    // Asignamos la función 'cerrarMenu' a los dos elementos que sirven para salir.
    // De nuevo, ponemos un 'if' delante por si esos elementos no existen en el HTML actual, evitando que el script se rompa.
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarMenu);
    if (overlay) overlay.addEventListener('click', cerrarMenu);
});
