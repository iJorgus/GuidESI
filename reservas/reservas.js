document.addEventListener('DOMContentLoaded', () => {
    // 1. CAPTURA DE PARÁMETROS DE LA URL
    const urlParams = new URLSearchParams(window.location.search);
    const nombreURL = urlParams.get('nombre');
    const ciudadURL = urlParams.get('ciudad');
    const maxURL = parseInt(urlParams.get('maxPersonas'));

    // 2. REFERENCIAS A ELEMENTOS DEL DOM
    // Spans visuales
    const guiaVisual = document.getElementById('guiaVisual');
    const visualCiudad = document.getElementById('visualCiudad');
    
    // Selectores manuales (Aparecen si no hay URL)
    const selectGuia = document.getElementById('selectGuiaManual');
    const selectCiudad = document.getElementById('selectCiudadManual');

    // Inputs ocultos y de datos
    const hiddenNombre = document.getElementById('nombreGuia');
    const hiddenCiudad = document.getElementById('hiddenCiudad');
    const hiddenMax = document.getElementById('maxPersonasHidden');
    const inputPersonas = document.getElementById('personas');

    // 3. LÓGICA DE INICIALIZACIÓN
    if (nombreURL && ciudadURL) {
        // CASO A: Viene de una página de guía (URL con variables)
        guiaVisual.textContent = nombreURL;
        visualCiudad.textContent = ciudadURL;
        
        hiddenNombre.value = nombreURL;
        hiddenCiudad.value = ciudadURL;
        hiddenMax.value = !isNaN(maxURL) ? maxURL : 10; // 10 por defecto si falla la URL
        
        // Ocultamos los selects porque ya tenemos la info
        if(selectGuia) selectGuia.style.display = 'none';
        if(selectCiudad) selectCiudad.style.display = 'none';
    } else {
        // CASO B: Entrada directa (Selección manual)
        if(guiaVisual) guiaVisual.style.display = 'none';
        if(visualCiudad) visualCiudad.style.display = 'none';
        
        if(selectGuia) selectGuia.style.display = 'inline-block';
        if(selectCiudad) selectCiudad.style.display = 'inline-block';

        // Evento al cambiar el Guía manualmente
        selectGuia.addEventListener('change', () => {
            const seleccionado = selectGuia.options[selectGuia.selectedIndex];
            const ciudadData = seleccionado.getAttribute('data-ciudad');
            const maxData = seleccionado.getAttribute('data-max');

            hiddenNombre.value = selectGuia.value;
            hiddenCiudad.value = ciudadData;
            hiddenMax.value = maxData;

            // Autoseleccionar la ciudad en el otro desplegable
            if (ciudadData) selectCiudad.value = ciudadData;
        });

        // Evento al cambiar la Ciudad (Filtro simple)
        selectCiudad.addEventListener('change', () => {
            const ciudadFiltro = selectCiudad.value;
            Array.from(selectGuia.options).forEach(opt => {
                if (opt.value === "") return;
                const ciudadOpt = opt.getAttribute('data-ciudad');
                opt.style.display = (ciudadFiltro === "" || ciudadOpt === ciudadFiltro) ? "block" : "none";
            });
            // Resetear guía si cambia la ciudad
            selectGuia.value = "";
            hiddenNombre.value = "";
            hiddenMax.value = "";
        });
    }

    // 4. VALIDACIÓN DEL FORMULARIO (SUBMIT)
    const form = document.getElementById('formReserva'); 
    form.addEventListener('submit', (event) => { 
        
        // Datos del cliente
        const nombreCliente = document.getElementById('nombre').value;
        const email = document.getElementById('correo').value;
        const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valorTelefono = document.getElementById('telefono').value;
        const expTelefono = /^[+]?[0-9]+$/;
        
        // Fecha
        const d = document.getElementById('dia').value;
        const m = document.getElementById('mes').value;
        const a = document.getElementById('ano').value;

        // Personas y Límites
        const cantidadIntroducida = parseInt(inputPersonas.value);
        const limitePermitido = parseInt(hiddenMax.value);
        const guiaFinal = hiddenNombre.value || (selectGuia ? selectGuia.value : "");

        // --- VALIDACIONES ---

        if (nombreCliente === "" || nombreCliente === "Value") {
            alert("Por favor, rellene el nombre completo");
            event.preventDefault(); return;
        }

        if (!expEmail.test(email)) {
            alert("Por favor, introduzca un correo valido");
            event.preventDefault(); return;
        }

        if (valorTelefono !== "" && !expTelefono.test(valorTelefono)) {
            alert("El teléfono solo puede contener el símbolo + y números");
            event.preventDefault(); return;
        }

        if (isNaN(d) || d < 1 || d > 31 || isNaN(m) || m < 1 || m > 12 || a < 2026) {
            alert("Por favor, introduce una fecha válida (DD MM YYYY)");
            event.preventDefault(); return;
        }

        if (guiaFinal === "" || guiaFinal === null) {
            alert("Debe seleccionar un guía para continuar");
            event.preventDefault(); 
            return;
        }

        if (!isNaN(limitePermitido) && cantidadIntroducida > limitePermitido) {
            alert(`Lo sentimos, el límite para este guía es de ${limitePermitido} personas.`);
            event.preventDefault();
            return;
        }

        // 1. IMPORTANTE: Cancelar el envío tradicional del formulario SIEMPRE si pasamos las validaciones
        event.preventDefault();

        // 2. Construir el objeto de datos EXACAMENTE como lo espera tu Schema de Mongoose
        const datosReserva = {
            _id: 'RES-' + Date.now(), // Generamos un ID de texto único usando la fecha actual
            fecha: `${d}/${m}/${a}`,
            hora: document.getElementById('hora') ? document.getElementById('hora').value : '10:00', // Asegúrate de tener un input 'hora'
            numero_de_personas: cantidadIntroducida,
            guia_id: guiaFinal, 
            cliente: {
                nombre_completo: nombreCliente,
                correo: email,
                telefono: valorTelefono
            }
        };

        // 3. Enviar a tu API de Node.js (NO a la URL de MongoDB)
        fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosReserva)
        })
        .then(response => {
            // Comprobamos si el backend devolvió un error (ej. status 400 o 500)
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            alert("¡Reserva confirmada y guardada en la base de datos!");
            form.reset(); // Limpia el formulario para una nueva reserva
        })
        .catch(error => {
            console.error('Error del servidor:', error);
            // Mostrar el mensaje de error que manda el backend si existe, si no un mensaje genérico
            const mensajeError = error.mensaje || "Hubo un error al conectar con el servidor.";
            alert(mensajeError);
        });

    });
}); 
