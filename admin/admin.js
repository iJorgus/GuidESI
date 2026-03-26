const API_URL = '/api/reservas';
const displayArea = document.getElementById('display-area');

// --- 1. Recuperar TODAS ---
document.getElementById('btn-get-all').addEventListener('click', () => {
    displayArea.innerHTML = `<p>Cargando reservas...</p>`;
    fetch(API_URL)
        .then(res => res.json())
        .then(data => renderTable(data))
        .catch(err => displayArea.innerHTML = `<p style="color:red;">Error de conexión.</p>`);
});

// --- 2. Recuperar UNA ---
document.getElementById('btn-get-one').addEventListener('click', () => {
    displayArea.innerHTML = `
        <div class="form-container">
            <h3>Buscar Reserva</h3>
            <div class="action-form mt-3">
                <input type="text" id="search-id" placeholder="Introduce el ID (ej. RES-102)">
                <button class="submit-btn" style="width: auto;" onclick="searchOne()">Buscar</button>
            </div>
        </div>
    `;
});

window.searchOne = function() {
    const id = document.getElementById('search-id').value;
    if(!id) return alert("Introduce un ID");
    
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.mensaje) return alert(data.mensaje);
            renderTable(data);
        });
}

// --- 3. Añadir ---
document.getElementById('btn-add').addEventListener('click', () => renderForm('add'));

// --- 4. Actualizar ---
document.getElementById('btn-update').addEventListener('click', () => {
    displayArea.innerHTML = `
        <div class="form-container">
            <h3>Actualizar Reserva</h3>
            <div class="action-form">
                <input type="text" id="update-id" placeholder="Introduce el ID (ej. RES-102)">
                <button class="submit-btn" style="width: auto;" onclick="loadFormForUpdate()">Cargar Datos</button>
            </div>
        </div>
    `;
});

window.loadFormForUpdate = function() {
    const id = document.getElementById('update-id').value;
    if(!id) return alert("Introduce un ID");
    
    // Primero buscamos la reserva para rellenar el formulario
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.mensaje) return alert(data.mensaje);
            renderForm('update', id, data[0]); // Pasamos los datos existentes
        });
}

// --- 5. Eliminar TODAS ---
document.getElementById('btn-delete-all').addEventListener('click', () => {
    if(confirm("¡ATENCIÓN! ¿Eliminar TODAS las reservas?")) {
        fetch(API_URL, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                alert(data.mensaje);
                document.getElementById('btn-get-all').click();
            });
    }
});

// --- 6. Eliminar UNA ---
document.getElementById('btn-delete-one').addEventListener('click', () => {
    displayArea.innerHTML = `
        <div class="form-container">
            <h3 style="color: #e74c3c;">Eliminar Reserva</h3>
            <div class="action-form" style="margin-top: 15px;">
                <input type="text" id="delete-id" placeholder="Introduce el ID (ej. RES-102)">
                <button class="submit-btn" style="width: auto; background-color: #e74c3c;" onclick="deleteOne()">Eliminar</button>
            </div>
        </div>
    `;
});

window.deleteOne = function() {
    const id = document.getElementById('delete-id').value;
    if(!id) return;
    if(confirm(`¿Eliminar la reserva ${id}?`)) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                alert(data.mensaje);
                document.getElementById('btn-get-all').click();
            });
    }
}

// --- FUNCIONES DE RENDERIZADO ---
function renderTable(data) {
    if(!data || data.length === 0) {
        displayArea.innerHTML = `<p>No se encontraron reservas.</p>`;
        return;
    }
    let html = `<h3>Resultados de la Búsqueda</h3><table style="margin-top: 20px;">
        <thead><tr><th>ID</th><th>Fecha/Hora</th><th>Personas</th><th>ID Guía</th><th>Cliente</th></tr></thead><tbody>`;
    data.forEach(res => {
        html += `<tr>
            <td><strong>${res._id}</strong></td>
            <td>${res.fecha} a las ${res.hora}</td>
            <td>${res.numero_de_personas}</td>
            <td><span style="background: var(--azul-cielo); padding: 3px 6px;">${res.guia_id}</span></td>
            <td class="client-info">👤 ${res.cliente.nombre_completo}<br>✉️ ${res.cliente.correo}<br>📞 ${res.cliente.telefono}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    displayArea.innerHTML = html;
}

function renderForm(mode, updateId = '', existingData = null) {
    const isUpdate = mode === 'update';
    
    displayArea.innerHTML = `
        <div class="form-container">
            <h3>${isUpdate ? 'Actualizar Reserva: ' + updateId : 'Añadir Nueva Reserva'}</h3>
            <form id="reserva-form" style="margin-top: 20px;">
                <div class="form-group"><label>ID Reserva:</label>
                    <input type="text" id="res_id" value="${updateId}" ${isUpdate ? 'disabled' : 'required'}>
                </div>
                <div style="display: flex; gap: 15px;">
                    <div class="form-group" style="flex: 1;"><label>Fecha:</label><input type="date" id="res_fecha" value="${existingData?.fecha || ''}" required></div>
                    <div class="form-group" style="flex: 1;"><label>Hora:</label><input type="time" id="res_hora" value="${existingData?.hora || ''}" required></div>
                </div>
                <div style="display: flex; gap: 15px;">
                    <div class="form-group" style="flex: 1;"><label>Nº Personas:</label><input type="number" id="res_personas" value="${existingData?.numero_de_personas || ''}" required></div>
                    <div class="form-group" style="flex: 1;"><label>ID Guía:</label><input type="text" id="res_guia" value="${existingData?.guia_id || ''}" required></div>
                </div>
                <fieldset><legend>Datos del Cliente</legend>
                    <div class="form-group"><label>Nombre:</label><input type="text" id="cli_nombre" value="${existingData?.cliente?.nombre_completo || ''}" required></div>
                    <div class="form-group"><label>Correo:</label><input type="email" id="cli_correo" value="${existingData?.cliente?.correo || ''}" required></div>
                    <div class="form-group"><label>Teléfono:</label><input type="tel" id="cli_telefono" value="${existingData?.cliente?.telefono || ''}" required></div>
                </fieldset>
                <button type="submit" class="submit-btn">${isUpdate ? 'Guardar Cambios' : 'Crear Reserva'}</button>
            </form>
        </div>
    `;

    document.getElementById('reserva-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reservaData = {
            _id: document.getElementById('res_id').value,
            fecha: document.getElementById('res_fecha').value,
            hora: document.getElementById('res_hora').value,
            numero_de_personas: parseInt(document.getElementById('res_personas').value),
            guia_id: document.getElementById('res_guia').value,
            cliente: {
                nombre_completo: document.getElementById('cli_nombre').value,
                correo: document.getElementById('cli_correo').value,
                telefono: document.getElementById('cli_telefono').value
            }
        };

        const method = isUpdate ? 'PUT' : 'POST';
        const url = isUpdate ? `${API_URL}/${reservaData._id}` : API_URL;

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservaData)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje);
            if(!data.error) document.getElementById('btn-get-all').click(); // Recargar lista si fue éxito
        });
    });
}
