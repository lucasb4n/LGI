import React, { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import ProfileEditModal from '../components/ProfileEditModal'

export default function Main(){
  const [tab, setTab] = useState<'home'|'finance'|'profile'>('home')
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<{documento?:string,nome?:string,email?:string,descricao?:string}|null>(null)
  const [editing, setEditing] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar com busca real — por enquanto apenas log
    console.log('Pesquisar:', search)
  }

  useEffect(()=>{
    // quando abrir aba profile, buscar usuário salvo
    if(tab !== 'profile') return
    const documento = localStorage.getItem('documento')
    if(!documento) return
    console.log('Buscando usuário (on profile open):', documento)
    fetch(`http://localhost:8080/api/user/${encodeURIComponent(documento)}`)
      .then(r=>{
        console.log('GET /api/user response status:', r.status)
        if(!r.ok) throw new Error('Não encontrado');
        return r.json()
      })
      .then(d=> {
        console.log('Usuário obtido (profile):', d)
        console.log('Nome do usuário (profile):', d.nome)
        setUser(d)
      })
      .catch(err=> { console.error('Erro ao buscar usuário (profile):', err); setUser(null) })
  },[tab])

  // prefetch do usuário no mount caso já esteja logado
  useEffect(()=>{
    const documento = localStorage.getItem('documento')
    if(!documento) return
    console.log('Prefetch usuário no mount:', documento)
    fetch(`http://localhost:8080/api/user/${encodeURIComponent(documento)}`)
      .then(r=>{
        console.log('prefetch response status:', r.status)
        if(!r.ok) throw new Error('Não encontrado');
        return r.json()
      })
      .then(d=> { console.log('Usuário obtido (prefetch):', d); console.log('Nome do usuário (prefetch):', d.nome); setUser(d) })
      .catch(err=> { console.debug('Sem usuário no prefetch:', err) })
  },[])

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="header-title">
          <h2>{tab === 'home' ? 'Início' : tab === 'finance' ? 'Financeiro' : 'Perfil'}</h2>
        </div>

        {tab === 'profile' && (
          <button className="edit-btn" aria-label="Editar perfil" onClick={()=>setEditing(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        )}

        {tab === 'home' && (
          <form className="header-search" onSubmit={handleSearchSubmit} role="search">
            <input
              className="search-input"
              type="search"
              placeholder="Pesquisar..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              aria-label="Pesquisar"
            />
            <button className="search-btn" type="submit" aria-label="Buscar">🔍</button>
          </form>
        )}
      </header>

      <div className="content" style={{padding:16}}>
        {tab === 'home' && (
          <div>
            <p>Bem vindo à tela principal. Aqui vão os cards e formulários iniciais.</p>
          </div>
        )}

        {tab === 'finance' && (
          <div>
            <p>Resumo financeiro e transações aparecerão aqui.</p>
          </div>
        )}

        {tab === 'profile' && (
          <div className="profile-view">
            <div className="profile-bg" aria-hidden="true"></div>

            <div className="profile-meta">
              <img className="profile-photo" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nome||'Usuário')}&background=fff&color=333&size=256`} alt="Foto de perfil" />
              <div className="profile-info">
                <h3>{user?.nome || 'Usuário'}</h3>
                <p className="muted">{user?.email || ''}</p>
                {user?.descricao && <p className="profile-desc">{user.descricao}</p>}
              </div>
            </div>
          </div>
        )}
        <ProfileEditModal open={editing} onClose={()=>setEditing(false)} user={user} onSave={(u)=>setUser(u)} />
      </div>

      <BottomNav selected={tab} onChange={(t)=>setTab(t)} />
    </div>
  )
}
