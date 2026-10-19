
import { Link, useNavigate } from "react-router-dom";
import { useAutenticacion } from "../contexto/AutenticacionContexto.jsx";

function Navegacion() {
    const { cerrarSesion } = useAutenticacion();
    const navigate = useNavigate();

    const manejarCierreSesion = () => {
        cerrarSesion();
        navigate("/login", { replace: true });
    };

    return (
        <nav>
            <Link to="/">Clientes</Link>
            {" | "}
            <Link to="/mascotas">Mascotas</Link>
            {" | "}
            <Link to="/configuracion">Configuración</Link>
            {" | "}

            <button
                type="button"
                onClick={manejarCierreSesion}
            >
                Cerrar sesión
            </button>
        </nav>
    );
}

export default Navegacion;

