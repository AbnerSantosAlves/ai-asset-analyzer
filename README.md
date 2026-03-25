<h2>Consulta de ativos da bolsa de valores</h2>

<p>Este é um projeto desenvolvido para a análise de ativos financeiros utilizando Inteligência Artificial. A aplicação combina Python, para API REST e a lógica da IA (prompt), e React (Frontend).</p>

<p>Através de um campo de pesquisa, o usuário deve digitar o código do ativo que deseja analisar, envia uma requisição para o nosso backend que retorna os dados extraídos da IA obtidos através de um prompt que faz a resposta ser estruturada em Json.</p>


<h3>Funcionalidades</h3>
<ul>
  <li>Integração com IA (Gemini API)</li>
  <li>Retorno estruturado com:</li>
  <ul>
    <li>Indicadores financeiros</li>
    <li>Contexto de mercado</li>
    <li>Recomendações</li>
    <li>Riscos</li>
  </ul>
  <li>API rápida com FastAPI</li>
</ul>

<hr>



<h3>Variáveis de ambiente</h3>
Crie um arquivo .env no backend:

GEMINI_API_KEY=sua_chave_aqui

## Como rodar o projeto

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Servidor rodando em:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação rodando em:

```
http://localhost:5173
```

---

## Exemplo de uso

Requisição:

```
GET /analisar/PETR4
```

Resposta:

```json
{
  "codigo": "PETR4",
  "nome": "Petrobras",
  "indicadores": {
    "preco_atual": 35.20,
    "dividend_yield": "10%",
    "pl": 4.5,
    "pvp": 1.2,
    "margem_ebitda": "30%"
  }
}
```

---



Desenvolvido por **Abner Santos**
