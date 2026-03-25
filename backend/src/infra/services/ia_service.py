from google import genai
from dotenv import load_dotenv
import json
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print("API KEY:", api_key)  # DEBUG

client = genai.Client(api_key=api_key)

def analisar_ativo(codigo):
    prompt = f"""
Analise o ativo {codigo}.

Responda SOMENTE com JSON válido. Não adicione explicações ou textos adicionais! Nos indicadores, exiba apenas o valor numérico, sem texto adicional. Se um indicador não estiver disponível, deixe como "Não encontrado".

Se não encontrar dados, responda:
{{ "erro": "Dados não encontrados" }}

Formato:

{{
  "codigo": "{codigo}",
  "nome": "",
  "indicadores": {{
    "preco_atual": 0,
    "dividend_yield": "",
    "pl": 0,
    "pvp": 0,
    "margem_ebitda": ""
  }},
  "contexto_mercado": {{
    "tendencia_commodity": "",
    "producao_diaria": ""
  }},
  "recomendacoes": {{
    "opiniao_geral": "",
    "analise_situacional": ""
  }},
  "pontos_positivos": {{
    "resumo": "",
    "breakeven": ""
  }},
  "riscos": {{
    "politico": "",
    "geopolitica": "",
  }}
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        if not response or not response.text:
            return {"erro": "IA não retornou resposta"}

        texto = response.text.strip()
        texto = response.text.strip()

# remove markdown ```json ```
        if texto.startswith("```"):
            texto = texto.split("```")[1]

# remove "json\n" se vier
        if texto.startswith("json"):
            texto = texto[4:]

        texto = texto.strip()

        return json.loads(texto)

        
    except Exception as e:
        return {"erro": f"Erro na requisição: {str(e)}"}