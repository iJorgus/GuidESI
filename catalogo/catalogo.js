document.addEventListener('DOMContentLoaded', () => {
    const inputBuscador = document.getElementById('buscador');
    const guias = document.querySelectorAll('.enlace-articulo');

    if (!inputBuscador) return;

    inputBuscador.addEventListener('input', () => {
        const textoUsuario = inputBuscador.value.toLowerCase().trim();

        guias.forEach(guia => {
            const ciudadGuia = guia.getAttribute('data-city').toLowerCase();

            if (ciudadGuia.includes(textoUsuario)) {
                // En lugar de block, quitamos la clase que oculta
                guia.classList.remove('ocultar-guia');
            } else {
                // Añadimos una clase para ocultar
                guia.classList.add('ocultar-guia');
            }
        });
    });
});

