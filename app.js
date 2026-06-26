const FECHA_CUMPLEAÑOS_2027 = new Date('2027-04-23T00:00:00');

// ATENCIÓN AL ESCRIBIR TUS TEXTOS AQUÍ:
// 1. Evita poner comillas dobles (") dentro del texto. Si necesitas entrecomillar, usa las simples ('). 
// Ejemplo BIEN: contenido: "Me dijiste 'hola' y sonreí"
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
    10: { titulo: "Tu Regalo", contenido: "Ha merecido la pena la espera. Has llegado al final de esta aventura.<br><br>¡Feliz Cumpleaños, mi amor!<br><br>Tu verdadero regalo está un clic más abajo." }
};

function obtenerProgreso() {
    let guardado = localStorage.getItem('el_viaje_progreso');
    if (!guardado) {
        let inicial = [1]; 
        localStorage.setItem('el_viaje_progreso', JSON.stringify(inicial));
        return inicial;
    }
    try {
        return JSON.parse(guardado);
    } catch(e) {
        // Por si alguna vez se ensucia la memoria, empezamos limpios en el 1
        return [1];
    }
}

function intentarDesbloquear(id, esCreador = false) {
    let progreso = obtenerProgreso();
    let numId = parseInt(id);

    if (progreso.includes(numId)) return true; 

    if (numId > 1 && !progreso.includes(numId - 1) && !esCreador) {
        alert("¡Alto ahí, mi amor! 🧐 \n\nQué impaciente eres... Cada cosa en nuestro viaje tiene su momento.\n\nPara leer este capítulo primero tienes que haber encontrado la pista anterior. ¡La historia no se puede saltar!");
        return false; 
    }

    progreso.push(numId);
    localStorage.setItem('el_viaje_progreso', JSON.stringify(progreso));
    return true; 
}

function renderizarHome() {
    const contenedor = document.getElementById('grid-capitulos');
    if(!contenedor) return; 

    const progreso = obtenerProgreso();

    for (let i = 1; i <= 9; i++) {
        let esDesbloqueado = progreso.includes(i);
        
        let a = document.createElement(esDesbloqueado ? 'a' : 'div');
        a.className = `carta ${esDesbloqueado ? 'desbloqueado' : 'bloqueado'}`;
        
        if (esDesbloqueado) {
            a.href = `capitulo.html?id=${i}`;
        }

        a.innerHTML = `<span>${generarNumerosRomanos(i)}</span>`;
        contenedor.appendChild(a);
    }

    const btnFinal = document.getElementById('capitulo-final');
    if(!btnFinal) return;
    
    if (progreso.includes(10)) {
        btnFinal.classList.add('activo');
        btnFinal.innerHTML = "EL FINAL DEL VIAJE";
    }

    btnFinal.addEventListener('click', () => {
        const ahora = new Date();
        
        if (ahora >= FECHA_CUMPLEAÑOS_2027) {
            if (progreso.includes(10)) {
                window.location.href = `capitulo.html?id=10`; 
            } else {
                alert("Por fin llegó el día...\n\nPero todavía te falta la llave definitiva.\n\nBusca el compartimento oculto en el fondo de la caja que te di al principio del viaje.");
            }
        } else {
            alert("Todavía no es el momento.\n\nLa última pieza lleva contigo desde el primer día de este viaje. Todo a su debido tiempo... nos vemos el 23 de abril de 2027.");
        }
    });
}

function generarNumerosRomanos(num) {
    const romanos = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return romanos[num];
}
