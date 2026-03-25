from fastapi import APIRouter, Depends, HTTPException, status, Query
from ..services.ia_service import analisar_ativo


router = APIRouter()


@router.post("/analyze/{codigo}")
def analyze_asset(codigo: str):
    resultado = analisar_ativo(codigo)
    if "erro" in resultado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=resultado["erro"])
    
    return resultado