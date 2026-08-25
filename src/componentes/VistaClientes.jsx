
import { useContext, } from 'react';
import { VeterinariaContext } from '../contexto/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
// Traemos el diseño del formulario donde escribiremos los datos.
// Asegúrate de que la ruta sea correcta
import ClienteItem from './ClienteItem';
// Traemos el diseño de cómo se verá cada cliente en la lista.
import styles from './VistaClientes.module.css'


function VistaClientes() {
  const { clientes, 
    agregarCliente, 
    actualizarCliente, 
    eliminarCliente,  
  } = useContext(VeterinariaContext);

  
  return (
    <div className={styles.contenedorPrincipal}>

      <section>
        <h2 className={styles.titulo}>Gestión de Clientes</h2>
        <p className={styles.contador}>Total de clientes registrados: ** {clientes.length} ** </p>
        <hr />
        <FormularioCliente onClienteAgregado={agregarCliente} />
        <ul>
          {
            clientes.map((cliente) => (
              <ClienteItem
                key={cliente.id}
                cliente={cliente}
                onEliminar={eliminarCliente}
                onGuardar={actualizarCliente}
              />
            ))
          }
        </ul>
      </section>
    </div>
  )
}
export default VistaClientes;