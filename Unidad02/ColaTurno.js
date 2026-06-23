/**
 * RETO Unidad02 -  reto23062026
 * Caso de uso: Cola de turnos en una ventanilla de atención.
 * Estructura usada: Cola (Queue) -> FIFO, el primero en llegar
 * es el primero en ser atendido.
 */

class ColaDeTurnos {
  #turnos;

  constructor() {
    this.#turnos = [];
  }

  // Encolar: agrega un nuevo turno al final. O(1)
  // Valida la entrada para que nadie "se meta" con un dato inválido.
  encolar(cliente) {
    if (typeof cliente !== "string" || cliente.trim() === "") {
      console.log(" Turno rechazado: nombre invalido.");
      return false;
    }
    this.#turnos.push(cliente.trim());
    console.log(` ${cliente} tomo turno. Posición: ${this.#turnos.length}`);
    return true;
  }

  // Atiende y elimina al primero de la fila. O(n)
  desencolar() {
    if (this.estaVacia()) {
      console.log(" No hay nadie en espera.");
      return null;
    }
    const atendido = this.#turnos.shift();
    console.log(` Atendiendo a: ${atendido}`);
    return atendido;
  }

  // Peek: mira quién sigue sin sacarlo de la cola. O(1)
  verPrimero() {
    return this.estaVacia() ? null : this.#turnos[0];
  }

  estaVacia() {
    return this.#turnos.length === 0;
  }

  tamanio() {
    return this.#turnos.length;
  }
}

// Prueba
const fila = new ColaDeTurnos();

fila.encolar("Ana");
fila.encolar("Luis");
fila.encolar("María");
fila.encolar("");   

console.log("Siguiente en ser atendido:", fila.verPrimero());

fila.desencolar();
fila.desencolar();

console.log("Personas restantes en fila:", fila.tamanio());

fila.desencolar();
fila.desencolar(); // cola vacía