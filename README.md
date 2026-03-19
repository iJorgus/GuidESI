# GuidESI
Trabajo PNET de Juan Fernandez y Jorge Bolívar

- index -> págia principal
- catalogo -> catálogo de guías, para facilitar su implementación, evitamos el uso de BBDD
- guia -> sobre el catálogo (de guias) clickas sobre un guía en concreto: contiene el desplegable del mapa
- reservas -> página con el formulario de reserva (en un futuro conexión con base de datos)
- navbar -> barra superior de navegabilidad presente en todas las páginas (simplemente incluirlo)
- footer (dejar para el final) -> parte inferior de la página presente en todas las páginas (simplemente incluirlo) OPCIONAL


Reparto de tareas:
- Juani:
    - catalogo
    - guia
    - footer
    
        
- Jorge:
    - navbar
    - index
    - footer

- Annia
    - reservas
    - noticias


INFORMACIÓN PARA ANNIA:
    - reservas: Una vez hemos seleccionado un guía del catálogo y hemos dado a "Resrvar" se abre esta página. Un formulario que solicite nombre completo, correo, fecha, telefono, numero de personas.
    - noticias: Es un desplegable lateral con noticias, que Jorge pondrá en el index, debes ir a Github->noticias.html y editar el contenido. Debe haber noticias inventadas (puedes usar la IA para crear noticias random). 

Tabular en catalogo los datos de los guias
Añadir en formulario la opcion de nombre del guia y hora

    
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="footer.css">
        <div id="navbar-container"></div>
            <div id="footer-container"></div>
    <script src="importar.js"></script>
