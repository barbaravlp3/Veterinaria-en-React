import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función de prueba para verificar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log('Conexión a la base de datos establecida correctamente.');

        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

testConnection();

export default pool;
