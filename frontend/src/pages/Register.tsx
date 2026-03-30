import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register(){
  const [nome, setNome] = useState('')
  const [documento, setDocumento] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(senha !== senha2){
      alert('As senhas não coincidem')
      return
    }

    setLoading(true)
    try{
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, documento, dataNasc, email, senha })
      })

      if(res.ok){
        alert('Cadastro realizado com sucesso')
        navigate('/')
      } else {
        const body = await res.json()
        alert('Erro: ' + (body?.error || 'Falha ao cadastrar'))
      }
    }catch(err:any){
      alert('Erro: '+err?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Cadastro</h1>

      <form className="card" onSubmit={handleSubmit}>
        <label className="label">Nome</label>
        <input className="input" value={nome} onChange={e=>setNome(e.target.value)} type="text" placeholder="Seu nome" required />

        <label className="label">Documento</label>
        <input className="input" value={documento} onChange={e=>setDocumento(e.target.value)} type="text" placeholder="CPF/CNPJ" />

        <label className="label">Data de Nasc.</label>
        <input className="input" value={dataNasc} onChange={e=>setDataNasc(e.target.value)} type="date" />

        <label className="label">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="seu@email.com" required />

        <label className="label">Senha</label>
        <input className="input" value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" required />

        <label className="label">Verificar senha</label>
        <input className="input" value={senha2} onChange={e=>setSenha2(e.target.value)} type="password" placeholder="Repita a senha" required />

        <button type="submit" className="btn primary" disabled={loading}>{loading? 'Salvando...':'Criar conta'}</button>

        <div className="footer-link">
          <Link to="/">Voltar para login</Link>
        </div>
      </form>
    </div>
  )
}
