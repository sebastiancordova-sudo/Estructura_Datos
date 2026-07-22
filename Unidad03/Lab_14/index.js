/**
 * ==========================================
 * LAB 14 - Rutas Mínimas y Logística Verde
 * Algoritmo de Dijkstra
 * ==========================================
 */

/**
 * Cola de prioridad para seleccionar el nodo
 * con el menor consumo energético acumulado.
 */
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    /**
     * Inserta un elemento en la cola.
     * @param {number} val Nodo.
     * @param {number} priority Prioridad (consumo acumulado).
     */
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.values.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Extrae el nodo con menor prioridad.
     * @returns {{val:number, priority:number}}
     */
    dequeue() {
        return this.values.shift();
    }

    /**
     * Verifica si la cola está vacía.
     * @returns {boolean}
     */
    isEmpty() {
        return this.values.length === 0;
    }
}

/**
 * Representa una red logística mediante
 * listas de adyacencia.
 */
class LogisticaGrafo {

    /**
     * @param {number} numNodos Número de centros logísticos.
     */
    constructor(numNodos) {

        if (numNodos <= 0) {
            throw new Error("El número de nodos debe ser mayor que cero.");
        }

        this.numNodos = numNodos;
        this.adyacencia = Array.from(
            { length: numNodos },
            () => []
        );
    }

    /**
     * Agrega una ruta entre dos centros.
     *
     * @param {number} origen
     * @param {number} destino
     * @param {number} consumoEnergetico
     */
    agregarRuta(origen, destino, consumoEnergetico) {

        if (
            origen < 0 ||
            origen >= this.numNodos ||
            destino < 0 ||
            destino >= this.numNodos
        ) {
            throw new Error("Los nodos especificados no existen.");
        }

        if (consumoEnergetico < 0) {
            throw new Error("El consumo energético debe ser positivo.");
        }

        this.adyacencia[origen].push({
            nodo: destino,
            peso: consumoEnergetico
        });
    }

    /**
     * Calcula la ruta mínima mediante
     * el algoritmo de Dijkstra.
     *
     * @param {number} inicio Nodo origen.
     * @param {number} fin Nodo destino.
     * @returns {{consumoTotal:number,ruta:number[]}}
     */
    dijkstra(inicio, fin) {

        if (
            inicio < 0 ||
            inicio >= this.numNodos ||
            fin < 0 ||
            fin >= this.numNodos
        ) {
            throw new Error("Origen o destino inválido.");
        }

        const distancias = Array(this.numNodos).fill(Infinity);
        const predecesores = Array(this.numNodos).fill(null);

        const pq = new PriorityQueue();

        distancias[inicio] = 0;
        pq.enqueue(inicio, 0);

        while (!pq.isEmpty()) {

            const { val: actual, priority } = pq.dequeue();

            if (actual === fin)
                break;

            if (priority > distancias[actual])
                continue;

            for (const vecino of this.adyacencia[actual]) {

                const nuevaDistancia =
                    distancias[actual] + vecino.peso;

                if (nuevaDistancia < distancias[vecino.nodo]) {

                    distancias[vecino.nodo] = nuevaDistancia;
                    predecesores[vecino.nodo] = actual;

                    pq.enqueue(
                        vecino.nodo,
                        nuevaDistancia
                    );
                }
            }
        }

        return {
            consumoTotal: distancias[fin],
            ruta: this.reconstruirRuta(predecesores, fin)
        };
    }

    /**
     * Reconstruye la ruta desde el origen
     * hasta el destino.
     *
     * @param {Array<number|null>} predecesores
     * @param {number} destino
     * @returns {number[]}
     */
    reconstruirRuta(predecesores, destino) {

        const ruta = [];

        let actual = destino;

        while (actual !== null) {

            ruta.unshift(actual);
            actual = predecesores[actual];

        }

        return ruta;
    }

}

/* ==========================================
   TAREA 3
   Simulación de una red logística verde
========================================== */

const redLogistica = new LogisticaGrafo(5);

// Conexiones entre centros de acopio
redLogistica.agregarRuta(0, 1, 4);
redLogistica.agregarRuta(0, 2, 2);
redLogistica.agregarRuta(1, 3, 5);
redLogistica.agregarRuta(2, 1, 1);
redLogistica.agregarRuta(2, 4, 8);
redLogistica.agregarRuta(3, 4, 3);

// Calcular la ruta de menor consumo energético
const resultado = redLogistica.dijkstra(0, 4);

// Mostrar resultados
console.log("=======================================");
console.log("      LOGÍSTICA VERDE");
console.log("=======================================");
console.log("Ruta optimizada para el camión eléctrico:");
console.log(resultado.ruta.join(" -> "));
console.log("Consumo total estimado:", resultado.consumoTotal, "kWh");
console.log("=======================================");