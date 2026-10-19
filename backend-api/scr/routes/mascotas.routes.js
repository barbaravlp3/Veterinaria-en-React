
import express from 'express';

import {
    getMascotas,
    createMascota,
    updateMascota,
    deleteMascota
} from '../controllers/mascota.controller.js';

import {
    verificarTokenAcceso
} from '../middlewares/autenticar.middleware.js';

const router = express.Router();

// Consultar mascotas: ruta pública
router.get('/', getMascotas);

// Crear, modificar y eliminar requieren un token válido
router.post('/', verificarTokenAcceso, createMascota);
router.put('/:id', verificarTokenAcceso, updateMascota);
router.delete('/:id', verificarTokenAcceso, deleteMascota);

export default router;
