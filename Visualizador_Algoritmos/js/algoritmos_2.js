
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

// Exportar funciones al objeto global
window.algoritmos = {
    resolverNReinasImperativo,
    resolverNReinasFuncional,
    resolverSudokuImperativo,
    resolverSudokuFuncional,
};

// Variables de estado
let algoritmoActual = 'nreinas';
let paradigmaActual = 'funcional';

// Elementos del DOM
const algoritmoSelect = document.getElementById('algoritmoSelect');
const btnFuncional = document.getElementById('btnFuncional');
const btnImperativo = document.getElementById('btnImperativo');
const codigoEditor = document.getElementById('codigoEditor');
const parametrosExtra = document.getElementById('parametrosExtra');
const btnEjecutar = document.getElementById('btnEjecutar');
const resultadoVisual = document.getElementById('resultadoVisual');

// Códigos de ejemplo para mostrar en el editor
const codigos = {
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
                const reina = sol[i][j] === 1 ? '♛' : '';
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

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
