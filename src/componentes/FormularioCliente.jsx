import { useState } from "react";

function FormularioCliente({ onClienteAgregado }) {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    };

    const manejadorApellido = (e) => {
        setApellido(e.target.value);
    };

    const manejadorTelefono = (e) => {
        setTelefono(e.target.value);
    };

    const manejadorEnvio = (e) => {
        e.preventDefault();

        if (
            nombre.trim() === '' ||
            apellido.trim() === '' ||
            telefono.trim() === ''
        ) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const nuevoCliente = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim()
        };

        console.log('Cliente listo para registrarse:', nuevoCliente);

        onClienteAgregado(nuevoCliente);

        setNombre('');
        setApellido('');
        setTelefono('');
    };

    return (
        <form onSubmit={manejadorEnvio}>

            <h3>Nuevo Cliente:</h3>

            <label>
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={manejadorNombre}
                    required
                />
            </label>

            <label>
                Apellido:
                <input
                    type="text"
                    value={apellido}
                    onChange={manejadorApellido}
                    required
                />
            </label>

            <label>
                Teléfono:
                <input
                    type="tel"
                    value={telefono}
                    onChange={manejadorTelefono}
                    required
                />
            </label>

            <button type="submit">
                Registrar Cliente
            </button>

        </form>
    );
}

export default FormularioCliente;







    











