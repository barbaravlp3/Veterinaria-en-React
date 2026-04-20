function MascotaItem({ mascota }) {

return (
<li key={mascota.id}>
    **{mascota.nombre}** -  Edad: {mascota.edad}
  </li>
  )
}

export default MascotaItem;