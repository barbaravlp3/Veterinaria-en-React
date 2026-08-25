import { useState } from 'react';
import styles from './MascotaItem.module.css';

function MascotaItem({ clientes, mascota, onEliminar, onGuardar }) {

    const getDuenio = (id) => {
    const duenio = clientes.find(
        (cliente) => Number(cliente.id) === Number(id)
    );

    console.log("DUEÑO ENCONTRADO:", duenio);

    if (!duenio) {
        return "Dueño desconocido";
    }

    const nombre = (duenio.nombre || '').trim();
    const apellido = (duenio.apellido || '').trim();

    return `${nombre} ${apellido}`.trim();
};

    const [esEdicion, setEsEdicion] = useState(false);

    const [nombreEditado, setNombreEditado] = useState(
        mascota.nombre || ''
    );

    const [especieEditada, setEspecieEditada] = useState(
        mascota.especie || ''
    );

    const [razaEditada, setRazaEditada] = useState(
        mascota.raza || ''
    );

    const [clienteIdEditado, setClienteIdEditado] = useState(
        mascota.clienteId || ''
    );


    const manejadorEliminar = () => {

        if (window.confirm(`¿Desea eliminar a ${mascota.nombre}?`)) {
            onEliminar(mascota.id);
        }

    };


    const manejadorEditar = () => {
        setEsEdicion(true);
    };


    const manejadorGuardar = (e) => {

        e.preventDefault();

        const mascotaActualizada = {
            ...mascota,
            nombre: nombreEditado,
            especie: especieEditada,
            raza: razaEditada,
            clienteId: Number(clienteIdEditado)
        };

        console.log(
            "Mascota que React está actualizando:",
            mascotaActualizada
        );

        onGuardar(mascotaActualizada);

        setEsEdicion(false);
    };


    return (

        <li className={styles.tarjetaMascota}>

            {esEdicion ? (

                <form
                    onSubmit={manejadorGuardar}
                    className={styles.modoEdicion}
                >

                    <label>
                        Nombre:

                        <input
                            type="text"
                            value={nombreEditado}
                            onChange={(e) =>
                                setNombreEditado(e.target.value)
                            }
                        />

                    </label>


                    <label>
                        Especie:

                        <input
                            type="text"
                            value={especieEditada}
                            onChange={(e) =>
                                setEspecieEditada(e.target.value)
                            }
                        />

                    </label>


                    <label>
                        Raza:

                        <input
                            type="text"
                            value={razaEditada}
                            onChange={(e) =>
                                setRazaEditada(e.target.value)
                            }
                        />

                    </label>


                    <label>
                        Dueño:

                        <select
                            value={clienteIdEditado}
                            onChange={(e) =>
                                setClienteIdEditado(e.target.value)
                            }
                        >

                            <option value="">
                                -- Seleccione un dueño --
                            </option>

                            {clientes.map((cliente) => (

                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nombre} {cliente.apellido || ''}
                                </option>

                            ))}

                        </select>

                    </label>


                    <button type="submit">
                        Guardar
                    </button>

                    <button
                        type="button"
                        onClick={() => setEsEdicion(false)}
                    >
                        Cancelar
                    </button>

                </form>

            ) : (

                <div className={styles.infoMascota}>

                    <strong className={styles.nombreMascota}>
                        {mascota.nombre}
                    </strong>

                    <span>
                        - Especie: {mascota.especie}
                    </span>

                    <span>
                        - Raza: {mascota.raza || 'Sin raza'}
                    </span>

                    <span className={styles.duenio}>
                        - Dueño: {getDuenio(mascota.clienteId)}
                    </span>


                    <div className={styles.acciones}>

                        <button onClick={manejadorEditar}>
                            Editar
                        </button>

                        <button onClick={manejadorEliminar}>
                            Eliminar
                        </button>

                    </div>

                </div>

            )}

        </li>

    );
}

export default MascotaItem;