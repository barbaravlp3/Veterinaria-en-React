
import { useState } from "react"; // Traemos la herramienta de React 
// para que el formulario "recuerde" lo que escribimos.

function FormularioCliente ({onClienteAgregado}){ // Creamos el formulario 
// y recibimos la función para avisar a la App cuando haya un cliente nuevo.


const [nombre, setNombre] = useState(''); // Creamos la cajita para guardar el nombre. Empieza vacía.
const [telefono, setTelefono] = useState(''); // Creamos la cajita para guardar el teléfono. Empieza vacía.

//funcion para manejar cuando cambie el nombre del cliente, 
// y otra para cuando cambie el telefono del cliente, 
// y otra funcion para cuando enviemos los valores del formulario 


// Función que se activa cada vez que escribimos una letra en el campo de Nombre.
const manejadorNombre = (e) => {
        setNombre(e.target.value); // Guarda lo que el usuario escribió en el estado 'nombre'.
    }


 // Función que se activa cada vez que escribimos un número en el campo de Teléfono.   
const manejadorTelefono = (e) => { 
        setTelefono(e.target.value); // Guarda lo que el usuario escribió en el estado 'telefono'.
    }


    // Función que se activa al hacer clic en el botón "Registrar Cliente".
  const manejadorEnvio = (e) => {
        e.preventDefault(); //evita que se recargue la pagina al enviar el formulario
        //  o solo haga lo que yo quiero


        //trim= no espacio en blanco al principio ni al final
        if (nombre.trim() === '' || telefono.trim() === '') {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Creamos un "paquete" (objeto) con toda la información del nuevo cliente.
        const nuevoCliente = {
            id: Date.now(), //generamos un id unico basado en la fecha actual
            nombre: nombre,// Guarda el nombre que capturamos.
            telefono: telefono, // Guarda el teléfono que capturamos.
        };

        console.log('Cliente listo para registrarse!', nuevoCliente); // Muestra en la consola
        //  del navegador que todo salió bien.

onClienteAgregado(nuevoCliente); 


setNombre(''); // Borra lo que estaba escrito en el cuadro de nombre.
setTelefono(''); // Borra lo que estaba escrito en el cuadro de telefono.
};



return( 
    <form onSubmit={manejadorEnvio}> 
    <h3>nuevo cliente:</h3>
    <label htmlFor=""> Nombre Completo
<input 
type="text" 
value={nombre} //donde se guarda
onChange={manejadorNombre} //cuando se modifique que se ejecute
required /> 
</label>


<label htmlFor="">Teléfono:

<input 
type="tel"
value={telefono}
onChange={manejadorTelefono} 
required />
</label>

<button type="submit">Registrar Cliente</button>

</form>

)

};

export default FormularioCliente; 
//vamos a hacer que este formulario 
// aparezca en la pantalla principal 








    











