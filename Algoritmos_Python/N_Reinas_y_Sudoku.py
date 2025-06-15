
# N Reinas Imperativo
def es_seguro(tablero, fila, col, n):
    for i in range(fila):
        if tablero[i][col] == 1:
            return False
    for i, j in zip(range(fila, -1, -1), range(col, -1, -1)):
        if tablero[i][j] == 1:
            return False
    for i, j in zip(range(fila, -1, -1), range(col, n)):
        if tablero[i][j] == 1:
            return False
    return True

def resolver_n_reinas_imperativo(n):
    tablero = [[0]*n for _ in range(n)]
    soluciones = []

    def backtrack(fila):
        if fila == n:
            soluciones.append([fila[:] for fila in tablero])
            return
        for col in range(n):
            if es_seguro(tablero, fila, col, n):
                tablero[fila][col] = 1
                backtrack(fila + 1)
                tablero[fila][col] = 0

    backtrack(0)
    return soluciones

# N Reinas Funcional
def resolver_n_reinas_funcional(n):
    def es_valido(pos, reina):
        for fila, col in enumerate(pos):
            if col == reina or abs(col - reina) == len(pos) - fila:
                return False
        return True

    def colocar_reinas(k):
        if k == 0:
            return [[]]
        return [sol + [reina] for sol in colocar_reinas(k - 1)
                for reina in range(n) if es_valido(sol, reina)]

    posiciones = colocar_reinas(n)
    return posiciones

# Sudoku (9x9 CSP) Imperativo
def es_valido(tablero, fila, col, num):
    for i in range(9):
        if tablero[fila][i] == num or tablero[i][col] == num:
            return False
    f = fila - fila % 3
    c = col - col % 3
    for i in range(3):
        for j in range(3):
            if tablero[f+i][c+j] == num:
                return False
    return True

def resolver_sudoku_imperativo(tablero):
    for fila in range(9):
        for col in range(9):
            if tablero[fila][col] == 0:
                for num in range(1, 10):
                    if es_valido(tablero, fila, col, num):
                        tablero[fila][col] = num
                        if resolver_sudoku_imperativo(tablero):
                            return True
                        tablero[fila][col] = 0
                return False
    return True

# Sudoku (9x9 CSP) Funcional
from copy import deepcopy
from functools import reduce

def encontrar_vacio(tablero):
    for i in range(9):
        for j in range(9):
            if tablero[i][j] == 0:
                return (i, j)
    return None

def candidatos(tablero, fila, col):
    nums = set(range(1, 10))
    nums -= set(tablero[fila])
    nums -= {tablero[i][col] for i in range(9)}
    nums -= {tablero[i][j] for i in range(fila//3*3, fila//3*3+3)
                        for j in range(col//3*3, col//3*3+3)}
    return nums

def resolver_sudoku_funcional(tablero):
    vacio = encontrar_vacio(tablero)
    if not vacio:
        return tablero
    fila, col = vacio
    for num in candidatos(tablero, fila, col):
        nuevo_tablero = deepcopy(tablero)
        nuevo_tablero[fila][col] = num
        resultado = resolver_sudoku_funcional(nuevo_tablero)
        if resultado:
            return resultado
    return None
