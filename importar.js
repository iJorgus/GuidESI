// Esperamos a que el navegador haya leído y pintado el esqueleto básico del HTML de la página actual.
// Si intentamos buscar los contenedores antes de que existan, el script petará devolviendo un 'null'.
document.addEventListener("DOMContentLoaded", () => {
    
    // --- IMPORTAR NAVBAR ---
    // Cazamos el div vacío ('placeholder') que dejamos en el HTML principal para alojar la barra de navegación.
    const contenedorNavbar = document.getElementById("navbar-container");

    // Usamos la API Fetch nativa de JS para hacer una petición interna y traernos el archivo HTML separado.
    // Esto es oro puro para el mantenimiento: si cambias un enlace del menú, lo cambias en navbar.html y se actualiza mágicamente en toda tu web.
    fetch("navbar.html")
        // Cuando recibimos la respuesta del archivo, la procesamos y la convertimos en texto plano (el código HTML tal cual).
        .then(response => response.text())
        // Cuando la conversión a texto termina, metemos todo ese HTML en crudo (data) justo dentro de nuestro div vacío, renderizándolo al instante.
        .then(data => {
            contenedorNavbar.innerHTML = data;
        })
        // El catch es nuestra red de seguridad. Si el archivo no existe, la ruta está mal o hay un corte de red,
        // atrapamos el error y lo sacamos por consola para enterarnos, evitando que el resto del JS de la página colapse en silencio.
        .catch(error => console.error("Error al cargar el navbar:", error));


    // --- IMPORTAR FOOTER ---
    // Aplicamos exactamente la misma lógica modular para el pie de página.
    // Localizamos el contenedor vacío que dejamos abajo del todo de nuestra web.
    const contenedorFooter = document.getElementById("footer-container");

    // Hacemos la llamada al archivo del pie de página.
    fetch("footer.html")
        // Transformamos la promesa en texto leíble por JS.
        .then(response => response.text())
        // Inyectamos el pedazo de HTML resultante en el DOM de nuestra página de un plumazo.
        .then(data => {
            contenedorFooter.innerHTML = data;
        })
        // Chivato en consola por si algo sale mal durante la carga de este componente.
        .catch(error => console.error("Error al cargar el footer:", error));

});
