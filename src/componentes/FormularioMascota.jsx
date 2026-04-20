import { useState } from "react"; // Traemos la herramienta de React 
// para que el formulario "recuerde" lo que escribimos.

function FormularioMascota ({onMascotaAgregada}){ // Creamos el formulario 
// y recibimos la función para avisar a la App cuando haya una mascota nueva.


const [nombre, setNombre] = useState(''); // Creamos la cajita para guardar el nombre. Empieza vacía.
const [edad, setEdad] = useState(''); // Creamos la cajita para guardar la edad. Empieza vacía.

//funcion para manejar cuando cambie el nombre de la mascota, 
// y otra para cuando cambie la edad de la mascota, 
// y otra funcion para cuando enviemos los valores del formulario 


// Función que se activa cada vez que escribimos una letra en el campo de Nombre.
const manejadorNombre = (e) => {
        setNombre(e.target.value); // Guarda lo que el usuario escribió en el estado 'nombre'.
    }


 // Función que se activa cada vez que escribimos un número en el campo de Edad.   
const manejadorEdad = (e) => { 
        setEdad(e.target.value); // Guarda lo que el usuario escribió en el estado 'edad'.
    }


    // Función que se activa al hacer clic en el botón "Registrar Mascota".
  const manejadorEnvio = (e) => {
        e.preventDefault(); //evita que se recargue la pagina al enviar el formulario
        //  o solo haga lo que yo quiero


        //trim= no espacio en blanco al principio ni al final
        if (nombre.trim() === '' || edad.trim() === '') {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Creamos un "paquete" (objeto) con toda la información del nueva mascota.
        const nuevaMascota = {
            id: Date.now(), //generamos un id unico basado en la fecha actual
            nombre: nombre,// Guarda el nombre que capturamos.
            edad: edad, // Guarda la edad que capturamos.
        };

        console.log('Mascota lista para registrarse!', nuevaMascota); // Muestra en la consola
        //  del navegador que todo salió bien.

onMascotaAgregada(nuevaMascota); 


setNombre(''); // Borra lo que estaba escrito en el cuadro de nombre.
setEdad(''); // Borra lo que estaba escrito en el cuadro de edad.
};



return( 
    <form onSubmit={manejadorEnvio}> 
    <h3>nueva mascota:</h3>
    <label htmlFor=""> Nombre Completo
<input 
type="text" 
value={nombre} //donde se guarda
onChange={manejadorNombre} //cuando se modifique que se ejecute
required /> 
</label>


<label htmlFor="">Edad:

<input 
type="number"
value={edad}
onChange={manejadorEdad} 
required />
</label>

<button type="submit">Registrar Mascota</button>

</form>

)

};

export default FormularioMascota; 
//vamos a hacer que este formulario 
// aparezca en la pantalla principal 



