const numeroSecreto = Math.floor(Math.random() * 10 + 1); 
const numeroJugador = parseInt(prompt("Adivina el número secreto entre el 1 al 10:"));

console.log(`Este es el número con el que juegas: ${numeroJugador}`);

if (numeroJugador === numeroSecreto) {
    console.log("¡Felicitaciones! Adivinaste el número.");
} else if (numeroJugador < numeroSecreto) {
    console.log("¡Número menor! Intente nuevamente.");
} else {
    console.log("Número mayor/muy alto, intenta nuevamente.");
}