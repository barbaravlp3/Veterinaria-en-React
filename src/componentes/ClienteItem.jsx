import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClienteItem({ cliente, onEliminar, onGuardar }) {

    const [esEdicion, setEsEdicion] = useState(false);

    const [nombreEditado, setNombreEditado] = useState(
        cliente.nombre || ''
    );

    const [apellidoEditado, setApellidoEditado] = useState(
        cliente.apellido || ''
    );

    const [telefonoEditado, setTelefonoEditado] = useState(
        cliente.telefono || ''
    );

    const manejadorEliminar = () => {
        if (
            window.confirm(
                `¿Desea eliminar a ${cliente.nombre} ${cliente.apellido || ''}?`
            )
        ) {
            onEliminar(cliente.id);
        }
    };

    const manejadorEditar = () => {
        // Cargamos nuevamente los datos actuales
        setNombreEditado(cliente.nombre || '');
        setApellidoEditado(cliente.apellido || '');
        setTelefonoEditado(cliente.telefono || '');

        setEsEdicion(true);
    };

    const manejadorGuardar = (e) => {
        e.preventDefault();

        const clienteActualizado = {
            ...cliente,

            nombre: nombreEditado.trim(),

            apellido: apellidoEditado.trim(),

            telefono: telefonoEditado.trim()
        };

        console.log(
            "Cliente que React está actualizando:",
            clienteActualizado
        );

        onGuardar(clienteActualizado);

        setEsEdicion(false);
    };

    return (
        <li>

            {esEdicion ? (

                <form onSubmit={manejadorGuardar}>

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
                        Apellido:
                        <input
                            type="text"
                            value={apellidoEditado}
                            onChange={(e) =>
                                setApellidoEditado(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Teléfono:
                        <input
                            type="text"
                            value={telefonoEditado}
                            onChange={(e) =>
                                setTelefonoEditado(e.target.value)
                            }
                        />
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

                <div>

                    <Link to={`/clientes/${cliente.id}`}>
                        Ver Detalle
                    </Link>

                    <strong>
                        {cliente.nombre} {cliente.apellido || ''}
                    </strong>

                    <span>
                        - Tel: {cliente.telefono}
                    </span>

                    <button onClick={manejadorEditar}>
                        Editar
                    </button>

                    <button onClick={manejadorEliminar}>
                        Eliminar
                    </button>

                </div>
            )}

        </li>
    );
}

export default ClienteItem;

