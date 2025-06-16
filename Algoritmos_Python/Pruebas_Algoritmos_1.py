# pruebas_algoritmos_1.py

# Importamos el archivo que contiene nuestros algoritmos
import Ord_Burbuja_y_Fibonacci as algos

def probar_fibonacci():
    
    print("--- Secuencia de Fibonacci ---")

    # Prueba Imperativa
    cantidad_fib = 10
    print(f"\n[Imperativo] Los primeros {cantidad_fib} números de Fibonacci:")
    print(algos.fibonacci_imperativo(cantidad_fib))

    # Prueba Funcional
    cantidad_fib = 8
    print(f"\n[Funcional] Los primeros {cantidad_fib} números de Fibonacci:")
    print(algos.fibonacci_funcional(cantidad_fib))


#****************************************************************************


def probar_ordenamiento_burbuja():
    """Prueba las implementaciones de Ordenamiento Burbuja."""
    print("\n--- Ordenamiento Burbuja ---")

    # Prueba Imperativa con lista fija
    lista_fija_imperativa = [64, 34, 25, 12, 22, 11, 90]
    print(f"\n[Imperativo] Lista original: {lista_fija_imperativa}")
    # La función modifica la lista in-place, así que la imprimimos después de la llamada
    algos.ordenamiento_burbuja_imperativo(lista_fija_imperativa)
    print(f"[Imperativo] Lista ordenada: {lista_fija_imperativa}")

    # Prueba Funcional con lista fija
    lista_fija_funcional = [5, 1, 4, 2, 8, 0, 3]
    print(f"\n[Funcional] Lista original: {lista_fija_funcional}")
    # La función funcional devuelve una NUEVA lista ordenada
    lista_ordenada_funcional = algos.ordenamiento_burbuja_funcional(lista_fija_funcional)
    print(f"[Funcional] Lista ordenada: {lista_ordenada_funcional}")
    # Comprobamos que la lista original no ha sido modificada
    print(f"[Funcional] Lista original (sin modificar): {lista_fija_funcional}")
  
if __name__ == "__main__":
    probar_fibonacci()
    print("\n" + "="*50 + "\n") # Separador visual
    probar_ordenamiento_burbuja()