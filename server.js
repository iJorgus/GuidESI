const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const http = require('http');
const path = require('path');

const app = express();

// --- Constantes de configuración ---
const PORT = process.env.PORT || 8080;

// --- Configuraciones para la app (Middlewares) ---
app.use(express.json()); // Permite entender el JSON
app.use(express.urlencoded({ extended: true })); // Permite procesar datos de formularios
app.use(logger('dev')); // Logger para ver las peticiones por consola

// Le decimos a Node que sirva los archivos web desde la carpeta "public"
app.use(express.static('public'));

// --- Conexión a MongoDB ---
const MONGO_URI = 'mongodb+srv://jorgebolivarblandino:BESybRVAvP-2468@jbb-pnet-2025-2026.gzukxrm.mongodb.net/?appName=jbb-pnet-2025-2026';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// --- Definición del Modelo (Estructura de la Reserva) ---
const reservaSchema = new mongoose.Schema({
    _id: String, // Usamos String porque tus IDs son texto, ej: "RES-102"
    fecha: String,
    hora: String,
    numero_de_personas: Number,
    guia_id: String,
    cliente: {
        nombre_completo: String,
        correo: String,
        telefono: String
    }
}, { 
    // Obligamos a Mongoose a usar exactamente la colección que pediste
    collection: 'BD-GuidESI', 
    versionKey: false // Quita el campo __v que Mongoose añade por defecto
});

const Reserva = mongoose.model('Reserva', reservaSchema);

// ==========================================
//              RUTAS DE LA API (CRUD)
// ==========================================

// 1. Recuperar TODAS las reservas
app.get('/api/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reservas', error });
    }
});

// 2. Recuperar UNA reserva por ID
app.get('/api/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json([reserva]); // Lo enviamos como array para que la tabla del frontend lo pinte igual
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la reserva', error });
    }
});

// 3. Añadir una NUEVA reserva
app.post('/api/reservas', async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
    } catch (error) {
        // El código 11000 de MongoDB significa que el ID ya existe
        if (error.code === 11000) return res.status(400).json({ mensaje: 'El ID de la reserva ya existe.' });
        res.status(500).json({ mensaje: 'Error al crear reserva', error });
    }
});

// 4. Actualizar una reserva existente por ID
app.put('/api/reservas/:id', async (req, res) => {
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Esto devuelve el documento ya modificado, no el antiguo
        );
        if (!reservaActualizada) return res.status(404).json({ mensaje: 'Reserva no encontrada para actualizar' });
        res.json({ mensaje: 'Reserva actualizada', reserva: reservaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar reserva', error });
    }
});

// 5. Eliminar TODAS las reservas
app.delete('/api/reservas', async (req, res) => {
    try {
        const resultado = await Reserva.deleteMany({});
        res.json({ mensaje: `Se han eliminado ${resultado.deletedCount} reservas.` });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar todas las reservas', error });
    }
});

// 6. Eliminar UNA reserva por ID
app.delete('/api/reservas/:id', async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) return res.status(404).json({ mensaje: 'Reserva no encontrada para eliminar' });
        res.json({ mensaje: 'Reserva eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la reserva', error });
    }
});

// --- Iniciar el Servidor ---
const server = http.createServer(app);
server.listen(PORT, function () {
    console.log('Server up and running on localhost:' + PORT);
});
