import React, { useState, useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: ()=>void
  user: {documento?:string,nome?:string,descricao?:string,email?:string}|null
  onSave: (u:any)=>void
}

export default function ProfileEditModal({open,onClose,user,onSave}:Props){
  const [nome,setNome] = useState(user?.nome||'')
  const [descricao,setDescricao] = useState(user?.descricao||'')
  const [profilePreview,setProfilePreview] = useState<string | null>(null)
  const [bgPreview,setBgPreview] = useState<string | null>(null)
  const bgInputRef = useRef<HTMLInputElement|null>(null)
  const profileInputRef = useRef<HTMLInputElement|null>(null)

  useEffect(()=>{
    setNome(user?.nome||'')
    setDescricao(user?.descricao||'')
    setProfilePreview(localStorage.getItem('profileImageLocal'))
    setBgPreview(localStorage.getItem('bgImageLocal'))
  },[user,open])

  if(!open) return null

  const handleFile = (f: File | null, setter: (s:string|null)=>void)=>{
    if(!f){ setter(null); return }
    const reader = new FileReader()
    reader.onload = ()=>{
      const data = reader.result as string
      setter(data)
    }
    reader.readAsDataURL(f)
  }

  const submit = async ()=>{
    if(!user?.documento) return
    try{
      const resp = await fetch(`http://localhost:8080/api/user/${encodeURIComponent(user.documento)}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ nome, descricao })
      })
      if(!resp.ok) throw new Error('Falha ao salvar')
      const updated = await resp.json()
      // persistir imagens no localStorage apenas no cliente
      if(profilePreview) localStorage.setItem('profileImageLocal', profilePreview)
      if(bgPreview) localStorage.setItem('bgImageLocal', bgPreview)
      onSave(updated)
      onClose()
    }catch(err){
      console.error(err)
      alert('Erro ao salvar perfil')
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Editar perfil</h3>

        <div className="modal-preview">
          <div className="bg-square" style={{backgroundImage: bgPreview ? `url(${bgPreview})` : undefined}}>
            <button type="button" className="upload-btn-overlay" onClick={()=>bgInputRef.current?.click()}>Fazer upload</button>
            <div className="profile-circle-wrapper">
              <img className="profile-circle" src={profilePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nome||'Usuário')}&background=fff&color=333&size=256`} alt="preview" />
              <button type="button" className="upload-btn-small" onClick={()=>profileInputRef.current?.click()}>Fazer upload</button>
            </div>
          </div>
        </div>

        <input ref={bgInputRef} style={{display:'none'}} type="file" accept="image/*" onChange={e=>handleFile(e.target.files ? e.target.files[0] : null, setBgPreview)} />
        <input ref={profileInputRef} style={{display:'none'}} type="file" accept="image/*" onChange={e=>handleFile(e.target.files ? e.target.files[0] : null, setProfilePreview)} />

        <div className="modal-form">
          <div>
            <label className="label">Nome</label>
            <input className="input" value={nome} onChange={e=>setNome(e.target.value)} />
          </div>

          <div>
            <label className="label label-centered">Descrição</label>
            <textarea className="input" style={{height:80}} value={descricao} onChange={e=>setDescricao(e.target.value)} />
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={submit}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
