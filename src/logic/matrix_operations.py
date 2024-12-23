import math

# === MATRIX MULTIPLICATION ===
def matrix_multiplication(matrix_1, matrix_2):
    if (len(matrix_1[0]) != len(matrix_2)): 
        print("Matrix are not compatible for multiplication")
        return None
    
    result_rows = len(matrix_1) 
    result_columns = len(matrix_2[0])

    result = [[0 for _ in range(result_columns)] for _ in range(result_rows)] 

    for i in range(result_rows):
        for j in range(result_columns):
            for k in range(len(matrix_2)):
                result[i][j] += matrix_1[i][k] * matrix_2[k][j] 

    return result


# === MATRIX FACTORIZATION ===
def matrix_transpose(matrix):
    return list(map(list, zip(*matrix)))

def dot_product(vec1, vec2):
    return sum(x * y for x, y in zip(vec1, vec2))

def matrix_multiply(a, b):
    B_T = matrix_transpose(b)
    return [[dot_product(row, col) for col in B_T] for row in a]

def norm(vec):
    return math.sqrt(sum(x * x for x in vec))

def normalize(vec):
    n = norm(vec)
    return [x / n for x in vec]

def gram_schmidt(matrix):
    orthogonal = []

    for vec in matrix:
        for basis in orthogonal:
            proj = dot_product(vec, basis)
            vec = [x - proj * b for x, b in zip(vec, basis)]

        orthogonal.append(normalize(vec))

    return orthogonal

def svd_decomposition(matrix): # -> the real decomposition process (Singular Value Decomposition)
    # Step 1: Compute A^T * A
    A_T = matrix_transpose(matrix)
    ATA = matrix_multiply(A_T, matrix)

    # Step 2: Compute egenvalues and eigenvectors of A^T * A
    eigenvalues = [ATA[i][i] for i in range(len(ATA))]
    eigenvectors = gram_schmidt(A_T)

    # Step 3: Compute singular values (square root of eigenvalues)
    singular_values = [math.sqrt(ev) for ev in eigenvalues]

    # Step 4: Compute U and V^T
    U = gram_schmidt(matrix)
    VT = matrix_transpose(eigenvectors)

    # Step 5: Construct Sigma Matrix
    sigma = [[0] * len(matrix[0]) for _ in range(len(matrix))]
    for i in range(min(len(matrix), len(matrix[0]))):
        sigma[i][i] = singular_values[i]

    return U, sigma, VT
