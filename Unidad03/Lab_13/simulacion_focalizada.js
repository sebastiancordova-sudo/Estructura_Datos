    const GrafoInfraestructura = require("./GrafoInfraestructura");
    
    const redSimple = new GrafoInfraestructura();
    
    redSimple.registrarArea(0, "Centro de Producción");
    redSimple.registrarArea(3, "Almacén");
    
    redSimple.agregarRuta(0, 3, 15); // Producción a Almacén (15 m)
    
    redSimple.imprimirMapaRutas();