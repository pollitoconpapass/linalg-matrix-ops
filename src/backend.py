import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logic.matrix_operations import matrix_multiplication, svd_decomposition


app = FastAPI()

origins = [
    "http://localhost:9000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/matrix/multiply")
def matrix_multiply(data: dict):
    matrix_1 = data["matrix1"]
    matrix_2 = data["matrix2"]

    return {"result": matrix_multiplication(matrix_1, matrix_2)}

@app.post("/matrix/factorization")
def matrix_factorization(data: dict):
    matrix = data["matrix"]
    U, S, VT = svd_decomposition(matrix)

    return {"U": U, "S": S, "VT": VT}


if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)