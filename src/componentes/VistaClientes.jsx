
import { useState, useEffect } from 'react';
import FormularioCliente from './FormularioCliente';
// Traemos el diseño del formulario donde escribiremos los datos.
// Asegúrate de que la ruta sea correcta
import ClienteItem from './ClienteItem';
// Traemos el diseño de cómo se verá cada cliente en la lista.


function VistaClientes() {


  const [clientes, setClientes] = useState(() => {
    const datosGuardados = localStorage.getItem('clientesDogo') | [];
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const agregarNuevoCliente = (nuevoCliente) => { // Esta función recibe un cliente nuevo y...
    setClientes([...clientes, nuevoCliente]); // ...lo suma a la lista que ya teníamos sin borrar los anteriores.
  }

  const eliminarCliente = (id) => {
    const listaActualizada = clientes.filter(cliente =>
      cliente.id !== id
    );

    setClientes(listaActualizada);
  } 

  const actualizarCliente = (clienteActualizado) => {
    const listaActualizada = clientes.map(cliente => {
      if (cliente.id === clienteActualizado.id) {
        return clienteActualizado;
      }
      return cliente;
    });

    setClientes(listaActualizada);
  }


  useEffect(() => {
    console.log("Detectando cambios en la lista del cliente. ¡Guardando!");
    localStorage.setItem('clientesDogo', JSON.stringify(clientes));
  }, [clientes]);

  return (
    <div> 
  <section>
    <h2>Gestión de Clientes</h2>
<p>Total de clientes registrados: ** {clientes.length} ** </p> 
<hr />
 <FormularioCliente onClienteAgregado={agregarNuevoCliente} />
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