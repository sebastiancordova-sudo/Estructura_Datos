// 1. ESTRUCTURA COMPLETA Y CORREGIDA (MIN-BINARY HEAP Y DIJKSTRA)

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let newNode = { val, priority };
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0]; // Corregido: antes decía this.values
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0]; // Corregido: antes decía this.values

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) || 
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

function calcularRutaDeliveryEficiente(grafo, inicio, destino) {
  const tiempos = {};
  const previasIntersecciones = {};
  const pq = new MinBinaryHeap();

  for (let punto in grafo) {
    if (punto === inicio) {
      tiempos[punto] = 0;
      pq.enqueue(punto, 0);
    } else {
      tiempos[punto] = Infinity;
      pq.enqueue(punto, Infinity);
    }
    previasIntersecciones[punto] = null;
  }

  while (!pq.isEmpty()) {
    let actualNode = pq.dequeue();
    if (actualNode.priority > tiempos[actualNode.val]) continue;
    
    let actual = actualNode.val;
    if (actual === destino) break;

    for (let vecinoObj of grafo[actual]) {
      let vecino = vecinoObj.punto;
      let tiempoViaje = vecinoObj.tiempoMinutos;
      
      let tiempoCandidato = tiempos[actual] + tiempoViaje;

      if (tiempoCandidato < tiempos[vecino]) {
        tiempos[vecino] = tiempoCandidato;
        previasIntersecciones[vecino] = actual;
        pq.enqueue(vecino, tiempoCandidato);
      }
    }
  }

  const ruta = [];
  let paso = destino;
  
  if (previasIntersecciones[paso] || paso === inicio) {
    while (paso !== null) {
      ruta.unshift(paso);
      paso = previasIntersecciones[paso];
    }
  }

  return {
    rutaOptima: ruta,
    tiempoTotalEstimado: tiempos[destino] !== Infinity ? tiempos[destino] + " minutos" : "Ruta no disponible"
  };
}


// 2. PRUEBA INTEGRAL DE VERIFICACIÓN LOGÍSTICA

// Mapa urbano complejo que incluye tráfico elevado, rutas alternativas y calles sin salida.
const mapaMetropolis = {
  "Central_Pizzeria": [
    { punto: "Avenida_Norte", tiempoMinutos: 12 }, // Vía directa saturada de tráfico
    { punto: "Callejon_Oeste", tiempoMinutos: 2 },  // Vía residencial interna despejada
    { punto: "Callejon_Cortado", tiempoMinutos: 1 } // Trampa: conduce a un muro
  ],
  "Avenida_Norte": [
    { punto: "Zona_Comercial", tiempoMinutos: 4 },
    { punto: "Casa_Usuario", tiempoMinutos: 15 }   // Accidente de tránsito en este tramo
  ],
  "Callejon_Oeste": [
    { punto: "Rotonda_Central", tiempoMinutos: 3 }
  ],
  "Rotonda_Central": [
    { punto: "Zona_Comercial", tiempoMinutos: 2 },
    { punto: "Barrio_Sur", tiempoMinutos: 8 }
  ],
  "Zona_Comercial": [
    { punto: "Casa_Usuario", tiempoMinutos: 3 }    // Acceso fluido directo al cliente
  ],
  "Barrio_Sur": [
    { punto: "Casa_Usuario", tiempoMinutos: 1 }
  ],
  "Callejon_Cortado": [], // Sin salida
  "Casa_Usuario": []      // Punto de entrega final
};

console.log("       PROCESO DE VERIFICACIÓN DE DIJKSTRA        ");

// --- TEST 1: Evitar el tráfico pesado ---
console.log(" TEST 1: Buscando ruta óptima Pizzería -> Casa...");
const testTratico = calcularRutaDeliveryEficiente(mapaMetropolis, "Central_Pizzeria", "Casa_Usuario");
console.log("Ruta resuelta:", testTratico.rutaOptima.join(" -> "));
console.log("Tiempo calculado:", testTratico.tiempoTotalEstimado);

// Verificación matemática: Ruta por Callejón Oeste toma (2 + 3 + 2 + 3) = 10 minutos.
const t1Pasado = testTratico.tiempoTotalEstimado === "10 minutos";
console.log(`Resultado del Test 1: ${t1Pasado ? "EXCELENTE" : "ERROR"}\n`);

// --- TEST 2: Intentar ir a un punto aislado ---
console.log(" TEST 2: Enviar repartidor desde un callejón sin salida...");
const testBloqueo = calcularRutaDeliveryEficiente(mapaMetropolis, "Callejon_Cortado", "Casa_Usuario");
console.log("Respuesta del sistema:", testBloqueo.tiempoTotalEstimado);

const t2Pasado = testBloqueo.tiempoTotalEstimado === "Ruta no disponible";
console.log(`Resultado del Test 2: ${t2Pasado ? " EXCELENTE" : " ERROR"}\n`);

// --- TEST 3: Repartidor ya está en la ubicación del cliente ---
console.log(" TEST 3: Destino y origen en el mismo lugar...");
const testMismoLugar = calcularRutaDeliveryEficiente(mapaMetropolis, "Casa_Usuario", "Casa_Usuario");
console.log("Ruta resuelta:", testMismoLugar.rutaOptima.join(" -> "));
console.log("Tiempo calculado:", testMismoLugar.tiempoTotalEstimado);

const t3Pasado = testMismoLugar.tiempoTotalEstimado === "0 minutos";
console.log(`Resultado del Test 3: ${t3Pasado ? " EXCELENTE" : " ERROR"}\n`);