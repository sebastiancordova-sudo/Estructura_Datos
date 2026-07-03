import Nodo from "./Nodo.js";

class ArbolBusqueda {
    constructor() {
        this.raiz = null;
    }

    insertar(keyword) {
        this.raiz = this._insertarRec(this.raiz, keyword);
    }

    _insertarRec(nodo, keyword) {
        if (nodo === null) {
            return new Nodo(keyword);
        }

        // TAREA DEL ESTUDIANTE: Implementar comparación alfabética (localeCompare).
        // Si el 'keyword' ya existe, incremente el contador 'visitas' en 1.

        const comparacion = keyword.localeCompare(nodo.keyword);

        if (comparacion < 0) {
            nodo.izquierda = this._insertarRec(nodo.izquierda, keyword);
        } else if (comparacion > 0) {
            nodo.derecha = this._insertarRec(nodo.derecha, keyword);
        } else {
            nodo.visitas++;
        }

        return nodo;
    }

    // Buscar una palabra clave en el historial (O(log n) esperado)
    buscar(keyword) {
        let actual = this.raiz;

        while (actual !== null) {
            const comparacion = keyword.localeCompare(actual.keyword);

            if (comparacion === 0) {
                return actual;
            } else if (comparacion < 0) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }

        return null;
    }
}

export default ArbolBusqueda;