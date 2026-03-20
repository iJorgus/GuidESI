// Envolvemos todo en DOMContentLoaded para asegurar que el HTML se haya pintado entero antes de ejecutar nada.
// Así evitamos que querySelectorAll devuelva un error si intenta pillar elementos que aún no existen en la página.
document.addEventListener("DOMContentLoaded", () => {
    
    // Metemos en una lista todas las etiquetas <section>. Estas son las "paradas" de nuestro scroll.
    const sections = document.querySelectorAll("section");
    
    // Cazamos todos los enlaces del menú superior para poder iluminarlos luego.
    const navLinks = document.querySelectorAll(".nav-link");

    // Función para actualizar qué enlace está "activo" según la posición del scroll
    // Le decimos a la ventana que esté atenta (escuche) cada vez que el usuario haga scroll.
    window.addEventListener("scroll", () => {
        
        // Empezamos con una variable vacía. Aquí guardaremos el ID de la sección que el usuario está viendo en ese instante.
        let current = "";

        // Revisamos una por una cada sección de la página.
        sections.forEach(section => {
            // Averiguamos la distancia exacta en píxeles desde el inicio de la página hasta donde empieza esta sección.
            const sectionTop = section.offsetTop;
            
            // Medimos lo que ocupa la sección de alto. 
            // (Ojo: en este código en concreto no la estás usando, pero suele ser útil si luego quieres hacer cálculos más precisos sobre si la sección ya terminó).
            const sectionHeight = section.clientHeight; 
            
            // Calculamos si hemos hecho scroll hasta la sección (con un pequeño margen por la altura del navbar)
            // pageYOffset es la cantidad de píxeles que hemos bajado. 
            // Restamos 80 píxeles a sectionTop para compensar la altura del menú fijo; así el enlace se ilumina justo antes de que el título quede oculto bajo el menú.
            if (pageYOffset >= (sectionTop - 80)) {
                
                // Si ya hemos bajado lo suficiente para ver esta sección, nos guardamos su ID (ej: "contacto", "servicios").
                // Como es un bucle, si hemos pasado varias secciones, 'current' se quedará con el ID de la última sección que cumplió la condición.
                current = section.getAttribute("id");
            }
        });

        // Ahora recorremos todos los enlaces del menú uno a uno.
        navLinks.forEach(link => {
            
            // Primero, hacemos limpieza: le quitamos la clase "active" a todos los enlaces de golpe.
            // Si no hacemos esto, a medida que bajes se irán iluminando todos y no se apagarán.
            link.classList.remove("active");
            
            // Comprobamos si el enlace apunta a la sección que tenemos guardada en 'current'.
            // Por ejemplo: miramos si href="#servicios" incluye la palabra "servicios".
            if (link.getAttribute("href").includes(current)) {
                
                // Si hay "match", le devolvemos la clase "active" solo a este enlace para que se ilumine gracias al CSS.
                link.classList.add("active");
            }
        });
    });
});
