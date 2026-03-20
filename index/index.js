// Envolvemos todo en DOMContentLoaded para asegurarnos de que el HTML entero se ha pintado.
// Si el script se ejecuta antes de que existan los elementos, getElementById devolverá 'null'.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Guardamos las referencias al DOM en constantes. 
    // Es una buena práctica por rendimiento: el navegador busca el elemento una sola vez y lo guarda en memoria.
    const overlay = document.getElementById('video-popup');
    const btnAbrir = document.getElementById('abrir-video');
    const btnCerrar = document.getElementById('cerrar-video');
    const miIframe = document.getElementById('iframe-video');

    // 2. Definimos la URL del vídeo de YouTube.
    // El parámetro '?autoplay=1' al final es el truco para que empiece a reproducirse automáticamente nada más abrir la ventana.
    const videoURL = "https://www.youtube.com/embed/xTwEKreb_qU?autoplay=1";
    
    // 3. Lógica para abrir
    // Usamos un 'if' como medida de seguridad. Si cargamos este script en una página que no tiene el botón 'abrir-video', 
    // evitamos que salte un error fatal de "Cannot read properties of null" en la consola.
    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            // Inyectamos la URL en el iframe justo en el momento del clic. No antes, para ahorrar datos de carga inicial.
            miIframe.src = videoURL;
            // Mostramos el popup usando flex para que el vídeo quede centrado en la pantalla
            overlay.style.display = 'flex';
        });
    }

    // 4. Lógica para cerrar con la "X"
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            overlay.style.display = 'none'; // Ocultamos la capa oscura
            
            // ESTO ES CRÍTICO: Si solo ocultamos el popup con CSS, el iframe sigue existiendo y el vídeo 
            // seguiría sonando de fondo como un fantasma. Al vaciar el 'src', forzamos a que el vídeo se detenga.
            miIframe.src = ""; 
        });
    }

    // 5. Cerrar si hacen clic fuera del video (en el fondo oscuro)
    // Escuchamos los clics a nivel global en la ventana
    window.addEventListener('click', (e) => {
        // e.target nos dice exactamente qué pixel/elemento ha recibido el clic.
        // Solo cerramos si han hecho clic directamente en el contenedor oscuro ('overlay').
        // Si no pusiéramos este if, al hacer clic para pausar el propio vídeo (que está dentro del overlay), se cerraría la ventana.
        if (e.target === overlay) {
            overlay.style.display = 'none';
            // De nuevo, matamos el iframe para cortar el audio
            miIframe.src = "";
        }
    });
});
