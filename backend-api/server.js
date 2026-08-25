import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import clientesRoutes from './scr/routes/clientes.routes.js';
import mascotasRoutes from './scr/routes/mascotas.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4800;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Rutas de la API
app.use('/api/clientes', clientesRoutes);
app.use('/api/mascotas', mascotasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
