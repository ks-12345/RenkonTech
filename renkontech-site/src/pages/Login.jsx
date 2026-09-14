import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  async function entrar(e) {
    e.preventDefault()
    setErro('')

    try {
      await signInWithEmailAndPassword(auth, email, senha)
      window.location.href = '/'
    } catch (error) {
      setErro('E-mail ou senha inválidos.')
      console.error(error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>RenkonTech</h1>
        <p>Login do sistema</p>

        <form onSubmit={entrar}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {erro && (
            <p className="login-error">
              {erro}
            </p>
          )}

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login