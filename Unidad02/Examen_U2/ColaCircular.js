/**
 * Implementación de una Cola Circular (Circular Queue) sobre
 * un arreglo de tamaño fijo, aplicada al sistema de turnos
 * para préstamo de bicicletas públicas (bici-compartidas).
 */

class ColaCircular {
  /**
   * @param {number} capacidad - Número máximo de usuarios en espera
   *                             que la fila puede contener.
   */
  constructor(capacidad) {
    if (capacidad <= 0) {
      throw new Error("La capacidad de la cola debe ser mayor a 0.");
    }
    this.capacidad = capacidad;
    this.datos = new Array(capacidad).fill(null); // arreglo de tamaño fijo
    this.frente = 0;     // puntero al primer usuario en espera
    this.final = 0;       // puntero a la siguiente posición libre
    this.cantidad = 0;    // contador auxiliar de elementos almacenados
  }

  /** @returns {boolean} true si la cola no tiene usuarios en espera */
  estaVacia() {
    return this.cantidad === 0;
  }

  /** @returns {boolean} true si la cola alcanzó su capacidad máxima */
  estaLlena() {
    return this.cantidad === this.capacidad;
  }

  /**
   * Encola (enqueue) a un nuevo usuario al final de la fila de espera.
   * Complejidad: O(1)
   * @param {string} usuario - Identificador o nombre del usuario.
   * @returns {boolean} true si se encoló correctamente, false si la cola está llena.
   */
  encolar(usuario) {
    if (this.estaLlena()) {
      return false; 
    }
    this.datos[this.final] = usuario;
    // Aritmética modular: al llegar al último índice, regresa a 0
    this.final = (this.final + 1) % this.capacidad;
    this.cantidad++;
    return true;
  }

  /**
   * Desencola (dequeue) al usuario que lleva más tiempo esperando
   * (ubicado en "frente") y le asigna la bicicleta liberada.
   * Complejidad: O(1)
   * @returns {string|null} el usuario atendido, o null si la cola está vacía.
   */
  desencolar() {
    if (this.estaVacia()) {
      return null; // No hay usuarios esperando
    }
    const usuarioAtendido = this.datos[this.frente];
    this.datos[this.frente] = null; // libera la posición de memoria
    // El puntero "frente" recicla la posición mediante módulo
    this.frente = (this.frente + 1) % this.capacidad;
    this.cantidad--;
    return usuarioAtendido;
  }

  /** @returns {string|null} usuario en el frente sin retirarlo de la fila */
  verFrente() {
    return this.estaVacia() ? null : this.datos[this.frente];
  }

  /** @returns {number} cantidad actual de usuarios en espera */
  tamano() {
    return this.cantidad;
  }
}

// Exportación para entornos Node.js / módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = ColaCircular;
}

/* ---------------------------------------------------------
 * Ejemplo de uso (FIFO en acción):
 *
 * const filaEspera = new ColaCircular(5);
 * filaEspera.encolar("Usuario A");
 * filaEspera.encolar("Usuario B");
 * filaEspera.encolar("Usuario C");
 *
 * console.log(filaEspera.desencolar()); // "Usuario A" (el primero en llegar)
 * console.log(filaEspera.desencolar()); // "Usuario B"
 *
 * filaEspera.encolar("Usuario D"); // reutiliza la posición liberada por A
 * console.log(filaEspera.tamano()); // 2
 * --------------------------------------------------------- */