
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './componentes/Login';
import Navegacion from './componentes/Navegacion';
import RutaProtegida from './componentes/RutaProtegida';

import VistaClientes from './componentes/VistaClientes';
import VistaMascotas from './componentes/VistaMascotas';
import VistaConfiguracion from './componentes/VistaConfiguracion';
import VistaDetalleCliente from './componentes/VistaDetalleCliente';

import { VeterinariaProvider } from './contexto/VeterinariaProvider';
import {
    AutenticacionProvider,
    useAutenticacion
} from './contexto/AutenticacionContexto';

import './App.css';

function ContenidoApp() {
    const { estaAutenticado } = useAutenticacion();

    return (
        <>
            <h1>El Dogo - Gestión de Pacientes</h1>
            <p>
                ¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.
            </p>

            <Routes>
                <Route
                    path="/login"
                    element={
                        estaAutenticado
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />

                <Route element={<RutaProtegida />}>
                    <Route
                        path="/"
                        element={
                            <VeterinariaProvider>
                                <>
                                    <Navegacion />
                                    <VistaClientes />
                                </>
                            </VeterinariaProvider>
                        }
                    />

                    <Route
                        path="/clientes/:id"
                        element={
                            <VeterinariaProvider>
                                <>
                                    <Navegacion />
                                    <VistaDetalleCliente />
                                </>
                            </VeterinariaProvider>
                        }
                    />

                    <Route
                        path="/mascotas"
                        element={
                            <VeterinariaProvider>
                                <>
                                    <Navegacion />
                                    <VistaMascotas />
                                </>
                            </VeterinariaProvider>
                        }
                    />

                    <Route
                        path="/configuracion"
                        element={
                            <VeterinariaProvider>
                                <>
                                    <Navegacion />
                                    <VistaConfiguracion />
                                </>
                            </VeterinariaProvider>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={
                        estaAutenticado
                            ? <h2>404 - Página no encontrada</h2>
                            : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </>
    );
}

function App() {
    return (
        <AutenticacionProvider>
            <ContenidoApp />
        </AutenticacionProvider>
    );
}

export default App;
