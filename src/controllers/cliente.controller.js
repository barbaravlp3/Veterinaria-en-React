// backend-api/src/controllers/cliente.controller.js
import pool from '../db.js';
// Función: Obtener todos los clientes
export const getClientes = async (req, res) => {
try {
const [rows] = await pool.query('SELECT id, nombre, apellido, telefono FROM clientes ORDER
BY nombre ASC'); 
res.json(rows);
} catch (error) {
res.status(500).json({ message: 'Error interno del servidor (GET).' });
}
};
// Función: Crear un cliente
export const createCliente = async (req, res) => {
const { nombre, apellido, telefono } = req.body;
if (!nombre || !apellido || !telefono) {
return res.status(400).json({ message: 'Faltan datos requeridos.' });
}
try {
const [result] = await pool.query(
'INSERT INTO clientes (nombre, apellido, telefono, documento, direccion, localidad,
foto, email, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
[nombre, apellido, telefono, 'N/A', 'N/A', 'N/A', 'default.png', 'N/A', '']
);
res.status(201).json({ id: result.insertId, nombre, apellido, telefono });
} catch (error) {
res.status(500).json({ message: 'Error interno del servidor (POST).' });
}
};
// Función: Actualizar un cliente
export const updateCliente = async (req, res) => {
const { id } = req.params;
const { nombre, apellido, telefono } = req.body;
try {
const [result] = await pool.query(
'UPDATE clientes SET nombre = ?, apellido = ?, telefono = ? WHERE id = ?',
[nombre, apellido, telefono, id]
);
if (result.affectedRows === 0) {
return res.status(404).json({ message: 'Cliente no encontrado.' });
}
res.json({ id: Number(id), nombre, apellido, telefono, message: 'Cliente actualizado.' });
} catch (error) {
res.status(500).json({ message: 'Error interno del servidor (PUT).' });
}
};
// ... (Similar para getClienteById y deleteCliente)
