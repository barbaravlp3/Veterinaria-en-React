import { useContext } from 'react';

import { VeterinariaContext } from '../contexto/VeterinariaContext';

import { useParams, Link } from 'react-router-dom';


function VistaDetalleCliente() {

    const { clientes, mascotas } = useContext(VeterinariaContext);

    const { id: clienteIdString } = useParams();

    const clienteId = Number(clienteIdString);

    const cliente = clientes.find(
        (cliente) => Number(cliente.id) === clienteId
    );

    const mascotasDelCliente = mascotas.filter(
        (mascota) => Number(mascota.clienteId) === clienteId
    );


    if (!cliente) {

        return (
            <h2>
                Cliente no encontrado (ID: {clienteId})
            </h2>
        );

    }


    return (

        <div>

            <Link to="/">
                Volver al listado de clientes
            </Link>


            <section>

                <h2>
                    Cliente: {cliente.nombre} {cliente.apellido || ''}
                </h2>

                <p>
                    Teléfono: <strong>
                        {cliente.telefono}
                    </strong>
                </p>

                <hr />

            </section>


            <section>

                <h3>
                    Mascotas de {cliente.nombre}{' '}
                    ({mascotasDelCliente.length})
                </h3>


                {mascotasDelCliente.length === 0 ? (

                    <p>
                        No hay mascotas registradas para este cliente.
                    </p>

                ) : (

                    <ul>

                        {mascotasDelCliente.map((mascota) => (

                            <li key={mascota.id}>

                                <strong>
                                    {mascota.nombre}
                                </strong>

                                {' - '}

                                Especie: {mascota.especie || 'Sin especie'}

                                {' - '}

                                Raza: {mascota.raza || 'Sin raza'}

                            </li>

                        ))}

                    </ul>

                )}

            </section>

        </div>
    );
}


export default VistaDetalleCliente;