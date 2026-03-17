
document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    
    const nombreGuia = urlParams.get('nombre');
    const ciudadGuia = urlParams.get('ciudad');
    const maxPersonas = parseInt(urlParams.get('maxPersonas'));

    
    if (nombreGuia) {
        document.getElementById('guiaVisual').textContent = nombreGuia;
        document.getElementById('nombreGuia').value = nombreGuia;
    }

    // 3. Rellenamos la Ciudad (Visual y Oculto)
    if (ciudadGuia) {
        document.getElementById('visualCiudad').textContent = ciudadGuia;
        document.getElementById('hiddenCiudad').value = ciudadGuia;
    }
    
    const form = document.getElementById('formReserva'); 
    form.addEventListener('submit', (event) => { 
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('correo').value;
        const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valorTelefono = document.getElementById('telefono').value;
        const expTelefono = /^[+]?[0-9]+$/;
        const d = document.getElementById('dia').value;
        const m = document.getElementById('mes').value;
        const a = document.getElementById('ano').value;
            
        // Capturamos cuántas personas ha escrito el usuario en el formulario
        // Asegúrate de que tu input de personas tenga id="cantidadPersonas"
        const inputPersonas = document.getElementById('personas').value;
        const cantidadIntroducida = parseInt(inputPersonas);

        if (nombre === "" || nombre === "Value") {
            alert("Por favor, rellene el nombre completo");
            event.preventDefault();
            return;
        }

        if (!expEmail.test(email)) {
            alert("Por favor, introduzca un correo valido");
            event.preventDefault();
            return;
        }

        if (valorTelefono !== "" && !expTelefono.test(valorTelefono)) {
            alert("El teléfono solo puede contener el símbolo + y números (sin letras)");
            event.preventDefault();
            return;
        }

        if (isNaN(d) || d < 1 || d > 31 || isNaN(m) || m < 1 || m > 12 || a < 2026) {
            alert("Por favor, introduce una fecha válida (DD MM YYYY)");
            event.preventDefault();
            return;
        }

        if (!isNaN(maxPersonas) && cantidadIntroducida > maxPersonas) {
            alert(`Lo sentimos, el límite para este guía es de ${maxPersonas} personas.`);
            event.preventDefault();
            return;
        }
    })
});
