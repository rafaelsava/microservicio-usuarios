const express = require('express');
const conectarDB = require('./db');
const Usuario = require('./models/usuario');
const { usuarioSchema } = require('./validaciones/validaciones');

require('dotenv').config();
const app = express();
app.use(express.json());

conectarDB();

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Obtener un usuario por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// Crear un usuario con validaciones
app.post('/usuarios', async (req, res) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un usuario
app.put('/usuarios/:id', async (req, res) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// Eliminar un usuario
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
