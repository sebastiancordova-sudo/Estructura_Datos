import ArbolBusqueda from "./ArbolBusqueda.js";

const arbol = new ArbolBusqueda();

arbol.insertar("Google");
arbol.insertar("YouTube");
arbol.insertar("Facebook");
arbol.insertar("Google");

console.log(arbol.buscar("Google"));
console.log(arbol.buscar("YouTube"));
console.log(arbol.buscar("TikTok"));