/**
 * @file AuditoriaRedUNLD.js
 * @description Auditoría de la Red de Distribución Urbana (UNLD).
 * Implementa la topología de centros de acopio como un Grafo no dirigido,
 * una Tabla de Hash (Map) para acceso O(1) a los centros, una Cola de
 * Prioridad para urgencias, y una simulación de Monte Carlo (prueba de
 * estrés) que ejecuta miles de operaciones aleatorias para detectar
 * casos límite (Edge Cases) en las estructuras integradas.
 *
 * Tarea 2: Pruebas de Integración y Estrés (ABP)
 * Tarea 3: Documentación Técnica JSDoc + Complejidad Big-O
 */

/**
 * Representa la topología de la red de distribución como un Grafo no
 * dirigido mediante lista de adyacencia (Map<nodoId, Set<nodoId>>).
 */
class GrafoRedUrbana {
  constructor() {
    /** @type {Map<number, Set<number>>} Lista de adyacencia. */
    this.adyacencia = new Map();
  }

  /**
   * Agrega un nodo (centro de acopio) al grafo si no existe.
   * Complejidad temporal: O(1) amortizado (inserción en Map).
   * @param {number} nodoId Identificador del centro de acopio.
   * @returns {void}
   */
  agregarNodo(nodoId) {
    if (!this.adyacencia.has(nodoId)) {
      this.adyacencia.set(nodoId, new Set());
    }
  }

  /**
   * Crea una conexión (ruta) bidireccional entre dos centros de acopio.
   * Complejidad temporal: O(1) amortizado.
   * @param {number} origen
   * @param {number} destino
   * @returns {void}
   */
  conectar(origen, destino) {
    this.agregarNodo(origen);
    this.agregarNodo(destino);
    this.adyacencia.get(origen).add(destino);
    this.adyacencia.get(destino).add(origen);
  }

  /**
   * Calcula la ruta más corta (en número de saltos) entre dos centros
   * usando BFS, ya que el grafo no tiene pesos en las aristas.
   * Complejidad temporal: O(V + E), donde V = nodos y E = conexiones.
   * @param {number} origen
   * @param {number} destino
   * @returns {number[]|null} Secuencia de nodos de la ruta, o null si no existe.
   */
  calcularRuta(origen, destino) {
    if (!this.adyacencia.has(origen) || !this.adyacencia.has(destino)) {
      return null;
    }
    const visitados = new Set([origen]);
    const cola = [[origen]];

    while (cola.length > 0) {
      const rutaActual = cola.shift();
      const nodoActual = rutaActual[rutaActual.length - 1];

      if (nodoActual === destino) return rutaActual;

      for (const vecino of this.adyacencia.get(nodoActual) || []) {
        if (!visitados.has(vecino)) {
          visitados.add(vecino);
          cola.push([...rutaActual, vecino]);
        }
      }
    }
    return null; // No hay ruta posible (componentes desconectados)
  }
}

/**
 * Cola de prioridad simple (min-heap implícito mediante arreglo ordenado)
 * usada para encolar urgencias en los centros de acopio. Menor valor de
 * prioridad = mayor urgencia.
 */
class ColaPrioridadUrgencias {
  constructor() {
    /** @type {{paquete: string, prioridad: number}[]} */
    this.items = [];
  }

  /**
   * Inserta un paquete urgente respetando el orden de prioridad.
   * Complejidad temporal: O(n) en el peor caso (inserción ordenada
   * mediante búsqueda lineal). Podría optimizarse a O(log n) con un
   * heap binario real.
   * @param {string} paquete Identificador del paquete.
   * @param {number} prioridad Nivel de urgencia (menor = más urgente).
   * @returns {void}
   */
  encolarUrgencia(paquete, prioridad) {
    const nuevo = { paquete, prioridad };
    let i = 0;
    while (i < this.items.length && this.items[i].prioridad <= prioridad) {
      i++;
    }
    this.items.splice(i, 0, nuevo);
  }

  /**
   * Extrae el paquete de mayor urgencia (menor valor de prioridad).
   * Complejidad temporal: O(1) (shift sobre arreglo ya ordenado).
   * @returns {{paquete: string, prioridad: number}|undefined}
   */
  desencolar() {
    return this.items.shift();
  }
}

/**
 * Clase principal de auditoría. Integra el Grafo de topología, la Tabla
 * de Hash de centros de acopio y la Cola de Prioridad de urgencias, y
 * ejecuta la simulación estocástica (Monte Carlo) de carga sobre la red.
 */
class AuditoriaRedUrbana {
  constructor() {
    /** @type {Map<number, string[]>} Tabla hash: nodoId -> paquetes almacenados. */
    this.centrosAcopio = new Map();
    /** @type {GrafoRedUrbana} */
    this.grafo = new GrafoRedUrbana();
    /** @type {ColaPrioridadUrgencias} */
    this.colaUrgencias = new ColaPrioridadUrgencias();
    /** @type {{errores: number, operaciones: Record<string, number>}} */
    this.logs = { errores: 0, operaciones: { buscar: 0, insertar: 0, urgencia: 0, ruta: 0 } };
  }

  /**
   * Inserta un paquete en un centro de acopio (crea el centro si no existe).
   * Complejidad temporal: O(1) amortizado (Map.set / Map.get).
   * @param {number} nodoId
   * @param {string} paquete
   * @returns {void}
   */
  insertar(nodoId, paquete) {
    if (!this.centrosAcopio.has(nodoId)) {
      this.centrosAcopio.set(nodoId, []);
      this.grafo.agregarNodo(nodoId);
    }
    this.centrosAcopio.get(nodoId).push(paquete);
    this.logs.operaciones.insertar++;
  }

  /**
   * Busca los paquetes almacenados en un centro de acopio.
   * Complejidad temporal: O(1) (acceso directo por clave en Map).
   * @param {number} nodoId
   * @returns {string[]|undefined}
   */
  buscar(nodoId) {
    this.logs.operaciones.buscar++;
    return this.centrosAcopio.get(nodoId);
  }

  /**
   * Encola un paquete urgente para despacho prioritario.
   * Complejidad temporal: O(n) (ver ColaPrioridadUrgencias.encolarUrgencia).
   * @param {string} paquete
   * @param {number} prioridad
   * @returns {void}
   */
  encolarUrgencia(paquete, prioridad) {
    this.colaUrgencias.encolarUrgencia(paquete, prioridad);
    this.logs.operaciones.urgencia++;
  }

  /**
   * Calcula la ruta más corta entre dos centros de acopio conectados.
   * Complejidad temporal: O(V + E) (BFS delegado a GrafoRedUrbana).
   * @param {number} origen
   * @param {number} destino
   * @returns {number[]|null}
   */
  calcularRuta(origen, destino) {
    this.logs.operaciones.ruta++;
    return this.grafo.calcularRuta(origen, destino);
  }

  /**
   * Prueba de estrés basada en el Método de Monte Carlo: ejecuta
   * `eventos` operaciones aleatorias (buscar, insertar, encolar
   * urgencia, calcular ruta) elegidas mediante una distribución
   * uniforme estandarizada U(0,1), simulando carga concurrente masiva
   * sobre la red para descubrir Edge Cases imprevistos.
   * Complejidad temporal: O(n) llamadas, cada una O(1) a O(V+E) según
   * la operación elegida; en el peor caso dominado por `calcularRuta`.
   * @param {number} eventos Número de eventos concurrentes a simular.
   * @returns {void}
   */
  simularCargaEstocastica(eventos) {
    console.log(`Iniciando auditoría de estrés sobre red UNLD (${eventos} eventos)...`);
    const NUM_MAX_NODOS = 100;
    const operaciones = ["buscar", "insertar", "urgencia", "ruta"];

    for (let i = 0; i < eventos; i++) {
      try {
        // Distribución uniforme estandarizada U(0,1) para elegir la operación
        const u = Math.random();
        const operacion = operaciones[Math.floor(u * operaciones.length)];
        const nodoA = Math.floor(Math.random() * NUM_MAX_NODOS);
        const nodoB = Math.floor(Math.random() * NUM_MAX_NODOS);

        switch (operacion) {
          case "insertar":
            this.insertar(nodoA, `Paquete-Eco-${i}`);
            // Conecta el nuevo nodo con otro al azar para poblar el grafo
            this.grafo.conectar(nodoA, nodoB);
            break;
          case "buscar":
            this.buscar(nodoA);
            break;
          case "urgencia":
            this.encolarUrgencia(`Urgencia-${i}`, Math.floor(Math.random() * 5));
            break;
          case "ruta":
            this.calcularRuta(nodoA, nodoB);
            break;
        }
      } catch (error) {
        this.logs.errores++;
        console.error(`Fallo detectado en evento #${i}:`, error.message);
      }
    }

    console.log(`Auditoría finalizada: ${this.centrosAcopio.size} nodos procesados.`);
    console.log(`Operaciones ejecutadas:`, this.logs.operaciones);
    console.log(`Errores registrados: ${this.logs.errores}`);
  }
}

// --- Ejecución de la prueba de estrés (Tarea 2) ---
const unld = new AuditoriaRedUrbana();
unld.simularCargaEstocastica(10000);

module.exports = { AuditoriaRedUrbana, GrafoRedUrbana, ColaPrioridadUrgencias };