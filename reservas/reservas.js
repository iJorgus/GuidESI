document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('formReserva'); 
    form.addEventListener('submit', (event) => { 
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('correo').value;
        const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefono = document.getElementById('telefono');
        const expTelefono = /^[+]?[0-9]+$/;

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

        if (telefono !== "" && !expTelefono.test(telefono)) {
            alert("El teléfono solo puede contener el símbolo + y números (sin letras)");
            event.preventDefault();
            return;
        }
    });
});
