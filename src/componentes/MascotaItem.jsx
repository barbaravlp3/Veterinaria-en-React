
import { useState } from 'react';
import styles from './MascotaItem.module.css';

function MascotaItem({ clientes, mascota, onEliminar, onGuardar }) {

  const getDuenio = (id) => {
    const duenio = clientes.find((cliente) => cliente.id === id);
    return duenio ? duenio.nombre : "Dueño desconocido"
  };

  const [esEdicion, setEsEdicion] = useState(false);

  const [nombreEditado, setNombreEditado] = useState(mascota.nombre);
  const [edadEditada, setEdadEditada] = useState(mascota.edad);
  const [clienteIdEditado, setClienteIdEditado] = useState(mascota.clienteId);

  const manejadorEliminar = () => {
    if (window.confirm(`Desea eliminar a ${mascota.nombre}?`)) {
      onEliminar(mascota.id);
    }
  }


  const manejadorEditar = () => {
    setEsEdicion(true);
  }

  const manejadorGuardar = (e) => {
    e.preventDefault();

    const mascotaActualizada = {
      ...mascota,
      nombre: nombreEditado,
      edad: edadEditada,
      clienteId: Number(clienteIdEditado),
    };
    onGuardar(mascotaActualizada);
    setEsEdicion(false);
  };



  return (
    <li key={mascota.id} className={styles.tarjetaMascota}>
      {esEdicion ? (
        <form onSubmit={manejadorGuardar} className={StyleSheet.modoEdicion} >


          <input type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
          />


          <input
            type="text"
            value={edadEditada}
            onChange={(e) => setEdadEditada(e.target.value)}
          />

          <select
            value={clienteIdEditado}
            onChange={(e) => setClienteIdEditado(e.target.value)}
          >
            <option>--Seleccione un dueño--</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}

          </select>
          <button type="submit">Guardar</button>
          <button
            type="button"
            onClick={() => setEsEdicion(false)}>Cancelar</button>
        </form>
      ) : (

        <div className={StyleSheet.infoMascota}>
          <strong className={styles.nombreMascota}>**{mascota.nombre}** </strong>
          -  Edad: {mascota.edad}

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

      )};
    </li>
  )
}
export default MascotaItem;