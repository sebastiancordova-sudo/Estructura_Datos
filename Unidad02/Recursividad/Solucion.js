


/**
 * TALLER  deRECURSIVIDAD 
 */

// SECCIÓN 1 
class CalculadoraRecursiva {
    static sumaDigitos(n) {
        if (n < 10) return n;
        return (n % 10) + this.sumaDigitos(Math.floor(n / 10));
    }
    static potencia(base, exp) {
        if (exp === 0) return 1;
        return base * this.potencia(base, exp - 1);
    }
}

// SECCIÓN 2 
class GestorArreglos {
    static invertirArreglo(arr, inicio, fin) {
        if (inicio >= fin) return arr;
        [arr[inicio], arr[fin]] = [arr[fin], arr[inicio]];
        return this.invertirArreglo(arr, inicio + 1, fin - 1);
    }
    static busquedaBinaria(arr, obj, bajo, alto) {
        if (bajo > alto) return -1;
        let medio = Math.floor((bajo + alto) / 2);
        if (arr[medio] === obj) return medio;
        return arr[medio] > obj ? this.busquedaBinaria(arr, obj, bajo, medio - 1) : this.busquedaBinaria(arr, obj, medio + 1, alto);
    }
}

// SECCIÓN 3 
class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}
class GestorArboles {
    static preorden(nodo) {
        if (!nodo) return [];
        return [nodo.valor, ...this.preorden(nodo.izquierdo), ...this.preorden(nodo.derecho)];
    }
}

// SECCIÓN 4.3 
class Optimizador {
    static factorial(n, acc = 1) {
        if (n <= 1) return acc;
        return this.factorial(n - 1, n * acc);
    }
}

// SECCIÓN 4.1

function dibujarArbolFibonacci(n, prefijo = "", esDerecho = false) {
    console.log(prefijo + (esDerecho ? "└── " : "┌── ") + `fib(${n})`);

    if (n > 1) {
        prefijo += (esDerecho ? "    " : "│   ");
        dibujarArbolFibonacci(n - 1, prefijo, false);
        dibujarArbolFibonacci(n - 2, prefijo, true);
    }
}

console.log("Árbol de llamadas para fib(4):");
dibujarArbolFibonacci(4);

// PRUEBAS

console.log("--- RESULTADOS DEL TALLER ---");

// Sección 1
console.log("Suma de dígitos (123):", CalculadoraRecursiva.sumaDigitos(123));
console.log("Potencia (2^3):", CalculadoraRecursiva.potencia(2, 3));

// Sección 2
let miArreglo = [1, 2, 3, 4];
console.log("Arreglo invertido:", GestorArreglos.invertirArreglo(miArreglo, 0, 3));
console.log("Búsqueda Binaria (buscar 3):", GestorArreglos.busquedaBinaria([1, 2, 3, 4], 3, 0, 3));

// Sección 3 (Árbol)
let raiz = new NodoArbol(10);
raiz.izquierdo = new NodoArbol(5);
raiz.derecho = new NodoArbol(15);
console.log("Recorrido Preorden del Árbol:", GestorArboles.preorden(raiz));

// Sección 4.3
console.log("Factorial con recursividad de cola (5!):", Optimizador.factorial(5));

console.assert(CalculadoraRecursiva.sumaDigitos(123) === 6, "Error en 1.1");
console.assert(Optimizador.factorial(5) === 120, "Error en 4.3");
console.log("¡Todos los ejercicios superados!");