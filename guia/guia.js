document.addEventListener("DOMContentLoaded", () => {
    const btnMapa = document.getElementById("btn-mapa");
    const popup = document.getElementById("popup-container");
    const btnCerrar = document.getElementById("cerrar-popup");

    // Función para abrir el pop-up
    btnMapa.addEventListener("click", () => {
        popup.style.display = "flex"; // Cambiamos de 'none' a 'flex' para mostrarlo
    });

    // Función para cerrar el pop-up al pulsar la X
    btnCerrar.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // EXTRA: Cerrar si el usuario hace clic fuera de la imagen (en el fondo oscuro)
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
