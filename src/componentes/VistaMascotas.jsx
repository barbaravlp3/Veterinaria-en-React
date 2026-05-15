import { useState, useEffect } from 'react';
import FormularioMascota from './FormularioMascota'; 
// Traemos el diseño del formulario donde escribiremos los datos.
// Asegúrate de que la ruta sea correcta
import MascotaItem from './MascotaItem'; 
// Traemos el diseño de cómo se verá cada cliente en la lista.



function VistaMascotas() {

const [mascotas, setMascotas] = useState (() =>  { 
 const datosGuardados = localStorage.getItem('mascotasDogo') | [];
return datosGuardados ? JSON.parse(datosGuardados) : [];
}); 

const agregarMascota =  (nuevaMascota) => { // Esta función recibe una mascota nueva y...
setMascotas([...mascotas, nuevaMascota]) // ...lo suma a la lista que ya teníamos sin borrar los anteriores.
}

const eliminarMascota = (id) => {
  const listaActualizada = mascotas.filter(mascota=> 
    mascota.id !== id
  );

  setMascotas(listaActualizada);
} 

const actualizarMascota = (mascotaActualizada) => {
  const listaActualizada = mascotas.map(mascota => {
if(mascota.id === mascotaActualizada.id) {
return mascotaActualizada;
}
 return mascota;
  });

  setMascotas(listaActualizada);
}


useEffect(() => {
console.log("Detectando cambios en la lista de mascotas. ¡Guardando!");
localStorage.setItem('mascotasDogo', JSON.stringify(mascotas));
}, [mascotas]);

  
  return (
  <div> 
  <section>
    <h2>Gestión de Mascotas</h2>
<p>Total de mascotas registradas: ** {mascotas.length} ** </p> 
<hr />
 <FormularioMascota onMascotaAgregada={agregarMascota} />
<ul>
  {mascotas.map((mascota) => (
<MascotaItem 
key={mascota.id}
mascota={mascota} 
onEliminar={eliminarMascota}
onGuardar={actualizarMascota}
/>
  ))
  }
</ul>
  </section>
  </div>
  )
}
export default VistaMascotas;