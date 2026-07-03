/**
 * Módulo 1: Introducción a JS y programación
 * Módulo 2: Variables, Data Types, Type Casting y Comments
 */

class PracticaJSEssentials {

  static ejercicio1() {
    console.log("\n=== Ejercicio 1: Hello World con comentarios ===");

    const saludo = "Hello, World!";
    const autor = "Sebastian Cordova";

    console.log(saludo);
    console.log(`Programa creado por: ${autor}`);
  }

  static ejercicio2() {
    console.log("\n=== Ejercicio 2: var, let y const ===");

    var contador = 1;
    contador = 2; // var permite reasignar sin problema
    console.log(`var contador = ${contador}`);

    let puntaje = 10;
    puntaje = 20; // let también permite reasignar
    console.log(`let puntaje = ${puntaje}`);

    const PI = 3.1416;
    // PI = 3.15; // -> TypeError: Assignment to constant variable
    console.log(`const PI = ${PI}`);

    console.log("Conclusión: var y let se pueden reasignar, const no.");
  }

  static ejercicio3() {
    console.log("\n=== Ejercicio 3: tipos primitivos ===");

    const activo = true;
    const precio = 49.99;
    const idGrande = 20250702n;
    const ciudad = "Loja";
    let pendiente; // undefined
    const vacio = null;
    const clave = Symbol("clave");

    const valores = { activo, precio, idGrande, ciudad, pendiente, vacio, clave };

    for (const [nombre, valor] of Object.entries(valores)) {
      console.log(`${nombre} = ${String(valor)} [${typeof valor}]`);
    }
  }

  static ejercicio4() {
    console.log("\n=== Ejercicio 4: type casting explícito ===");

    const entrada = "48";
    const comoNumero = Number(entrada);
    const comoBigInt = BigInt(comoNumero);

    console.log(`String original: "${entrada}"`);
    console.log(`Number: ${comoNumero} [${typeof comoNumero}]`);
    console.log(`BigInt: ${comoBigInt}n [${typeof comoBigInt}]`);

    const esPar = comoNumero % 2 === 0;
    console.log(`¿Es par? ${esPar}`);
  }

  static ejercicio5() {
    console.log("\n=== Ejercicio 5: coerción implícita ===");

    console.log(`"5" * 2 = ${"5" * 2} [${typeof ("5" * 2)}]`); // -> 10 number
    console.log(`"5" + 2 = ${"5" + 2} [${typeof ("5" + 2)}]`); // -> "52" string
    console.log(`true + true = ${true + true} [${typeof (true + true)}]`); // -> 2 number
    console.log(`"10" - "3" = ${"10" - "3"} [${typeof ("10" - "3")}]`); // -> 7 number
    console.log(`null + 1 = ${null + 1} [${typeof (null + 1)}]`); // -> 1 number
    // console.log(undefined + 1n); // -> TypeError, no se puede mezclar con BigInt
  }

  static ejercicio6() {
    console.log("\n=== Ejercicio 6: función documentada + casting a String ===");

    /**
     * Calcula el precio final aplicando un porcentaje de descuento.
     * @param {number} precio - precio original
     * @param {number} porcentajeDescuento - valor entre 0 y 100
     * @returns {string} precio final formateado como texto
     */
    function calcularPrecioFinal(precio, porcentajeDescuento) {
      const descuento = precio * (porcentajeDescuento / 100);
      const total = precio - descuento;
      return String(total.toFixed(2)); // casting explícito a String
    }

    const resultado = calcularPrecioFinal(80, 15);
    console.log(`Precio final: $${resultado} [${typeof resultado}]`);
  }

  static ejercicio7() {
    console.log("\n=== Ejercicio 7: undefined vs null ===");

    let sinAsignar;
    let vacioIntencional = null;

    console.log(`sinAsignar = ${sinAsignar} [${typeof sinAsignar}]`);
    console.log(`vacioIntencional = ${vacioIntencional} [${typeof vacioIntencional}]`);
    console.log(`sinAsignar == vacioIntencional -> ${sinAsignar == vacioIntencional}`);   // true
    console.log(`sinAsignar === vacioIntencional -> ${sinAsignar === vacioIntencional}`); // false
  }

  static ejecutarTodo() {
    this.ejercicio1();
    this.ejercicio2();
    this.ejercicio3();
    this.ejercicio4();
    this.ejercicio5();
    this.ejercicio6();
    this.ejercicio7();
  }
}

PracticaJSEssentials.ejecutarTodo();