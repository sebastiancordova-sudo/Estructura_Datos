// CARRITO DE COMPRAS

const productos = [
  { id: 1, nombre: "Teclado",  precio: 59.99 },
  { id: 2, nombre: "Mouse",    precio: 29.99 },
  { id: 3, nombre: "Monitor",  precio: 189.99 },
  { id: 4, nombre: "Webcam",   precio: 34.99 },
];

const carrito = [];

function agregar(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return console.log(" Producto no existe");
  carrito.push(producto);
  console.log(` Agregado: ${producto.nombre} - $${producto.precio}`);
}

function quitar() {
  if (carrito.length === 0) return console.log(" El carrito está vacío");
  const eliminado = carrito.pop(); // LIFO → saca el último
  console.log(`  Quitado: ${eliminado.nombre}`);
}

function eliminar(id) {
  const idx = carrito.findIndex(p => p.id === id);
  if (idx === -1) return console.log(" Producto no está en el carrito");
  const eliminado = carrito.splice(idx, 1)[0];
  console.log(`  Eliminado: ${eliminado.nombre}`);
}

function comprar() {
  if (carrito.length === 0) return console.log("⚠️  No hay productos");
  console.log("\n Procesando compra...");
  while (carrito.length > 0) {
    const item = carrito.shift(); // FIFO → procesa en orden de llegada
    console.log(`   ✔ ${item.nombre} - $${item.precio}`);
  }
  console.log(" ¡Compra realizada con éxito!\n");
}

function mostrar() {
  if (carrito.length === 0) return console.log(" Carrito vacío\n");
  const total = carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2);
  console.log("\n Carrito actual:");
  carrito.forEach((p, i) => console.log(`  [${i}] ${p.nombre} - $${p.precio}`));
  console.log(`  Total: $${total}\n`);
}

// PRUEBAS

agregar(1); // Teclado
agregar(2); // Mouse
agregar(3); // Monitor
agregar(4); // Webcam
mostrar();

quitar();      // saca Webcam (último en entrar)
mostrar();

eliminar(2);   // elimina Mouse por id específico
mostrar();

comprar();     // procesa Teclado -> Monitor (orden de llegada)
mostrar();