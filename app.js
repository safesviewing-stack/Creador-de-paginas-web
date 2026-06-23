// La Fecha de su cumpleaños donde revelará el capítulo oculto (Formato estricto)
const FECHA_CUMPLEAÑOS_2027 = new Date('2027-04-23T00:00:00');

// Base de Datos local
const capitulosData = {
    1: { titulo: "Capítulo I: El Comienzo", contenido: "Aquí escribirás la historia de cómo empezó todo..." },
    2: { titulo: "Capítulo II: Nuestro Primer Viaje", contenido: "Un recuerdo especial de aquel día..." },
    3: { titulo: "Capítulo III: Una Canción", contenido: "Cada vez que escucho esta canción, estás tú..." },
    4: { titulo: "Capítulo IV: Lo que admiro", contenido: "Eres fuerte, valiente y me haces mejor..." },
    5: { titulo: "Capítulo V: Las Risas", contenido: "Aquella vez que nos perdimos y terminamos riendo..." },
    6: { titulo: "Capítulo VI: Complicidad", contenido: "No necesitamos hablar para entendernos." },
    7: { titulo: "Capítulo VII: El Futuro", contenido: "Todo lo que sueño está en esta dirección." },
    8: { titulo: "Capítulo VIII: Tú", contenido: "Un mensaje muy profundo sobre lo que significa ella." },
    9: { titulo: "Capítulo IX: La Búsqueda", contenido: "Durante todo este tiempo has estado buscando nuevas respuestas. Pero la última siempre estuvo donde empezó todo... Revisa la caja principal." },
    10: { titulo: "Tu Regalo", contenido: "Este es el final de una espera de 365 días. Descarga aquí tus billetes para..." } // El archivo PDF
};

// 1. INICIALIZAR PROGRESO
function obtenerProgreso() {
    // Busca en la memoria del navegador qué códigos ha escaneado
    let guardado = localStorage.getItem('el_viaje_progreso');
    if (!guardado) {
        let inicial = [1]; // El capítulo 1 siempre empieza desbloqueado
        localStorage.setItem('el_viaje_progreso', JSON.stringify(inicial));
        return inicial;
    }
    return JSON.parse(guardado);
}

function desbloquearCapitulo(id) {
    let progreso = obtenerProgreso();
    let numId = parseInt(id);
    if (!progreso.includes(numId)) {
        progreso.push(numId);
        localStorage.setItem('el_viaje_progreso', JSON.stringify(progreso));
    }
}

// 2. LÓGICA DE LA PÁGINA PRINCIPAL (HOME)
function renderizarHome() {
    const contenedor = document.getElementById('grid-capitulos');
    if(!contenedor) return; // Si no estamos en index.html, ignorar.

    const progreso = obtenerProgreso();

    // Crear las 9 tarjetas normales
    for (let i = 1; i <= 9; i++) {
        let esDesbloqueado = progreso.includes(i);
        
        let a = document.createElement(esDesbloqueado ? 'a' : 'div');
        a.className = `carta ${esDesbloqueado ? 'desbloqueado' : 'bloqueado'}`;
        
        // Si está desbloqueado, hacemos que enlace a la historia
        if (esDesbloqueado) {
            a.href = `capitulo.html?id=${i}`;
        }

        a.innerHTML = `<span>${generarNumerosRomanos(i)}</span>`;
        contenedor.appendChild(a);
    }

    // Configurar Capítulo 10
    const btnFinal = document.getElementById('capitulo-final');
    btnFinal.addEventListener('click', () => {
        const ahora = new Date();
        
        if (ahora >= FECHA_CUMPLEAÑOS_2027) {
            if (progreso.includes(10)) {
                window.location.href = `capitulo.html?id=10`; // Te deja pasar
            } else {
                alert("Debes escanear el QR del fondo oculto para entrar.");
            }
        } else {
            alert("Aún no es el momento. Debes esperar al 23 de abril de 2027.");
        }
    });
}

function generarNumerosRomanos(num) {
    const romanos = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return romanos[num];
}
