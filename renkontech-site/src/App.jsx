import './App.css'
import './firebase/config'

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import Usuarios from './pages/Usuarios'
import NovoUsuario from './pages/NovoUsuario'
import Login from './pages/Login'
import Mesas from './pages/Mesas'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/config'

import { useEffect, useState } from 'react'


function Dashboard() {
  return (
    <div className="page">

      <h1>Dashboard</h1>

      <p>Bem-vindo ao painel do NexaFood</p>

      <section className="dashboard">

        <div className="card">
          <span>Mesas</span>
          <strong>12</strong>
          <small>Mesas cadastradas</small>
        </div>

        <div className="card">
          <span>Pedidos hoje</span>
          <strong>28</strong>
          <small>Pedidos realizados</small>
        </div>

        <div className="card">
          <span>Faturamento</span>
          <strong>R$ 2.450,00</strong>
          <small>Total de hoje</small>
        </div>

        <div className="card">
          <span>Caixa</span>
          <strong>Aberto</strong>
          <small>Caixa atual</small>
        </div>

      </section>

    </div>
  )
}


function App() {

  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)


  useEffect(() => {

    const cancelarObservador = onAuthStateChanged(
      auth,
      (usuarioAtual) => {

        setUsuario(usuarioAtual)
        setCarregando(false)

      }
    )

    return () => cancelarObservador()

  }, [])


  async function sair() {

    try {

      await signOut(auth)

    } catch (error) {

      console.error('Erro ao sair:', error)

    }

  }


  if (carregando) {

    return (
      <div>
        <p>Carregando...</p>
      </div>
    )

  }


  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={
            usuario
              ? <Navigate to="/" replace />
              : <Login />
          }
        />


        {/* ÁREA DO SISTEMA */}

        <Route
          path="*"
          element={

            usuario ? (

              <div className="app">

                {/* MENU LATERAL */}

                <aside className="sidebar">

                  <div className="logo">

                    <h2>RenkonTech</h2>

                    <span>NexaFood</span>

                  </div>


                  <nav>

                    <Link to="/">
                      🏠 Dashboard
                    </Link>

                    <Link to="/usuarios">
                      👥 Usuários
                    </Link>

                    <Link to="/mesas">
                      🪑 Mesas
                    </Link>

                    <a href="#">
                      🍽️ Pedidos
                    </a>

                    <a href="#">
                      📦 Produtos
                    </a>

                    <a href="#">
                      💳 Pagamentos
                    </a>

                    <a href="#">
                      💰 Caixa
                    </a>

                    <a href="#">
                      📊 Relatórios
                    </a>

                    <a href="#">
                      📋 Auditoria
                    </a>

                  </nav>


                  <div className="sidebar-footer">

                    <span>
                      ⚙️ Configurações
                    </span>


                    <button
                      onClick={sair}
                      className="logout-button"
                    >
                      🚪 Sair
                    </button>

                  </div>

                </aside>


                {/* CONTEÚDO */}

                <main className="main-content">

                  <header className="topbar">

                    <div>

                      <h1>RenkonTech</h1>

                      <p>
                        Sistema de Gestão para Restaurantes
                      </p>

                    </div>


                    <div className="user-info">

                      <strong>
                        Administrador
                      </strong>

                      <span>
                        {usuario.email}
                      </span>

                    </div>

                  </header>


                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/usuarios"
                      element={<Usuarios />}
                    />

                    <Route
                      path="/mesas"
                      element={<Mesas />}
                    />

                    <Route
                      path="/usuarios/novo"
                      element={<NovoUsuario />}
                    />

                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                    />

                  </Routes>


                </main>

              </div>

            ) : (

              <Navigate to="/login" replace />

            )

          }
        />

      </Routes>

    </BrowserRouter>
  )

}


export default App