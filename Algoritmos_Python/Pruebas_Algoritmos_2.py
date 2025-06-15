
# Importamos el archivo que contiene nuestros algoritmos
import N_Reinas_y_Sudoku as algos
from pprint import pprint  # Para imprimir estructuras legibles como matrices

def probar_n_reinas():
    print("====== N REINAS ======")
    n = 4
    print(f"\n[Imperativo] Soluciones para N = {n}")
    soluciones_imp = algos.resolver_n_reinas_imperativo(n)
    for sol in soluciones_imp:
            for fila in sol:
                print(fila)
            print()

    print(f"\n[Funcional] Soluciones para N = {n}")
    soluciones_func = algos.resolver_n_reinas_funcional(n)
    for sol in soluciones_func:
        pprint(sol)
        print()

def probar_sudoku():
    print("====== SUDOKU ======")
    tablero_original = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]

    print("\n[Imperativo] Solución:")
    tablero_imp = [fila[:] for fila in tablero_original]  # Copia profunda básica
    if algos.resolver_sudoku_imperativo(tablero_imp):
        for fila in tablero_imp:
            print(fila)
    else:
        print("No hay solución.")

    print("\n[Funcional] Solución:")
    tablero_func = algos.resolver_sudoku_funcional(tablero_original)
    if tablero_func:
        for fila in tablero_func:
            print(fila)
    else:
        print("No hay solución.")

if __name__ == "__main__":
    probar_n_reinas()
    probar_sudoku()
