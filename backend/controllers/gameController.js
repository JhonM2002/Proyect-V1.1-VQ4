const Therapist = require('../models/Therapist');
const Patient = require('../models/Patient');
const GameHistory = require('../models/GameHistory');

exports.verifyCedulas = async (req, res) => {
    try {
      const { therapistCedula, patientCedula } = req.body;
      console.log('Verificando cédulas:', therapistCedula, patientCedula);
  
      // Verificar si el terapeuta existe en la colección de terapeutas
      const therapist = await Therapist.findOne({ cedula: therapistCedula });
      console.log('Resultado de búsqueda del terapeuta:', therapist);
      if (!therapist) {
        return res.status(404).json({ message: 'La cédula del terapeuta no existe.' });
      }
  
      // Verificar si el paciente existe en la colección de pacientes
      const patient = await Patient.findOne({ cedula: patientCedula });
      console.log('Resultado de búsqueda del paciente:', patient);
      if (!patient) {
        return res.status(404).json({ message: 'La cédula del paciente no existe.' });
      }
  
      // Si ambos existen
      res.status(200).json({ message: 'Ambas cédulas existen.' });
    } catch (err) {
      console.error('Error en verifyCedulas:', err);
      res.status(500).json({ error: err.message });
    }
  };

// Obtener terapeuta por cédula
exports.getTherapistByCedula = async (req, res) => {
    try {
      const therapist = await Therapist.findOne({ cedula: req.params.cedula });
      if (therapist) {
        res.json(therapist);
      } else {
        res.status(404).json({ message: 'Terapeuta no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener paciente por cédula
  exports.getPatientByCedula = async (req, res) => {
    try {
      const patient = await Patient.findOne({ cedula: req.params.cedula });
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).json({ message: 'Paciente no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Agregar historial de juego
  exports.addGameHistory = async (req, res) => {
    try {
      const gameHistory = new GameHistory(req.body);
      await gameHistory.save();
      res.status(201).json(gameHistory);
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el historial' });
    }
  };
// Agregar terapeuta
exports.addTherapist = async (req, res) => {
  try {
    const therapist = new Therapist(req.body);
    await therapist.save();
    res.status(201).json(therapist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Obtener historial de juegos de un paciente específico por nombre
exports.getPatientHistoryByName = async (req, res) => {
    try {
      const patient = await Patient.findOne({ nombre: req.params.name });
      if (!patient) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
  
      const patientHistory = await GameHistory.find({ patient: patient._id });
      res.json(patientHistory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
// Obtener terapeuta por ID
exports.getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    if (therapist) {
      res.json(therapist);
    } else {
      res.status(404).json({ message: 'Terapeuta no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar paciente
exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener paciente por ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Guardar historial de juego
exports.addGameHistory = async (req, res) => {
  try {
    const gameHistory = new GameHistory(req.body);
    await gameHistory.save();
    res.status(201).json(gameHistory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener historial de juego por ID
exports.getGameHistoryById = async (req, res) => {
  try {
    const gameHistory = await GameHistory.findById(req.params.id);
    if (gameHistory) {
      res.json(gameHistory);
    } else {
      res.status(404).json({ message: 'Historial de juego no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener historial de juegos de un paciente específico
exports.getPatientHistory = async (req, res) => {
  try {
    const patientHistory = await GameHistory.find({ patient: req.params.id });
    res.json(patientHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los historiales de juego
exports.getAllGameHistories = async (req, res) => {
  try {
    const gameHistories = await GameHistory.find()
    // .populate('patient', 'nombre')     // Obtiene solo el campo "nombre" del paciente
    // .populate('therapist', 'nombre');  // Obtiene solo el campo "nombre" del terapeuta
    res.json(gameHistories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllHistories = async (req, res) => {
    try {
      const histories = await GameHistory.find()
        .populate('patient', 'nombre') // Solo traer el nombre del paciente
        .populate('therapist', 'nombre'); // Solo traer el nombre del terapeuta
      res.json(histories);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial' });
    }
  };