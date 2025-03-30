const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    edad: { type: Number, required: true, min: 0 }
  }, { versionKey: false }); // Esto evita que __v se cree

module.exports = mongoose.model('Usuario', UsuarioSchema);
