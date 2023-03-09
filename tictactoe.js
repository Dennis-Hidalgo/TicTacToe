/**
 * Todas las casillas tienen la clase .casilla
 * 
 */

/**
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
let casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

/**
 * Recorrer las casillas que tengo en array casillas
 * Comprobar el contenido de cada una
 */

/**
 * Utilizo el array posicionesLlenas para introducir aquellas posiciones que contienen
 * un texto igual a 'X'
 * 
 * Al realizar un push lo que hago es introducir en el array, el numero de la posicion
 */
let posicionesLlenas = [];
for (let i = 0; i < casillas.length; i++) {
    console.log('La casilla numero ' + i + ' contiene: ' + casillas[i].innerHTML);
    if (casillas[i].innerHTML == 'X') {
        posicionesLlenas.push(i);
    }
}
console.log(posicionesLlenas);

/**
 * Una vez tengo un array con las posiciones que contienen una 'X',
 * me interesa poder comparar si en el contenido de 'posicionesLlenas' esta incluido
 * alguna de las combinaciones de 'combinacionesGanadoras'.
 * 
 * En este caso en 'posicionesLlenas' tenemos:
 * [0] ---> 0
 * [1] ---> 1
 * [2] ---> 2
 * [3] ---> 5
 * 
 * En este caso en 'combinacionesGanadoras' tenemos:
 * [0] ---> [0, 1, 2]           // CORRECTA
 */

/**
 * CONTENIDO NUEVO
 */

let turno = true;
let fichas1 = [];
let fichas2 = [];
let ganador = false;
let continuar = false;
let contador = 0;

function validarVictoria(fichas = []) {
    let i = 0;
    let j = 0;
    fichas.sort();

    do {
        console.log(combinacionesGanadoras[i]);  
        do {
            
            if (combinacionesGanadoras[i].includes(fichas[j])) {

                contador = contador + 1;
            }

            console.log("fichas: " + fichas[j]);
            console.log("j: " + j);
            console.log(contador);
            console.log(continuar);
            j = j + 1;

            if (contador >= 3) {
                ganador = true;
            }
        } while (j < fichas.length && ganador == false)


        if (ganador == false) {
            i = i + 1;
            contador = 0;
            j=0;
        }
    } while (i < combinacionesGanadoras.length && ganador == false)
}

// validarVictoria();

function agregarFicha(numero) {
    console.log('Has hecho clic en la casilla ' + numero)

    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el clic del div
     */

    do {
        if (turno) {
            casillas[numero].innerHTML = 'X';
            casillas[numero].removeAttribute('onclick')
            turno = false;
            fichas1.push(numero);
            if (fichas1.length >= 3) {
                validarVictoria(fichas1);
            }
            console.log(ganador);
        
        } else {
            casillas[numero].innerHTML = 'O';
            casillas[numero].removeAttribute('onclick')
            turno = true;
            fichas2.push(numero);
            // validarVictoria(fichas2);
            console.log(ganador);

        }

    } while (ganador);
    // }
    console.log(fichas1);
    console.log(fichas2);
}

/**
 * Para acabar el juego necesitamos:
 * 1. Colocar ficha
 * 2. Comprobar en cada insercion de ficha si se ha ganado el juego
 * 3. Cambiar turno
 * 4. Cuando hay ganador, mostrar mensaje
 * 
 * OPCIONES EXTRA:
 * 1. Generar un contador de victorias y resetear el tablero
 */