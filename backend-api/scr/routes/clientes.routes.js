// backend-api/src/routes/clientes.routes.js (Limpio)
import express from 'express';
// Importamos las funciones del controlador
import { getClientes, createCliente, updateCliente } from '../controllers/cliente.controller.js';
const router = express.Router();
// Mapeo directo: URL -> Controlador
router.get('/', getClientes);
router.post('/', createCliente);
router.put('/:id', updateCliente);
// router.delete('/:id', deleteCliente); // Asumiendo que existe
export default router;