

// ******************************************************
// ***** ALGORITMOS DE N-REINAS Y SUDOKU ****
// ******************************************************

// N Reinas Imperativo
function esSeguro(tablero, fila, col, n) {
    // Verificar la columna
    for (let i = 0; i < fila; i++) {
        if (tablero[i][col] === 1) {
            return false;
        }
    }
    
    // Verificar diagonal izquierda
    for (let i = fila, j = col; i >= 0 && j >= 0; i--, j--) {
        if (tablero[i][j] === 1) {
            return false;
        }
    }
    
    // Verificar diagonal derecha
    for (let i = fila, j = col; i >= 0 && j < n; i--, j++) {
        if (tablero[i][j] === 1) {
            return false;
        }
    }
    
    return true;
}
function resolverNReinasImperativo(n) {
    const tablero = Array.from({ length: n }, () => Array(n).fill(0));
    const soluciones = [];
    function backtrack(fila) {
        if (fila === n) {
            soluciones.push(tablero.map(fila => [...fila]));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (esSeguro(tablero, fila, col, n)) {
                tablero[fila][col] = 1;
                backtrack(fila + 1);
                tablero[fila][col] = 0;
            }
        }
    }
    
    backtrack(0);
    return soluciones;
}
// N Reinas Funcional
function resolverNReinasFuncional(n) {
    function esValido(pos, reina) {
        return pos.every((col, fila) => 
            col !== reina && Math.abs(col - reina) !== pos.length - fila
        );
    }
    
    function colocarReinas(k) {
        if (k === 0) {
            return [[]];
        }
        
        return colocarReinas(k - 1).flatMap(sol => 
            Array.from({ length: n }, (_, reina) => reina)
                .filter(reina => esValido(sol, reina))
                .map(reina => [...sol, reina])
        );
    }
    
    return colocarReinas(n);
}
// Sudoku Imperativo
function esValidoSudoku(tablero, fila, col, num) {
    // Verificar fila
    for (let i = 0; i < 9; i++) {
        if (tablero[fila][i] === num) return false;
    }
    
    // Verificar columna
    for (let i = 0; i < 9; i++) {
        if (tablero[i][col] === num) return false;
    }
    
    // Verificar subcuadrícula 3x3
    const inicioFila = Math.floor(fila / 3) * 3;
    const inicioCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[inicioFila + i][inicioCol + j] === num) return false;
        }
    }
    
    return true;
}
function resolverSudokuImperativo(tablero) {
    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {
            if (tablero[fila][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (esValidoSudoku(tablero, fila, col, num)) {
                        tablero[fila][col] = num;
                        if (resolverSudokuImperativo(tablero)) {
                            return true;
                        }
                        tablero[fila][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
// Sudoku Funcional
function encontrarVacio(tablero) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (tablero[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}
function candidatos(tablero, fila, col) {
    const nums = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // Eliminar números de la fila
    for (let i = 0; i < 9; i++) {
        nums.delete(tablero[fila][i]);
    }
    
    // Eliminar números de la columna
    for (let i = 0; i < 9; i++) {
        nums.delete(tablero[i][col]);
    }
    
    // Eliminar números del cuadrante 3x3
    const inicioFila = Math.floor(fila / 3) * 3;
    const inicioCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            nums.delete(tablero[inicioFila + i][inicioCol + j]);
        }
    }
    
    return Array.from(nums);
}
function resolverSudokuFuncional(tablero) {
    const vacio = encontrarVacio(tablero);
    if (!vacio) return tablero;
    
    const [fila, col] = vacio;
    const posibles = candidatos(tablero, fila, col);
    
    for (const num of posibles) {
        const nuevoTablero = tablero.map(fila => [...fila]);
        nuevoTablero[fila][col] = num;
        const resultado = resolverSudokuFuncional(nuevoTablero);
        if (resultado) return resultado;
    }
    
    return null;
}
// Ejemplo de tablero de Sudoku
const ejemploSudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// ******************************************************
// ************ ALGORITMOS FIBONACCI Y ORDENAMIENTO BURBUJA ************
// ******************************************************

// --- Fibonacci Imperativo ---
function fibonacciImperativoJS(cantidadNumeros) {
    if (cantidadNumeros <= 0) {
        return [];
    } else if (cantidadNumeros === 1) {
        return [0];
    } else {
        const secuencia = [0, 1];
        while (secuencia.length < cantidadNumeros) {
            const siguienteFib = secuencia[secuencia.length - 1] + secuencia[secuencia.length - 2];
            secuencia.push(siguienteFib);
        }
        return secuencia;
    }
}

// --- Fibonacci Funcional ---
function fibonacciFuncionalJS(cantidadNumeros) {
    if (cantidadNumeros <= 0) {
        return [];
    } else if (cantidadNumeros === 1) {
        return [0];
    } else if (cantidadNumeros === 2) {
        return [0, 1];
    } else {
        const prevSecuencia = fibonacciFuncionalJS(cantidadNumeros - 1);
        const siguienteValor = prevSecuencia[prevSecuencia.length - 1] + prevSecuencia[prevSecuencia.length - 2];
        return [...prevSecuencia, siguienteValor]; // Usando spread para inmutabilidad
    }
}

// --- Ordenamiento Burbuja Imperativo ---
function ordenamientoBurbujaImperativoJS(listaOriginal) {
    const arr = [...listaOriginal]; // Trabajar en una copia para no modificar la original pasad por referencia
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Intercambio en JS
            }
        }
    }
    return arr;
}

// --- Ordenamiento Burbuja Funcional ---
function ordenamientoBurbujaFuncionalJS(listaOriginal) {
    // Función auxiliar recursiva para realizar las "pasadas" del burbuja
    function realizarPasada(listaActual, numeroPasada) {
        // Caso base: si ya hemos hecho suficientes pasadas, la lista está ordenada
        if (numeroPasada === listaActual.length - 1) {
            return listaActual;
        }
        
        // Creamos una copia de la lista para evitar mutar la original (inmutabilidad)
        const nuevaLista = [...listaActual];
        let huboIntercambio = false;

        // Recorremos la parte no ordenada de la lista en esta pasada
        for (let i = 0; i < nuevaLista.length - numeroPasada - 1; i++) {
            // Si el elemento actual es mayor que el siguiente, se intercambian en la nueva lista
            if (nuevaLista[i] > nuevaLista[i+1]) {
                [nuevaLista[i], nuevaLista[i+1]] = [nuevaLista[i+1], nuevaLista[i]];
                huboIntercambio = true;
            }
        }
        
        // Optimización: si no hubo intercambios en esta pasada, el array ya está ordenado
        if (!huboIntercambio && numeroPasada > 0) {
             return nuevaLista;
        }

        // Llamada recursiva para la siguiente pasada con la nueva lista
        return realizarPasada(nuevaLista, numeroPasada + 1);
    }

    // Iniciamos el proceso de ordenamiento con una copia de la lista original
    return realizarPasada([...listaOriginal], 0); // Pasamos una copia inicial y comenzamos con la primera pasada
}


// ******************************************************
// ***** GESTIÓN DE LA INTERFAZ DE USUARIO ****
// ******************************************************

// Exportar funciones al objeto global (ajustado para incluir tus algoritmos)
window.algoritmos = {
    // Algoritmos Sergio
    resolverNReinasImperativo,
    resolverNReinasFuncional,
    resolverSudokuImperativo,
    resolverSudokuFuncional,
    // Algoritmos Sebastian
    fibonacciImperativoJS,
    fibonacciFuncionalJS,
    ordenamientoBurbujaImperativoJS,
    ordenamientoBurbujaFuncionalJS,
};

// Variables de estado
let algoritmoActual = 'burbuja'; // Establecer un valor por defecto para que muestre algo al cargar
let paradigmaActual = 'funcional';

// Elementos del DOM
const algoritmoSelect = document.getElementById('algoritmoSelect');
const btnFuncional = document.getElementById('btnFuncional');
const btnImperativo = document.getElementById('btnImperativo');
const codigoEditor = document.getElementById('codigoEditor');
const parametrosExtra = document.getElementById('parametrosExtra');
const btnEjecutar = document.getElementById('btnEjecutar');
const resultadoVisual = document.getElementById('resultadoVisual');

// Códigos de ejemplo para mostrar en el editor (actualizado con tus algoritmos)
const codigos = {
    fibonacci: {
        funcional: `function fibonacciFuncionalJS(cantidadNumeros) {
    if (cantidadNumeros <= 0) {
        return [];
    } else if (cantidadNumeros === 1) {
        return [0];
    } else if (cantidadNumeros === 2) {
        return [0, 1];
    } else {
        const prevSecuencia = fibonacciFuncionalJS(cantidadNumeros - 1);
        const siguienteValor = prevSecuencia[prevSecuencia.length - 1] + prevSecuencia[prevSecuencia.length - 2];
        return [...prevSecuencia, siguienteValor];
    }
}`,
        imperativo: `function fibonacciImperativoJS(cantidadNumeros) {
    if (cantidadNumeros <= 0) {
        return [];
    } else if (cantidadNumeros === 1) {
        return [0];
    } else {
        const secuencia = [0, 1];
        while (secuencia.length < cantidadNumeros) {
            const siguienteFib = secuencia[secuencia.length - 1] + secuencia[secuencia.length - 2];
            secuencia.push(siguienteFib);
        }
        return secuencia;
    }
}`
    },
    burbuja: {
        funcional: `function ordenamientoBurbujaFuncionalJS(listaOriginal) {
    function realizarPasada(listaActual, numeroPasada) {
        if (numeroPasada === listaActual.length - 1) {
            return listaActual;
        }
        
        const nuevaLista = [...listaActual];
        let huboIntercambio = false;

        for (let i = 0; i < nuevaLista.length - numeroPasada - 1; i++) {
            if (nuevaLista[i] > nuevaLista[i+1]) {
                [nuevaLista[i], nuevaLista[i+1]] = [nuevaLista[i+1], nuevaLista[i]];
                huboIntercambio = true;
            }
        }
        
        if (!huboIntercambio && numeroPasada > 0) {
             return nuevaLista;
        }

        return realizarPasada(nuevaLista, numeroPasada + 1);
    }

    return realizarPasada([...listaOriginal], 0);
}`,
        imperativo: `function ordenamientoBurbujaImperativoJS(listaOriginal) {
    const arr = [...listaOriginal]; // Trabajar en una copia para no modificar la original
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
    },
    nreinas: {
        funcional: `function resolverNReinasFuncional(n) {
    function esValido(pos, reina) {
        return pos.every((col, fila) => 
            col !== reina && Math.abs(col - reina) !== pos.length - fila
        );
    }
    
    function colocarReinas(k) {
        if (k === 0) return [[]];
        return colocarReinas(k - 1).flatMap(sol => 
            Array.from({ length: n }, (_, reina) => reina)
                .filter(reina => esValido(sol, reina))
                .map(reina => [...sol, reina])
        );
    }
    
    return colocarReinas(n);
}`,
        imperativo: `function resolverNReinasImperativo(n) {
    const tablero = Array(n).fill().map(() => Array(n).fill(0));
    const soluciones = [];
    
    function esSeguro(fila, col) {
        // Verificar columna
        for (let i = 0; i < fila; i++) {
            if (tablero[i][col] === 1) return false;
        }
        
        // Verificar diagonales
        for (let i = fila, j = col; i >= 0 && j >= 0; i--, j--) {
            if (tablero[i][j] === 1) return false;
        }
        
        for (let i = fila, j = col; i >= 0 && j < n; i--, j++) {
            if (tablero[i][j] === 1) return false;
        }
        
        return true;
    }
    
    function backtrack(fila) {
        if (fila === n) {
            soluciones.push(tablero.map(fila => [...fila]));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (esSeguro(fila, col)) {
                tablero[fila][col] = 1;
                backtrack(fila + 1);
                tablero[fila][col] = 0;
            }
        }
    }
    
    backtrack(0);
    return soluciones;
}`
    },
    sudoku: { 
        funcional: `function resolverSudokuFuncional(tablero) {
    function encontrarVacio() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (tablero[i][j] === 0) return [i, j];
            }
        }
        return null;
    }
    
    function candidatos(fila, col) {
        const nums = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // Eliminar números existentes
        for (let i = 0; i < 9; i++) {
            nums.delete(tablero[fila][i]);
            nums.delete(tablero[i][col]);
        }
        
        // Eliminar números del cuadrante
        const inicioFila = Math.floor(fila / 3) * 3;
        const inicioCol = Math.floor(col / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                nums.delete(tablero[inicioFila + i][inicioCol + j]);
            }
        }
        
        return Array.from(nums);
    }
    
    const vacio = encontrarVacio();
    if (!vacio) return tablero;
    const [fila, col] = vacio;
    const posibles = candidatos(fila, col);
    for (const num of posibles) {
        const nuevoTablero = tablero.map(fila => [...fila]);
        nuevoTablero[fila][col] = num;
        const resultado = resolverSudokuFuncional(nuevoTablero);
        if (resultado) return resultado;
    }
    
    return null;
}`,
        imperativo: `function resolverSudokuImperativo(tablero) {
    function esValido(fila, col, num) {
        // Verificar fila y columna
        for (let i = 0; i < 9; i++) {
            if (tablero[fila][i] === num || tablero[i][col] === num) {
                return false;
            }
        }
        
        // Verificar subcuadrícula 3x3
        const inicioFila = Math.floor(fila / 3) * 3;
        const inicioCol = Math.floor(col / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[inicioFila + i][inicioCol + j] === num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {
            if (tablero[fila][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (esValido(fila, col, num)) {
                        tablero[fila][col] = num;
                        if (resolverSudokuImperativo(tablero)) {
                            return true;
                        }
                        tablero[fila][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}`
    }
};



// Inicializar la aplicación
function inicializar() {
    // Configurar eventos
    algoritmoSelect.addEventListener('change', cambiarAlgoritmo);
    btnFuncional.addEventListener('click', () => cambiarParadigma('funcional'));
    btnImperativo.addEventListener('click', () => cambiarParadigma('imperativo'));
    btnEjecutar.addEventListener('click', ejecutarAlgoritmo);
    
    // Mostrar el estado inicial
    cambiarAlgoritmo();
}
// Cambiar el algoritmo seleccionado
function cambiarAlgoritmo() {
    algoritmoActual = algoritmoSelect.value;
    actualizarInterfaz();
}
// Cambiar el paradigma seleccionado
function cambiarParadigma(paradigma) {
    paradigmaActual = paradigma;
    actualizarInterfaz();
    // Actualizar estilos de botones
    if (paradigma === 'funcional') {
        btnFuncional.classList.remove('btn-secondary');
        btnFuncional.classList.add('btn-primary');
        btnImperativo.classList.remove('btn-primary');
        btnImperativo.classList.add('btn-secondary');
    } else {
        btnFuncional.classList.remove('btn-primary');
        btnFuncional.classList.add('btn-secondary');
        btnImperativo.classList.remove('btn-secondary');
        btnImperativo.classList.add('btn-primary');
    }
}
// Actualizar la interfaz según el algoritmo y paradigma seleccionados
function actualizarInterfaz() {
    // Mostrar el código correspondiente
    codigoEditor.value = codigos[algoritmoActual][paradigmaActual];
    // Actualizar parámetros extra
    parametrosExtra.innerHTML = '';

    if (algoritmoActual === 'nreinas') {
        const div = document.createElement('div');
        div.className = 'mb-3';
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = 'Tamaño del tablero (N):';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-control';
        input.id = 'inputN';
        input.value = '4';
        input.min = '1';
        input.max = '10';
        
        div.appendChild(label);
        div.appendChild(input);
        parametrosExtra.appendChild(div);
    } else if (algoritmoActual === 'sudoku') {
        const div = document.createElement('div');
        div.className = 'mb-3';
        
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = 'Tablero de Sudoku:';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'form-control';
        textarea.id = 'inputSudoku';
        textarea.rows = '9';
        textarea.placeholder = 'Ingresa el tablero (0 para casillas vacías)';
        // Ejemplo de tablero
        const ejemplo = ejemploSudoku.map(fila => fila.join(' ')).join('\n');
        textarea.value = ejemplo;
        
        div.appendChild(label);
        div.appendChild(textarea);
        parametrosExtra.appendChild(div);

    } else if (algoritmoActual === 'fibonacci') { // Lógica para Fibonacci
        const div = document.createElement('div');
        div.className = 'mb-3';
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = 'Cantidad de números de Fibonacci:';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-control';
        input.id = 'inputFibonacciCount';
        input.value = '10'; // Valor por defecto
        input.min = '1';
        input.max = '50'; // Límite para no sobrecargar
        
        div.appendChild(label);
        div.appendChild(input);
        parametrosExtra.appendChild(div);

    } else if (algoritmoActual === 'burbuja') { // Lógica para Ordenamiento Burbuja
        const div = document.createElement('div');
        div.className = 'mb-3';
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = 'Elementos del Array (separados por comas):';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = 'inputBurbujaArray';
        input.value = '64, 34, 25, 12, 22, 11, 90'; // Ejemplo por defecto
        input.placeholder = 'Ej: 5, 1, 4, 2, 8';

        const divSpeed = document.createElement('div');
        divSpeed.className = 'mt-3';
        const labelSpeed = document.createElement('label');
        labelSpeed.className = 'form-label';
        labelSpeed.textContent = 'Velocidad de Animación (ms):';
        const inputSpeed = document.createElement('input');
        inputSpeed.type = 'number';
        inputSpeed.className = 'form-control';
        inputSpeed.id = 'inputBurbujaSpeed';
        inputSpeed.value = '100';
        inputSpeed.min = '10';
        inputSpeed.max = '1000';

        div.appendChild(label);
        div.appendChild(input);
        divSpeed.appendChild(labelSpeed);
        divSpeed.appendChild(inputSpeed);
        parametrosExtra.appendChild(div);
        parametrosExtra.appendChild(divSpeed);
    }
}
// Ejecutar el algoritmo seleccionado
function ejecutarAlgoritmo() {
    resultadoVisual.innerHTML = '<div class="text-center my-4"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></div>';
    // Usar setTimeout para permitir que se muestre el spinner
    setTimeout(() => {
        try {
            if (algoritmoActual === 'nreinas') {
                ejecutarNReinas();
            } else if (algoritmoActual === 'sudoku') {
                ejecutarSudoku();
            } else if (algoritmoActual === 'fibonacci') { // Lógica para ejecutar Fibonacci
                ejecutarFibonacci();
            } else if (algoritmoActual === 'burbuja') { // Lógica para ejecutar Burbuja
                ejecutarBurbuja();
            }
        } catch (error) {
            resultadoVisual.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        }
    }, 100);
}
// Ejecutar el algoritmo de N Reinas
function ejecutarNReinas() {
    const n = parseInt(document.getElementById('inputN').value);
    if (isNaN(n) || n < 1 || n > 10) {
        resultadoVisual.innerHTML = '<div class="alert alert-danger">Por favor ingresa un valor válido para N (1-10)</div>';
        return;
    }
    
    let soluciones;
    if (paradigmaActual === 'funcional') {
        soluciones = resolverNReinasFuncional(n);
        // Convertir el formato funcional al mismo que el imperativo para visualización
        soluciones = soluciones.map(sol => {
            const tablero = Array.from({ length: n }, () => Array(n).fill(0));
            sol.forEach((col, fila) => tablero[fila][col] = 1);
            return tablero;
        });
    } else {
        soluciones = resolverNReinasImperativo(n);
    }
    
    mostrarResultadoNReinas(soluciones, n);
}
// Mostrar el resultado de N Reinas
function mostrarResultadoNReinas(soluciones, n) {
    if (soluciones.length === 0) {
        resultadoVisual.innerHTML = `<div class="alert alert-info">No se encontraron soluciones para N = ${n}</div>`;
        return;
    }
    
    let html = `<h4 class="text-center mb-4">Soluciones para N = ${n} (${soluciones.length} encontradas)</h4>`;
    soluciones.forEach((sol, idx) => {
        html += `<div class="solucion"><h5>Solución ${idx + 1}</h5>`;
        html += `<div class="tablero-nreinas" style="grid-template-columns: repeat(${n}, 1fr);">`;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const clase = (i + j) % 2 === 0 ? 'bg-light' : 'bg-white';
                const reina = sol[i][j] === 1 ? ' ♛ ' : '';
                html += `<div class="${clase} border">${reina}</div>`;
            }
        }
        
        html += '</div></div>';
    });
    resultadoVisual.innerHTML = html;
}
// Ejecutar el algoritmo de Sudoku
function ejecutarSudoku() {
    const input = document.getElementById('inputSudoku').value.trim();
    const lineas = input.split('\n');
    
    if (lineas.length !== 9) {
        resultadoVisual.innerHTML = '<div class="alert alert-danger">El tablero debe tener exactamente 9 filas</div>';
        return;
    }
    
    const tablero = [];
    for (const linea of lineas) {
        const numeros = linea.trim().split(/\s+/).map(Number);
        if (numeros.length !== 9 || numeros.some(n => isNaN(n) || numeros.some(n => n < 0 || n > 9))) {
            resultadoVisual.innerHTML = '<div class="alert alert-danger">Cada fila debe contener 9 números entre 0 y 9 (0 para casillas vacías)</div>';
            return;
        }
        tablero.push(numeros);
    }
    
    let solucion;
    if (paradigmaActual === 'funcional') {
        solucion = resolverSudokuFuncional(tablero);
    } else {
        // Hacer una copia profunda para el enfoque imperativo
        const copiaTablero = tablero.map(fila => [...fila]);
        const exito = resolverSudokuImperativo(copiaTablero);
        solucion = exito ? copiaTablero : null;
    }
    
    mostrarResultadoSudoku(tablero, solucion);
}
// Mostrar el resultado de Sudoku
function mostrarResultadoSudoku(tableroOriginal, tableroSolucion) {
    let html = '<h4 class="text-center mb-4">Solución del Sudoku</h4>';
    // Mostrar tablero original
    html += '<h5>Tablero original</h5>';
    html += '<div class="tablero-sudoku mb-4">';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = tableroOriginal[i][j];
            const clase = num === 0 ? 'bg-light text-muted' : 'bg-white';
            html += `<div class="${clase}">${num === 0 ? '' : num}</div>`;
        }
    }
    html += '</div>';
    // Mostrar solución o mensaje de error
    if (tableroSolucion) {
        html += '<h5>Tablero resuelto</h5>';
        html += '<div class="tablero-sudoku">';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = tableroSolucion[i][j];
                const original = tableroOriginal[i][j] !== 0;
                const clase = original ? 'bg-white fw-bold' : 'bg-light';
                html += `<div class="${clase}">${num}</div>`;
            }
        }
        html += '</div>';
    } else {
        html += '<div class="alert alert-danger">No se encontró solución para este tablero</div>';
    }
    
    resultadoVisual.innerHTML = html;
}



// Ejecutar el algoritmo de Fibonacci
function ejecutarFibonacci() {
    const inputElement = document.getElementById('inputFibonacciCount');
    const cantidadNumeros = parseInt(inputElement.value);

    if (isNaN(cantidadNumeros) || cantidadNumeros < 1 || cantidadNumeros > 50) {
        resultadoVisual.innerHTML = '<div class="alert alert-danger">Por favor, ingrese un número válido entre 1 y 50 para Fibonacci.</div>';
        return;
    }

    let secuencia;
    if (paradigmaActual === 'funcional') {
        secuencia = window.algoritmos.fibonacciFuncionalJS(cantidadNumeros);
    } else {
        secuencia = window.algoritmos.fibonacciImperativoJS(cantidadNumeros);
    }
    mostrarResultadoFibonacci(secuencia);
}

// Mostrar el resultado de Fibonacci
function mostrarResultadoFibonacci(secuencia) {
    let html = `<h4 class="text-center mb-4">Secuencia de Fibonacci (${secuencia.length} números)</h4>`;
    html += '<div class="fibonacci-output-container">'; // Contenedor para los números de fibonacci
    
    if (secuencia.length === 0) {
        html += '<div class="alert alert-info">No se generaron números de Fibonacci.</div>';
    } else {
        secuencia.forEach((num, index) => {
            // Añadir un pequeño retraso para la animación escalonada
            html += `<span class="fib-number-visual" style="animation-delay: ${index * 0.05}s;">${num}</span>`;
        });
    }
    html += '</div>';
    resultadoVisual.innerHTML = html;
}

// Ejecutar el algoritmo de Ordenamiento Burbuja
async function ejecutarBurbuja() {
    const input = document.getElementById('inputBurbujaArray').value.trim();
    let listaOriginal = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (listaOriginal.length === 0) {
        resultadoVisual.innerHTML = '<div class="alert alert-danger">Por favor, ingrese números válidos para el array de burbuja.</div>';
        return;
    }

    // Límite de elementos para la visualización animada para no saturar
    if (listaOriginal.length > 50) {
        resultadoVisual.innerHTML = '<div class="alert alert-danger">Por favor, ingrese un array con 50 elementos o menos para una visualización óptima.</div>';
        return;
    }

    const velocidad = parseInt(document.getElementById('inputBurbujaSpeed').value) || 100;

    resultadoVisual.innerHTML = ''; // Limpiar antes de la visualización dinámica
    await mostrarResultadoBurbuja(listaOriginal, velocidad);
}


// Mostrar el resultado de Ordenamiento Burbuja (con animación)
async function mostrarResultadoBurbuja(listaInicial, velocidadAnimacion) {
    let html = `<h4 class="text-center mb-4">Ordenamiento Burbuja</h4>`;
    html += `<h5>Array original: [${listaInicial.join(', ')}]</h5>`;
    html += `<div id="burbuja-array-container" class="burbuja-array-container"></div>`;
    resultadoVisual.innerHTML = html;

    const container = document.getElementById('burbuja-array-container');
    let arr = [...listaInicial]; // Trabajar con una copia mutable para la animación

    function renderizarBarras(currentArr, comparingIdx = [], swappingIdx = [], sortedIdx = []) {
        container.innerHTML = '';
        currentArr.forEach((value, index) => {
            const barWrapper = document.createElement('div');
            barWrapper.className = 'bar-wrapper';
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'bar-value';
            valueSpan.textContent = value;

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value * 1.5}px`; 

            if (comparingIdx.includes(index)) {
                barWrapper.classList.add('comparing');
            }
            if (swappingIdx.includes(index)) {
                barWrapper.classList.add('swapping');
            }
            if (sortedIdx.includes(index)) {
                barWrapper.classList.add('sorted');
            }

            barWrapper.appendChild(valueSpan);
            barWrapper.appendChild(bar);
            container.appendChild(barWrapper);
        });
    }

    // Renderizar estado inicial
    renderizarBarras(arr);
    await new Promise(resolve => setTimeout(resolve, velocidadAnimacion));

    // Si es funcional, ejecutamos el algoritmo y luego visualizamos el resultado final.
    // El ordenamiento burbuja funcional no es apto para visualización paso a paso con mutaciones de DOM.
    if (paradigmaActual === 'funcional') {
        const listaFinal = window.algoritmos.ordenamientoBurbujaFuncionalJS(listaInicial);
        // Simplemente mostramos el resultado final ya ordenado.
        renderizarBarras(listaFinal, [], [], Array.from({length: listaFinal.length}, (_, i) => i));
        resultadoVisual.innerHTML += `<h5 class="mt-3">Array ordenado (Funcional): [${listaFinal.join(', ')}]</h5>`;
        return;
    }

    // Lógica para el burbuja imperativo con animación paso a paso
    const n = arr.length;
    let sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Marcar comparando
            renderizarBarras(arr, [j, j + 1], [], sortedIndices);
            await new Promise(resolve => setTimeout(resolve, velocidadAnimacion));

            if (arr[j] > arr[j + 1]) {
                // Marcar intercambiando
                renderizarBarras(arr, [], [j, j + 1], sortedIndices);
                await new Promise(resolve => setTimeout(resolve, velocidadAnimacion));

                // Realizar el intercambio en el array
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Renderizar después del intercambio
                renderizarBarras(arr, [], [j, j + 1], sortedIndices);
                await new Promise(resolve => setTimeout(resolve, velocidadAnimacion));
            }
        }
        // Marcar el último elemento de esta pasada como ordenado
        sortedIndices.push(n - 1 - i);
        renderizarBarras(arr, [], [], sortedIndices);
        await new Promise(resolve => setTimeout(resolve, velocidadAnimacion));
    }
    // Marcar el primer elemento también como ordenado al final
    sortedIndices.push(0);
    renderizarBarras(arr, [], [], sortedIndices);
    resultadoVisual.innerHTML += `<h5 class="mt-3">Array ordenado (Imperativo): [${arr.join(', ')}]</h5>`;
}


// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);