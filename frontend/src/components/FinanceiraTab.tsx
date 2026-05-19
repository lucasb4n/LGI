import React, { useState } from 'react';

export default function FinanceiraTab() {
  const [subTab, setSubTab] = useState<'consumidor' | 'prestador'>('consumidor');
  const [period, setPeriod] = useState('1'); // '1', '3', '12' months
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const serviceTopics = [
    { 
      id: 'possiveis', 
      label: 'Possíveis Atendimentos', 
      count: 4, 
      color: 'blue',
      items: [
        { client: 'Ana Silva', service: 'Limpeza Residencial', date: 'Solicitado em 18/05', price: 'R$ 150,00', status: 'pending', statusLabel: 'Pendente' },
        { client: 'Carlos Souza', service: 'Pintura Residencial', date: 'Solicitado em 17/05', price: 'R$ 450,00', status: 'pending', statusLabel: 'Pendente' },
        { client: 'Roberto Dias', service: 'Pequenos Reparos', date: 'Solicitado em 16/05', price: 'R$ 90,00', status: 'pending', statusLabel: 'Pendente' },
        { client: 'Fernanda Lima', service: 'Montagem de Armário', date: 'Solicitado em 15/05', price: 'R$ 120,00', status: 'pending', statusLabel: 'Pendente' }
      ]
    },
    { 
      id: 'hoje', 
      label: 'Atendimentos para Hoje', 
      count: 2, 
      color: 'green',
      items: [
        { client: 'Mariana Costa', service: 'Manutenção Elétrica', date: 'Hoje às 14:00', price: 'R$ 200,00', status: 'confirmed', statusLabel: 'Confirmado' },
        { client: 'João Oliveira', service: 'Instalação de Chuveiro', date: 'Hoje às 16:30', price: 'R$ 120,00', status: 'in-progress', statusLabel: 'Em Andamento' }
      ]
    },
    { 
      id: 'agendados', 
      label: 'Atendimentos Agendados', 
      count: 7, 
      color: 'purple',
      items: [
        { client: 'Juliana Lima', service: 'Consultoria de Interiores', date: '20/05/2026 às 10:00', price: 'R$ 300,00', status: 'scheduled', statusLabel: 'Agendado' },
        { client: 'Marcos Santos', service: 'Jardinagem e Podagem', date: '22/05/2026 às 09:00', price: 'R$ 250,00', status: 'scheduled', statusLabel: 'Agendado' },
        { client: 'Beatriz Melo', service: 'Limpeza Pós-Obra', date: '25/05/2026 às 08:30', price: 'R$ 500,00', status: 'scheduled', statusLabel: 'Agendado' }
      ]
    },
    { 
      id: 'recusados', 
      label: 'Atendimentos Recusados', 
      count: 3, 
      color: 'red',
      items: [
        { client: 'Pedro Alencar', service: 'Reparo Hidráulico', date: 'Recusado em 18/05', price: 'R$ 180,00', status: 'rejected', statusLabel: 'Recusado' },
        { client: 'Lucas Santos', service: 'Troca de Disjuntor', date: 'Recusado em 16/05', price: 'R$ 110,00', status: 'rejected', statusLabel: 'Recusado' },
        { client: 'Camila Rocha', service: 'Instalação de Ar Condicionado', date: 'Recusado em 14/05', price: 'R$ 350,00', status: 'rejected', statusLabel: 'Recusado' }
      ]
    }
  ];

  return (
    <div className="finance-container">
      <div className="sub-tab-selector">
        <button 
          className={subTab === 'consumidor' ? 'active' : ''} 
          onClick={() => setSubTab('consumidor')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Consumidor
        </button>
        <button 
          className={subTab === 'prestador' ? 'active' : ''} 
          onClick={() => setSubTab('prestador')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8}}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          Prestador
        </button>
      </div>

      <div className="finance-content">
        {subTab === 'consumidor' ? (
          <div className="finance-section">
            <div className="finance-card balance">
              <div className="card-header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22m5-18H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7"/></svg>
              </div>
              <h3>Gastos Totais</h3>
              <p className="amount">R$ 0,00</p>
              <small className="muted">Últimos 30 dias</small>
            </div>
            
            <div className="finance-card">
              <h4>Serviços em Aberto</h4>
              <div className="empty-state-mini">
                <p>Nenhum serviço sendo executado no momento.</p>
              </div>
            </div>

            <div className="finance-card history">
              <h4>Histórico de Contratações</h4>
              <div className="transaction-list">
                <p className="muted text-center" style={{padding: '20px 0'}}>Nenhuma contratação realizada ainda.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="finance-section">
            <div className="finance-header-with-filter">
              <h3 className="section-title">Controle de Ganhos</h3>
              <select 
                className="period-select" 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="1">Último mês</option>
                <option value="3">Últimos 3 meses</option>
                <option value="12">Últimos 12 meses</option>
              </select>
            </div>

            <div className="finance-cards-row">
              <div className="finance-card mini-stats">
                <div className="card-header-icon blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22m5-18H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7"/></svg>
                </div>
                <h3>Ganhos Totais</h3>
                <p className="amount-sm">R$ 0,00</p>
              </div>

              <div className="finance-card mini-stats">
                <div className="card-header-icon orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
                </div>
                <h3>Serviços Agendados</h3>
                <p className="amount-sm">{serviceTopics.find(t => t.id === 'agendados')?.count || 0}</p>
              </div>

              <div className="finance-card mini-stats">
                <div className="card-header-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22m5-18H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7"/></svg>
                </div>
                <h3>Saldos a Receber</h3>
                <p className="amount-sm green">R$ 0,00</p>
              </div>
            </div>

            {/* Controle de Serviços Collapsible Card */}
            <div className="services-control-card">
              <div 
                className="services-control-header"
                onClick={() => setServicesExpanded(!servicesExpanded)}
              >
                <div className="services-header-title">
                  <div className="services-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h3>Controle de Serviços</h3>
                </div>
                <div className="services-header-right">
                  <span className="total-badge">
                    {serviceTopics.reduce((acc, t) => acc + t.count, 0)} no total
                  </span>
                  <svg 
                    className={`chevron-icon ${servicesExpanded ? 'expanded' : ''}`} 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {servicesExpanded && (
                <div className="services-control-content">
                  <div className="services-topics-list">
                    {serviceTopics.map((topic) => (
                      <React.Fragment key={topic.id}>
                        <div 
                          className={`service-topic-item ${activeTopic === topic.id ? 'active' : ''}`}
                          onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                        >
                          <div className="topic-left">
                            <span className={`topic-bullet ${topic.color}`}></span>
                            <span className="topic-name">{topic.label}</span>
                          </div>
                          <div className="topic-right">
                            <span className={`topic-badge ${topic.color}`}>{topic.count}</span>
                            <svg 
                              style={{ 
                                transition: 'transform 0.2s', 
                                transform: activeTopic === topic.id ? 'rotate(180deg)' : 'none',
                                color: 'var(--muted)'
                              }} 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>

                        {activeTopic === topic.id && (
                          <div className="topic-details-panel">
                            <span className="details-panel-header">Lista de {topic.label}</span>
                            <div className="detail-items-list">
                              {topic.items.map((item, index) => (
                                <div key={index} className="detail-item-card">
                                  <div className="detail-item-info">
                                    <span className="detail-item-client">{item.client}</span>
                                    <span className="detail-item-service">{item.service}</span>
                                    <span className="detail-item-date">{item.date}</span>
                                  </div>
                                  <div className="detail-item-meta">
                                    <span className="detail-item-price">{item.price}</span>
                                    <span className={`detail-item-status ${item.status}`}>
                                      {item.statusLabel}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="finance-card history">
              <h4>Histórico de Atividades</h4>
              <div className="transaction-list">
                <p className="muted text-center" style={{padding: '20px 0'}}>Nenhuma atividade registrada no período selecionado.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

