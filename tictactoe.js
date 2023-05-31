
let casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 */

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

let turno = true;
let fichas1 = [];
let fichas2 = [];
let victoria = false;
let coincidencias = 0;
let victoriasX;
let victoriasO;
let empates = 0;
let cuentaAtras = 16;
let contarTurnos = 0;
let cambioturno;
let reduccion;
let tiempo = document.getElementById('temporizador');
let jugador1 = document.getElementsByClassName('nombre')[0];
let jugador2 = document.getElementsByClassName('nombre')[1];
let cont1 = document.getElementsByClassName('contador')[0];
let cont2 = document.getElementsByClassName('contador')[1];
let cont3 = document.getElementsByClassName('contador')[2];
document.getElementsByClassName('nombre')[2].textContent = 'Empates:';

/**
 * Funcion que despliega el tablero para que sea visible
 */
function display(){
    let lineasV = [0, 1, 3, 4, 6, 7];
    let lineasH = 0;
    do {
        casillas[lineasH].style.borderBottom = '5px dashed black';
        lineasH++;
    } while (lineasH<6);
    for  (pos in lineasV){
        casillas[lineasV[pos]].style.borderRight = '5px dashed black';
    }
}

/**
 * Activa los botones tras iniciar el juego por primera vez, para que no se puedan pulsar sin haber introducido
 * los nombres de los jugadores
 */
function activarBotones(){
    document.getElementsByClassName('boton')[0].setAttribute('onclick', 'siguientePartida()');
    document.getElementsByClassName('boton')[1].setAttribute('onclick', 'reiniciarEstadisticas()');
}

/**
 * Funcion que pide nombre de los 2 jugadores y reinicia las estadisticas
 * @param 
 * @returns
 */
function empezarJuego() {
    jugador1.textContent = prompt('introduce el nombre del primer jugador');
    jugador2.textContent = prompt('introduce el nombre del segundo jugador');
    activarBotones();
    reiniciarEstadisticas();
    console.log(tiempo.innerHTML);
    display();
}

/**
 * funcion que reinicia el tablero devolviendo los atributos 'onclick' y vaciando el contenido de cada casiila
 * @param
 * @returns
 */
function siguientePartida() {
    detenerIntervalo();
    cuentaAtras = 16;
    for (let k = 0; k < casillas.length; k++) {
        casillas[k].style.color = "black";
        casillas[k].setAttribute('onclick', `agregarFicha(${k})`);
        casillas[k].innerHTML = "";
    }
    victoria = false;
    coincidencias = 0;
    ganador = false;
    i = 0;
    j = 0;
    fichas1 = [];
    fichas2 = [];
    contarTurnos = 0;
    mostrarTemporizador();
}

/**
 * funcion que permite reiniciar las estadisticas, sin necesidad de introducir de nuevo los nombres
 * @param
 * @returns
 */
function reiniciarEstadisticas() {
    siguientePartida();
    turno = true;
    victoriasO = 0;
    victoriasX = 0;
    empates = 0;
    cont1.innerHTML = victoriasX;
    cont2.innerHTML = victoriasO;
    cont3.innerHTML = empates;
}

/**
 * Funcion que comprueba si las fichas del jugador coinciden con una de las combinaciones ganadoras
 * @param {Array} fichas Array que contiene las fichas a evaluar
 * @returns
 */
function validarVictoria(fichas = []) {
    let i = 0;
    let j = 0;
    let ganador = false;
    fichas.sort();
    do {
        coincidencias = 0;
        j = 0;
        // Recorro la longitud del array, junto con cada array de las combinaciones ganadoras
        do {
            if (combinacionesGanadoras[i].includes(fichas[j])) {
                coincidencias++;
            }
            j++;
            // Si las coincidencias llegan a 3, es que mis fichas contienen una de las conmbinaciones ganadoras
            // 'ganador' valida que existe una victoria
            if (coincidencias == 3) {
                ganador = true;
                victoria = true;
            }
        } while (j < fichas.length && ganador == false)
        // En caso de no haber ganador, voy al siguiente array de combinaciones ganadoras
        if (ganador == false) {
            i++;
            j = 0;
        } else {
            // Si existe una victoria, recojo el array que contiene la combinacion ganadora y lo resalto
            victoria = true;
            console.log(combinacionesGanadoras[i])
            for (pintar in combinacionesGanadoras[i]) {
                casillas[combinacionesGanadoras[i][pintar]].style.color = 'red';
            }
        }
    } while (i < combinacionesGanadoras.length && ganador == false)
}

/**
 * Funcion que hace distincion entre jugador 1(X) y jugador 2(O)
 * @param {Array} fichasJug Array que contiene las casillas marcadas de cada jugador
 * @param {Element} jugadorAux Elemento que contiene el nombre del jugador
 * @param {Number} numeroAux parametro para referenciar de nuevo la posicion de la casilla
 * @return
 */
function distinguirFicha(fichasJug = [], jugadorAux, numeroAux = 0) {
    casillas[numeroAux].removeAttribute('onclick')
    fichasJug.push(numeroAux);
    detenerIntervalo();
    if (fichasJug.length >= 3) {
        validarVictoria(fichasJug);
        if (victoria) {
            cuentaAtras = 16;
            tiempo.innerHTML = `Partida terminada, una victoria mas para ${jugadorAux.textContent}`;
            // En caso de existir victoria, quito todos losa tributos 'onclick' para que no se pueda introducir mas fichas
            for (let i = 0; i < casillas.length; i++) {
                casillas[i].removeAttribute('onclick')
            }
            
        }
    }
}

/**
 * Funcion que pinta la combinacion ganadora tras existir una victoria
 */
function pintarGanador(){
    if (victoriasX>victoriasO){
        cont1.style.color = 'green';
        cont2.style.color = 'red';
    } else if(victoriasX<victoriasO) {
        cont1.style.color = 'red';
        cont2.style.color = 'green';
    } else if (victoriasO == victoriasX){
        cont1.style.color = 'gray';
        cont2.style.color = 'gray';
    }
}
/**
 * funcion que agrega las fichas en el tablero 
 * @param {int} numero hace referencia a la posicion de la casilla en la que agrego la ficha
 * @returns
 */
function agregarFicha(numero) {
    if (!victoria) {
        if (turno) {
            casillas[numero].innerHTML = 'X';
            turno = false;
            distinguirFicha(fichas1, jugador1, numero);
            if (victoria) {
                victoriasX++;
                pintarGanador();
                cont1.innerHTML = victoriasX;
                // Cambio de turno para que el perdedor, sea el que empieza en la siguiente ronda
                turno = false;
            }
        } else {
            casillas[numero].innerHTML = 'O';
            turno = true;
            distinguirFicha(fichas2, jugador2, numero);
            if (victoria) {
                victoriasO++;
                pintarGanador();
                cont2.innerHTML = victoriasO;
                // Cambio de turno para que el perdedor, sea el que empieza en la siguiente ronda                
                turno = true;
            }
        }
        contarTurnos++;
        console.log(contarTurnos);
        // Si el contador de turnos llega a 9, y esta ultima jugada no da victoria, el contador de empates aumenta
        if (!victoria && contarTurnos == 9) {
            empates = empates + 1;
            cont3.innerHTML = empates;
            tiempo.innerHTML = `¡Empate!`;
        } else if (!victoria) {
            cuentaAtras = 16;
            mostrarTemporizador();
        }
    }
}

/**
 * Funcion que reduce el temporizador y muestra su contenido cada vez que se ejecuta
 */
function reducirTemporizador() {
    let jugAux = "";
    if (turno) {
        jugAux = jugador1.textContent;
    } else {
        jugAux = jugador2.textContent;
    }
    cuentaAtras = cuentaAtras - 1;
    tiempo.innerHTML = `Turno de ${jugAux}, cambio automatico en ${cuentaAtras}`;
    if (cuentaAtras == 0) {
        cuentaAtras = 16;
    }
}

/**
 * funcion que ejecuta la reduccion cada segundo
 */
function imprimirNumero() {
    reduccion = setInterval(reducirTemporizador, 1000);
}

/**
 * Funcion que muestra la cuenta atras, y cambia de turno tras el intervalo marcado en milisegundos
 * @param
 * @returns
 */
function mostrarTemporizador() {
    cambioturno = setInterval(cambiarTurno, 16000);
    imprimirNumero();
}

/**
 * funcion que realiza el cambio de turno para ejecutarse en la funcion mostrarTemporizador()
 * @param
 * @returns
 */
function cambiarTurno() {
    if (turno) {
        turno = false;
    } else {
        turno = true;
    }
}

/**
 * Funcion que detiene ambos intervalos
 * @param
 * @return
 */
function detenerIntervalo() {
    clearInterval(cambioturno);
    clearInterval(reduccion);
}
