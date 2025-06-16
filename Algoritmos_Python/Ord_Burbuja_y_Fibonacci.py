# Ord_Burbuja_y_Fibonacci.py

# --- Fibonacci Imperativo ---
def fibonacci_imperativo(cantidad_numeros):
    if cantidad_numeros <= 0:
        return []
    elif cantidad_numeros == 1:
        return [0]
    else:
        secuencia = [0, 1]
        while len(secuencia) < cantidad_numeros:
            siguiente_fib = secuencia[-1] + secuencia[-2]
            secuencia.append(siguiente_fib)
        return secuencia

# --- Fibonacci Funcional ---
def fibonacci_funcional(cantidad_numeros):
    if cantidad_numeros <= 0:
        return []
    elif cantidad_numeros == 1:
        return [0]
    elif cantidad_numeros == 2:
        return [0, 1]
    else:
        prev_secuencia = fibonacci_funcional(cantidad_numeros - 1)
        siguiente_valor = prev_secuencia[-1] + prev_secuencia[-2]
        return prev_secuencia + [siguiente_valor]


#***************************************************************************

# --- Ordenamiento Burbuja Imperativo ---
def ordenamiento_burbuja_imperativo(lista_original):
    n = len(lista_original)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if lista_original[j] > lista_original[j + 1]:
                lista_original[j], lista_original[j + 1] = lista_original[j + 1], lista_original[j]
    return lista_original 


# --- Ordenamiento Burbuja Funcional ---
def ordenamiento_burbuja_funcional(lista_original):
    def realizar_pasada(lista_actual, numero_pasada):
        if numero_pasada == len(lista_actual) - 1:
            return lista_actual
        nueva_lista = list(lista_actual)
        hubo_intercambio = False

        for i in range(len(nueva_lista) - numero_pasada - 1):
            if nueva_lista[i] > nueva_lista[i+1]:
                nueva_lista[i], nueva_lista[i+1] = nueva_lista[i+1], nueva_lista[i]
                hubo_intercambio = True
        if not hubo_intercambio and numero_pasada > 0:
             return nueva_lista
        return realizar_pasada(nueva_lista, numero_pasada + 1)
    return realizar_pasada(list(lista_original), 0)