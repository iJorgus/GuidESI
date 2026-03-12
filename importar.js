document.addEventListener("DOMContentLoaded", () => {
    // Buscamos el contenedor donde irá el navbar
    const contenedor = document.getElementById("navbar-container");

    // Usamos fetch para "traer" el archivo navbar.html
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            // Metemos el HTML del navbar dentro del contenedor
            contenedor.innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el navbar:", error));
});
