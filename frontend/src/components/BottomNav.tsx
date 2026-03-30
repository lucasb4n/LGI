import React from 'react'

type Tab = 'home' | 'finance' | 'profile'

export default function BottomNav({ selected, onChange }: { selected: Tab, onChange: (t: Tab) => void }){
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Menu inferior">
      <button className={"nav-item" + (selected==='home'? ' active':'')} onClick={()=>onChange('home')} aria-label="Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Início</span>
      </button>

      <button className={"nav-item" + (selected==='finance'? ' active':'')} onClick={()=>onChange('finance')} aria-label="Finance">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Financeiro</span>
      </button>

      <button className={"nav-item" + (selected==='profile'? ' active':'')} onClick={()=>onChange('profile')} aria-label="Perfil">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Perfil</span>
      </button>
    </nav>
  )
}
