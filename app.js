const FECHA_CUMPLEAÑOS_2027 = new Date('2027-04-23T00:00:00');

// ATENCIÓN AL ESCRIBIR TUS TEXTOS: 
// Usa solo comillas simples ('') dentro del texto si quieres poner cursivas o diseños.
const capitulosData = {
    1: { 
        titulo: "Capítulo I · El comienzo", 
        contenido: "<div style='text-align: justify; line-height: 1.7; font-size: 1.05rem; padding: 0 10px;'><p style='margin-bottom: 25px;'>Siempre he pensado que las cosas que más importan rara vez aparecen de golpe. Se construyen despacio. Con conversaciones que empiezan sin darte cuenta, con recuerdos que nacen de los días más normales y con pequeños detalles que, vistos con el tiempo, terminan significándolo todo.</p><p style='margin-bottom: 25px;'>Hace algún tiempo decidí empezar a crear algo para ti. No sabía exactamente cómo terminaría, solo sabía que quería que fuera diferente. Que no se tratara únicamente de un regalo, sino de una forma de detener el tiempo de vez en cuando y recordar todo aquello que merece la pena conservar.</p><p style='margin-bottom: 25px;'>Hoy solo estás viendo el principio. Y, como en todas las buenas historias, el principio no explica todo. Hay cosas que solo cobran sentido cuando llega el momento adecuado. Así que, por ahora, simplemente disfruta de este instante.</p><p style='margin-bottom: 25px;'>Solo quiero pedirte una pequeña cosa. Guarda bien aquello que has recibido hoy. Puede que ahora no entiendas por qué, pero llegará un momento en el que lo necesitarás.</p><p style='margin-bottom: 30px;'>Hasta entonces... deja que el tiempo haga su parte.</p><p style='margin-bottom: 50px;'>Con cariño,<br>Luis</p><div style='text-align: center; color: #D8CABB; font-size: 1.5em; margin: 40px 0; letter-spacing: 5px;'>* * *</div><p style='margin-bottom: 25px;'>Mindig is úgy gondoltam, hogy a legfontosabb dolgok ritkán bukkannak fel csak úgy, hirtelen. Lassan épülnek fel. Észrevétlenül kezdődő beszélgetésekkel, a legátlagosabb napokból születő emlékekkel és olyan apró részletekkel, amelyek az idő múlásával végül mindent jelentenek.</p><p style='margin-bottom: 25px;'>Egy ideje elhatároztam, hogy elkezdek alkotni valamit számodra. Nem tudtam pontosan, hogyan fog végződni, csak azt tudtam, hogy valami mást szeretnék. Hogy ez ne csak egy ajándék legyen, hanem egy módja annak, hogy időnként megállítsuk az időt, és emlékezzünk mindarra, amit érdemes megőrizni.</p><p style='margin-bottom: 25px;'>Ma még csak a kezdetet látod. És mint minden jó történetben, a kezdet nem magyaráz meg mindent. Vannak dolgok, amik csak akkor nyernek értelmet, amikor eljön a megfelelő pillanat. Szóval, egyelőre csak élvezd ezt a pillanatot.</p><p style='margin-bottom: 25px;'>Csak egy apróságot szeretnék kérni tőled. Vigyázz jól arra, amit ma kaptál. Talán most még nem érted, miért, de eljön majd az idő, amikor szükséged lesz rá.</p><p style='margin-bottom: 30px;'>Addig is... hagyd, hogy az idő tegye a dolgát.</p><p>Szeretettel,<br>Luis</p></div>" 
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
