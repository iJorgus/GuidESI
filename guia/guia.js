// Envolvemos todo en DOMContentLoaded para asegurarnos de que el HTML entero se ha cargado en el navegador.
// Si ejecutamos esto antes de que los elementos existan, getElementById devolvería 'null' y el script fallaría.
document.addEventListener("DOMContentLoaded", () => {
    
    // Guardamos en constantes los elementos clave del DOM que vamos a manipular.
    // Hacerlo al principio mejora el rendimiento porque el navegador solo los busca una vez.
    const btnMapa = document.getElementById("btn-mapa");
    const popup = document.getElementById("popup-container");
    const btnCerrar = document.getElementById("cerrar-popup");

    // Función para abrir el pop-up
    // Añadimos un "escuchador" que estará atento a cuando el usuario haga clic en el botón del mapa.
    btnMapa.addEventListener("click", () => {
        // Sobrescribimos el 'display: none' que le pusimos en el CSS.
        // Usamos 'flex' en lugar de 'block' porque en tu CSS el popup usa flexbox para centrar la imagen en medio de la pantalla.
        popup.style.display = "flex"; 
    });

    // Función para cerrar el pop-up al pulsar la X
    btnCerrar.addEventListener("click", () => {
        // Simplemente volvemos a ocultar el contenedor principal devolviéndolo a 'none'.
        popup.style.display = "none";
    });

    // EXTRA: Cerrar si el usuario hace clic fuera de la imagen (en el fondo oscuro)
    // Escuchamos los clics en el contenedor gigante que oscurece el fondo.
    popup.addEventListener("click", (e) => {
        // Esta condición es CRÍTICA: e.target nos dice exactamente en qué elemento se originó el clic.
        // Solo cerramos si el clic fue *directamente* en el fondo oscuro (popup-container).
        // Si no ponemos este 'if', al hacer clic en la ventana blanca o en la propia imagen, el evento "burbujearía" hacia arriba, detectaría el clic en el contenedor y se cerraría sin querer.
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
