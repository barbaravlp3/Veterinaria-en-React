import { useState, useEffect } from 'react';
import { VeterinariaContext } from './VeterinariaContext';

export const VeterinariaProvider = ({ children }) => {
    //CLIENTES
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

      //MASCOTAS
const [mascotas, setMascotas] = useState(() => {
    const datosGuardados = localStorage.getItem('mascotasDogo') || [];
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const agregarMascota = (nuevaMascota) => { // Esta función recibe una mascota nueva y...
    setMascotas([...mascotas, nuevaMascota]) // ...lo suma a la lista que ya teníamos sin borrar los anteriores.
  }

  const eliminarMascota = (id) => {
    const listaActualizada = mascotas.filter(mascota =>
      mascota.id !== id
    );

    setMascotas(listaActualizada);
  }

  const actualizarMascota = (mascotaActualizada) => {
    const listaActualizada = mascotas.map(mascota => {
      if (mascota.id === mascotaActualizada.id) {
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

  const value = {
    //Clientes
    clientes,
    agregarNuevoCliente,
    actualizarCliente,
    eliminarCliente,
    //Mascotas
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
  }
  return (
    <VeterinariaContext.Provider value={value}>
      {children}
    </VeterinariaContext.Provider>
  )
 }