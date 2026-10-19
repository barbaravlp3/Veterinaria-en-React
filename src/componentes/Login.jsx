
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "../contexto/AutenticacionContexto.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const { iniciarSesion } = useAutenticacion();
    const navigate = useNavigate();

    const manejadorEnviar = async (e) => {
        e.preventDefault();

        setError("");
        setCargando(true);

        try {
            const respuesta = await fetch(
                "http://localhost:4800/api/autenticacion/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.message || "Email o contraseña incorrectos."
                );
            }

            if (!datos.token) {
                throw new Error(
                    "El servidor no devolvió el token de acceso."
                );
            }

            // Guardar el usuario y el token en el contexto.
            iniciarSesion(datos.usuario, datos.token);

            // Ir a la pantalla principal.
            navigate("/", { replace: true });

        } catch (err) {
            setError(
                err.message || "No se pudo conectar con el servidor."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <h2>Inicio de sesión</h2>

            <p>
                Ingresá tu email y contraseña para acceder
                a la Gestión de Clientes y Mascotas.
            </p>

            <form onSubmit={manejadorEnviar}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Ingresá tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && (
                    <p role="alert" style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <button type="submit" disabled={cargando}>
                    {cargando ? "Verificando..." : "Ingresar"}
                </button>
            </form>
        </div>
    );
}

export default Login;

