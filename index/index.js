document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos del DOM
    const overlay = document.getElementById('video-popup');
    const btnAbrir = document.getElementById('abrir-video');
    const btnCerrar = document.getElementById('cerrar-video');
    const miIframe = document.getElementById('iframe-video');

    // 2. Definimos la URL 
    const videoURL = "https://www.youtube.com/embed/xTwEKreb_qU?autoplay=1";
    // 3. Lógica para abrir
    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            miIframe.src = videoURL;
            overlay.style.display = 'flex';
        });
    }

    // 4. Lógica para cerrar con la "X"
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            overlay.style.display = 'none';
            miIframe.src = ""; // Importante para que el audio no siga sonando
        });
    }

    // 5. Cerrar si hacen clic fuera del video (en el fondo oscuro)
    window.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            miIframe.src = "";
        }
    });
});
