function ClienteItem({ cliente }) {

return (
<li key={cliente.id}>
    **{cliente.nombre}** -  Tel: {cliente.telefono}
  </li>
  )
}

export default ClienteItem;

