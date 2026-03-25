from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .infra.routers import asset as rotas_asset


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.api_route("/ping", methods=["GET", "HEAD"])
def ping():
    return {"status": "alive"}


app.include_router(rotas_asset.router)
