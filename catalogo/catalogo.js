// Nos aseguramos de que el script se ejecute solo cuando el HTML esté totalmente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Capturamos el input de búsqueda y todos los enlaces de los guías para manipularlos
    const inputBuscador = document.getElementById('buscador');
    const guias = document.querySelectorAll('.enlace-articulo');

    // Si por algún error el buscador no existe en la página, paramos la ejecución para evitar fallos
    if (!inputBuscador) return;

    // Escuchamos cada vez que el usuario escribe o borra una letra en el input
    inputBuscador.addEventListener('input', () => {
        
        // Pasamos el texto a minúsculas y quitamos espacios sobrantes para que la búsqueda sea más precisa
        const textoUsuario = inputBuscador.value.toLowerCase().trim();

        // Recorremos uno a uno todos los guías del catálogo
        guias.forEach(guia => {
            
            // Obtenemos el nombre de la ciudad que guardamos en el atributo 'data-city' del HTML
            const ciudadGuia = guia.getAttribute('data-city').toLowerCase();

            // Comprobamos si el texto escrito por el usuario coincide con la ciudad del guía
            if (ciudadGuia.includes(textoUsuario)) {
                
                // Si coincide, nos aseguramos de que el guía sea visible quitando la clase que lo oculta
                guia.classList.remove('ocultar-guia');
            } else {
                
                // Si no coincide, le añadimos la clase CSS para que desaparezca de la vista
                guia.classList.add('ocultar-guia');
            }
        });
    });
});
