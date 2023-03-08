/**
 * OBJETO DOCUMENT
 * Es el que se refiere a mi fichero HTML
 * 
 * METODOS
 * -    getElementById('id') --> Selecciona el elemento (o etiqueta) con el id seleccionado
 * -    getElementsByClassName('nombreClase') --> Selecciona los elementos (o etiquetas) que tiene la clase seleccionada
 * -    getElementsByTagName('nombreEtiqueta') --> Selecciona los elementos (o etiquetas) que tienen la etiqueta seleccionada
 */

let a = document.getElementById('p2');
// console.log(a);

let b = document.getElementsByClassName('a'); // Me devuelve un array con todos los elementos con clase 'a'
// console.log(b);
// console.log(b[0]);
// console.log(b[1]);
// console.log(b[2]);
// console.log(b.length);

let c = document.getElementsByTagName('p'); // Me devuelve un array con todos las etiquetas
// console.log(c);
// console.log(c[0]);
// console.log(c[1]);
// console.log(c[2]);
// console.log(c.length);

/**
 * POSIBLES TAREAS
 * -    Coger, modificar, eliminar texto
 * Los metodos utilizados son:
 * innerHTML
 * textValue
 */

//Con innerHTML recojo el texto que este dnreo de la etiqueta con id 'p2'
console.log(a.innerHTML);
// Pisa el contenido y pone un nuevo texto
a.innerHTML = 'Me llamo Sergio';

/**
 * La variable b conteiene todas las etiquetas que tienen clase 'a'
 * 
 * [0] ---> etiqueta de la linea 16 en HTML
 * [1] ---> etiqueta de la linea 18 en HTML
 */

console.log(b[0].innerHTML);
console.log(b[1].innerHTML);

console.log(document.getElementById('p3').innerHTML);
b[1].innerHTML += ' Me llamo Sergio';

/**
 * A nivel de estilo necesito utilizar Style
 * style.PROPIEDAD = VALOR
 */

// a.style.color = 'blue';
// a.style.backgroundColor = 'red';

/**
 * A nivel de atributos puedo comunicarme con classList si quiero utilizar clases
 */

// a.classlist.add('clase');        ---> con add, agrego una clase nueva
// a.classlist.remove('clase');     ---> con remove, elimino una clase
// a.classlist.contains('clase');   ---> con contains, compruebo una clase

// a.classList.add('error')

/**
 * Ejercicio
 * Recoge el texto de la primera etiqueta 'p' que te encuentres en tu contenido
 * Si tiene una longitud inferior a 8 caracteres, agrega la clase error
 * En caso contrario, agrega la clase correcto
 */
// a.innerHTML = prompt('introduce texto');
if (a.innerHTML.length < 8){
    a.classList.add('error');
    a.classList.remove('correcto');
} else {
    a.classList.add('correcto');
    a.classList.add('error');
}