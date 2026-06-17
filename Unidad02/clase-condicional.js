// ESTRUCTURAS CONDICIONALES 
// IF / ELSE IF / ELSE

const edad = 20

if (edad >= 18) {
    console.log("Es mayor de edad")
} else if (edad >= 13) {
    console.log("Es adolescente")
} else {
    console.log("Es menor de edad")
}

/*
// Operadores de comparacion usados en condiciones
// == (igualdad de valor)
// === (igualdad de valor y tipo)
// != (diferente valor)
// !== (diferente valor o tipo)
// >  <  >=  <=
*/

const a = 5
const b = "5"

console.log(a == b)   // true = solo compara valor
console.log(a === b)  // false = compara valor Y tipo
console.log(a !== b)  // true

// Operadores logicos AND / OR / NOT

const esMayorDeEdad = true
const tieneDocumento = false

// AND: ambas condiciones deben ser verdaderas
if (esMayorDeEdad && tieneDocumento) {
    console.log("Puede ingresar")
} else {
    console.log("No puede ingresar")
}

// OR: basta con que una sea verdadera
const tieneCarnet = true
if (tieneDocumento || tieneCarnet) {
    console.log("Tiene identificacion")
} else {
    console.log("No tiene identificacion")
}

// NOT: invierte el valor booleano
const estaActivo = false
if (!estaActivo) {
    console.log("El usuario esta inactivo")
}

// OPERADOR TERNARIO  condicion ? si : no

const nota = 7
const resultado = nota >= 6 ? "Aprobado" : "Reprobado"
console.log(resultado)

// SWITCH

const dia = 3

switch (dia) {
    case 1:
        console.log("Lunes")
        break
    case 2:
        console.log("Martes")
        break
    case 3:
        console.log("Miercoles")
        break
    case 4:
        console.log("Jueves")
        break
    case 5:
        console.log("Viernes")
        break
    default:
        console.log("Fin de semana")
}

/*
// Valores TRUTHY y FALSY
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: cualquier otro valor
*/

const nombre = ""   // falsy

if (nombre) {
    console.log("Nombre: " + nombre)
} else {
    console.log("El nombre esta vacio")
}

const numero = 42   // truthy
if (numero) {
    console.log("El numero es: " + numero)
}