// ==========================================
// CONFIGURACIÓN PRINCIPAL DE FECHAS
// ==========================================
// La Fecha de su cumpleaños donde se le permitirá entrar al capítulo 10 oculto
const FECHA_CUMPLEAÑOS_2027 = new Date('2027-04-23T00:00:00');

// ==========================================
// LA BASE DE DATOS DE LA HISTORIA
// ==========================================
// Aquí es donde escribirás vuestras historias y fotos con calma durante el año
const capitulosData = {
    1: { 
        titulo: "Capítulo I: El Comienzo", 
        contenido: "Hoy empieza tu aventura... Disfruta el viaje." 
    },
    2: { 
        titulo: "Capítulo II: La primera vez que huimos", 
        contenido: "Todavía recuerdo lo cantarina que ibas en ese coche. Ese viaje fue el inicio de algo enorme.<br><br>Pensaba que íbamos sin rumbo, pero hoy sé que mi destino eras tú." 
    },
    3: { titulo: "Capítulo III: Una Canción", contenido: "Cada vez que escucho esta canción, estás tú..." },
    4: { titulo: "Capítulo IV: Lo que admiro", contenido: "Eres fuerte, valiente y me haces mejor cada día..." },
    5: { titulo: "Capítulo V: Las Risas", contenido: "Aquella vez que nos perdimos y terminamos riendo a carcajadas..." },
    6: { titulo: "Capítulo VI: Complicidad", contenido: "No necesitamos hablar para entendernos." },
    7: { titulo: "Capítulo VII: El Futuro", contenido: "Todo lo que sueño a futuro apunta en esta dirección." },
    8: { titulo: "Capítulo VIII: Tú", contenido: "Quería dejar un huequito solo para decirte lo que significas para mí." },
    9: { titulo: "Capítulo IX: La Búsqueda", contenido: "Durante todo este tiempo has estado buscando nuevas respuestas por todo tipo de lugares. Pero la última pieza siempre estuvo donde empezó todo... <br><br>Revisa bien la caja principal." },
    10: { titulo: "Tu Regalo", contenido: "Ha merecido la pena la espera. Has llegado al final de esta aventura, pero esto es solo un escalón más.<br><br>¡Feliz Cumpleaños, mi amor!<br><br>Tu verdadero regalo está un clic más abajo." }
};

// ==========================================
// EL CEREBRO: MEMORIA DE LA APLICACIÓN
// ==========================================
function obtenerProgreso() {
    // Busca en el disco duro del móvil (Safari/Chrome) qué capítulos ha leído ya
    let guardado = localStorage.getItem('el_viaje_progreso');
    if (!guardado) {
        // La primera vez que entra, siempre se le da el capítulo 1 abierto
        let inicial = [1]; 
        localStorage.setItem('el_viaje_progreso', JSON.stringify(inicial));
        return inicial;
    }
    return JSON.parse(guardado);
}

// Función maestra llamada desde los QR (unlock.html)
function intentarDesbloquear(id, esCreador = false) {
    let progreso = obtenerProgreso();
    let numId = parseInt(id);

    // 1. Si el capítulo ya estaba abierto de antes, le dejamos entrar gratis (Sigue siendo Rosa)
    if (progreso.includes(numId)) {
        return true; 
    }

    // 2. REGLA ESTRICTA DE ORDEN: ¿Está saltándose capítulos? (Salvo que seas tú en modo Creador probando la app)
    if (numId > 1 && !progreso.includes(numId - 1) && !esCreador) {
        alert("¡Alto ahí, mi amor! 🧐 \n\nQué impaciente eres... Cada cosa en nuestro viaje tiene su momento.\n\nPara leer este capítulo primero tienes que haber encontrado la pista anterior. ¡La historia no se puede saltar!");
        return false; // Retornamos falso y se le echa a la web principal (candado intacto)
    }

    // 3. Todo está en orden: Metemos la llave nueva y lo guardamos PARA SIEMPRE en la memoria
    progreso.push(numId);
    localStorage.setItem('el_viaje_progreso', JSON.stringify(progreso));
    
    return true; // Éxito
}

// ==========================================
// EL PINTOR: LA PÁGINA PRINCIPAL / MAPA
// ==========================================
function renderizarHome() {
    const contenedor = document.getElementById('grid-capitulos');
    if(!contenedor) return; // Protegemos para no romper el código si estamos leyendo una carta en lugar de en el Menú

    const progreso = obtenerProgreso();

    // Fabricar las tarjetas 1 al 9
    for (let i = 1; i <= 9; i++) {
        let esDesbloqueado = progreso.includes(i);
        
        let a = document.createElement(esDesbloqueado ? 'a' : 'div');
        a.className = `carta ${esDesbloqueado ? 'desbloqueado' : 'bloqueado'}`;
        
        // Si el capítulo está en la memoria del teléfono, lo hacemos clickable (el famoso cuadrito Rosa)
        if (esDesbloqueado) {
            a.href = `capitulo.html?id=${i}`;
        }

        a.innerHTML = `<span>${generarNumerosRomanos(i)}</span>`;
        contenedor.appendChild(a);
    }

    // ==========================================
    // CAPÍTULO FINAL (DOBLE FONDO Y CUMPLEAÑOS)
    // ==========================================
    const btnFinal = document.getElementById('capitulo-final');
    
    // Si ya encontró la llave del Capítulo Final el día clave, el botón general del index brillará oscurecido:
    if (progreso.includes(10)) {
        btnFinal.classList.add('activo');
        btnFinal.innerHTML = "EL FINAL DEL VIAJE";
    }

    btnFinal.addEventListener('click', () => {
        const ahora = new Date();
        
        // Primero verificamos si YA HA LLEGADO LA FECHA D
