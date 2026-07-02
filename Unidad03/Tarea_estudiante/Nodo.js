class Nodo {
    constructor(keyword) {
        this.keyword = keyword;
        this.visitas = 1;
        this.izquierda = null;
        this.derecha = null;
    }
}

export default Nodo;