document.addEventListener("DOMContentLoaded", () => {
    
    // --- IMPORTAR NAVBAR ---
    const contenedorNavbar = document.getElementById("navbar-container");

    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            contenedorNavbar.innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el navbar:", error));


    // --- IMPORTAR FOOTER ---
    const contenedorFooter = document.getElementById("footer-container");

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            contenedorFooter.innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el footer:", error));

});
