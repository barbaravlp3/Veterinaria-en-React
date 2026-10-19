
import express from 'express';

import {
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente
} from '../controllers/cliente.controller.js';

import {
    verificarTokenAcceso
} from '../middlewares/autenticar.middleware.js';

const router = express.Router();

// Consultar clientes: ruta pública
router.get('/', getClientes);

// Operaciones que requieren autenticación
router.post('/', verificarTokenAcceso, createCliente);
router.put('/:id', verificarTokenAcceso, updateCliente);
router.delete('/:id', verificarTokenAcceso, deleteCliente);

export default router;

