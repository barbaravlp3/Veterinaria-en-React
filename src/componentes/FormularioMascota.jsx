import { useState } from "react";

function FormularioMascota({ clientes, onMascotaAgregada }) {

    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [clienteId, setClienteId] = useState('');

    const manejadorEnvio = (e) => {
        e.preventDefault();

        if (
            nombre.trim() === '' ||
            especie.trim() === '' ||
            clienteId === ''
        ) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const nuevaMascota = {
            nombre: nombre.trim(),
            especie: especie.trim(),
            raza: raza.trim(),
            clienteId: Number(clienteId)
        };

        console.log('Mascota lista para registrarse:', nuevaMascota);

        onMascotaAgregada(nuevaMascota);

        setNombre('');
        setEspecie('');
        setRaza('');
        setClienteId('');
    };

    return (
        <form onSubmit={manejadorEnvio}>

            <h3>Nueva Mascota:</h3>

            <label>
                Dueño (Cliente):

                <select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    required
                >
                    <option value="">
                        -- Seleccione un dueño --
                    </option>

                    {clientes.map((cliente) => (
                        <option
                            key={cliente.id}
                            value={cliente.id}
                        >
                            {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Nombre de la mascota:

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </label>

            <label>
                Especie:

                <input
                    type="text"
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                    placeholder="Ej: Perro"
                    required
                />
            </label>

            <label>
                Raza:

                <input
                    type="text"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    placeholder="Ej: Labrador"
                />
            </label>

            <button type="submit">
                Registrar Mascota
            </button>

        </form>
    );
}

export default FormularioMascota;


