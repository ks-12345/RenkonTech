import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { secondaryAuth, db } from '../firebase/config'


function NovoUsuario() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cargo, setCargo] = useState('')
  const [senha, setSenha] = useState('')

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [salvando, setSalvando] = useState(false)


  async function cadastrarUsuario(e) {

    e.preventDefault()

    setErro('')
    setSucesso('')
    setSalvando(true)


    try {

      // Cria o usuário no Firebase Authentication

      const resultado = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        senha
      )


      const usuario = resultado.user


      // Cria o documento do usuário no Firestore

      await setDoc(
        doc(db, 'usuarios', usuario.uid),
        {
          nome: nome,
          email: email,
          cargo: cargo,
          ativo: true,
          criadoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp(),
        }
      )


      setSucesso('Usuário cadastrado com sucesso!')


      // Limpa os campos

      setNome('')
      setEmail('')
      setCargo('')
      setSenha('')


    } catch (error) {

      console.error(error)

      if (error.code === 'auth/email-already-in-use') {

        setErro('Este e-mail já está cadastrado.')

      } else if (error.code === 'auth/weak-password') {

        setErro('A senha precisa ter pelo menos 6 caracteres.')

      } else if (error.code === 'auth/invalid-email') {

        setErro('Digite um e-mail válido.')

      } else {

        setErro('Não foi possível cadastrar o usuário.')

      }

    } finally {

      setSalvando(false)

    }

  }


  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>Novo usuário</h1>

          <p>
            Cadastre um novo usuário no sistema
          </p>

        </div>

      </div>


      <div className="form-card">

        <form onSubmit={cadastrarUsuario}>

          <div className="form-group">

            <label>Nome</label>

            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

          </div>


          <div className="form-group">

            <label>E-mail</label>

            <input
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="form-group">

            <label>Cargo</label>

            <select
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            >

              <option value="">
                Selecione um cargo
              </option>

              <option value="administrador">
                Administrador
              </option>

              <option value="funcionario">
                Funcionário
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              minLength="6"
              required
            />

          </div>


          {erro && (

            <p className="login-error">
              {erro}
            </p>

          )}


          {sucesso && (

            <p className="success-message">
              {sucesso}
            </p>

          )}


          <div className="form-actions">

            <Link
              to="/usuarios"
              className="btn-secondary"
            >
              Cancelar
            </Link>


            <button
              type="submit"
              className="btn-primary"
              disabled={salvando}
            >

              {salvando
                ? 'Cadastrando...'
                : 'Cadastrar usuário'
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  )

}


export default NovoUsuario