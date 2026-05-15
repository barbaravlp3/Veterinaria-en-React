import { Link } from "react-router-dom";

function Navegacion() {

return (
    <nav>
        <Link to="/">Clientes</Link> |
        <Link to="/mascotas">Mascotas</Link> |
        <Link to="/config">Configuración</Link> 
    </nav>
)
}

export default Navegacion;
