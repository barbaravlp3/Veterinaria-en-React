
import { useState } from 'react';
// // Traemos una herramienta de React 
// para que la página pueda "recordar" datos y actualizarse.

import  FormularioCliente  from './componentes/FormularioCliente'; 
// Traemos el diseño del formulario donde escribiremos los datos.
// Asegúrate de que la ruta sea correcta

import ClienteItem from './componentes/ClienteItem'; 
// Traemos el diseño de cómo se verá cada cliente en la lista.


import FormularioMascota from './componentes/FormularioMascota'; 
// Traemos el diseño del formulario donde escribiremos los datos.
// Asegúrate de que la ruta sea correcta

import MascotaItem from './componentes/MascotaItem'; 
// Traemos el diseño de cómo se verá cada cliente en la lista.


import './App.css'; // Asume que tienes un archivo CSS para estilos
// Traemos los estilos (colores, tamaños) para que la página no se vea vacía.
// 1. Definimos nuestro componente principal
// Es una función que, por convención, empieza con Mayúscula.


function App() {
// Esta es la función principal que arma toda nuestra página.
// 2. Aquí dentro va la lógica de JavaScript (aún simple)
//Definimos variables

const [clientes, setClientes] = useState ([ 
  // 'clientes' guarda la lista,
//  'setClientes' es la función para cambiar esa lista.
  { id: 1, nombre: "Juan Peréz", telefono: '123456789' }, // Un cliente de ejemplo ya cargado.
  { id: 2, nombre: "Ana Gomez", telefono: '11987654321' }, // Otro cliente de ejemplo.

]) // Aquí termina nuestra lista inicial de clientes.

const [mascotas, setMascotas] = useState ([ 
  // 'mascotas' guarda la lista,
//  'setMascotas' es la función para cambiar esa lista.
  { id: 3, nombre: "Bubu", edad: '10' }, // Una mascota de ejemplo ya cargada.
  { id: 4, nombre: "Pía", edad: '11' }, // Otra mascota de ejemplo.

]) // Aquí termina nuestra lista inicial de mascotas.

const nombreApp = "El Dogo - Gestión de Pacientes";
// Guardamos el nombre de la app en una palabra fácil de usar después.
// 3. El componente DEBE devolver el JSX (lo que se va a ver en pantalla)


const agregarCliente =  (nuevoCliente) => { // Esta función recibe un cliente nuevo y...
setClientes([...clientes, nuevoCliente]) // ...lo suma a la lista que ya teníamos sin borrar los anteriores.
}

const agregarMascota =  (nuevaMascota) => { // Esta función recibe una mascota nueva y...
setMascotas([...mascotas, nuevaMascota]) // ...lo suma a la lista que ya teníamos sin borrar los anteriores.
}

const eliminarCliente = (id) => {
  const listaActualizada = clientes.filter(cliente => 
    cliente.id !== id
  );

  setClientes(listaActualizada);
} //Lista actualizada de clientes sin el cliente eliminado


const actualizarCliente = (clienteActualizado) => {
  const listaActualizada = clientes.map(cliente => {
if(cliente.id === clienteActualizado.id) {
return clienteActualizado;
}
 return cliente;
  });

  setClientes(listaActualizada);
}

//Ahora para mascotas: eliminar y modificar
const eliminarMascota = (id) => {
  const listaActualizada = mascotas.filter(mascota=> 
    mascota.id !== id
  );

  setMascotas(listaActualizada);
} //Lista actualizada de mascotas sin la mascota eliminada


const actualizarMascota = (mascotaActualizada) => {
  const listaActualizada = mascotas.map(mascota => {
if(mascota.id === mascotaActualizada.id) {
return mascotaActualizada;
}
 return mascota;
  });

  setMascotas(listaActualizada);
}


//A continuacion, esto se verá en pantalla
return ( // Aquí empieza lo que el usuario realmente va a ver en el navegador.
<div> 
{/* Esto es JSX. Parece HTML, ¡pero nos permite meter variables de JS!
Para ello, usamos llaves { }
*/}
<h1>{nombreApp}</h1>
<p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p> 
{/* En la próxima etapa, aquí pondremos otros componentes */}


<p>Total de clientes registrados: ** {clientes.length} ** </p> 
<p>Total de mascotas registradas: ** {mascotas.length} ** </p> 



<section>
{/* Placeholder para Clientes y Mascotas */}
<h2>Gestión de Clientes</h2>
<h2>Gestión de Mascotas</h2>
</section>

<hr />
<h2>Clientes actuales:</h2>
 <FormularioCliente onClienteAgregado={agregarCliente} />
<ul>
  {clientes.map((cliente) => (
<ClienteItem 
key={cliente.id} 
cliente={cliente}
onEliminar={eliminarCliente}
onGuardar={actualizarCliente}
 />
  ))
  }
  
</ul>
<h2>Mascotas actuales:</h2>
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

</div>// Es el contenedor de toda nuestra aplicación.
);
}
// 4. Exportamos el componente para poder usarlo en otro lugar (generalmente index.js)
export default App;
// Dejamos el componente listo para que React lo pueda usar y mostrar en el navegador.
