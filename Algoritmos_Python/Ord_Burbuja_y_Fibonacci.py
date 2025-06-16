# Ord_Burbuja_y_Fibonacci.py

# --- Fibonacci Imperativo ---
def fibonacci_imperativo(cantidad_numeros):
    """
    Genera los primeros 'cantidad_numeros' de la secuencia de Fibonacci
    de manera imperativa.
    """
    if cantidad_numeros <= 0:
        return []
    elif cantidad_numeros == 1:
        return [0]
    else:
        # Inicializamos la secuencia con los dos primeros números
        secuencia = [0, 1]
        # Generamos los números restantes hasta alcanzar la cantidad deseada
        while len(secuencia) < cantidad_numeros:
            siguiente_fib = secuencia[-1] + secuencia[-2]
            secuencia.append(siguiente_fib)
        return secuencia

# --- Fibonacci Funcional ---
def fibonacci_funcional(cantidad_numeros):
    """
    Genera los primeros 'cantidad_numeros' de la secuencia de Fibonacci
    de manera funcional (usando recursión).
    """
    if cantidad_numeros <= 0:
        return []
    elif cantidad_numeros == 1:
        return [0]
    elif cantidad_numeros == 2:
        return [0, 1]
    else:
        # Llamada recursiva para obtener los primeros n-1 números
        # y luego calculamos el siguiente valor
        prev_secuencia = fibonacci_funcional(cantidad_numeros - 1)
        siguiente_valor = prev_secuencia[-1] + prev_secuencia[-2]
        # Concatenamos el nuevo valor a la secuencia previa (inmutabilidad)
        return prev_secuencia + [siguiente_valor]


#***************************************************************************

# --- Ordenamiento Burbuja Imperativo ---
def ordenamiento_burbuja_imperativo(lista_original):
    """
    Ordena una lista de números usando el algoritmo de ordenamiento burbuja
    de manera imperativa. Modifica la lista original.
    """
    n = len(lista_original)
    # Recorrer todos los elementos del array para las pasadas
    for i in range(n - 1):
        # Los últimos 'i' elementos ya están en su lugar correcto (ordenados)
        for j in range(0, n - i - 1):
            # Recorrer el array de 0 hasta el último elemento no ordenado
            # Si el elemento actual es mayor que el siguiente, se intercambian
            if lista_original[j] > lista_original[j + 1]:
                lista_original[j], lista_original[j + 1] = lista_original[j + 1], lista_original[j]
    return lista_original # Retornamos la misma lista modificada


# --- Ordenamiento Burbuja Funcional ---
def ordenamiento_burbuja_funcional(lista_original):
    """
    Ordena una lista de números usando el algoritmo de ordenamiento burbuja
    de manera funcional. No modifica la lista original, devuelve una nueva.
    """
    # Función auxiliar recursiva para realizar las "pasadas" del burbuja
    def realizar_pasada(lista_actual, numero_pasada):
        # Caso base: si ya hemos hecho suficientes pasadas, la lista está ordenada
        if numero_pasada == len(lista_actual) - 1:
            return lista_actual
        
        # Creamos una copia de la lista para evitar mutar la original (inmutabilidad)
        nueva_lista = list(lista_actual)
        hubo_intercambio = False

        # Recorremos la parte no ordenada de la lista en esta pasada
        for i in range(len(nueva_lista) - numero_pasada - 1):
            # Si el elemento actual es mayor que el siguiente, se intercambian en la nueva lista
            if nueva_lista[i] > nueva_lista[i+1]:
                nueva_lista[i], nueva_lista[i+1] = nueva_lista[i+1], nueva_lista[i]
                hubo_intercambio = True
        
        # Optimización: si no hubo intercambios en esta pasada, el array ya está ordenado
        # (y no es la primera pasada, que podría no tener intercambios si la lista ya está ordenada)
        if not hubo_intercambio and numero_pasada > 0:
             return nueva_lista

        # Llamada recursiva para la siguiente pasada con la nueva lista
        return realizar_pasada(nueva_lista, numero_pasada + 1)

    # Iniciamos el proceso de ordenamiento con una copia de la lista original
    # y la primera pasada (numero_pasada = 0)
    return realizar_pasada(list(lista_original), 0)