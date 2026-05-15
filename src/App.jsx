
import { useState } from 'react';
// // Traemos una herramienta de React 
// para que la página pueda "recordar" datos y actualizarse.
import {Routes, Route} from 'react-router-dom';
import Login from './componentes/Login';
import Navegacion from './componentes/Navegacion';
import VistaClientes from './componentes/VistaClientes';
import VistaMascotas from './componentes/VistaMascotas';
import VistaConfiguracion from './componentes/VistaConfiguracion';


import './App.css'; // Asume que tienes un archivo CSS para estilos
// Traemos los estilos (colores, tamaños) para que la página no se vea vacía.
// 1. Definimos nuestro componente principal
// Es una función que, por convención, empieza con Mayúscula.


function App() {

  const nombreApp = "El Dogo - Gestión de Pacientes";

  const [estaLogueado, setEstaLogueado] = useState(false);

  const manejadorLogin = (estado) => {
    setEstaLogueado(estado);
  }




  return ( // Aquí empieza lo que el usuario realmente va a ver en el navegador.
    <>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p>
      {estaLogueado ? (
        <>
          <Navegacion />
<Routes>
<Route path="/" element={<VistaClientes />} />
<Route path="/mascotas" element={<VistaMascotas />} />
<Route path="/configuracion" element={<VistaConfiguracion />} />
<Route path="*" element={<h2>404 - Página no encontrada</h2>} />
</Routes>
        </>
      ) : (
        <div>
          <Login onLoginExitoso={manejadorLogin} />
        </div>
      )}

      {estaLogueado && (
        <button onClick={() => setEstaLogueado(false)}>Cerrar sesión</button>
      )}

    </>
  )
}
// 4. Exportamos el componente para poder usarlo en otro lugar (generalmente index.js)
export default App;
// Dejamos el componente listo para que React lo pueda usar y mostrar en el navegador.
