
import { createContext, useContext, useState } from 'react';

const AutenticacionContexto = createContext(null);

export const AutenticacionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token');
    });

    const iniciarSesion = (datosUsuario, tokenAcceso) => {
        localStorage.setItem('token', tokenAcceso);
        localStorage.setItem('usuario', JSON.stringify(datosUsuario));

        setToken(tokenAcceso);
        setUsuario(datosUsuario);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        setToken(null);
        setUsuario(null);
    };

    const valor = {
        usuario,
        token,
        estaAutenticado: Boolean(token),
        iniciarSesion,
        cerrarSesion,
    };

    return (
        <AutenticacionContexto.Provider value={valor}>
            {children}
        </AutenticacionContexto.Provider>
    );
};

export const useAutenticacion = () => {
    const contexto = useContext(AutenticacionContexto);

    if (!contexto) {
        throw new Error(
            'useAutenticacion debe utilizarse dentro de AutenticacionProvider.'
        );
    }

    return contexto;
};
