
import express from 'express';

import {
    registrarUsuario,
    iniciarSesion
} from '../controllers/autenticacion.controller.js';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);

export default router;
