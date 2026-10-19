
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registrar un usuario
export const registrarUsuario = async (req, res) => {
    const { email, password, rol } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).json({
            message: 'El correo y la contraseña son obligatorios.'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'La contraseña debe tener al menos 8 caracteres.'
        });
    }

    try {
        const correo = email.trim().toLowerCase();

        const [existentes] = await pool.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [correo]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                message: 'Ya existe un usuario con ese correo.'
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        // El rol predeterminado es usuario. No permitir que
        // quien se registra elija por sí mismo el rol de administrador.
        const rolInicial = 'usuario';

        const [resultado] = await pool.query(
            `INSERT INTO usuarios (email, password, rol)
             VALUES (?, ?, ?)`,
            [correo, passwordHash, rolInicial]
        );

        res.status(201).json({
            message: 'Usuario registrado correctamente.',
            usuario: {
                id: resultado.insertId,
                email: correo,
                rol: rolInicial
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            message: 'Error interno al registrar el usuario.'
        });
    }
};

// Iniciar sesión
export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).json({
            message: 'El correo y la contraseña son obligatorios.'
        });
    }

    try {
        const correo = email.trim().toLowerCase();

        const [usuarios] = await pool.query(
            `SELECT id, email, password, rol
             FROM usuarios
             WHERE email = ?
             LIMIT 1`,
            [correo]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                message: 'Correo o contraseña incorrectos.'
            });
        }

        const usuario = usuarios[0];

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {
            return res.status(401).json({
                message: 'Correo o contraseña incorrectos.'
            });
        }

        if (!process.env.CLAVE_SECRETA_JWT) {
            console.error('Falta CLAVE_SECRETA_JWT en el archivo .env');
            return res.status(500).json({
                message: 'La autenticación no está configurada.'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.CLAVE_SECRETA_JWT,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Inicio de sesión correcto.',
            token,
            usuario: {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            message: 'Error interno al iniciar sesión.'
        });
    }
};
