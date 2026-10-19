
import { Navigate, Outlet } from 'react-router-dom';
import { useAutenticacion } from '../contexto/AutenticacionContexto.jsx';

function RutaProtegida() {
    const { estaAutenticado } = useAutenticacion();

    if (!estaAutenticado) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RutaProtegida;
