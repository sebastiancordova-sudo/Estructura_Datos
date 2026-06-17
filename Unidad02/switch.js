
let expr = "mangos"

switch (expr) {
    case "mangos":
        console.log("Los mangos cuestas $10")
        break;
    case "naranjas":
        console.log("Las naranjas cuestan 7 un dolar")
        break;

    case "peras":
        console.log("Las peras cuestan 5 un dolar")
        break;

    default:
        console.log(`Fruta no disponible: ${expr}`)
        break;
}
console.log("Desea comprar algo mas?")