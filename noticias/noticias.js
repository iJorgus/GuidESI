document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-noticias');
    const overlay = document.getElementById('overlay-noticias');
    const btnCerrar = document.getElementById('btn-cerrar-noticias');

    // Función para cerrar el menú lateral
    const cerrarMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.remove('activa');
            overlay.classList.remove('activa');
        }
    };

    // Escuchamos clics en TODO el documento (Delegación de eventos)
    document.addEventListener('click', (e) => {
        // Si el elemento clicado (o su padre) es el botón de abrir noticias
        const botonAbrir = e.target.closest('#btn-abrir-noticias');
        
        if (botonAbrir) {
            e.preventDefault(); // Evita que el enlace de error o salte
            sidebar.classList.add('activa');
            overlay.classList.add('activa');
        }
    });

    // Asignamos los eventos de cierre al botón X y al fondo oscuro
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarMenu);
    if (overlay) overlay.addEventListener('click', cerrarMenu);
});
