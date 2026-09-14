import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase/config'

function Mesas() {
  const [mesas, setMesas] = useState([])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [numero, setNumero] = useState('')
  const [capacidade, setCapacidade] = useState('')

  async function carregarMesas() {
    try {
      const snapshot = await getDocs(
        collection(db, 'mesas')
      )

      const listaMesas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      listaMesas.sort((a, b) => a.numero - b.numero)

      setMesas(listaMesas)
    } catch (error) {
      console.error('Erro ao carregar mesas:', error)
    }
  }

  useEffect(() => {
    carregarMesas()
  }, [])

  async function cadastrarMesa(e) {
    e.preventDefault()

    if (!numero || !capacidade) {
      return
    }

    try {
      await addDoc(collection(db, 'mesas'), {
        numero: Number(numero),
        capacidade: Number(capacidade),
        status: 'livre',
        ativo: true,
        criadoEm: serverTimestamp(),
        atualizadoEm: serverTimestamp(),
      })

      setNumero('')
      setCapacidade('')
      setMostrarFormulario(false)

      await carregarMesas()
    } catch (error) {
      console.error('Erro ao cadastrar mesa:', error)
    }
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Mesas</h1>
          <p>Gerencie as mesas do restaurante</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nova mesa
        </button>
      </div>

      {mostrarFormulario && (
        <div className="form-card">
          <h2>Nova mesa</h2>

          <form onSubmit={cadastrarMesa}>

            <div className="form-group">
              <label>Número da mesa</label>

              <input
                type="number"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Ex: 2"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Capacidade</label>

              <input
                type="number"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                placeholder="Ex: 4"
                min="1"
                required
              />
            </div>

            <div className="form-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-primary"
              >
                Cadastrar mesa
              </button>

            </div>

          </form>
        </div>
      )}

      <div className="mesas-grid">

        {mesas.map((mesa) => (

          <div
            className={`mesa-card ${mesa.status}`}
            key={mesa.id}
          >

            <div className="mesa-top">

              <span className="mesa-label">
                MESA
              </span>

              <span className="mesa-status">
                {mesa.status === 'livre'
                  ? 'Livre'
                  : mesa.status === 'ocupada'
                    ? 'Ocupada'
                    : 'Reservada'}
              </span>

            </div>

            <div className="mesa-numero">
              {String(mesa.numero).padStart(2, '0')}
            </div>

            <div className="mesa-info">
              <span>🪑</span>

              <span>
                {mesa.capacidade} lugares
              </span>
            </div>

            <button className="mesa-button">
              Ver mesa
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Mesas