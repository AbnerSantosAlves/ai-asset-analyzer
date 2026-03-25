import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [ativo, setAtivo] = useState("")
  const [dadosAtivo, setDadosAtivo] = useState(null)

  const buscar = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/analyze/${ativo}`, {method: "POST"});

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      setDadosAtivo(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar ativo");
    }
  };


  return (
    <>
      <main>
        <section className="search-section">
          <div className="search-container">
            <div className="search-title-container">
              <h1 className="search-title">Consulta de ativos da bolsa de valores</h1>
              <p className='search-description'>Realizamos a busca dos dados de um ativo financeiro em poucos segundos para você, basta inserir o nome do ativo abaixo e aguardar os resultados.</p>
            </div>
            <div className="search-input-container">
              <input type="text" placeholder="Pesquise pelo código do ativo. Ex: PETR4" className="search-input" value={ativo} onChange={(e) => setAtivo(e.target.value)} />
              <button className="search-button" onClick={buscar}>Buscar</button>
            </div>
          </div>
        </section>
        <section className="results-section">
          {dadosAtivo && (
            <div className="results-container">
              <p className='asset-name'>Resultados do ativo: {dadosAtivo.codigo}</p>

              <div className='results-cards'>
                <div className='card'>
                  <p className='card-title'>Valor atual</p>
                  <p className='card-value'>R$ {dadosAtivo.indicadores.preco_atual}</p>
                </div>

                <div className='card'>
                  <p className='card-title'>Dividend yield</p>
                  <p className='card-value'>{dadosAtivo.indicadores.dividend_yield}%</p>
                </div>


                <div className='card'>
                  <p className='card-title'>Preço / Lucro por ação</p>
                  <p className='card-value'>{dadosAtivo.indicadores.pl}</p>
                </div>


                <div className='card'>
                  <p className='card-title'>Preço / Valor patrimonial</p>
                  <p className='card-value'>{dadosAtivo.indicadores.pvp}</p>
                </div>

                <div className='card'>
                  <p className='card-title'>Margem ebitda</p>
                  <p className='card-value'>{dadosAtivo.indicadores.margem_ebitda}</p>
                </div>
              </div>

              <div className='additional-information'>
                <p className='additional-information-title'>Contexto do mercado</p>
                <p className='additional-information-description'><span className='title-description'>Tendência da commodity:</span>{dadosAtivo.contexto_mercado.tendencia_commodity}</p>
                <p className='additional-information-description'><span className='title-description'>Produção diária:</span>{dadosAtivo.contexto_mercado.producao_diaria}</p>
              </div>


              <div className='additional-information'>
                <p className='additional-information-title'>Recomendações</p>
                <p className='additional-information-description'><span className='title-description'>Opinião geral:</span>{dadosAtivo.recomendacoes.opiniao_geral}</p>
                <p className='additional-information-description'><span className='title-description'>Análise situacional:</span>{dadosAtivo.recomendacoes.analise_situacional}</p>
              </div>

              <div className='additional-information'>
                <p className='additional-information-title'>Pontos positivos</p>
                <p className='additional-information-description'><span className='title-description'>Resumo:</span>{dadosAtivo.pontos_positivos.resumo}</p>
                <p className='additional-information-description'><span className='title-description'>Breakeven:</span>{dadosAtivo.pontos_positivos.breakeven}</p>
              </div>


              <div className='additional-information'>
                <p className='additional-information-title'>Principais riscos</p>
                <p className='additional-information-description'><span className='title-description'>Risco Político:</span>{dadosAtivo.riscos.politico}</p>
                <p className='additional-information-description'><span className='title-description'>Geopolítica:</span>{dadosAtivo.riscos.geopolitica}</p>
              </div>
            </div>
          )}

        </section>
      </main>
    </>
  )
}

export default App
