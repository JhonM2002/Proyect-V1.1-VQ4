// // backend/models/GameHistory.js
// const mongoose = require('mongoose');

// const GameHistorySchema = new mongoose.Schema({
//   patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
//   errorsPerNumber: [Number],
//   totalErrors: Number,
//   timeTaken: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('GameHistory', GameHistorySchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameHistorySchema = new Schema({
  observacion: String,
  tiempo: String,
  errores: Number,
  aciertos: Number,
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' }
});

module.exports = mongoose.model('GameHistory', gameHistorySchema);
