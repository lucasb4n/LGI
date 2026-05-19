import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordRecoveryModal from '../components/PasswordRecoveryModal'

export default function Login(){
  const [cred, setCred] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRecovery, setShowRecovery] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credenciais: cred, senha })
      })

      if (!res.ok) {
        setError('Credenciais ou Senha estão incorretas')
        return
      }

      const data = await res.json()
      // salva documento do usuário para consulta futura e redireciona
      try{ localStorage.setItem('documento', data.documento) }catch{}
      navigate('/main')
    } catch (e) {
      setError('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Bem vindo a LGI</h1>

      <form className="card" onSubmit={e => { e.preventDefault(); handleLogin() }}>
        {error && (
          <div className="alert error" role="alert">{error}</div>
        )}

        <label className="label">Credenciais</label>
        <input className="input" value={cred} onChange={e => setCred(e.target.value)} type="text" placeholder="Email ou usuário" />

        <label className="label">Senha</label>
        <input className="input" value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Senha" />

        <button type="button" className="btn google">com Google</button>

        <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Entrando...' : 'entrar'}</button>

        <div className="footer-link">
          <Link to="/register">fazer cadastro</Link>
          <button type="button" className="btn-link" onClick={() => setShowRecovery(true)}>Esqueci minha senha</button>
        </div>
      </form>

      {showRecovery && <PasswordRecoveryModal onClose={() => setShowRecovery(false)} />}
    </div>
  )
}
