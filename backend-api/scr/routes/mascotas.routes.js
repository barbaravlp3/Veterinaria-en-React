import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/mascotas - Obtener todas las mascotas
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT
                m.id,
                m.nombre,
                m.especie,
                m.raza,
                m.clientes_id AS clienteId,
                c.nombre AS nombreCliente
            FROM mascotas m
            JOIN clientes c ON m.clientes_id = c.id
            ORDER BY m.nombre ASC
        `;

        const [rows] = await pool.query(query);

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
});

// POST /api/mascotas - Crear una mascota
router.post('/', async (req, res) => {
    const { nombre, especie, raza, clienteId } = req.body;

    const clientes_id = clienteId;

    if (!nombre || !especie || !clientes_id) {
        return res.status(400).json({
            message: 'Faltan datos requeridos (nombre, especie, clienteId).'
        });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO mascotas (nombre, especie, raza, foto, historia_clinica, clientes_id) VALUES (?, ?, ?, ?, ?, ?)',
            [
                nombre,
                especie,
                raza || '',
                '',
                '',
                clientes_id
            ]
        );

        res.status(201).json({
            id: result.insertId,
            nombre,
            especie,
            raza,
            clienteId: clientes_id
        });
    } catch (error) {
        console.error('Error al crear mascota:', error);
        res.status(500).json({
            message: 'Error interno al crear la mascota.'
        });
    }
});
// PUT /api/mascotas/:id - Actualizar mascota
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, clienteId } = req.body;

    if (!nombre || !especie || !clienteId) {
        return res.status(400).json({
            message: 'Faltan datos requeridos.'
        });
    }

    try {
        const [result] = await pool.query(
            `UPDATE mascotas
             SET nombre = ?, especie = ?, raza = ?, clientes_id = ?
             WHERE id = ?`,
            [
                nombre,
                especie,
                raza || '',
                clienteId,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Mascota no encontrada.'
            });
        }

        res.json({
            id: Number(id),
            nombre,
            especie,
            raza: raza || '',
            clienteId: Number(clienteId)
        });

    } catch (error) {
        console.error('Error al actualizar mascota:', error);

        res.status(500).json({
            message: 'Error interno al actualizar la mascota.'
        });
    }
});


// DELETE /api/mascotas/:id - Eliminar mascota
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM mascotas WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Mascota no encontrada.'
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error('Error al eliminar mascota:', error);

        res.status(500).json({
            message: 'Error interno al eliminar la mascota.'
        });
    }
});
export default router;