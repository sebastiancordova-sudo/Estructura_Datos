class LaboratorioTiposPrimitivos {
  // Pregunta 1: declarar e inicializar cada tipo
  static declararVariables() {
    // Boolean
    let flag1 = false;
    let flag2 = Boolean(1); // -> true (cualquier valor truthy)

    // Number
    let edad1 = 21;
    let edad2 = Number("21");

    // BigInt
    let grande1 = 9007199254740993n; // literal con sufijo n
    let grande2 = BigInt("9007199254740993");

    // String
    let nombre1 = "Sebastian";
    let nombre2 = String(2026);

    // undefined (no tiene constructor ni literal alternativo)
    let sinDefinir;

    return { flag1, flag2, edad1, edad2, grande1, grande2, nombre1, nombre2, sinDefinir };
  }

  // Pregunta 2: imprimir valor y tipo
  static imprimirValores(vars) {
    console.log(" Pregunta 2: valores y tipos ");
    for (const [nombreVar, valor] of Object.entries(vars)) {
      console.log(`${nombreVar} = ${valor} [${typeof valor}]`);
    }
  }

  // Pregunta 3: cadena de conversiones
  static cadenaDeConversion(valorInicial) {
    console.log("\n Pregunta 3: cadena String -> Number -> BigInt -> Boolean ");
    const comoString = valorInicial;
    const comoNumber = Number(comoString);
    const comoBigInt = BigInt(comoNumber);
    const comoBoolean = Boolean(comoBigInt);

    console.log(`String: "${comoString}"`);
    console.log(`Number: ${comoNumber}`);
    console.log(`BigInt: ${comoBigInt}n`);
    console.log(`Boolean: ${comoBoolean}`);
    console.log("Sí es posible, siempre que el string represente un número entero válido.");
    console.log('Ojo: BigInt(Number("3.5")) fallaría porque BigInt no acepta decimales.');
    return comoBoolean;
  }

  // Pregunta 4: sumar dos valores del mismo tipo
  static sumarMismoTipo() {
    console.log("\n Pregunta 4: suma entre valores del mismo tipo ");

    let b = true + true; 
    let n = 15 + 30;
    let bi = 15n + 30n;
    let s = "Hola" + "Mundo";
    let u = undefined + undefined; 

    console.log(`${b} [${typeof b}]`); // number, no boolean
    console.log(`${n} [${typeof n}]`);
    console.log(`${bi} [${typeof bi}]`);
    console.log(`${s} [${typeof s}]`);
    console.log(`${u} [${typeof u}]`); // NaN es de tipo number
  }

  // Pregunta 5: sumar valores de distinto tipo
  static sumarTiposDistintos() {
    console.log("\n Pregunta 5: suma entre tipos distintos ");

    let r1 = true + 10; // 11, boolean -> number
    let r2 = false + "5"; // "false5", number/boolean -> string cuando hay un string
    let r3 = 10 + "20"; // "1020"
    let r4 = "edad: " + 21; // concatenación
    let r5 = "activo: " + true;

    console.log(`${r1} [${typeof r1}]`);
    console.log(`${r2} [${typeof r2}]`);
    console.log(`${r3} [${typeof r3}]`);
    console.log(`${r4} [${typeof r4}]`);
    console.log(`${r5} [${typeof r5}]`);

    // Casos que SÍ lanzan error y por eso van comentados:
    // let error1 = 10n + 5;      // TypeError: no se puede mezclar BigInt con Number
    // let error2 = true + 5n;    // TypeError: no se puede mezclar boolean con BigInt
  }

  // Pregunta 6: forzar suma numérica sin quitar comillas
  static forzarSumaNumerica() {
    console.log("\n--- Pregunta 6: obtener 43 sin quitar las comillas de \"1\" ---");
    const resultado = 42 + +"1"; // el + unario convierte "1" a number antes de sumar
    console.log(`42 + +"1" = ${resultado} [${typeof resultado}]`);
  }

  // Método que ejecuta toda la práctica en orden
  static ejecutarPractica() {
    const variables = this.declararVariables();
    this.imprimirValores(variables);
    this.cadenaDeConversion("777");
    this.sumarMismoTipo();
    this.sumarTiposDistintos();
    this.forzarSumaNumerica();
  }
}

LaboratorioTiposPrimitivos.ejecutarPractica();