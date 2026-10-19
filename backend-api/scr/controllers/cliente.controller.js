
import pool from '../db.js';

// GET: listar clientes
export const getClientes = async (req, res) => {
    try {
        const [clientes] = await pool.query(
            'SELECT * FROM clientes ORDER BY id DESC'
        );

        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({
            message: 'Error al obtener clientes.'
        });
    }
};

// POST: registrar cliente
export const createCliente = async (req, res) => {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre?.trim() || !apellido?.trim() || !telefono?.trim()) {
        return res.status(400).json({
            message: 'Nombre, apellido y teléfono son obligatorios.'
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO clientes
                (nombre, apellido, documento, direccion,
                 localidad, telefono, foto, email, usuario_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre.trim(),
                apellido.trim(),
                '',
                '',
                '',
                telefono.trim(),
                '',
                '',
                null
            ]
        );

        res.status(201).json({
            id: result.insertId,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim()
        });
    } catch (error) {
        console.error('Error al registrar cliente:', error);
        res.status(500).json({
            message: 'Error al registrar cliente.'
        });
    }
};

// PUT: modificar cliente
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono } = req.body;

    if (!nombre?.trim() || !apellido?.trim() || !telefono?.trim()) {
        return res.status(400).json({
            message: 'Nombre, apellido y teléfono son obligatorios.'
        });
    }

    try {
        const [result] = await pool.query(
            `UPDATE clientes
             SET nombre = ?, apellido = ?, telefono = ?
             WHERE id = ?`,
            [nombre.trim(), apellido.trim(), telefono.trim(), id]
        );

        if (result.affectedRows === 0) {
            const [rows] = await pool.query(
                'SELECT id FROM clientes WHERE id = ?',
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({
                    message: 'Cliente no encontrado.'
                });
            }
        }

        res.json({
            id: Number(id),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim()
        });
    } catch (error) {
        console.error('Error al modificar cliente:', error);
        res.status(500).json({
            message: 'Error al modificar cliente.'
        });
    }
};

// DELETE: eliminar cliente
export const deleteCliente = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM clientes WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Cliente no encontrado.'
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar cliente:', error);

        if (
            error.code === 'ER_ROW_IS_REFERENCED_2' ||
            error.code === 'ER_ROW_IS_REFERENCED'
        ) {
            return res.status(409).json({
                message: 'No se puede eliminar un cliente que tiene mascotas asociadas.'
            });
        }

        res.status(500).json({
            message: 'Error al eliminar cliente.'
        });
    }
};
