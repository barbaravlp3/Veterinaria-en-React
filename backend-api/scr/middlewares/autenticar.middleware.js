
import jwt from 'jsonwebtoken';

export const verificarTokenAcceso = (req, res, next) => {
    const cabeceraAutorizacion = req.headers.authorization;

    const tokenExtraido =
        cabeceraAutorizacion &&
        cabeceraAutorizacion.startsWith('Bearer ')
            ? cabeceraAutorizacion.split(' ')[1]
            : null;

    if (!tokenExtraido) {
        return res.status(401).json({
            message: 'Acceso denegado. No se proporcionó un token.'
        });
    }

    if (!process.env.CLAVE_SECRETA_JWT) {
        console.error('Falta CLAVE_SECRETA_JWT en el archivo .env');

        return res.status(500).json({
            message: 'La autenticación no está configurada.'
        });
    }

    try {
        const datosDecodificados = jwt.verify(
            tokenExtraido,
            process.env.CLAVE_SECRETA_JWT
        );

        req.usuarioAutenticado = datosDecodificados;

        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Token no válido o expirado.'
        });
    }
};
