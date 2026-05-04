
import {useState} from 'react';

function MascotaItem({ mascota, onEliminar, onGuardar}) {

const [esEdicion, setEsEdicion] = useState(false);

const [nombreEditado, setNombreEditado] = useState(mascota.nombre);
const [edadEditada, setEdadEditada] = useState(mascota.edad);


  const manejadorEliminar = () => {
    if(window.confirm(`Desea eliminar a ${mascota.nombre}?`)) {
      onEliminar(mascota.id);
    }
  }


  const manejadorEditar = () => {
    setEsEdicion (true);
  }

const manejadorGuardar = (e) => {
  e.preventDefault();
  
  const mascotaActualizada = {
    ...mascota,
    nombre: nombreEditado,
    edad: edadEditada
  };
  onGuardar(mascotaActualizada);
  setEsEdicion(false);
};



return (
<li key={mascota.id}>
{esEdicion ? (
<form onSubmit={manejadorGuardar}>
<input type="text" 
value={nombreEditado} 
onChange={(e) => setNombreEditado(e.target.value)}
 />
 <input 
 type="text" 
value={edadEditada} 
onChange={(e) => setEdadEditada(e.target.value)}
 />
<button type="submit">Guardar</button>
<button type="button" onClick={() => setEsEdicion(false)}>Cancelar</button>
</form>
):

(
<div>
**{mascota.nombre}** -  Edad: {mascota.edad}

<button onClick={manejadorEditar}>
  Editar
</button>


<button onClick={manejadorEliminar}>
  Eliminar
</button>
</div>

  )};
  </li>
)}


export default MascotaItem;