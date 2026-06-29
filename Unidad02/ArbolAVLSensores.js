// ============================================================
// Estructura del Nodo AVL para el registro energético
// ============================================================
class NodoAVL {
    constructor(idSensor, lectura) {
        this.idSensor  = idSensor;
        this.lectura   = lectura;
        this.altura    = 1;       // nodo hoja = altura 1
        this.izquierdo = null;
        this.derecho   = null;
    }
}

// ============================================================
// TDA Árbol AVL para sensores de la Smart Grid
// ============================================================
class ArbolAVLSensores {
    constructor() {
        this.raiz = null;
    }

    // --- Utilidades ---
    getAltura(nodo) {
        if (nodo === null) return 0;
        return nodo.altura;
    }

    getBalance(nodo) {
        if (nodo === null) return 0;
        return this.getAltura(nodo.derecho) - this.getAltura(nodo.izquierdo);
    }

    // --- Rotaciones ---
    rotacionDerecha(y) {
        let x  = y.izquierdo;
        let T2 = x.derecho;

        x.derecho   = y;
        y.izquierdo = T2;

        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;
        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;

        return x;
    }

    rotacionIzquierda(x) {
        let y  = x.derecho;
        let T2 = y.izquierdo;

        y.izquierdo = x;
        x.derecho   = T2;

        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;
        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;

        return y;
    }

    // --- Inserción con auto-balanceo ---
    insertar(idSensor, lectura) {
        this.raiz = this._insertar(this.raiz, idSensor, lectura);
    }

    _insertar(nodo, idSensor, lectura) {
        if (nodo === null) return new NodoAVL(idSensor, lectura);

        if (idSensor < nodo.idSensor) {
            nodo.izquierdo = this._insertar(nodo.izquierdo, idSensor, lectura);
        } else if (idSensor > nodo.idSensor) {
            nodo.derecho = this._insertar(nodo.derecho, idSensor, lectura);
        } else {
            nodo.lectura = lectura;
            return nodo;
        }

        nodo.altura = Math.max(this.getAltura(nodo.izquierdo), this.getAltura(nodo.derecho)) + 1;
        const balance = this.getBalance(nodo);

        if (balance < -1 && idSensor < nodo.izquierdo.idSensor) {
            return this.rotacionDerecha(nodo);
        }
        if (balance > 1 && idSensor > nodo.derecho.idSensor) {
            return this.rotacionIzquierda(nodo);
        }
        if (balance < -1 && idSensor > nodo.izquierdo.idSensor) {
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo);
        }
        if (balance > 1 && idSensor < nodo.derecho.idSensor) {
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo);
        }

        return nodo;
    }

    // --- Búsqueda ---
    buscar(idSensor) {
        return this._buscar(this.raiz, idSensor);
    }

    _buscar(nodo, idSensor) {
        if (nodo === null) return null;
        if (idSensor === nodo.idSensor) return nodo;
        if (idSensor < nodo.idSensor) return this._buscar(nodo.izquierdo, idSensor);
        return this._buscar(nodo.derecho, idSensor);
    }
}

// ============================================================
// Simulación Smart Grid (Tarea 3)
// ============================================================
class RegistroEnergia {
    constructor() {
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }
}

class SimulacionSmartGrid {
    static ejecutarPrueba() {
        const redElectrica = new ArbolAVLSensores();
        const numSensores = 100000;
        console.log(`Iniciando despliegue de ${numSensores} sensores inteligentes...`);
        
        // 1 y 2. Inserción completamente secuencial 
        for (let i = 0; i < numSensores; i++) {
            let lectura = new RegistroEnergia(); 
            redElectrica.insertar(i, lectura); // ¡Línea descomentada!
        }
        
        console.log("Red eléctrica AVL construida y balanceada con éxito.");
        
        // 3. Medición del tiempo de búsqueda
        const idBuscado = 99999;
        const inicioBusqueda = performance.now();
        
        const resultado = redElectrica.buscar(idBuscado); // ¡Línea descomentada!
        
        const finBusqueda = performance.now();
        const tiempoMs = finBusqueda - inicioBusqueda;
        
        console.log(`Tiempo de búsqueda del Sensor ID ${idBuscado}: ${tiempoMs.toFixed(4)} ms.`);
        console.log(`Datos encontrados: Voltaje ${resultado ? resultado.lectura.voltaje : 'N/A'}V`);
    }
}

// Iniciar simulación
SimulacionSmartGrid.ejecutarPrueba();