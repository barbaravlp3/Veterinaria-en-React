
import jwt from 'jsonwebtoken';

export const verificarTokenAcceso = (req, res, next) => {
    const encabezado = req.headers.authorization;

    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Acceso denegado. Debés iniciar sesión.'
        });
    }

    const token = encabezado.split(' ')[1];

    try {
        req.usuario = jwt.verify(
            token,
            process.env.CLAVE_SECRETA_JWT
        );

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'El token es inválido o expiró.'
        });
    }
};
