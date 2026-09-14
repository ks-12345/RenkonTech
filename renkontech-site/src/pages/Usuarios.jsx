import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function carregarUsuarios() {
      const snapshot = await getDocs(collection(db, 'usuarios'))

      const listaUsuarios = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setUsuarios(listaUsuarios)
    }

    carregarUsuarios()
  }, [])

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Usuários</h1>
          <p>Gerencie os usuários do sistema</p>
        </div>

        <Link to="/usuarios/novo" className="btn-primary">
          + Novo usuário
        </Link>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

        
            <tbody>
  {usuarios.map((usuario) => (
    <tr key={usuario.id}>
      <td>{usuario.nome}</td>
      <td>{usuario.email}</td>
      <td>{usuario.cargo}</td>
      <td>
        <span className="status active-status">
          {usuario.ativo ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td>
        <button className="btn-action">
          Editar
        </button>
      </td>
    </tr>
  ))}
</tbody>
          
        </table>
      </div>

    </div>
  )
}

export default Usuarios