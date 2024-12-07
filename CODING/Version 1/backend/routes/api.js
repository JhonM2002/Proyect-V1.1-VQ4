const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');


// Rutas para Terapeutas
router.post('/therapist', gameController.addTherapist); // Agregar terapeuta
router.get('/therapist/:id', gameController.getTherapistById); // Obtener terapeuta por ID

// Rutas para Pacientes
router.post('/patient', gameController.addPatient); // Agregar paciente
router.get('/patient/:id', gameController.getPatientById); // Obtener paciente por ID
router.get('/patient/:id/history', gameController.getPatientHistory); // Obtener historial de juegos de un paciente específico
// Ruta para obtener el historial de juegos de un paciente por su nombre
router.get('/patient/history/name/:name', gameController.getPatientHistoryByName);


// Ruta para verificar las cédulas del terapeuta y del paciente
router.post('/verify-cedulas', gameController.verifyCedulas);
// Ruta para obtener terapeuta por cédula
router.get('/therapist/cedula/:cedula', gameController.getTherapistByCedula);
// Ruta para obtener paciente por cédula
router.get('/patient/cedula/:cedula', gameController.getPatientByCedula);
//Ruta para guardar el historial de juego
router.post('/gamehistories', gameController.addGameHistory);

// Rutas para Historial de Juegos
router.post('/gamehistory', gameController.addGameHistory); // Guardar historial de juego
router.get('/gamehistory/:id', gameController.getGameHistoryById); // Obtener historial de juego por ID
router.get('/gamehistories', gameController.getAllGameHistories); // Obtener todos los historiales de juego
router.post('/game-history', gameController.addGameHistory);


module.exports = router;