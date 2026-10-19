
import pool from '../db.js';

// GET: obtener todas las mascotas
export const getMascotas = async (req, res) => {
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

        const [mascotas] = await pool.query(query);
        res.json(mascotas);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({
            message: 'Error al obtener las mascotas.'
        });
    }
};

// POST: registrar una mascota
export const createMascota = async (req, res) => {
    const { nombre, especie, raza, clienteId } = req.body;

    if (!nombre || !especie || !clienteId) {
        return res.status(400).json({
            message: 'Faltan nombre, especie o cliente.'
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO mascotas
                (nombre, especie, raza, foto, historia_clinica, clientes_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, especie, raza || '', '', '', clienteId]
        );

        res.status(201).json({
            id: result.insertId,
            nombre,
            especie,
            raza: raza || '',
            clienteId: Number(clienteId)
        });
    } catch (error) {
        console.error('Error al registrar mascota:', error);
        res.status(500).json({
            message: 'Error al registrar la mascota.'
        });
    }
};

// PUT: modificar una mascota
export const updateMascota = async (req, res) => {
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
            [nombre, especie, raza || '', clienteId, id]
        );

        if (result.affectedRows === 0) {
            const [rows] = await pool.query(
                'SELECT id FROM mascotas WHERE id = ?',
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({
                    message: 'Mascota no encontrada.'
                });
            }
        }

        res.json({
            id: Number(id),
            nombre,
            especie,
            raza: raza || '',
            clienteId: Number(clienteId)
        });
    } catch (error) {
        console.error('Error al modificar mascota:', error);
        res.status(500).json({
            message: 'Error al modificar la mascota.'
        });
    }
};

// DELETE: eliminar una mascota
export const deleteMascota = async (req, res) => {
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
            message: 'Error al eliminar la mascota.'
        });
    }
};
