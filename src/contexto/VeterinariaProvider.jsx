import React, { useState, useEffect } from 'react';

import { VeterinariaContext } from './VeterinariaContext.jsx';

import { useApi } from '../hooks/useApi.js';


export const VeterinariaProvider = ({ children }) => {

    // Hooks para comunicarnos con cada recurso de la API
    const clientesApi = useApi('/clientes');
    const mascotasApi = useApi('/mascotas');


    // Estados
    const [clientes, setClientes] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // ----------------------------------------------------
    // CARGA INICIAL
    // ----------------------------------------------------

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                const [clientesData, mascotasData] = await Promise.all([
                    clientesApi.get(),
                    mascotasApi.get()
                ]);

                setClientes(clientesData);
                setMascotas(mascotasData);

            } catch (error) {

                console.error(
                    'Error al cargar los datos:',
                    error
                );

            } finally {

                setIsLoading(false);

            }
        };

        cargarDatos();

    }, []);


    // ----------------------------------------------------
    // CLIENTES
    // ----------------------------------------------------

    const agregarCliente = async (nuevoCliente) => {

        try {

            console.log(
                'Cliente que React está enviando:',
                nuevoCliente
            );

            const clienteCreado =
                await clientesApi.create(nuevoCliente);

            setClientes((clientesActuales) => [
                ...clientesActuales,
                clienteCreado
            ]);

        } catch (error) {

            console.error(
                'Error al agregar cliente:',
                error
            );

        }
    };


    const actualizarCliente = async (clienteActualizado) => {

        try {

            console.log(
                'Cliente que React está actualizando:',
                clienteActualizado
            );

            const clienteActualizadoApi =
                await clientesApi.update(
                    clienteActualizado.id,
                    clienteActualizado
                );

            setClientes((clientesActuales) =>
                clientesActuales.map((cliente) =>
                    cliente.id === clienteActualizado.id
                        ? clienteActualizadoApi
                        : cliente
                )
            );

        } catch (error) {

            console.error(
                'Error al actualizar cliente:',
                error
            );

        }
    };


    const eliminarCliente = async (id) => {

        try {

            await clientesApi.remove(id);

            setClientes((clientesActuales) =>
                clientesActuales.filter(
                    (cliente) => cliente.id !== id
                )
            );

        } catch (error) {

            console.error(
                'Error al eliminar cliente:',
                error
            );

        }
    };


    // ----------------------------------------------------
    // MASCOTAS
    // ----------------------------------------------------

    const agregarMascota = async (nuevaMascota) => {

        try {

            console.log(
                'Mascota que React está enviando:',
                nuevaMascota
            );

            const mascotaCreada =
                await mascotasApi.create(nuevaMascota);

            setMascotas((mascotasActuales) => [
                ...mascotasActuales,
                mascotaCreada
            ]);

        } catch (error) {

            console.error(
                'Error al agregar mascota:',
                error
            );

        }
    };


    const actualizarMascota = async (mascotaActualizada) => {

        try {

            console.log(
                'Mascota que React está actualizando:',
                mascotaActualizada
            );

            const mascotaActualizadaApi =
                await mascotasApi.update(
                    mascotaActualizada.id,
                    mascotaActualizada
                );

            setMascotas((mascotasActuales) =>
                mascotasActuales.map((mascota) =>
                    mascota.id === mascotaActualizada.id
                        ? mascotaActualizadaApi
                        : mascota
                )
            );

        } catch (error) {

            console.error(
                'Error al actualizar mascota:',
                error
            );

        }
    };


    const eliminarMascota = async (id) => {

        try {

            await mascotasApi.remove(id);

            setMascotas((mascotasActuales) =>
                mascotasActuales.filter(
                    (mascota) => mascota.id !== id
                )
            );

        } catch (error) {

            console.error(
                'Error al eliminar mascota:',
                error
            );

        }
    };


    // ----------------------------------------------------
    // VALOR DEL CONTEXTO
    // ----------------------------------------------------

    const value = {

        clientes,
        agregarCliente,
        actualizarCliente,
        eliminarCliente,

        mascotas,
        agregarMascota,
        actualizarMascota,
        eliminarMascota,

        isLoading

    };


    // ----------------------------------------------------
    // CARGANDO
    // ----------------------------------------------------

    if (isLoading) {

        return (
            <h1>
                Cargando datos del servidor...
            </h1>
        );

    }


    return (

        <VeterinariaContext.Provider value={value}>

            {children}

        </VeterinariaContext.Provider>

    );
};