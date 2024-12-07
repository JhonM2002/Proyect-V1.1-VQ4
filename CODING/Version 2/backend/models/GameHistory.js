const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  observacion: { type: String, required: true },
  tiempo: { type: String, required: true },
  errores: { type: Number, required: true },
  aciertos: { type: Number, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Referencia a Patient
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true }, // Referencia a Therapist
  patientName : { type: String, required: true },
  therapistName: { type: String, required: true },
});

module.exports = mongoose.model('GameHistory', gameHistorySchema);
