import { useState } from "react";

function Login ({onLoginExitoso}) {
const [password, setPassword] = useState('');
const PASSWORD_SECRETA = 'elDogo2026';

const manejadorEnviar = (e) => {
e.preventDefault();
if (password === PASSWORD_SECRETA) {
onLoginExitoso(true);
} else {
    alert('Contraseña incorrecta. Inténtalo de nuevo.');
    setPassword('');
}
}
return (
    <div>
        <h2>Verificación del usuario</h2>
<p>Ingresá tu clave para acceder a la Gestión de Clientes y Mascotas</p>
   
   <form onSubmit={manejadorEnviar}>
<input
type="password" 
placeholder="Ingrese su contraseña"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button type="submit">Ingresar</button>
</form>
   </div>
);
}
export default Login;