import {useState} from 'react';
import {Link} from 'react-router-dom';

function ClienteItem({ cliente, onEliminar, onGuardar }) {
  
const [esEdicion, setEsEdicion] = useState(false);

const [nombreEditado, setNombreEditado] = useState(cliente.nombre);
const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono);


  const manejadorEliminar = () => {
    if(window.confirm(`Desea eliminar a ${cliente.nombre}?`)) {
      onEliminar(cliente.id);
    }
  }


  const manejadorEditar = () => {
    setEsEdicion (true);
  }

const manejadorGuardar = (e) => {
  e.preventDefault();
  
  const clienteActualizado = {
    ...cliente,
    nombre: nombreEditado,
    telefono: telefonoEditado
  };
  onGuardar(clienteActualizado);
  setEsEdicion(false);
};


return (
<li key={cliente.id}>
{esEdicion ? (
<form onSubmit={manejadorGuardar}>
<input type="text" 
value={nombreEditado} 
onChange={(e) => setNombreEditado(e.target.value)}
 />
 <input 
 type="text" 
value={telefonoEditado} 
onChange={(e) => setTelefonoEditado(e.target.value)}
 />
<button type="submit">Guardar</button>
<button type="button" onClick={() => setEsEdicion(false)}>Cancelar</button>
</form>
):

(
<div>
<Link to={`/clientes/${cliente.id}`}>Ver Detalle</Link>
<strong>
**{cliente.nombre}**</strong>

 -  Tel: {cliente.telefono}
<button onClick={manejadorEditar}>
  Editar
</button>


<button onClick={manejadorEliminar}>
  Eliminar
</button>

</div>
)};



  </li>
  )
}

export default ClienteItem;

