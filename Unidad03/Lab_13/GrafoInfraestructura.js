class GrafoInfraestructura {
    constructor() {
        this.listaAdyacencia = new Map();
        this.nombresAreas = new Map();
    }
    registrarArea(id, nombre) {
        this.nombresAreas.set(id, nombre);
        if (!this.listaAdyacencia.has(id)) {
            this.listaAdyacencia.set(id, []);
        }
    }
    agregarRuta(origen, destino, distancia) {
        this.listaAdyacencia.get(origen).push({ nodo: destino, distancia });
        this.listaAdyacencia.get(destino).push({ nodo: origen, distancia });
    }
    imprimirMapaRutas() {
        for (let [areaId, conexiones] of this.listaAdyacencia) {
            const nombre = this.nombresAreas.get(areaId);
            const rutas = conexiones.map(c => `${this.nombresAreas.get(c.nodo)} (${c.distancia}m)`).join(", ");
            console.log(`${nombre} está conectado con: ${rutas}`);
        }
    }
}
module.exports = GrafoInfraestructura;